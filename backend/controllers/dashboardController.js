import { db } from "../config/db.js";
import { connectMongo, useMongoLeads } from "../config/mongo.js";
import { Lead } from "../models/Lead.js";
import { ok } from "../utils/helpers.js";

function count(sql, ...values) {
  return db.prepare(sql).get(...values).total;
}

function monthKey(date) {
  return date.toISOString().slice(0, 7);
}

async function mongoLeadStats() {
  await connectMongo();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [totalContacts, newMessages, recentContacts, monthlyRows, statusDistribution, serviceTypeDistribution] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" }),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    Lead.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, total: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, month: "$_id", total: 1 } },
    ]),
    Lead.aggregate([{ $group: { _id: "$status", total: { $sum: 1 } } }, { $project: { _id: 0, status: "$_id", total: 1 } }]),
    Lead.aggregate([{ $group: { _id: "$projectType", total: { $sum: 1 } } }, { $project: { _id: 0, name: "$_id", total: 1 } }]),
  ]);

  return {
    totalContacts,
    newMessages,
    recentContacts: recentContacts.map(({ _id, ...lead }) => ({
      ...lead,
      createdAt: lead.createdAt?.toISOString?.() || lead.createdAt,
      updatedAt: lead.updatedAt?.toISOString?.() || lead.updatedAt,
    })),
    monthlySubmissions: monthlyRows.length ? monthlyRows : [{ month: monthKey(new Date()), total: 0 }],
    statusDistribution,
    serviceTypeDistribution,
  };
}

export async function dashboardStats(_req, res, next) {
  try {
    const leadStats = useMongoLeads() ? await mongoLeadStats() : null;
    const totalContacts = leadStats?.totalContacts ?? count("SELECT COUNT(*) AS total FROM contact_messages");
    const totalServiceRequests = count("SELECT COUNT(*) AS total FROM service_requests");
    const totalProjectInquiries = count("SELECT COUNT(*) AS total FROM project_inquiries");
    const totalSubscribers = count("SELECT COUNT(*) AS total FROM newsletter_subscribers");
    const totalFeedback = count("SELECT COUNT(*) AS total FROM feedback");
    const newMessages = leadStats?.newMessages ?? count("SELECT COUNT(*) AS total FROM contact_messages WHERE status = 'new'");
    const pendingRequests = count("SELECT COUNT(*) AS total FROM service_requests WHERE status IN ('New', 'In Review', 'Contacted', 'In Progress')");
    const completedProjects = count("SELECT COUNT(*) AS total FROM project_inquiries WHERE status = 'Completed'");

    const recentActivities = db.prepare("SELECT * FROM activity_logs ORDER BY createdAt DESC LIMIT 8").all();
    const recentContacts = leadStats?.recentContacts ?? db.prepare("SELECT * FROM contact_messages ORDER BY createdAt DESC LIMIT 5").all();
    const recentServiceRequests = db.prepare("SELECT * FROM service_requests ORDER BY createdAt DESC LIMIT 5").all();

    const monthlySubmissions = leadStats?.monthlySubmissions ?? db.prepare(`
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

    const statusDistribution = leadStats?.statusDistribution ?? db.prepare(`
      SELECT status, COUNT(*) AS total FROM contact_messages GROUP BY status
    `).all();

    const serviceTypeDistribution = leadStats?.serviceTypeDistribution ?? db.prepare(`
      SELECT COALESCE(projectType, subject, 'Website Inquiry') AS name, COUNT(*) AS total FROM contact_messages GROUP BY name
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
