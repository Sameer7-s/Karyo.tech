import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Sidebar } from "../../components/admin/Sidebar";
import { Topbar } from "../../components/admin/Topbar";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/common/Toast";
import { LoginBackground } from "./LoginBackground";

const titles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/contacts": "Contact Messages",
  "/admin/service-requests": "Service Requests",
  "/admin/project-inquiries": "Project Inquiries",
  "/admin/newsletter": "Newsletter Subscribers",
  "/admin/feedback": "Feedback",
  "/admin/settings": "Settings",
};

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const title = useMemo(() => titles[location.pathname] || "Admin", [location.pathname]);

  async function handleLogout() {
    await logout();
    showToast("Logout successful", "success");
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      <LoginBackground />
      <Sidebar open={open} setOpen={setOpen} onLogout={handleLogout} />
      <div className="relative z-10 lg:pl-72">
        <Topbar title={title} onLogout={handleLogout} />
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-[calc(100vh-5rem)] p-4 font-exo lg:p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
