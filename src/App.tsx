/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from "motion/react";
import React, { useEffect, useState, useRef } from "react";
import { Plus } from "lucide-react";
import { Intro } from "./components/Intro";
import { BrandPhilosophy } from "./components/BrandPhilosophy";
import { TrustBar } from "./components/TrustBar";
import { ServicesShowcase } from "./components/ServicesShowcase";
import { ProcessSection } from "./components/ProcessSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Navbar } from "./components/Navbar";
import { CTASection } from "./components/CTASection";


import { StudioFooter } from "./components/StudioFooter";
import { GalaxyBackground } from "./components/GalaxyBackground";
import Lenis from "lenis";

/* ─────────────────────────────────────────
   Gallery Works Data & Component
───────────────────────────────────────── */
const galleryWorks = [
  { title: "Vanguard", tags: ["Crypto", "2025"], seed: "work-11" },
  { title: "Fabric", tags: ["Fintech", "2024"], seed: "work-14" },
  { title: "Apex", tags: ["Software", "2022"], seed: "work-17" },
  { title: "Essence", tags: ["Cosmetic", "2023"], seed: "work-20" },
];

function GalleryItem({ index, key }: { index: number; key?: React.Key }) {
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
        <motion.div
          className="w-full h-full"
        >
          <img
            src={`https://picsum.photos/seed/${work.seed}/1000/800`}
            alt={work.title}
            loading="lazy"
            className="w-full h-full object-cover scale-100 grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FAQ Section
───────────────────────────────────────── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide comprehensive digital solutions including UI/UX design, full-stack development, brand strategy, and interactive motion design. Our goal is to bridge the gap between creative vision and technical execution."
    },
    {
      question: "What is your typical turnaround time?",
      answer: "Project timelines vary based on complexity. A typical landing page takes 2-4 weeks, while complex web applications can take 8-12 weeks. We prioritize quality and thorough testing in every sprint."
    },
    {
      question: "Do you only work in Framer?",
      answer: "While we love Framer for its speed and motion capabilities, we are platform-agnostic. We build custom solutions using React, Next.js, and other modern frameworks depending on the project requirements."
    },
    {
      question: "Can you handle both design and build?",
      answer: "Yes, we specialize in end-to-end delivery. By handling both design and development, we ensure that the creative intent is perfectly preserved in the final functional product."
    },
    {
      question: "Do you offer brand strategy too?",
      answer: "Absolutely. We believe great design starts with a strong strategic foundation. We help define your brand voice, positioning, and visual identity before moving into digital execution."
    },
    {
      question: "What's your process like?",
      answer: "Our process is highly collaborative and iterative. It starts with discovery and strategy, followed by rapid prototyping, high-fidelity design, and finally, robust development and deployment."
    }
  ];

  return (
    <section className="p-4 sm:p-6 md:p-12 py-16 sm:py-20 md:py-32 bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20">
        <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a]"
          >
            <img
              src="https://picsum.photos/seed/portrait-faq/600/800"
              alt="Process Visual"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Clarifying Deliverable's Before They Begin with Real Process and Honest <span className="font-serif italic opacity-60">Answers.</span>
          </motion.h2>
        </div>

        <div className="lg:col-span-7">
          <div className="border-t border-white/10">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-5 md:py-8 flex items-start gap-4 md:gap-8 text-left group relative px-3 md:px-4 -mx-3 md:-mx-4 rounded-xl transition-all duration-500 hover:bg-white/5"
                >
                  <span className="text-[10px] font-bold opacity-40 pt-1.5 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  <div className="flex-1 flex justify-between items-center gap-4">
                    <span className="text-base sm:text-lg md:text-2xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openIndex === i ? 45 : 0,
                        scale: openIndex === i ? 1.2 : 1
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-white/30 transition-all"
                    >
                      <Plus size={20} strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 pl-6 md:pl-12 pr-4 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">

      {/* Navbar — Top-level for correct z-index layering */}
      <Navbar />

      {/* Galaxy Background */}
      <GalaxyBackground smoothX={smoothX} smoothY={smoothY} />

      <div className="relative z-10 w-full min-h-screen flex flex-col">

        {/* ── 1. HERO ── */}
        <div ref={heroRef} className="h-screen w-full relative">
          <Intro scrollProgress={heroScrollProgress} />
        </div>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >

          {/* ── 2. BRAND PHILOSOPHY ── */}
          <BrandPhilosophy />

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
                  style={{ fontFamily: "'Syne', sans-serif" }}
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

          {/* ── 7. WHY CHOOSE US ── */}
          <WhyChooseUs />

          {/* ── 8. CTA (Conversion) ── */}
          <CTASection />

          {/* ── 9. FAQ (About / Trust) ── */}
          <FAQSection />



          {/* ── 12. FOOTER ── */}
          <StudioFooter />

        </motion.main>
      </div>
    </div>
  );
}
