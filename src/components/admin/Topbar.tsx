import { Bell, LogOut, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function Topbar({ title, onLogout }: { title: string; onLogout: () => void }) {
  const { admin } = useAuth();
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0F19]/85 backdrop-blur-xl">
      <div className="flex min-h-16 flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <div className="pl-12 lg:pl-0">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          <p className="mt-1 text-xs text-white/40">{time.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/35 md:flex">
            <Search className="h-4 w-4" />
            Page search is inside each table
          </div>
          <button className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#9D80CB] text-sm font-bold text-white">
              {admin?.name?.slice(0, 1) || "A"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">{admin?.name || "Admin"}</p>
              <p className="text-xs text-white/40">{admin?.role}</p>
            </div>
          </div>
          <button onClick={onLogout} className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-white/60 hover:bg-rose-500/10 hover:text-rose-200" aria-label="Logout">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
