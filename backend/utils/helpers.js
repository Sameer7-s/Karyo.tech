import { db, uid } from "../config/db.js";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[0-9+\-\s()]{7,24}$/;

export function now() {
  return new Date().toISOString();
}

export function clean(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function required(body, fields) {
  const missing = fields.filter((field) => !clean(body[field]));
  if (missing.length) {
    const error = new Error(`Missing required fields: ${missing.join(", ")}`);
    error.status = 400;
    throw error;
  }
}

export function assertEmail(email) {
  if (!emailRegex.test(clean(email))) {
    const error = new Error("Please enter a valid email address");
    error.status = 400;
    throw error;
  }
}

export function assertPhone(phone) {
  if (phone && !phoneRegex.test(clean(phone))) {
    const error = new Error("Please enter a valid phone number");
    error.status = 400;
    throw error;
  }
}

export function ok(res, payload = {}) {
  res.json({ success: true, ...payload });
}

export function createActivity(action, performedBy, recordType, recordId) {
  db.prepare(`
    INSERT INTO activity_logs (id, action, performedBy, recordType, recordId, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(uid(), action, performedBy || "System", recordType, recordId || null, now());
}

export function notFound(label = "Record") {
  const error = new Error(`${label} not found`);
  error.status = 404;
  throw error;
}

export function parseListQuery(req) {
  const page = Math.max(Number.parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit || "10", 10), 1), 100);
  const offset = (page - 1) * limit;
  const sort = req.query.sort === "oldest" ? "ASC" : "DESC";
  const search = clean(req.query.search || "");
  const dateFrom = clean(req.query.dateFrom || "");
  const dateTo = clean(req.query.dateTo || "");
  return { page, limit, offset, sort, search, dateFrom, dateTo };
}

function isoBoundaryDate(value, endOfDay = false) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = new Date(`${value}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}Z`);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

export function listRows({ table, searchable = [], filters = {}, req, orderBy = "createdAt" }) {
  const { page, limit, offset, sort, search, dateFrom, dateTo } = parseListQuery(req);
  const where = [];
  const values = [];

  if (search && searchable.length) {
    where.push(`(${searchable.map((field) => `${field} LIKE ?`).join(" OR ")})`);
    searchable.forEach(() => values.push(`%${search}%`));
  }

  Object.entries(filters).forEach(([field, value]) => {
    const cleaned = clean(value);
    if (cleaned && cleaned !== "all") {
      where.push(`${field} = ?`);
      values.push(cleaned);
    }
  });

  if (dateFrom) {
    const date = isoBoundaryDate(dateFrom);
    if (date) {
      where.push(`${orderBy} >= ?`);
      values.push(date);
    }
  }

  if (dateTo) {
    const date = isoBoundaryDate(dateTo, true);
    if (date) {
      where.push(`${orderBy} <= ?`);
      values.push(date);
    }
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = db.prepare(`SELECT COUNT(*) AS total FROM ${table} ${whereSql}`).get(...values).total;
  const rows = db.prepare(`
    SELECT * FROM ${table}
    ${whereSql}
    ORDER BY ${orderBy} ${sort}
    LIMIT ? OFFSET ?
  `).all(...values, limit, offset);

  return { rows, total, page, limit, pages: Math.max(Math.ceil(total / limit), 1) };
}
