import { db, uid } from "../config/db.js";
import { assertEmail, assertPhone, clean, createActivity, listRows, notFound, now, ok, required } from "../utils/helpers.js";
import { statuses } from "../models/schema.js";

const serviceTypes = ["AI Automation", "Web Development", "SaaS Development", "UI/UX Design", "Backend Development", "Cloud / DevOps", "Custom Project", "AI Chatbot", "Workflow Automation", "Custom AI System"];

export function createServiceRequest(req, res, next) {
  try {
    required(req.body, ["fullName", "email", "serviceType", "requirementDetails"]);
    assertEmail(req.body.email);
    assertPhone(req.body.phone);
    const serviceType = clean(req.body.serviceType);
    if (!serviceTypes.includes(serviceType)) {
      const error = new Error("Invalid service type");
      error.status = 400;
      throw error;
    }

    const id = uid();
    const createdAt = now();
    db.prepare(`
      INSERT INTO service_requests
      (id, fullName, email, phone, companyName, serviceType, budget, timeline, requirementDetails, status, priority, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', 'Medium', ?, ?)
    `).run(
      id,
      clean(req.body.fullName),
      clean(req.body.email).toLowerCase(),
      clean(req.body.phone),
      clean(req.body.companyName),
      serviceType,
      clean(req.body.budget),
      clean(req.body.timeline),
      clean(req.body.requirementDetails),
      createdAt,
      createdAt,
    );
    createActivity("Created service request", clean(req.body.fullName), "Service Request", id);
    ok(res, { message: "Service request submitted successfully", id });
  } catch (error) {
    next(error);
  }
}

export function listServiceRequests(req, res, next) {
  try {
    ok(res, listRows({
      table: "service_requests",
      searchable: ["fullName", "email", "phone", "companyName", "serviceType", "requirementDetails"],
      filters: { status: req.query.status, priority: req.query.priority },
      req,
    }));
  } catch (error) {
    next(error);
  }
}

export function getServiceRequest(req, res, next) {
  try {
    const row = db.prepare("SELECT * FROM service_requests WHERE id = ?").get(req.params.id);
    if (!row) notFound("Service request");
    ok(res, { record: row });
  } catch (error) {
    next(error);
  }
}

export function updateServiceStatus(req, res, next) {
  try {
    const status = clean(req.body.status);
    if (!statuses.request.includes(status)) {
      const error = new Error("Invalid request status");
      error.status = 400;
      throw error;
    }
    const updatedAt = now();
    const result = db.prepare("UPDATE service_requests SET status = ?, updatedAt = ? WHERE id = ?").run(status, updatedAt, req.params.id);
    if (!result.changes) notFound("Service request");
    createActivity(`Updated service status to ${status}`, req.admin.name, "Service Request", req.params.id);
    ok(res, { message: "Record updated successfully" });
  } catch (error) {
    next(error);
  }
}

export function updateServicePriority(req, res, next) {
  try {
    const priority = clean(req.body.priority);
    if (!statuses.priority.includes(priority)) {
      const error = new Error("Invalid request priority");
      error.status = 400;
      throw error;
    }
    const updatedAt = now();
    const result = db.prepare("UPDATE service_requests SET priority = ?, updatedAt = ? WHERE id = ?").run(priority, updatedAt, req.params.id);
    if (!result.changes) notFound("Service request");
    createActivity(`Updated service priority to ${priority}`, req.admin.name, "Service Request", req.params.id);
    ok(res, { message: "Record updated successfully" });
  } catch (error) {
    next(error);
  }
}

export function deleteServiceRequest(req, res, next) {
  try {
    const result = db.prepare("DELETE FROM service_requests WHERE id = ?").run(req.params.id);
    if (!result.changes) notFound("Service request");
    createActivity("Deleted service request", req.admin.name, "Service Request", req.params.id);
    ok(res, { message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
}
