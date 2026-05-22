import { db, uid } from "../config/db.js";
import { assertEmail, clean, createActivity, listRows, notFound, now, ok, required } from "../utils/helpers.js";

export function createFeedback(req, res, next) {
  try {
    required(req.body, ["name", "email", "rating", "message"]);
    assertEmail(req.body.email);
    const rating = Number.parseInt(req.body.rating, 10);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      const error = new Error("Rating must be between 1 and 5");
      error.status = 400;
      throw error;
    }

    const id = uid();
    const createdAt = now();
    db.prepare(`
      INSERT INTO feedback (id, name, email, rating, message, approved, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?)
    `).run(id, clean(req.body.name), clean(req.body.email).toLowerCase(), rating, clean(req.body.message), createdAt, createdAt);
    createActivity("Created feedback", clean(req.body.name), "Feedback", id);
    ok(res, { message: "Feedback submitted successfully", id });
  } catch (error) {
    next(error);
  }
}

export function listFeedback(req, res, next) {
  try {
    const approved = req.query.approved === "approved" ? 1 : req.query.approved === "hidden" ? 0 : "";
    ok(res, listRows({
      table: "feedback",
      searchable: ["name", "email", "message"],
      filters: { approved },
      req,
    }));
  } catch (error) {
    next(error);
  }
}

export function approveFeedback(req, res, next) {
  try {
    const approved = req.body.approved ? 1 : 0;
    const updatedAt = now();
    const result = db.prepare("UPDATE feedback SET approved = ?, updatedAt = ? WHERE id = ?").run(approved, updatedAt, req.params.id);
    if (!result.changes) notFound("Feedback");
    createActivity(approved ? "Approved feedback" : "Hid feedback", req.admin.name, "Feedback", req.params.id);
    ok(res, { message: "Record updated successfully" });
  } catch (error) {
    next(error);
  }
}

export function deleteFeedback(req, res, next) {
  try {
    const result = db.prepare("DELETE FROM feedback WHERE id = ?").run(req.params.id);
    if (!result.changes) notFound("Feedback");
    createActivity("Deleted feedback", req.admin.name, "Feedback", req.params.id);
    ok(res, { message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
}
