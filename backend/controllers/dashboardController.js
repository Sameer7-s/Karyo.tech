import { db } from "../config/db.js";
import { connectMongo, useMongoLeads } from "../config/mongo.js";
import { Lead } from "../models/Lead.js";
import { ok } from "../utils/helpers.js";

const emptyLeadStats = {
  totalLeads: 0,
  newLeads: 0,
  contactedLeads: 0,
  closedLeads: 0,
  recentLeads: [],
  monthlySubmissions: [],
  statusDistribution: [],
  serviceTypeDistribution: [],
};

function count(sql, ...values) {
  return db.prepare(sql).get(...values).total;
}

function safeCount(sql, fallback = 0, ...values) {
  try {
    return count(sql, ...values);
  } catch (error) {
    console.warn("Dashboard count query failed:", error.message);
    return fallback;
  }
}

function safeRows(sql, fallback = [], ...values) {
  try {
    return db.prepare(sql).all(...values);
  } catch (error) {
    console.warn("Dashboard list query failed:", error.message);
    return fallback;
  }
}

function monthKey(date) {
  return date.toISOString().slice(0, 7);
}

function toIsoDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function summarizeRecentLeads(leads) {
  const monthly = new Map();
  const projectTypes = new Map();

  leads.forEach((lead) => {
    const createdAt = toIsoDate(lead.createdAt);
    if (createdAt) {
      const month = monthKey(createdAt);
      monthly.set(month, (monthly.get(month) || 0) + 1);
    }

    const projectType = lead.projectType || lead.subject || "Website Inquiry";
    projectTypes.set(projectType, (projectTypes.get(projectType) || 0) + 1);
  });

  return {
    monthlySubmissions: Array.from(monthly.entries())
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month)),
    serviceTypeDistribution: Array.from(projectTypes.entries()).map(([name, total]) => ({ name, total })),
  };
}

async function mongoLeadStats() {
  await connectMongo();

  const [
    totalLeads,
    newLeads,
    contactedLeads,
    closedLeads,
    recentLeads,
  ] = await Promise.all([
    Lead.countDocuments({}),
    Lead.countDocuments({ status: "new" }),
    Lead.countDocuments({ status: "contacted" }),
    Lead.countDocuments({ status: "closed" }),
    Lead.find().sort({ createdAt: -1 }).limit(100).lean(),
  ]);

  const serializedRecentLeads = recentLeads.map(({ _id, ...lead }) => ({
    ...lead,
    createdAt: lead.createdAt?.toISOString?.() || lead.createdAt,
    updatedAt: lead.updatedAt?.toISOString?.() || lead.updatedAt,
  }));
  const summaries = summarizeRecentLeads(serializedRecentLeads);

  return {
    totalLeads,
    newLeads,
    contactedLeads,
    closedLeads,
    recentLeads: serializedRecentLeads.slice(0, 5),
    monthlySubmissions: summaries.monthlySubmissions.length ? summaries.monthlySubmissions : [{ month: monthKey(new Date()), total: 0 }],
    statusDistribution: [
      { status: "new", total: newLeads },
      { status: "contacted", total: contactedLeads },
      { status: "closed", total: closedLeads },
    ],
    serviceTypeDistribution: summaries.serviceTypeDistribution,
  };
}

async function safeMongoLeadStats() {
  if (!useMongoLeads()) return null;
  try {
    return await mongoLeadStats();
  } catch (error) {
    console.error("Mongo dashboard stats failed:", error);
    return { ...emptyLeadStats };
  }
}

export async function dashboardStats(_req, res, next) {
  try {
    const leadStats = await safeMongoLeadStats();
    const totalLeads = leadStats?.totalLeads ?? safeCount("SELECT COUNT(*) AS total FROM contact_messages");
    const newLeads = leadStats?.newLeads ?? safeCount("SELECT COUNT(*) AS total FROM contact_messages WHERE status = 'new'");
    const contactedLeads = leadStats?.contactedLeads ?? safeCount("SELECT COUNT(*) AS total FROM contact_messages WHERE status = 'contacted'");
    const closedLeads = leadStats?.closedLeads ?? safeCount("SELECT COUNT(*) AS total FROM contact_messages WHERE status = 'closed'");
    const totalServiceRequests = safeCount("SELECT COUNT(*) AS total FROM service_requests");
    const totalProjectInquiries = safeCount("SELECT COUNT(*) AS total FROM project_inquiries");
    const totalSubscribers = safeCount("SELECT COUNT(*) AS total FROM newsletter_subscribers");
    const totalFeedback = safeCount("SELECT COUNT(*) AS total FROM feedback");
    const pendingRequests = safeCount("SELECT COUNT(*) AS total FROM service_requests WHERE status IN ('New', 'In Review', 'Contacted', 'In Progress')");
    const completedProjects = safeCount("SELECT COUNT(*) AS total FROM project_inquiries WHERE status = 'Completed'");

    const recentActivities = safeRows("SELECT * FROM activity_logs ORDER BY createdAt DESC LIMIT 8");
    const recentLeads = leadStats?.recentLeads ?? safeRows("SELECT * FROM contact_messages ORDER BY createdAt DESC LIMIT 5");
    const recentServiceRequests = safeRows("SELECT * FROM service_requests ORDER BY createdAt DESC LIMIT 5");

    const monthlySubmissions = leadStats?.monthlySubmissions ?? safeRows(`
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
    `).reverse();

    const statusDistribution = leadStats?.statusDistribution ?? safeRows(`
      SELECT status, COUNT(*) AS total FROM contact_messages GROUP BY status
    `);

    const serviceTypeDistribution = leadStats?.serviceTypeDistribution ?? safeRows(`
      SELECT COALESCE(projectType, subject, 'Website Inquiry') AS name, COUNT(*) AS total FROM contact_messages GROUP BY name
    `);

    ok(res, {
      totalLeads,
      newLeads,
      contactedLeads,
      closedLeads,
      recentLeads,
      totalContacts: totalLeads,
      totalServiceRequests,
      totalProjectInquiries,
      totalSubscribers,
      totalFeedback,
      newMessages: newLeads,
      pendingRequests,
      completedProjects,
      recentActivities,
      recentContacts: recentLeads,
      recentServiceRequests,
      monthlySubmissions: monthlySubmissions.length ? monthlySubmissions : [{ month: monthKey(new Date()), total: 0 }],
      statusDistribution,
      serviceTypeDistribution,
    });
  } catch (error) {
    console.error("Dashboard stats route failed:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load dashboard stats. Please try again.",
    });
  }
}
