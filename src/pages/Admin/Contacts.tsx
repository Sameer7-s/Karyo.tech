import { RecordsPage } from "./RecordsPage";

export default function Contacts() {
  return <RecordsPage config={{
    title: "Leads",
    apiPath: "/admin/contacts",
    deletePath: (id) => `/admin/contacts/${id}`,
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "company", label: "Company" },
      { key: "projectType", label: "Project Type" },
      { key: "status", label: "Status", type: "status" },
      { key: "createdAt", label: "Date", type: "date" },
    ],
    searchPlaceholder: "Search name, email, phone, company",
    filters: [
      { key: "status", label: "Status", options: ["new", "contacted", "closed"] },
      { key: "projectType", label: "Project Type", options: ["AI Automation", "AI Chatbot", "Workflow Automation", "Custom AI System"] },
    ],
    statusOptions: ["new", "contacted", "closed"],
    statusPath: (id) => `/admin/contacts/${id}/status`,
    csvName: "karyo-leads.csv",
  }} />;
}
