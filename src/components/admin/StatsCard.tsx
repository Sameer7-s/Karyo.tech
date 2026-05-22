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
      <Link to={to} className="block rounded-lg border border-white/10 bg-[#111827] p-5 shadow-xl shadow-black/20 transition hover:border-[#9D80CB]/40">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#9D80CB]/15 text-[#F6C4ED]">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs text-emerald-300">Live</span>
        </div>
        <p className="text-3xl font-semibold text-white">{value}</p>
        <p className="mt-1 text-sm font-medium text-white/80">{label}</p>
        <p className="mt-2 text-xs leading-5 text-white/45">{description}</p>
      </Link>
    </motion.div>
  );
}
