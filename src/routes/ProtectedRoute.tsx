import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader label="Verifying admin session" />;
  if (!admin) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return <Outlet />;
}
