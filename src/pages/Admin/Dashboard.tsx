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
      <div className="relative overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.04] p-6 backdrop-blur-[22px] shadow-[0_0_60px_rgba(255,255,255,0.04)]">
        <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-normal text-white/45">Secure admin access</p>
            <h2 className="font-orbitron text-2xl font-semibold uppercase tracking-normal text-white md:text-3xl">Welcome back, Admin</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">Live submissions, requests, and activity from the website are ready for review.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Metric label="New messages" value={stats.newMessages} />
            <Metric label="Pending tasks" value={stats.pendingRequests + stats.newMessages} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label}>
            <StatsCard {...card} />
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className={panelClass}>
          <h3 className="mb-4 font-orbitron font-semibold uppercase tracking-normal text-white">Monthly submissions</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlySubmissions}>
                <defs>
                  <linearGradient id="submissions" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="total" stroke="#ffffff" fill="url(#submissions)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={panelClass}>
          <h3 className="mb-4 font-orbitron font-semibold uppercase tracking-normal text-white">Service type distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.serviceTypeDistribution}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" fontSize={11} interval={0} angle={-18} textAnchor="end" height={72} />
                <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="total" fill="rgba(255,255,255,0.82)" radius={[6, 6, 0, 0]} />
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

const panelClass = "relative overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-[18px] before:absolute before:left-6 before:right-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent";

const tooltipStyle = {
  background: "rgba(0,0,0,0.86)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: 8,
  color: "#fff",
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right backdrop-blur-xl">
      <p className="font-orbitron text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-normal text-white/45">{label}</p>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: { title: string; meta: string }[] }) {
  return (
    <div className={panelClass}>
      <h3 className="mb-4 font-orbitron font-semibold uppercase tracking-normal text-white">{title}</h3>
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="rounded-lg border border-white/10 bg-black/25 p-3">
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="mt-1 text-xs text-white/40">{item.meta}</p>
            </div>
          ))}
        </div>
      ) : <EmptyState message="No records found." />}
    </div>
  );
}
