import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
} from "motion/react";
import { Navbar } from "./Navbar";
import { StudioFooter } from "./StudioFooter";

/* ═══════════════════════════════════════════
   DESIGN SYSTEM
═══════════════════════════════════════════ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const COLORS = {
  bg: "#000000",
  surface: "#0A0A0A",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
  textDim: "rgba(255,255,255,0.25)",
  border: "rgba(255,255,255,0.06)",
  glow: "rgba(255,255,255,0.03)",
};

/* Shared entry animation variant */
const fadeZoomIn = (delay = 0) => ({
  hidden: {
    opacity: 0,
    scale: 1.08,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay, ease: EASE },
  },
});

/* ═══════════════════════════════════════════
   1. HERO — IMMERSIVE INTRO
═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: COLORS.bg }}
    >
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep dark radial shadow behind text — like the KARYO® footer glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(20,20,25,0.98) 0%, rgba(10,10,12,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)",
          }}
        />
        {/* Outer ambient pulse */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)",
          }}
        />
      </div>



      <motion.div
        style={{ y: parallaxY, opacity: opacityFade }}
        className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center"
      >
        {/* Label removed */}

        {/* Heading */}
        <motion.h1
          variants={fadeZoomIn(0.15)}
          initial="hidden"
          animate="visible"
          className="font-bold leading-[1.05] tracking-[-0.02em] mb-8"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
          }}
        >
          We Design.
          <br />
          We Build.
          <br />
          We Scale.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeZoomIn(0.35)}
          initial="hidden"
          animate="visible"
          className="text-base md:text-xl leading-relaxed max-w-[600px] mx-auto"
          style={{
            color: COLORS.textMuted,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Crafting high-performance digital experiences through design,
          engineering, and strategy.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <span
            className="text-[9px] uppercase tracking-[0.3em] font-medium"
            style={{ color: COLORS.textDim }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. STORY — CINEMATIC SPLIT
═══════════════════════════════════════════ */
const storyBlocks = [
  "We work at the intersection of design and engineering.",
  "Blending strategy, aesthetics, and scalable systems.",
  "Creating products that are not just beautiful — but perform, convert, and grow.",
  "Every detail is intentional. Every interaction has purpose.",
];

function StoryBlock({ text, index }: { text: string; index: number; key?: React.Key }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
      }}
      className="py-10 md:py-14"
    >
      <p
        className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] tracking-[-0.01em]"
        style={{
          color: COLORS.text,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
        }}
      >
        {text}
      </p>
    </motion.div>
  );
}

function StorySection() {
  return (
    <section
      className="relative border-t"
      style={{
        background: COLORS.bg,
        borderColor: COLORS.border,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* LEFT — sticky */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[35vh]">
              <motion.span
                variants={fadeZoomIn(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-8"
                style={{ color: COLORS.textDim }}
              >
                Our Story
              </motion.span>
              <motion.h2
                variants={fadeZoomIn(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-bold leading-[1.05] tracking-[-0.02em] mb-6"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(2rem, 4.5vw, 4rem)",
                }}
              >
                A Creative
                <br />
                Technology
                <br />
                Studio.
              </motion.h2>
              <motion.p
                variants={fadeZoomIn(0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm md:text-base leading-relaxed max-w-[320px]"
                style={{
                  color: COLORS.textMuted,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Where design meets engineering precision.
              </motion.p>

              {/* Accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                className="mt-10 h-[1px] w-24 origin-left"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />
            </div>
          </div>

          {/* RIGHT — scroll-driven blocks */}
          <div className="lg:col-span-7 flex flex-col">
            {storyBlocks.map((text, i) => (
              <StoryBlock key={i} text={text} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. STATS — MORPHING GRID
═══════════════════════════════════════════ */
const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Industries Served" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 0, suffix: "", label: "Clients Worldwide", displayValue: "Global" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
  key?: React.Key;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springCfg = { damping: 25, stiffness: 200 };
  const sx = useSpring(mouseX, springCfg);
  const sy = useSpring(mouseY, springCfg);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const rotateY = useTransform(sx, [0, 1], [-6, 6]);

  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      variants={fadeZoomIn(index * 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative cursor-default"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.05, y: -4 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative p-8 md:p-10 rounded-2xl overflow-hidden transition-colors duration-500"
      >
        {/* Background */}
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isHovered
              ? "rgba(255,255,255,0.03)"
              : COLORS.surface,
          }}
        />

        {/* Glow border top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span
            className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {stat.displayValue ? (
              stat.displayValue
            ) : (
              <CountUp target={stat.value} suffix={stat.suffix} />
            )}
          </span>
          <span
            className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium"
            style={{ color: COLORS.textMuted }}
          >
            {stat.label}
          </span>
        </div>

        {/* Border overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none border transition-colors duration-500"
          style={{
            borderColor: isHovered
              ? "rgba(255,255,255,0.1)"
              : COLORS.border,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <section
      className="relative border-t"
      style={{ background: COLORS.bg, borderColor: COLORS.border }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-48 relative z-10">
        <motion.span
          variants={fadeZoomIn(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6"
          style={{ color: COLORS.textDim }}
        >
          In Numbers
        </motion.span>

        <motion.h2
          variants={fadeZoomIn(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-bold leading-[1.05] tracking-[-0.02em] mb-16 md:mb-24"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
          }}
        >
          Impact at
          <br />a Glance.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. CORE VALUES — INTERACTIVE SYSTEM
═══════════════════════════════════════════ */
const values = [
  {
    title: "Strategy First",
    description: "We align design with business goals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Design with Purpose",
    description: "Every detail serves a function.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Built to Scale",
    description: "Future-ready development systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Detail Obsessed",
    description: "Precision in every interaction.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
  key?: React.Key;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeZoomIn(index * 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative group cursor-default"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative p-8 md:p-10 rounded-2xl overflow-hidden h-full"
      >
        {/* Background */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: isHovered
              ? "rgba(255,255,255,0.04)"
              : COLORS.surface,
          }}
        />

        {/* Glow edge */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none border transition-colors duration-500"
          style={{
            borderColor: isHovered
              ? "rgba(255,255,255,0.12)"
              : COLORS.border,
          }}
        />

        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-8 transition-colors duration-500"
            style={{ color: isHovered ? "white" : "rgba(255,255,255,0.4)" }}
          >
            {value.icon}
          </motion.div>

          <h3
            className="text-xl md:text-2xl font-bold tracking-[-0.02em] mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {value.title}
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              color: COLORS.textMuted,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {value.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <section
      className="relative border-t"
      style={{ background: COLORS.bg, borderColor: COLORS.border }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-48">
        <motion.span
          variants={fadeZoomIn(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6"
          style={{ color: COLORS.textDim }}
        >
          Core Values
        </motion.span>

        <motion.h2
          variants={fadeZoomIn(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-bold leading-[1.05] tracking-[-0.02em] mb-16 md:mb-24 max-w-[600px]"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
          }}
        >
          What Drives
          <br />
          Everything We Do.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <ValueCard key={i} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. CTA — MAGNETIC BUTTON
═══════════════════════════════════════════ */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.3);
      y.set((e.clientY - cy) * 0.3);
    },
    [x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative px-12 py-5 rounded-full text-sm md:text-base font-bold uppercase tracking-[0.15em] cursor-pointer overflow-hidden group"
    >
      {/* Background */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: isHovered ? "white" : "transparent",
          border: isHovered ? "1px solid white" : "1px solid rgba(255,255,255,0.2)",
        }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "0 0 60px rgba(255,255,255,0.15)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Text */}
      <span
        className="relative z-10 transition-colors duration-500"
        style={{ color: isHovered ? "black" : "white" }}
      >
        {children}
      </span>
    </motion.button>
  );
}

function CTASection() {
  return (
    <section
      className="relative border-t overflow-hidden"
      style={{ background: COLORS.bg, borderColor: COLORS.border }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-40 md:py-56 relative z-10 text-center">
        <motion.h2
          variants={fadeZoomIn(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-bold leading-[1.05] tracking-[-0.02em] mb-12 md:mb-16"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 5rem)",
          }}
        >
          Let's Build
          <br />
          Something Meaningful.
        </motion.h2>

        <motion.div
          variants={fadeZoomIn(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MagneticButton>Start a Project</MagneticButton>
        </motion.div>

        <motion.p
          variants={fadeZoomIn(0.35)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-xs md:text-sm"
          style={{
            color: COLORS.textDim,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          We respond within 24 hours.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCROLL PROGRESS INDICATOR
═══════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200]"
      style={{
        scaleX,
        background: "rgba(255,255,255,0.3)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export function AboutExperience() {
  return (
    <div
      className="min-h-screen text-white select-none overflow-x-hidden"
      style={{
        background: COLORS.bg,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Navbar />
      <ScrollProgress />

      {/* Noise overlay — global */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.035] overflow-hidden">
        <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat animate-noise gpu-accelerated" />
      </div>

      <main>
        <HeroSection />
        <StorySection />
        <ValuesSection />
        <CTASection />
      </main>

      <StudioFooter />
    </div>
  );
}
