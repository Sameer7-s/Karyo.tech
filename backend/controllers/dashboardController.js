import { db } from "../config/db.js";
import { ok } from "../utils/helpers.js";

function count(sql, ...values) {
  return db.prepare(sql).get(...values).total;
}

export function dashboardStats(_req, res, next) {
  try {
    const totalContacts = count("SELECT COUNT(*) AS total FROM contact_messages");
    const totalServiceRequests = count("SELECT COUNT(*) AS total FROM service_requests");
    const totalProjectInquiries = count("SELECT COUNT(*) AS total FROM project_inquiries");
    const totalSubscribers = count("SELECT COUNT(*) AS total FROM newsletter_subscribers");
    const totalFeedback = count("SELECT COUNT(*) AS total FROM feedback");
    const newMessages = count("SELECT COUNT(*) AS total FROM contact_messages WHERE status = 'New'");
    const pendingRequests = count("SELECT COUNT(*) AS total FROM service_requests WHERE status IN ('New', 'In Review', 'Contacted', 'In Progress')");
    const completedProjects = count("SELECT COUNT(*) AS total FROM project_inquiries WHERE status = 'Completed'");

    const recentActivities = db.prepare("SELECT * FROM activity_logs ORDER BY createdAt DESC LIMIT 8").all();
    const recentContacts = db.prepare("SELECT * FROM contact_messages ORDER BY createdAt DESC LIMIT 5").all();
    const recentServiceRequests = db.prepare("SELECT * FROM service_requests ORDER BY createdAt DESC LIMIT 5").all();

    const monthlySubmissions = db.prepare(`
      SELECT month, SUM(total) AS total FROM (
        SELECT strftime('%Y-%m', createdAt) AS month, COUNT(*) AS total FROM contact_messages GROUP BY month
        UNION ALL
        SELECT strftime('%Y-%m', createdAt) AS month, COUNT(*) AS total FROM service_requests GROUP BY month
        UNION ALL
        SELECT strftime('%Y-%m', createdAt) AS month, COUNT(*) AS total FROM project_inquiries GROUP BY month
      )
      GROUP BY month
      ORDER BY month DESC
      LIMIT 6
    `).all().reverse();

    const statusDistribution = db.prepare(`
      SELECT status, COUNT(*) AS total FROM service_requests GROUP BY status
    `).all();

    const serviceTypeDistribution = db.prepare(`
      SELECT serviceType AS name, COUNT(*) AS total FROM service_requests GROUP BY serviceType
    `).all();

    ok(res, {
      totalContacts,
      totalServiceRequests,
      totalProjectInquiries,
      totalSubscribers,
      totalFeedback,
      newMessages,
      pendingRequests,
      completedProjects,
      recentActivities,
      recentContacts,
      recentServiceRequests,
      monthlySubmissions,
      statusDistribution,
      serviceTypeDistribution,
    });
  } catch (error) {
    next(error);
  }
}
