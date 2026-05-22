import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export function protectAdmin(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) {
      const error = new Error("Unauthorized access");
      error.status = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_admin_secret_change_me");
    const admin = db.prepare(`
      SELECT id, name, email, role, createdAt, updatedAt, lastLogin
      FROM admin_users
      WHERE id = ?
    `).get(decoded.id);

    if (!admin) {
      const error = new Error("Unauthorized access");
      error.status = 401;
      throw error;
    }

    req.admin = admin;
    next();
  } catch (_error) {
    const error = new Error("Unauthorized access");
    error.status = 401;
    next(error);
  }
}
