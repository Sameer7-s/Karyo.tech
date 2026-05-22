import { RecordsPage } from "./RecordsPage";

export default function Newsletter() {
  return <RecordsPage config={{
    title: "Newsletter Subscribers",
    apiPath: "/admin/newsletter",
    deletePath: (id) => `/admin/newsletter/${id}`,
    columns: [
      { key: "email", label: "Email" },
      { key: "status", label: "Status", type: "status" },
      { key: "subscribedAt", label: "Subscribed Date", type: "date" },
    ],
    searchPlaceholder: "Search email",
    filters: [{ key: "status", label: "Status", options: ["Active", "Unsubscribed"] }],
    csvName: "newsletter-subscribers.csv",
  }} />;
}
