import { FormEvent, useEffect, useState } from "react";
import { Lock, Mail, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/common/Toast";
import { KARYO_EMAIL } from "../../constants/contact";
import { LoginBackground } from "./LoginBackground";

const REMEMBER_EMAIL_KEY = "karyo_admin_remember_email";

export default function AdminLogin() {
  const { admin, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    document.body.classList.add("admin-surface");
    const saved = localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
    return () => document.body.classList.remove("admin-surface");
  }, []);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      if (rememberMe) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim());
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
      showToast("Login successful", "success");
      const target =
        (location.state as { from?: { pathname?: string } } | null)?.from
          ?.pathname || "/admin/dashboard";
      navigate(target, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPassword() {
    showToast(`Contact ${KARYO_EMAIL} to reset your admin password.`, "info");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12 font-sans text-white">
      <LoginBackground />

      <div className="relative z-10 w-full max-w-[440px] rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 transition-opacity duration-500">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]">
            <ShieldCheck className="h-7 w-7 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-[0.2em] text-white md:text-3xl">
            Admin Login
          </h1>
          <p className="mt-2 max-w-[280px] text-sm text-white/55">
            Secure access to manage website submissions and activity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-email"
              className="text-xs font-semibold uppercase tracking-wider text-white/60"
            >
              Email
            </label>
            <div className="flex h-12 items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 transition-colors duration-200 focus-within:border-white/35">
              <Mail className="mr-3 h-5 w-5 shrink-0 text-white/40" strokeWidth={1.5} />
              <input
                id="admin-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-password"
              className="text-xs font-semibold uppercase tracking-wider text-white/60"
            >
              Password
            </label>
            <div className="relative flex h-12 items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 transition-colors duration-200 focus-within:border-white/35">
              <Lock className="mr-3 h-5 w-5 shrink-0 text-white/40" strokeWidth={1.5} />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent pr-10 text-sm text-white outline-none placeholder:text-white/30"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 text-white/45 transition-colors hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-white/25 bg-black accent-white"
              />
              <span className="text-white/60">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-white/60 transition-colors hover:text-white"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition-opacity duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span>Logging in…</span>
            ) : (
              <>
                <span className="uppercase tracking-wider">Login</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] leading-relaxed text-white/35">
          Protected admin access. Unauthorized users are not allowed.
        </p>
      </div>
    </main>
  );
}
