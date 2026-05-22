import { db, uid } from "../config/db.js";
import { assertEmail, clean, createActivity, listRows, notFound, now, ok, required } from "../utils/helpers.js";

export function createNewsletter(req, res, next) {
  try {
    required(req.body, ["email"]);
    assertEmail(req.body.email);
    const email = clean(req.body.email).toLowerCase();
    const exists = db.prepare("SELECT id FROM newsletter_subscribers WHERE email = ?").get(email);
    if (exists) {
      const error = new Error("This email is already subscribed");
      error.status = 409;
      throw error;
    }

    const id = uid();
    const subscribedAt = now();
    db.prepare(`
      INSERT INTO newsletter_subscribers (id, email, subscribedAt, status)
      VALUES (?, ?, ?, 'Active')
    `).run(id, email, subscribedAt);
    createActivity("Created newsletter subscriber", email, "Newsletter", id);
    ok(res, { message: "Subscribed successfully", id });
  } catch (error) {
    next(error);
  }
}

export function listNewsletter(req, res, next) {
  try {
    ok(res, listRows({
      table: "newsletter_subscribers",
      searchable: ["email"],
      filters: { status: req.query.status },
      orderBy: "subscribedAt",
      req,
    }));
  } catch (error) {
    next(error);
  }
}

export function deleteNewsletter(req, res, next) {
  try {
    const result = db.prepare("DELETE FROM newsletter_subscribers WHERE id = ?").run(req.params.id);
    if (!result.changes) notFound("Subscriber");
    createActivity("Deleted newsletter subscriber", req.admin.name, "Newsletter", req.params.id);
    ok(res, { message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
}
