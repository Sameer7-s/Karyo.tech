import { motion } from "motion/react";
import { Zap, Palette, Brain } from "lucide-react";

const differentiators = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: "AI-Native Expertise",
    description:
      "We don't just design — we build intelligent systems. From automated workflows to AI-powered products, our approach starts with technology at its core.",
    accent: "rgba(255,255,255,0.7)",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Award-Level Design",
    description:
      "Every pixel is intentional. We craft interfaces that feel premium, perform flawlessly, and leave lasting impressions on users and stakeholders alike.",
    accent: "rgba(255,255,255,0.7)",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Speed & Precision",
    description:
      "We move fast without cutting corners. Rapid prototyping, parallel design-dev workflows, and a relentless focus on quality at every stage.",
    accent: "rgba(255,255,255,0.7)",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full bg-black py-28 md:py-40 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28 max-w-2xl"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/30 block mb-4">
            Why KARYO
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1] text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Built Different
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group relative p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-500 overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${item.accent}08 0%, transparent 70%)`,
                }}
              />

              {/* Top border highlight */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accent}40, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl border border-white/[0.08] flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110"
                style={{ color: item.accent }}
              >
                {item.icon}
              </div>

              <h3
                className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-sm md:text-[15px] leading-relaxed text-white/45 group-hover:text-white/65 transition-colors duration-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
