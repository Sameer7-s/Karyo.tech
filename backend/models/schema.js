export const tables = {
  admins: "admin_users",
  contacts: "contact_messages",
  serviceRequests: "service_requests",
  projectInquiries: "project_inquiries",
  newsletter: "newsletter_subscribers",
  feedback: "feedback",
  activityLogs: "activity_logs",
};

export const statuses = {
  contact: ["new", "contacted", "closed"],
  request: ["New", "In Review", "Contacted", "In Progress", "Completed", "Rejected"],
  project: ["New", "In Review", "Contacted", "In Progress", "Completed", "Rejected"],
  newsletter: ["Active", "Unsubscribed"],
  priority: ["Low", "Medium", "High"],
};
