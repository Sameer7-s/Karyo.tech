import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FolderKanban, Mail, MessageSquareText, Newspaper, Sparkles, TimerReset } from "lucide-react";
import { adminApi, DashboardStats } from "../../api/adminApi";
import { StatsCard } from "../../components/admin/StatsCard";
import { EmptyState, Loader } from "../../components/common/Loader";
import { useToast } from "../../components/common/Toast";
import { formatDate } from "../../utils/formatDate";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    adminApi.dashboard()
      .then(setStats)
      .catch((error) => showToast(error instanceof Error ? error.message : "Dashboard failed to load", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  if (loading) return <Loader label="Loading dashboard" />;
  if (!stats) return <EmptyState message="Something went wrong. Please try again." />;

  const cards = [
    { icon: Mail, label: "Total Contacts", value: stats.totalContacts, description: `${stats.newMessages} new messages need attention`, to: "/admin/contacts" },
    { icon: MessageSquareText, label: "Service Requests", value: stats.totalServiceRequests, description: `${stats.pendingRequests} open service conversations`, to: "/admin/service-requests" },
    { icon: FolderKanban, label: "Project Inquiries", value: stats.totalProjectInquiries, description: `${stats.completedProjects} completed project inquiries`, to: "/admin/project-inquiries" },
    { icon: Newspaper, label: "Subscribers", value: stats.totalSubscribers, description: "Newsletter audience stored in database", to: "/admin/newsletter" },
    { icon: Sparkles, label: "Feedback", value: stats.totalFeedback, description: "Testimonials awaiting approval or review", to: "/admin/feedback" },
    { icon: TimerReset, label: "Pending Tasks", value: stats.pendingRequests + stats.newMessages, description: "Combined open contacts and requests", to: "/admin/service-requests" },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Welcome back, Admin</h2>
        <p className="mt-2 text-sm text-white/45">Here is what is happening on your website today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label}>
            <StatsCard {...card} />
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-[#111827] p-5">
          <h3 className="mb-4 font-semibold text-white">Monthly submissions</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlySubmissions}>
                <defs>
                  <linearGradient id="submissions" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#9D80CB" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#9D80CB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0B0F19", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="total" stroke="#F6C4ED" fill="url(#submissions)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#111827] p-5">
          <h3 className="mb-4 font-semibold text-white">Service type distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.serviceTypeDistribution}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" fontSize={11} interval={0} angle={-18} textAnchor="end" height={72} />
                <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0B0F19", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8 }} />
                <Bar dataKey="total" fill="#9D80CB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Recent contacts" items={stats.recentContacts.map((item) => ({ title: String(item.name), meta: `${item.email} - ${formatDate(String(item.createdAt))}` }))} />
        <Panel title="Recent service requests" items={stats.recentServiceRequests.map((item) => ({ title: String(item.fullName), meta: `${item.serviceType} - ${formatDate(String(item.createdAt))}` }))} />
        <Panel title="Recent activity" items={stats.recentActivities.map((item) => ({ title: item.action, meta: `${item.performedBy} - ${formatDate(item.createdAt)}` }))} />
      </div>
    </section>
  );
}

function Panel({ title, items }: { title: string; items: { title: string; meta: string }[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#111827] p-5">
      <h3 className="mb-4 font-semibold text-white">{title}</h3>
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="rounded-md border border-white/10 bg-white/[0.03] p-3">
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="mt-1 text-xs text-white/40">{item.meta}</p>
            </div>
          ))}
        </div>
      ) : <EmptyState message="No records found." />}
    </div>
  );
}
