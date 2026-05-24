import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../data");

// If running in a OneDrive synced folder, SQLite throws "disk I/O error" due to cloud sync locks.
// In that case, we fall back to the user's home directory.
const isOneDrive = __dirname.toLowerCase().includes("onedrive");
const defaultDbPath = isOneDrive
  ? path.join(os.homedir(), ".karyo", "admin.sqlite")
  : path.join(dataDir, "admin.sqlite");

const databaseUrl = process.env.DATABASE_URL || defaultDbPath;
const rawDatabasePath = databaseUrl.startsWith("sqlite://")
  ? databaseUrl.replace("sqlite://", "")
  : databaseUrl;
const databasePath = path.isAbsolute(rawDatabasePath)
  ? rawDatabasePath
  : path.resolve(__dirname, "../..", rawDatabasePath);

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const db = new DatabaseSync(databasePath);
db.exec("PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");

export function uid() {
  return randomUUID();
}

function now() {
  return new Date().toISOString();
}

function envFlag(name) {
  return ["1", "true", "yes", "on"].includes(String(process.env[name] || "").toLowerCase());
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
      countryCode TEXT,
      company TEXT,
      projectType TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
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
    CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_messages(email);
    CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
    CREATE INDEX IF NOT EXISTS idx_contact_project_type ON contact_messages(projectType);
    CREATE INDEX IF NOT EXISTS idx_service_created ON service_requests(createdAt);
    CREATE INDEX IF NOT EXISTS idx_project_created ON project_inquiries(createdAt);
    CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
    CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback(createdAt);
  `);
}

function migrateContactLeadColumns() {
  const columns = db.prepare("PRAGMA table_info(contact_messages)").all();
  const existing = new Set(columns.map((column) => column.name));
  const additions = [
    ["countryCode", "TEXT"],
    ["company", "TEXT"],
    ["projectType", "TEXT"],
  ];

  additions.forEach(([name, definition]) => {
    if (!existing.has(name)) {
      db.exec(`ALTER TABLE contact_messages ADD COLUMN ${name} ${definition}`);
    }
  });

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_messages(email);
    CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
    CREATE INDEX IF NOT EXISTS idx_contact_project_type ON contact_messages(projectType);
  `);

  db.prepare("UPDATE contact_messages SET status = 'new' WHERE status = 'New'").run();
  db.prepare("UPDATE contact_messages SET status = 'contacted' WHERE status IN ('Viewed', 'Replied')").run();
  db.prepare("UPDATE contact_messages SET status = 'closed' WHERE status = 'Closed'").run();
  db.prepare("UPDATE contact_messages SET projectType = COALESCE(projectType, subject) WHERE projectType IS NULL OR projectType = ''").run();
}

function hasExistingSchema() {
  const requiredTables = [
    "admin_users",
    "contact_messages",
    "service_requests",
    "project_inquiries",
    "newsletter_subscribers",
    "feedback",
    "activity_logs",
  ];
  const rows = db.prepare(`
    SELECT name FROM sqlite_master
    WHERE type = 'table' AND name IN (${requiredTables.map(() => "?").join(",")})
  `).all(...requiredTables);
  return rows.length === requiredTables.length;
}

function seedAdmin() {
  const count = db.prepare("SELECT COUNT(*) AS total FROM admin_users").get().total;
  const createdAt = now();
  const password = process.env.ADMIN_PASSWORD || "Admin@123";
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const name = process.env.ADMIN_NAME || "Admin";
  const passwordHash = bcrypt.hashSync(password, 12);

  if (count > 0) {
    if (!envFlag("ADMIN_RESET_PASSWORD_ON_START")) return;

    const updatedAt = now();
    const existingAdmin = db.prepare("SELECT id FROM admin_users WHERE email = ?").get(email.toLowerCase());
    if (existingAdmin) {
      db.prepare("UPDATE admin_users SET name = ?, passwordHash = ?, updatedAt = ? WHERE id = ?")
        .run(name, passwordHash, updatedAt, existingAdmin.id);
      console.log(`Admin password reset for ${email}`);
      return;
    }

    db.prepare(`
      INSERT INTO admin_users (id, name, email, passwordHash, role, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, 'admin', ?, ?)
    `).run(uid(), name, email.toLowerCase(), passwordHash, updatedAt, updatedAt);

    console.log(`Admin account created for ${email}`);
    return;
  }

  db.prepare(`
    INSERT INTO admin_users (id, name, email, passwordHash, role, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, 'admin', ?, ?)
  `).run(uid(), name, email.toLowerCase(), passwordHash, createdAt, createdAt);

  console.log(`Default admin created for ${email}`);
}

export function initDatabase() {
  const schemaExists = hasExistingSchema();

  if (!schemaExists) {
    createTables();
  }

  try {
    migrateContactLeadColumns();
  } catch (error) {
    if (!process.env.MONGODB_URI) throw error;
    console.warn("Contact lead SQLite migration skipped. MongoDB lead storage will be used.");
  }

  try {
    seedAdmin();
  } catch (error) {
    console.warn("Admin seed/reset write failed. Existing admin records will be used.");
  }

  console.log("Database connected successfully");
}
