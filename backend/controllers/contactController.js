import { db, uid } from "../config/db.js";
import { assertEmail, assertPhone, clean, createActivity, listRows, notFound, now, ok, required } from "../utils/helpers.js";
import { statuses } from "../models/schema.js";

export function createContact(req, res, next) {
  try {
    required(req.body, ["name", "email", "message"]);
    assertEmail(req.body.email);
    assertPhone(req.body.phone);

    const id = uid();
    const createdAt = now();
    const row = {
      name: clean(req.body.name),
      email: clean(req.body.email).toLowerCase(),
      phone: clean(req.body.phone),
      subject: clean(req.body.subject || "Website Inquiry"),
      message: clean(req.body.message),
      source: clean(req.body.source || "Contact Page"),
    };

    db.prepare(`
      INSERT INTO contact_messages (id, name, email, phone, subject, message, status, source, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, 'New', ?, ?, ?)
    `).run(id, row.name, row.email, row.phone, row.subject, row.message, row.source, createdAt, createdAt);
    createActivity("Created contact message", row.name, "Contact", id);
    ok(res, { message: "Contact message sent successfully", id });
  } catch (error) {
    next(error);
  }
}

export function listContacts(req, res, next) {
  try {
    ok(res, listRows({
      table: "contact_messages",
      searchable: ["name", "email", "phone", "subject", "message"],
      filters: { status: req.query.status },
      req,
    }));
  } catch (error) {
    next(error);
  }
}

export function getContact(req, res, next) {
  try {
    const row = db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(req.params.id);
    if (!row) notFound("Contact message");
    ok(res, { record: row });
  } catch (error) {
    next(error);
  }
}

export function updateContactStatus(req, res, next) {
  try {
    const status = clean(req.body.status);
    if (!statuses.contact.includes(status)) {
      const error = new Error("Invalid contact status");
      error.status = 400;
      throw error;
    }
    const updatedAt = now();
    const result = db.prepare("UPDATE contact_messages SET status = ?, updatedAt = ? WHERE id = ?").run(status, updatedAt, req.params.id);
    if (!result.changes) notFound("Contact message");
    createActivity(`Updated contact status to ${status}`, req.admin.name, "Contact", req.params.id);
    ok(res, { message: "Record updated successfully" });
  } catch (error) {
    next(error);
  }
}

export function deleteContact(req, res, next) {
  try {
    const result = db.prepare("DELETE FROM contact_messages WHERE id = ?").run(req.params.id);
    if (!result.changes) notFound("Contact message");
    createActivity("Deleted contact message", req.admin.name, "Contact", req.params.id);
    ok(res, { message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
}
