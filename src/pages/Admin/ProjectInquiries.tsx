import { RecordsPage } from "./RecordsPage";

export default function ProjectInquiries() {
  return <RecordsPage config={{
    title: "Project Inquiries",
    apiPath: "/admin/project-inquiries",
    deletePath: (id) => `/admin/project-inquiries/${id}`,
    columns: [
      { key: "clientName", label: "Client Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "projectTitle", label: "Project Title" },
      { key: "projectCategory", label: "Category" },
      { key: "budgetRange", label: "Budget Range" },
      { key: "deadline", label: "Deadline" },
      { key: "status", label: "Status", type: "status" },
      { key: "createdAt", label: "Date", type: "date" },
    ],
    searchPlaceholder: "Search client, title, email",
    filters: [
      { key: "projectCategory", label: "Category", options: ["Website", "AI Project", "SaaS Application", "Mobile App", "Dashboard", "Automation Tool", "Other"] },
      { key: "status", label: "Status", options: ["New", "In Review", "Contacted", "In Progress", "Completed", "Rejected"] },
    ],
    statusOptions: ["New", "In Review", "Contacted", "In Progress", "Completed", "Rejected"],
    statusPath: (id) => `/admin/project-inquiries/${id}/status`,
    csvName: "project-inquiries.csv",
  }} />;
}
