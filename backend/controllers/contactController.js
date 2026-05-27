import { db, uid } from "../config/db.js";
import { connectMongo, useMongoLeads } from "../config/mongo.js";
import { assertEmail, assertPhone, clean, createActivity, listRows, notFound, now, ok, required } from "../utils/helpers.js";
import { notifyLeadSubmission } from "../utils/emailNotifier.js";
import { Lead } from "../models/Lead.js";
import { statuses } from "../models/schema.js";

function mongoQuery(req) {
  const query = {};
  const search = clean(req.query.search || "");
  const status = clean(req.query.status || "");
  const projectType = clean(req.query.projectType || "");
  const dateFrom = clean(req.query.dateFrom || "");
  const dateTo = clean(req.query.dateTo || "");

  if (search) {
    query.$or = ["name", "email", "phone", "company", "projectType", "message"].map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }
  if (status && status !== "all") query.status = status;
  if (projectType && projectType !== "all") query.projectType = projectType;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateFrom) || /^\d{4}-\d{2}-\d{2}$/.test(dateTo)) {
    query.createdAt = {};
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateFrom)) query.createdAt.$gte = new Date(`${dateFrom}T00:00:00.000Z`);
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateTo)) query.createdAt.$lte = new Date(`${dateTo}T23:59:59.999Z`);
  }
  return query;
}

function serializeLead(lead) {
  const { _id, ...rest } = lead;
  return {
    ...rest,
    createdAt: lead.createdAt instanceof Date ? lead.createdAt.toISOString() : lead.createdAt,
    updatedAt: lead.updatedAt instanceof Date ? lead.updatedAt.toISOString() : lead.updatedAt,
  };
}

export async function createContact(req, res, next) {
  try {
    required(req.body, ["name", "email", "projectType", "message"]);
    assertEmail(req.body.email);
    if (req.body.phone) assertPhone(req.body.phone);

    const id = uid();
    const createdAt = now();
    const row = {
      name: clean(req.body.name),
      email: clean(req.body.email).toLowerCase(),
      phone: clean(req.body.phone),
      countryCode: clean(req.body.countryCode),
      company: clean(req.body.company),
      projectType: clean(req.body.projectType || req.body.subject || "Website Inquiry"),
      subject: clean(req.body.subject || req.body.projectType || "Website Inquiry"),
      message: clean(req.body.message),
      source: clean(req.body.source || "Contact Page"),
      createdAt,
    };

    if (useMongoLeads()) {
      await connectMongo();
      await Lead.create({ id, ...row, status: "new", updatedAt: createdAt });
    } else {
      db.prepare(`
        INSERT INTO contact_messages (id, name, email, phone, countryCode, company, projectType, subject, message, status, source, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)
      `).run(id, row.name, row.email, row.phone, row.countryCode, row.company, row.projectType, row.subject, row.message, row.source, createdAt, createdAt);
    }
    createActivity("Created lead", row.name, "Contact", id);
    notifyLeadSubmission({ id, ...row }).catch((error) => {
      console.warn("Lead notification email failed:", error.message);
    });
    ok(res, { message: "Lead submitted successfully", id });
  } catch (error) {
    next(error);
  }
}

export async function listContacts(req, res, next) {
  try {
    if (useMongoLeads()) {
      await connectMongo();
      const page = Math.max(Number.parseInt(req.query.page || "1", 10), 1);
      const limit = Math.min(Math.max(Number.parseInt(req.query.limit || "10", 10), 1), 100);
      const sort = req.query.sort === "oldest" ? 1 : -1;
      const query = mongoQuery(req);
      const [rows, total] = await Promise.all([
        Lead.find(query).sort({ createdAt: sort }).skip((page - 1) * limit).limit(limit).lean(),
        Lead.countDocuments(query),
      ]);
      return ok(res, { rows: rows.map(serializeLead), total, page, limit, pages: Math.max(Math.ceil(total / limit), 1) });
    }

    ok(res, listRows({
      table: "contact_messages",
      searchable: ["name", "email", "phone", "company", "projectType", "subject", "message"],
      filters: { status: req.query.status, projectType: req.query.projectType },
      req,
    }));
  } catch (error) {
    next(error);
  }
}

export async function getContact(req, res, next) {
  try {
    if (useMongoLeads()) {
      await connectMongo();
      const row = await Lead.findOne({ id: req.params.id }).lean();
      if (!row) notFound("Lead");
      return ok(res, { record: serializeLead(row) });
    }

    const row = db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(req.params.id);
    if (!row) notFound("Lead");
    ok(res, { record: row });
  } catch (error) {
    next(error);
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const status = clean(req.body.status);
    if (!statuses.contact.includes(status)) {
      const error = new Error("Invalid contact status");
      error.status = 400;
      throw error;
    }
    const updatedAt = now();
    if (useMongoLeads()) {
      await connectMongo();
      const result = await Lead.updateOne({ id: req.params.id }, { $set: { status, updatedAt: new Date(updatedAt) } });
      if (!result.matchedCount) notFound("Lead");
      createActivity(`Updated lead status to ${status}`, req.admin.name, "Contact", req.params.id);
      return ok(res, { message: "Lead status updated successfully" });
    }

    const result = db.prepare("UPDATE contact_messages SET status = ?, updatedAt = ? WHERE id = ?").run(status, updatedAt, req.params.id);
    if (!result.changes) notFound("Lead");
    createActivity(`Updated lead status to ${status}`, req.admin.name, "Contact", req.params.id);
    ok(res, { message: "Lead status updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res, next) {
  try {
    if (useMongoLeads()) {
      await connectMongo();
      const result = await Lead.deleteOne({ id: req.params.id });
      if (!result.deletedCount) notFound("Lead");
      createActivity("Deleted lead", req.admin.name, "Contact", req.params.id);
      return ok(res, { message: "Lead deleted successfully" });
    }

    const result = db.prepare("DELETE FROM contact_messages WHERE id = ?").run(req.params.id);
    if (!result.changes) notFound("Lead");
    createActivity("Deleted lead", req.admin.name, "Contact", req.params.id);
    ok(res, { message: "Lead deleted successfully" });
  } catch (error) {
    next(error);
  }
}
