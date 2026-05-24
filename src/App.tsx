/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring, useScroll } from "motion/react";
import React, { useEffect, useRef } from "react";
import { Intro } from "./components/Intro";
import { TrustBar } from "./components/TrustBar";
import { ServicesShowcase } from "./components/ServicesShowcase";
import { ProcessSection } from "./components/ProcessSection";
import { Navbar } from "./components/Navbar";
import { CTASection } from "./components/CTASection";
import { StudioFooter } from "./components/StudioFooter";
import { GalaxyBackground } from "./components/GalaxyBackground";
import { FAQSection } from "./components/FAQSection";

/* ─────────────────────────────────────────
   Gallery Works Data & Component
───────────────────────────────────────── */
const galleryWorks = [
  { title: "Vanguard", tags: ["Crypto", "2025"], seed: "work-11" },
  { title: "Fabric", tags: ["Fintech", "2024"], seed: "work-14" },
  { title: "Apex", tags: ["Software", "2022"], seed: "work-17" },
  { title: "Essence", tags: ["Cosmetic", "2023"], seed: "work-20" },
];

function GalleryItem({ index }: { index: number; [key: string]: any }) {
  const work = galleryWorks[index];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-4 cursor-pointer"
    >
      <div className="flex items-center justify-between border-t border-white/20 pt-4">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors duration-300">
          {work.title}
        </h3>
        <div className="flex items-center gap-2">
          {work.tags.map((tag, i) => (
            <span key={i} className="bg-white text-black px-3 py-1 text-[10px] md:text-xs font-bold tracking-wider group-hover:bg-gray-200 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
        <img
          src={`https://picsum.photos/seed/${work.seed}/1000/800`}
          alt={work.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-100 grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main App — 10-Section Layout
───────────────────────────────────────── */
export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { damping: 28, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Scroll to top on mount (handles refresh)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">

      {/* Navbar — Top-level for correct z-index layering */}
      <Navbar />

      {/* Galaxy Background */}
      <GalaxyBackground smoothX={smoothX} smoothY={smoothY} />

      <div className="relative z-10 w-full min-h-screen flex flex-col">

        <div ref={heroRef} className="h-screen w-full relative">
          <Intro scrollProgress={heroScrollProgress} smoothX={smoothX} smoothY={smoothY} />
        </div>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >

          {/* ── 3. TRUST / SOCIAL PROOF ── */}
          <TrustBar />

          {/* ── 4. SERVICES (Interactive Showcase) ── */}
          <ServicesShowcase />

          {/* ── 5. FEATURED WORK / CASE STUDIES ── */}
          <section className="bg-black border-t border-white/[0.06] py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="px-4 sm:px-6 md:px-12 mb-10 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none"
                >
                  Selected<br />Works<span className="text-xl sm:text-2xl md:text-4xl opacity-30 ml-2 md:ml-4">(4)</span>
                </h2>
                <p className="text-white/40 max-w-xs text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                  A curated archive of visual explorations, digital products, and artistic directions from the past decade.
                </p>
              </motion.div>
            </div>
            <div className="px-4 sm:px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <GalleryItem key={i} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* ── 6. PROCESS ── */}
          <ProcessSection />

          {/* ── 8. CTA (Conversion) ── */}
          <CTASection />

          {/* ── 9. FAQ (About / Trust) ── */}
          <FAQSection />

          {/* ── 10. FOOTER ── */}
          <StudioFooter />

        </motion.main>
      </div>
    </div>
  );
}
