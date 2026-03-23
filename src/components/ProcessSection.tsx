import { motion } from "motion/react";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We immerse ourselves in your business, audience, and goals — uncovering insights that shape every decision ahead.",
  },
  {
    id: "02",
    title: "Strategy",
    description:
      "We define the roadmap — aligning brand positioning, technical architecture, and creative direction into a clear plan.",
  },
  {
    id: "03",
    title: "Design & Build",
    description:
      "Pixel-perfect interfaces meet robust engineering. We design and develop in parallel for speed and precision.",
  },
  {
    id: "04",
    title: "Launch & Scale",
    description:
      "We deploy, monitor, and iterate. From launch day onward, your product is built to grow and adapt.",
  },
];

export function ProcessSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 md:py-28 lg:py-40 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-20 lg:mb-28"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/30 block mb-4">
            How We Work
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1] text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Our Process
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group relative border-t border-white/[0.06] pt-8 pb-12 md:pr-10 lg:border-t-0 lg:border-l lg:border-white/[0.06] lg:pl-8 lg:pr-6 first:lg:border-l-0 first:lg:pl-0"
            >
              {/* Step Number */}
              <span className="text-xs font-medium text-white/20 tracking-widest block mb-6 group-hover:text-white/50 transition-colors duration-500">
                {step.id}
              </span>

              {/* Connecting dot */}
              <div className="hidden lg:block absolute top-0 -left-[5px] first:hidden w-[9px] h-[9px] rounded-full bg-white/10 group-hover:bg-white/40 transition-colors duration-500 border-2 border-black" />

              <h3
                className="text-2xl md:text-3xl font-semibold tracking-tight text-white/90 mb-4 group-hover:text-white transition-colors duration-500"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm md:text-[15px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
