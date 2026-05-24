import nodemailer from "nodemailer";

const notificationTo = process.env.LEAD_NOTIFICATION_EMAIL || "agency.karyo@gmail.com";

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function notifyLeadSubmission(lead) {
  if (!hasSmtpConfig()) return;

  const transporter = createTransporter();
  const lines = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", `${lead.countryCode || ""} ${lead.phone || ""}`.trim()],
    ["Company", lead.company || "-"],
    ["Project Type", lead.projectType || "-"],
    ["Message", lead.message],
    ["Submitted", lead.createdAt],
  ];

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: notificationTo,
    subject: `New KARYO lead: ${lead.name}`,
    text: lines.map(([label, value]) => `${label}: ${value}`).join("\n"),
  });
}
