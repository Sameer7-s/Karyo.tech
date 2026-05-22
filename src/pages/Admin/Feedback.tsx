import { RecordsPage } from "./RecordsPage";

export default function Feedback() {
  return <RecordsPage config={{
    title: "Feedback",
    apiPath: "/admin/feedback",
    deletePath: (id) => `/admin/feedback/${id}`,
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "rating", label: "Rating" },
      { key: "message", label: "Message" },
      { key: "approved", label: "Approved", type: "boolean" },
      { key: "createdAt", label: "Date", type: "date" },
    ],
    searchPlaceholder: "Search name, email",
    filters: [{ key: "approved", label: "Visibility", options: ["approved", "hidden"] }],
    approvePath: (id) => `/admin/feedback/${id}/approve`,
    csvName: "feedback.csv",
  }} />;
}
