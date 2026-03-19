import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ─────────────────────────────────────────
   Brand Philosophy — Cinematic High-Impact Typography
───────────────────────────────────────── */
export function BrandPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Scroll-driven parallax & opacity ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y       = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.85]);

  /* ── Animation tokens ── */
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const lines = [
    "Delivering thoughtful digital systems",
    "with structure, flow, and interaction.",
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      scale: 1.06,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-black overflow-hidden px-6 py-28"
    >
      {/* ── Noise overlay ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025]">
        <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      {/* ── Organic moving white glow blob ── */}
      <motion.div
        className="absolute pointer-events-none z-[2]"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 62%)",
        }}
        animate={isMobile ? {} : {
          x: ["0px", "120px", "-80px", "60px", "0px"],
          y: ["0px", "-80px", "60px", "-40px", "0px"],
          scale: [1, 1.08, 0.96, 1.06, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Soft static radial lift under text ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[900px] mx-auto text-center"
      >
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="flex flex-col items-center gap-2 font-semibold text-white tracking-[-0.02em] leading-[1.05]"
          style={{ fontFamily: "'Clash Display', 'Satoshi', 'Syne', sans-serif" }}
        >
          {lines.map((line, i) => (
            <motion.span
              key={i}
              variants={lineVariants}
              className="block text-[clamp(2.2rem,6vw,4.75rem)] md:text-[clamp(2.8rem,6.5vw,5.5rem)]"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {line}
            </motion.span>
          ))}
        </motion.h2>
      </motion.div>
    </section>
  );
}

