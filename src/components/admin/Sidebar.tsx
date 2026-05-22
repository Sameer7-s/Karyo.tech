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
    <div className="flex h-full flex-col bg-[#0B0F19]">
      <div className="border-b border-white/10 p-5">
        <p className="text-xl font-bold tracking-tight text-white">Karyo Admin</p>
        <p className="mt-1 text-xs text-white/40">Operations cockpit</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-3 text-sm transition ${isActive ? "bg-[#9D80CB]/15 text-white ring-1 ring-[#9D80CB]/25" : "text-white/55 hover:bg-white/[0.06] hover:text-white"}`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-white/60 transition hover:bg-rose-500/10 hover:text-rose-200">
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
      <button onClick={() => setOpen(true)} className="fixed left-4 top-4 z-[99960] rounded-md border border-white/10 bg-[#111827] p-2 text-white lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 lg:block">
        <SidebarContent onLogout={onLogout} />
      </aside>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[99970] bg-black/70 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ duration: 0.25 }} className="h-full w-72 border-r border-white/10">
              <button onClick={() => setOpen(false)} className="absolute left-[19rem] top-4 rounded-md border border-white/10 bg-[#111827] p-2 text-white" aria-label="Close menu">
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
