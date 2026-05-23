import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { clean, createActivity, now, ok, required, assertEmail } from "../utils/helpers.js";

function publicAdmin(admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
    lastLogin: admin.lastLogin,
  };
}

function signToken(admin) {
  return jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET || "dev_admin_secret_change_me",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
}

function envFlag(name) {
  return ["1", "true", "yes", "on"].includes(String(process.env[name] || "").toLowerCase());
}

export async function loginAdmin(req, res, next) {
  try {
    required(req.body, ["email", "password"]);
    assertEmail(req.body.email);

    const email = clean(req.body.email).toLowerCase();
    const admin = db.prepare("SELECT * FROM admin_users WHERE email = ?").get(email);
    const password = String(req.body.password);
    const passwordMatches = admin ? await bcrypt.compare(password, admin.passwordHash) : false;
    const resetPasswordMatches = envFlag("ADMIN_RESET_PASSWORD_ON_START")
      && email === String(process.env.ADMIN_EMAIL || "").toLowerCase()
      && password === String(process.env.ADMIN_PASSWORD || "");

    if (!admin || (!passwordMatches && !resetPasswordMatches)) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      throw error;
    }

    const lastLogin = now();
    const updatedAdmin = { ...admin, lastLogin, updatedAt: lastLogin };
    try {
      db.prepare("UPDATE admin_users SET lastLogin = ?, updatedAt = ? WHERE id = ?").run(lastLogin, lastLogin, admin.id);
      createActivity("Admin logged in", updatedAdmin.name, "Admin", updatedAdmin.id);
    } catch (error) {
      console.warn("Login audit write failed. Continuing with a valid admin session.");
    }

    ok(res, { token: signToken(updatedAdmin), admin: publicAdmin(updatedAdmin) });
  } catch (error) {
    next(error);
  }
}

export function me(req, res) {
  ok(res, { admin: req.admin });
}

export function logout(req, res) {
  createActivity("Admin logged out", req.admin?.name, "Admin", req.admin?.id);
  ok(res, { message: "Logged out successfully" });
}

export function updateSettings(req, res, next) {
  try {
    const name = clean(req.body.name);
    if (!name) {
      const error = new Error("Name is required");
      error.status = 400;
      throw error;
    }
    const updatedAt = now();
    db.prepare("UPDATE admin_users SET name = ?, updatedAt = ? WHERE id = ?").run(name, updatedAt, req.admin.id);
    createActivity("Updated admin profile", name, "Admin", req.admin.id);
    const admin = db.prepare(`
      SELECT id, name, email, role, createdAt, updatedAt, lastLogin
      FROM admin_users WHERE id = ?
    `).get(req.admin.id);
    ok(res, { admin, message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    required(req.body, ["currentPassword", "newPassword"]);
    if (String(req.body.newPassword).length < 8) {
      const error = new Error("New password must be at least 8 characters");
      error.status = 400;
      throw error;
    }
    const admin = db.prepare("SELECT * FROM admin_users WHERE id = ?").get(req.admin.id);
    if (!admin || !(await bcrypt.compare(String(req.body.currentPassword), admin.passwordHash))) {
      const error = new Error("Current password is incorrect");
      error.status = 400;
      throw error;
    }
    const passwordHash = await bcrypt.hash(String(req.body.newPassword), 12);
    const updatedAt = now();
    db.prepare("UPDATE admin_users SET passwordHash = ?, updatedAt = ? WHERE id = ?").run(passwordHash, updatedAt, admin.id);
    createActivity("Changed admin password", admin.name, "Admin", admin.id);
    ok(res, { message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
}
