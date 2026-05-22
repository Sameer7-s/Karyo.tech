import { db, uid } from "../config/db.js";
import { assertEmail, assertPhone, clean, createActivity, listRows, notFound, now, ok, required } from "../utils/helpers.js";
import { statuses } from "../models/schema.js";

const categories = ["Website", "AI Project", "SaaS Application", "Mobile App", "Dashboard", "Automation Tool", "Other"];

export function createProjectInquiry(req, res, next) {
  try {
    required(req.body, ["clientName", "email", "projectTitle", "projectCategory", "projectDescription"]);
    assertEmail(req.body.email);
    assertPhone(req.body.phone);
    const projectCategory = clean(req.body.projectCategory);
    if (!categories.includes(projectCategory)) {
      const error = new Error("Invalid project category");
      error.status = 400;
      throw error;
    }

    const id = uid();
    const createdAt = now();
    db.prepare(`
      INSERT INTO project_inquiries
      (id, clientName, email, phone, projectTitle, projectCategory, projectDescription, budgetRange, deadline, attachedFileUrl, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?)
    `).run(
      id,
      clean(req.body.clientName),
      clean(req.body.email).toLowerCase(),
      clean(req.body.phone),
      clean(req.body.projectTitle),
      projectCategory,
      clean(req.body.projectDescription),
      clean(req.body.budgetRange),
      clean(req.body.deadline),
      clean(req.body.attachedFileUrl),
      createdAt,
      createdAt,
    );
    createActivity("Created project inquiry", clean(req.body.clientName), "Project Inquiry", id);
    ok(res, { message: "Project inquiry submitted successfully", id });
  } catch (error) {
    next(error);
  }
}

export function listProjectInquiries(req, res, next) {
  try {
    ok(res, listRows({
      table: "project_inquiries",
      searchable: ["clientName", "email", "phone", "projectTitle", "projectCategory", "projectDescription"],
      filters: { status: req.query.status, projectCategory: req.query.projectCategory },
      req,
    }));
  } catch (error) {
    next(error);
  }
}

export function getProjectInquiry(req, res, next) {
  try {
    const row = db.prepare("SELECT * FROM project_inquiries WHERE id = ?").get(req.params.id);
    if (!row) notFound("Project inquiry");
    ok(res, { record: row });
  } catch (error) {
    next(error);
  }
}

export function updateProjectStatus(req, res, next) {
  try {
    const status = clean(req.body.status);
    if (!statuses.project.includes(status)) {
      const error = new Error("Invalid inquiry status");
      error.status = 400;
      throw error;
    }
    const updatedAt = now();
    const result = db.prepare("UPDATE project_inquiries SET status = ?, updatedAt = ? WHERE id = ?").run(status, updatedAt, req.params.id);
    if (!result.changes) notFound("Project inquiry");
    createActivity(`Updated project status to ${status}`, req.admin.name, "Project Inquiry", req.params.id);
    ok(res, { message: "Record updated successfully" });
  } catch (error) {
    next(error);
  }
}

export function deleteProjectInquiry(req, res, next) {
  try {
    const result = db.prepare("DELETE FROM project_inquiries WHERE id = ?").run(req.params.id);
    if (!result.changes) notFound("Project inquiry");
    createActivity("Deleted project inquiry", req.admin.name, "Project Inquiry", req.params.id);
    ok(res, { message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
}
