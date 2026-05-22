import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../data");
fs.mkdirSync(dataDir, { recursive: true });

const databaseUrl = process.env.DATABASE_URL || path.join(dataDir, "admin.sqlite");
const rawDatabasePath = databaseUrl.startsWith("sqlite://")
  ? databaseUrl.replace("sqlite://", "")
  : databaseUrl;
const databasePath = path.isAbsolute(rawDatabasePath)
  ? rawDatabasePath
  : path.resolve(__dirname, "../..", rawDatabasePath);
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const db = new DatabaseSync(databasePath);
db.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = DELETE; PRAGMA busy_timeout = 5000;");

export function uid() {
  return randomUUID();
}

function now() {
  return new Date().toISOString();
}

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      lastLogin TEXT
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New',
      source TEXT NOT NULL DEFAULT 'Contact Page',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS service_requests (
      id TEXT PRIMARY KEY,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      companyName TEXT,
      serviceType TEXT NOT NULL,
      budget TEXT,
      timeline TEXT,
      requirementDetails TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New',
      priority TEXT NOT NULL DEFAULT 'Medium',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS project_inquiries (
      id TEXT PRIMARY KEY,
      clientName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      projectTitle TEXT NOT NULL,
      projectCategory TEXT NOT NULL,
      projectDescription TEXT NOT NULL,
      budgetRange TEXT,
      deadline TEXT,
      attachedFileUrl TEXT,
      status TEXT NOT NULL DEFAULT 'New',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      subscribedAt TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Active'
    );

    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      rating INTEGER NOT NULL,
      message TEXT NOT NULL,
      approved INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activity_logs (
      id TEXT PRIMARY KEY,
      action TEXT NOT NULL,
      performedBy TEXT NOT NULL,
      recordType TEXT NOT NULL,
      recordId TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(createdAt);
    CREATE INDEX IF NOT EXISTS idx_service_created ON service_requests(createdAt);
    CREATE INDEX IF NOT EXISTS idx_project_created ON project_inquiries(createdAt);
    CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
    CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback(createdAt);
  `);
}

function seedAdmin() {
  const count = db.prepare("SELECT COUNT(*) AS total FROM admin_users").get().total;
  if (count > 0) return;

  const createdAt = now();
  const password = process.env.ADMIN_PASSWORD || "Admin@123";
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const name = process.env.ADMIN_NAME || "Admin";
  const passwordHash = bcrypt.hashSync(password, 12);

  db.prepare(`
    INSERT INTO admin_users (id, name, email, passwordHash, role, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, 'admin', ?, ?)
  `).run(uid(), name, email.toLowerCase(), passwordHash, createdAt, createdAt);

  console.log(`Default admin created for ${email}`);
}

export function initDatabase() {
  createTables();
  seedAdmin();
  console.log("Database connected successfully");
}
