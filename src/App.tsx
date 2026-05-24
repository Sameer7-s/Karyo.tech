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
import { SelectedSystemsSection } from "./components/SelectedSystemsSection";

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

          {/* ── 5. SELECTED SYSTEMS ── */}
          <SelectedSystemsSection />

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
