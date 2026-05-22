import { RecordsPage } from "./RecordsPage";

export default function Contacts() {
  return <RecordsPage config={{
    title: "Contact Messages",
    apiPath: "/admin/contacts",
    deletePath: (id) => `/admin/contacts/${id}`,
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "subject", label: "Subject" },
      { key: "status", label: "Status", type: "status" },
      { key: "createdAt", label: "Date", type: "date" },
    ],
    searchPlaceholder: "Search name, email, subject",
    filters: [{ key: "status", label: "Status", options: ["New", "Viewed", "Replied", "Closed"] }],
    statusOptions: ["New", "Viewed", "Replied", "Closed"],
    statusPath: (id) => `/admin/contacts/${id}/status`,
    csvName: "contact-messages.csv",
  }} />;
}
