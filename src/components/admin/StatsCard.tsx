import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type StatsCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  description: string;
  to: string;
};

export function StatsCard({ icon: Icon, label, value, description, to }: StatsCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        to={to}
        className="group relative block overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-[18px] transition hover:border-white/30 hover:bg-white/[0.07]"
      >
        <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-60" />
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-black/35 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Icon className="h-5 w-5" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/55">Live</span>
        </div>
        <p className="font-orbitron text-3xl font-semibold text-white">{value}</p>
        <p className="mt-1 text-sm font-medium uppercase tracking-normal text-white/80">{label}</p>
        <p className="mt-2 text-xs leading-5 text-white/45">{description}</p>
      </Link>
    </motion.div>
  );
}
