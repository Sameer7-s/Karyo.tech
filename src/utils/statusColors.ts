export function statusTone(value: string) {
  const status = value.toLowerCase();
  if (["completed", "active", "replied", "approved"].some((item) => status.includes(item))) return "text-emerald-300 bg-emerald-500/10 border-emerald-400/20";
  if (["new", "in review", "viewed", "medium"].some((item) => status.includes(item))) return "text-sky-300 bg-sky-500/10 border-sky-400/20";
  if (["progress", "contacted", "high"].some((item) => status.includes(item))) return "text-amber-300 bg-amber-500/10 border-amber-400/20";
  if (["rejected", "closed", "unsubscribed", "hidden"].some((item) => status.includes(item))) return "text-rose-300 bg-rose-500/10 border-rose-400/20";
  return "text-white/70 bg-white/5 border-white/10";
}
