import { RecordsPage } from "./RecordsPage";

export default function ServiceRequests() {
  return <RecordsPage config={{
    title: "Service Requests",
    apiPath: "/admin/service-requests",
    deletePath: (id) => `/admin/service-requests/${id}`,
    columns: [
      { key: "fullName", label: "Full Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "serviceType", label: "Service Type" },
      { key: "budget", label: "Budget" },
      { key: "timeline", label: "Timeline" },
      { key: "priority", label: "Priority", type: "status" },
      { key: "status", label: "Status", type: "status" },
      { key: "createdAt", label: "Date", type: "date" },
    ],
    searchPlaceholder: "Search name, email, service",
    filters: [
      { key: "status", label: "Status", options: ["New", "In Review", "Contacted", "In Progress", "Completed", "Rejected"] },
      { key: "priority", label: "Priority", options: ["Low", "Medium", "High"] },
    ],
    statusOptions: ["New", "In Review", "Contacted", "In Progress", "Completed", "Rejected"],
    statusPath: (id) => `/admin/service-requests/${id}/status`,
    priorityOptions: ["Low", "Medium", "High"],
    priorityPath: (id) => `/admin/service-requests/${id}/priority`,
    csvName: "service-requests.csv",
  }} />;
}
