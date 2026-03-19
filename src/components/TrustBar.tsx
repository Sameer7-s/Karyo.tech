import { motion } from "motion/react";

const metrics = [
  { value: "15+", label: "Projects Delivered" },
  { value: "3", label: "Countries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "AI Systems Live" },
];

export function TrustBar() {
  return (
    <section className="w-full bg-black border-y border-white/[0.06] py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={`flex flex-col items-center text-center ${
                i < metrics.length - 1 ? "md:border-r md:border-white/[0.06]" : ""
              }`}
            >
              <span
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {metric.value}
              </span>
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
