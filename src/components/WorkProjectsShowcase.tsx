import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Navbar } from "./Navbar";

/* ─────────── Data ─────────── */
const projects = [
  {
    id: "01",
    title: "Sonder Goods",
    industry: "Product Design",
    bgGradient: "linear-gradient(160deg,#0d1929 0%,#1c2e45 40%,#0a0f18 100%)",
    glowColor: "rgba(50,100,200,0.4)",
    accentColor: "#3B82F6",
    depthBg: "#1a3050",
    bgImg: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=400&q=80&fit=crop&crop=faces",
    fgImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    id: "02",
    title: "Halo Wear",
    industry: "Fashion & Retail",
    bgGradient: "linear-gradient(150deg,#0a0505 0%,#1e0a03 50%,#0d0808 100%)",
    glowColor: "rgba(200,80,20,0.35)",
    accentColor: "#F97316",
    depthBg: "#b84a08",
    bgImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80&fit=crop&crop=faces,center",
    fgImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
  },
  {
    id: "03",
    title: "Lucent Lab",
    industry: "Architecture",
    bgGradient: "linear-gradient(135deg,#0f1318 0%,#1a2530 50%,#0a0f18 100%)",
    glowColor: "rgba(80,120,160,0.3)",
    accentColor: "#22D3EE",
    depthBg: "#b0c8d8",
    bgImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&fit=crop&crop=faces",
    fgImg: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80&fit=crop",
  },
  {
    id: "04",
    title: "Forma Studio",
    industry: "Editorial",
    bgGradient: "linear-gradient(135deg,#2a0505 0%,#8b1010 40%,#1a0303 100%)",
    glowColor: "rgba(160,20,20,0.35)",
    accentColor: "#EF4444",
    depthBg: "#f0f0f0",
    bgImg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80&fit=crop",
    fgImg: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
  },
  {
    id: "05",
    title: "Atelier Nara",
    industry: "Lifestyle",
    bgGradient: "linear-gradient(180deg,#2a4a48 0%,#4a3020 50%,#1a1008 100%)",
    glowColor: "rgba(140,80,40,0.3)",
    accentColor: "#D97706",
    depthBg: "#8a6a4a",
    bgImg: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    fgImg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop",
  },
];

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const CARD_WIDTH = 520;
const CARD_GAP = 28;

/* ─────────── Single Card ─────────── */
function ShowcaseCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
  key?: React.Key;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springCfg = { damping: 25, stiffness: 120 };
  const sx = useSpring(mouseX, springCfg);
  const sy = useSpring(mouseY, springCfg);

  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const rotateY = useTransform(sx, [0, 1], [-8, 8]);
  const depthX = useTransform(sx, [0, 1], [-40, 40]);
  const depthY = useTransform(sy, [0, 1], [-40, 40]);
  const bgShiftX = useTransform(sx, [0, 1], [-12, 12]);
  const bgShiftY = useTransform(sy, [0, 1], [-12, 12]);

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
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 1.2,
        delay: index * 0.12,
        ease: EASE_PREMIUM,
      }}
      className="flex-shrink-0 relative cursor-pointer"
      style={{
        width: `${CARD_WIDTH}px`,
        height: "78vh",
        perspective: 1200,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
        className="w-full h-full relative rounded-[20px] overflow-hidden"
        whileHover={{ scale: 1.03, y: -6 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-[30px] rounded-[32px] pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Background visual */}
        <motion.div
          className="absolute inset-[-5%] w-[110%] h-[110%] z-[1]"
          style={{ x: bgShiftX, y: bgShiftY }}
        >
          <div
            className="w-full h-full relative"
            style={{ background: project.bgGradient }}
          >
            {/* Ambient glow inside background */}
            <div
              className="absolute"
              style={{
                top: "20%",
                left: "25%",
                width: "50%",
                height: "50%",
                background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 70%)`,
              }}
            />
          </div>
        </motion.div>

        {/* Card visual container border */}
        <div className="absolute inset-0 rounded-[20px] overflow-hidden z-[2]">
          <motion.img
            src={project.fgImg}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              opacity: 0.5,
              filter: "grayscale(0.4)",
            }}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            referrerPolicy="no-referrer"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        {/* Depth image (floating inset square) */}
        <motion.div
          className="absolute z-[3] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10"
          style={{
            width: "58%",
            aspectRatio: "1",
            top: "50%",
            left: "50%",
            x: useTransform(depthX, (v) => v - 210),
            y: useTransform(depthY, (v) => v - 200),
            background: project.depthBg,
          }}
        >
          <motion.img
            src={project.bgImg}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 z-[4] pointer-events-none"
          style={{
            top: "48%",
            height: "1px",
            background: "rgba(245,245,240,0.18)",
          }}
        />

        {/* Card info bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] px-5 py-4 flex justify-between items-end bg-gradient-to-t from-black/75 to-transparent rounded-b-[20px]">
          <span
            className="font-bold text-base tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {project.title}
          </span>
          <span className="text-sm text-white/50 tracking-wide">
            ({project.id})
          </span>
        </div>

        {/* Floating CTA button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-14 right-5 z-[6] bg-white text-black rounded-full px-4 py-2.5 text-xs font-medium flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-3.5 h-3.5"
              >
                <path d="M3 8h10M10 5l3 3-3 3" />
              </svg>
              View Project
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hover border */}
        <motion.div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-[7] border-2 border-transparent"
          animate={{
            borderColor: isHovered
              ? "rgba(255,255,255,0.1)"
              : "rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────── Main Showcase ─────────── */
export function WorkProjectsShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Cursor follower
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);
  const smoothCursorX = useSpring(cursorX, { damping: 20, stiffness: 100 });
  const smoothCursorY = useSpring(cursorY, { damping: 20, stiffness: 100 });

  const trackXValue = useMotionValue(0);
  const smoothTrackX = useSpring(trackXValue, { damping: 40, stiffness: 90 });

  const [dynamicHeight, setDynamicHeight] = useState("380vh");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Compute exact height for 1:1 scroll mapping
  useEffect(() => {
    const computeHeight = () => {
      if (trackRef.current && rightPanelRef.current && !isMobile) {
        const trackW = trackRef.current.scrollWidth;
        const panelW = rightPanelRef.current.clientWidth;
        const maxX = Math.max(0, trackW - panelW + 60);
        setDynamicHeight(`calc(100vh + ${maxX}px)`);
      }
    };
    
    // Slight delay to ensure layout is ready
    setTimeout(computeHeight, 100);
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, [isMobile]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [cursorX, cursorY]);

  // Vanilla JS scroll-driven horizontal movement
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      const showcase = showcaseRef.current;
      const track = trackRef.current;
      const panel = rightPanelRef.current;
      if (!showcase || !track || !panel) return;

      const rect = showcase.getBoundingClientRect();
      const sectionH = showcase.offsetHeight;
      const viewH = window.innerHeight;
      const scrollable = sectionH - viewH;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      const trackW = track.scrollWidth;
      const panelW = panel.clientWidth;
      const maxX = Math.max(0, trackW - panelW + 60);

      trackXValue.set(-progress * maxX);

      // Update active dot
      const cardStep = CARD_WIDTH + CARD_GAP;
      const idx = Math.round((progress * maxX) / cardStep);
      setActiveIndex(Math.min(idx, projects.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // Initial calc
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile, trackXValue]);

  return (
    <div className="bg-black text-white w-full font-sans relative">
      {/* Cursor light follower */}
      {!isMobile && (
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.028) 0%, transparent 70%)",
            left: smoothCursorX,
            top: smoothCursorY,
            x: "-50%",
            y: "-50%",
          }}
        />
      )}


      {/* ── 2) HORIZONTAL SCROLL SHOWCASE ── */}
      <section
        ref={showcaseRef}
        className="relative bg-black"
        style={{ height: isMobile ? "auto" : dynamicHeight }}
      >
        <div
          className={`${isMobile ? "relative" : "sticky top-0"} h-screen flex overflow-hidden`}
        >
          {/* LEFT PANEL */}
          <div className="hidden md:flex w-[35%] flex-shrink-0 flex-col justify-end relative z-10 pb-[52px] pl-[52px]">
            {/* Dot indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-20 left-[52px] w-[7px] h-[7px] rounded-full bg-white opacity-70"
            />

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_PREMIUM }}
              className="font-black leading-[0.9] tracking-[-0.04em] select-none"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(56px, 7vw, 90px)",
              }}
            >
              All
              <br />
              Works
              <span className="inline-block text-white/60 ml-1 align-super font-normal tracking-normal" style={{ fontSize: "clamp(16px, 1.8vw, 24px)" }}>
                ({projects.length})
              </span>
            </motion.h2>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_PREMIUM }}
              className="mt-10 flex flex-col gap-1.5 text-[0.72rem] tracking-[0.1em] uppercase text-white/30"
            >
              <span>Selected Projects</span>
              <span>2022 — 2025</span>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-7 flex items-center gap-2.5 text-white/25 text-[0.7rem] tracking-[0.12em] uppercase"
            >
              <div className="w-7 h-px bg-white/25" />
              Scroll to explore
            </motion.div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-6">
              {projects.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{
                    width: i === activeIndex ? 7 : 5,
                    height: i === activeIndex ? 7 : 5,
                    backgroundColor:
                      i === activeIndex
                        ? "rgba(245,245,240,1)"
                        : "rgba(245,245,240,0.2)",
                    scale: i === activeIndex ? 1.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT PANEL — cards viewport */}
          <div
            ref={rightPanelRef}
            className={`flex-1 overflow-hidden relative flex items-center ${isMobile ? "overflow-x-auto snap-x snap-mandatory pb-10" : ""}`}
          >
            <motion.div
              ref={trackRef}
              className="flex items-center gap-[28px] px-10 md:pl-10 md:pr-[60px]"
              style={isMobile ? {} : { x: smoothTrackX }}
            >
              {projects.map((project, i) => (
                <ShowcaseCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
