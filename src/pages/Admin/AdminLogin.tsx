import { FormEvent, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Lock, Mail, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/common/Toast";
import { LoginBackground } from "./LoginBackground";

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
    return () => document.body.classList.remove("admin-surface");
  }, []);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      showToast("Login successful", "success");
      const target = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/admin/dashboard";
      navigate(target, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white font-sans relative overflow-hidden">
      {/* Background Component */}
      <LoginBackground />

      {/* Floating Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px] md:max-w-[480px] rounded-[32px] bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.12] p-8 md:p-10"
        style={{
          boxShadow: "0 0 40px rgba(255,255,255,0.05), 0 0 120px rgba(255,255,255,0.02)",
        }}
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

        <div className="flex flex-col items-center text-center mb-10">
          {/* Futuristic Shield Icon */}
          <div className="relative flex items-center justify-center w-20 h-20 mb-6 group">
            {/* Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/20 border-t-white/80"
            />
            {/* Outer Glow Pulse */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-white/5 blur-md"
            />
            {/* Floating Shield */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-black/50 p-3 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-[6px] md:tracking-[10px] uppercase text-white font-orbitron">
            ADMIN LOGIN
          </h1>
          <p className="mt-3 text-sm text-white/60 font-exo max-w-[280px]">
            Secure access to manage website submissions and activity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
          
          {/* Email Input */}
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-semibold tracking-wider text-white/60 font-orbitron uppercase">
              Email
            </label>
            <div className="relative flex items-center bg-white/[0.02] border border-white/[0.08] h-[58px] rounded-2xl px-5 transition-all duration-300 focus-within:border-white/50 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <Mail className="w-5 h-5 text-white/40 mr-4" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25 font-exo"
                placeholder="admin@example.com"
                required
              />
              <div className="flex items-center gap-1 opacity-40 ml-2">
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-semibold tracking-wider text-white/60 font-orbitron uppercase">
              Password
            </label>
            <div className="relative flex items-center bg-white/[0.02] border border-white/[0.08] h-[58px] rounded-2xl px-5 transition-all duration-300 focus-within:border-white/50 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <Lock className="w-5 h-5 text-white/40 mr-4" strokeWidth={1.5} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25 font-exo pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between mt-1 text-xs md:text-sm font-exo">
            <label className="flex items-center gap-2 cursor-pointer group/cb">
              <div className="relative flex items-center justify-center w-4 h-4 border border-white/20 rounded-sm bg-black/50 transition-colors group-hover/cb:border-white/50">
                {rememberMe && <motion.div initial={{scale: 0}} animate={{scale: 1}} className="w-2 h-2 bg-white rounded-[1px]" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <span className="text-white/60 group-hover/cb:text-white/90 uppercase tracking-widest text-[10px] md:text-xs font-semibold mt-[2px] transition-colors">
                Remember Me
              </span>
            </label>
            <button type="button" className="text-white/60 hover:text-white/90 uppercase tracking-widest text-[10px] md:text-xs font-semibold transition-colors mt-[2px]">
              Forgot Password?
            </button>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200 font-exo text-center backdrop-blur-md">
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            disabled={loading}
            className="group relative flex w-full items-center justify-center h-[58px] rounded-2xl overflow-hidden mt-4 disabled:opacity-70 transition-all duration-300 hover:-translate-y-[2px] active:scale-[0.98]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.65))",
              boxShadow: "0 10px 30px rgba(255,255,255,0.12)",
            }}
          >
            {/* Button Inner Hover Glow */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full" />
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-black font-semibold tracking-[4px] font-orbitron uppercase text-sm mt-[2px]">
                  Login
                </span>
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-8 flex flex-col items-center">
           <div className="w-full flex items-center justify-center gap-4 mb-4">
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20" />
             <div className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center bg-white/[0.02]">
                <Lock className="w-3 h-3 text-white/40" />
             </div>
             <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20" />
           </div>
           <p className="text-[11px] md:text-xs text-white/40 text-center font-exo tracking-wider uppercase">
             Protected admin access.<br/>Unauthorized users are not allowed.
           </p>
        </div>
      </motion.div>

      {/* Bottom Secure Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-white/50" />
          <span className="text-[10px] text-white/50 tracking-widest uppercase font-orbitron">256-BIT SSL ENCRYPTION</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/50 tracking-widest uppercase font-orbitron">SECURE CONNECTION</span>
          <div className="flex items-end gap-[2px] h-3">
             <div className="w-[3px] h-[40%] bg-white/30" />
             <div className="w-[3px] h-[60%] bg-white/50" />
             <div className="w-[3px] h-[80%] bg-white/70" />
             <div className="w-[3px] h-[100%] bg-white" />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
