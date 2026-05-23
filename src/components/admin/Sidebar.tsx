import { LayoutDashboard, Mail, MessageSquareText, Newspaper, FolderKanban, Settings, LogOut, Menu, X, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const items = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Contact Messages", to: "/admin/contacts", icon: Mail },
  { label: "Service Requests", to: "/admin/service-requests", icon: MessageSquareText },
  { label: "Project Inquiries", to: "/admin/project-inquiries", icon: FolderKanban },
  { label: "Newsletter", to: "/admin/newsletter", icon: Newspaper },
  { label: "Feedback", to: "/admin/feedback", icon: Sparkles },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function SidebarContent({ onLogout, onNavigate }: { onLogout: () => void; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col border-r border-white/[0.12] bg-black/45 font-exo backdrop-blur-[24px]">
      <div className="relative border-b border-white/[0.12] p-5">
        <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <p className="font-orbitron text-xl font-bold tracking-normal text-white">Karyo Admin</p>
        <p className="mt-1 text-xs uppercase tracking-normal text-white/45">Operations cockpit</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${isActive ? "border border-white/20 bg-white/[0.10] text-white shadow-[0_0_24px_rgba(255,255,255,0.06)]" : "border border-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"}`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg border border-white/10 px-3 py-3 text-sm text-white/60 transition hover:border-rose-300/30 hover:bg-rose-500/10 hover:text-rose-200">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ open, setOpen, onLogout }: { open: boolean; setOpen: (open: boolean) => void; onLogout: () => void }) {
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed left-4 top-4 z-[99960] rounded-lg border border-white/10 bg-black/70 p-2 text-white backdrop-blur-xl lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <SidebarContent onLogout={onLogout} />
      </aside>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[99970] bg-black/70 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ duration: 0.25 }} className="h-full w-72 border-r border-white/10">
              <button onClick={() => setOpen(false)} className="absolute left-[19rem] top-4 rounded-lg border border-white/10 bg-black/70 p-2 text-white backdrop-blur-xl" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onLogout={onLogout} onNavigate={() => setOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
