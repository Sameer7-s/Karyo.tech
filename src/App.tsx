/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, animate, AnimatePresence } from "motion/react";
import { ArrowDownToLine, Twitter, Plus } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Intro } from "./components/Intro";
import Lenis from "lenis";

const galleryWorks = [
  { title: "Visual Archive 01", category: "Art Direction", seed: "work-11" },
  { title: "Visual Archive 02", category: "Brand Identity", seed: "work-14" },
  { title: "Visual Archive 03", category: "Motion Design", seed: "work-17" },
  { title: "Visual Archive 04", category: "UI/UX Design", seed: "work-20" },
];

function GalleryItem({ index }: any) {
  const work = galleryWorks[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a] cursor-pointer"
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={`https://picsum.photos/seed/${work.seed}/800/1000`}
          alt={work.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 opacity-60">
          {work.category}
        </span>
        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
          {work.title}
        </h4>
      </div>
    </motion.div>
  );
}


function AnimatedHeadline() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const spotY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  // Liquid color rotation
  const colorRotation = useMotionValue(0);
  useEffect(() => {
    const controls = animate(colorRotation, [0, 360], {
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    });
    return () => controls.stop();
  }, [colorRotation]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${spotX}px ${spotY}px, hsl(${colorRotation}, 100%, 70%) 0%, #D4FF00 30%, #00FFFF 60%, transparent 100%)`;

  const lines = [
    "Blending design and code with functional clarity and creative precision.",
    "Delivering thoughtful digital systems with structure, flow, and expressive interaction."
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="max-w-7xl mx-auto relative group"
    >
      <div className="flex flex-col gap-4 relative">
        {/* Base Layer (Dimmed) */}
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="overflow-hidden py-2">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: "100%" },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: lineIndex * 0.2
                  }
                }
              }}
              className="text-4xl md:text-6xl lg:text-[5.2rem] font-bold leading-[1.1] tracking-tight text-white/20 transition-colors duration-700 group-hover:text-white/10 flex flex-wrap items-center"
            >
              {line.split(" ").map((word, wordIndex) => {
                return (
                  <span key={wordIndex} className="mr-[0.25em] inline-block">
                    {word}
                  </span>
                );
              })}
            </motion.div>
          </div>
        ))}

        {/* Spotlight Layer (Lime Green) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {lines.map((line, lineIndex) => (
            <div key={`spot-${lineIndex}`} className="overflow-hidden py-2">
              <motion.div
                style={{
                  maskImage: spotlight,
                  WebkitMaskImage: spotlight,
                }}
                variants={{
                  hidden: { opacity: 0, y: "100%" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                      delay: lineIndex * 0.2
                    }
                  }
                }}
                className="text-4xl md:text-6xl lg:text-[5.2rem] font-bold leading-[1.1] tracking-tight text-white flex flex-wrap items-center"
              >
                {line.split(" ").map((word, wordIndex) => {
                  return (
                    <span key={wordIndex} className="mr-[0.25em] inline-block">
                      {word}
                    </span>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <section className="p-6 md:p-12 py-32 bg-black border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left Side: Image & Headline */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-48 aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a]"
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white"
          >
            Clarifying Deliverable's Before They Begin with Real Process and Honest <span className="font-serif italic opacity-60">アンサー.</span>
          </motion.h2>
        </div>

        {/* Right Side: Accordion */}
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
                  className="w-full py-8 flex items-start gap-8 text-left group relative px-4 -mx-4 rounded-xl transition-all duration-500 hover:bg-white/5"
                >
                  <span className="text-[10px] font-bold opacity-40 pt-1.5 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  <div className="flex-1 flex justify-between items-center gap-4">
                    <span className="text-xl md:text-2xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-500">
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
                      <div className="pb-8 pl-12 pr-4 text-white/60 leading-relaxed max-w-xl">
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

function ContactSection() {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 150 });
  const springY = useSpring(y, { damping: 20, stiffness: 150 });

  // Parallax for text
  const textX = useTransform(springX, (v) => v * 0.2);
  const textY = useTransform(springY, (v) => v * 0.2);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Magnetic pull & Parallax
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const title = "LET'S TALK";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-60 bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Background Moving Marquee */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="text-[30vw] font-bold whitespace-nowrap flex gap-20"
        >
          <span>LET'S TALK</span>
          <span>LET'S TALK</span>
          <span>LET'S TALK</span>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          style={{ x: textX, y: textY }}
          className="mb-4"
        >
          <h2
            className="text-[14vw] md:text-[10vw] font-bold leading-none tracking-tighter text-[#D4FF00] uppercase flex justify-center overflow-hidden"
          >
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.div
          style={{ x: useTransform(textX, (v) => v * 0.5), y: useTransform(textY, (v) => v * 0.5) }}
          className="overflow-hidden mb-24"
        >
          <motion.a
            href="mailto:hello@pentaclay.com"
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[7vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white hover:opacity-70 transition-opacity block"
          >
            hello@pentaclay.com
          </motion.a>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            ref={buttonRef}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative group cursor-pointer"
          >
            <motion.div
              className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 relative z-20 group-hover:text-black transition-colors duration-500">
                Contact <span className="text-xl">↗</span>
              </span>

              {/* Lime Dot */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#D4FF00] rounded-full z-20"
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Hover Fill */}
              <motion.div
                className="absolute inset-0 bg-[#D4FF00] origin-bottom rounded-full"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Background Glows */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4FF00]/10 blur-[80px] rounded-full pointer-events-none glow-effect"
      />
      <motion.div
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none glow-effect"
      />
    </section>
  );
}

function StudioFooter() {
  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12 lg:px-20 font-sans selection:bg-[#D4FF00] selection:text-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-32 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-bold tracking-tighter"
          >
            KARYO®
          </motion.div>
          <motion.nav
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="hidden md:flex gap-12 text-[10px] font-bold tracking-widest uppercase"
          >
            {['Work', 'Studio', 'Feed', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href="#"
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                whileHover={{ color: "#D4FF00" }}
                className="hover:opacity-100 opacity-60 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.nav>
        </div>

        {/* Big Logo Section */}
        <div className="relative mb-32 md:mb-48">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h2 className="text-[20vw] md:text-[18vw] font-bold leading-[0.75] tracking-tighter select-none flex overflow-hidden">
              {['K', 'A', 'R', 'Y', 'O', '®'].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl font-bold tracking-tighter text-[#D4FF00]"
            >
              © 2018-26
            </motion.div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 lg:col-span-4"
          >
            <p className="text-xs md:text-sm leading-relaxed mb-10 max-w-xs opacity-60 font-medium">
              Join our studio newsletter for thoughts on design, brand systems, and creative direction — sent occasionally, when there's something worth saying.
            </p>
            <div className="relative group max-w-md">
              <input
                type="email"
                placeholder="YOUR EMAIL HERE"
                className="w-full bg-white/5 border border-white/10 py-5 px-6 rounded-xl text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-[#D4FF00] focus:bg-white/10 transition-all placeholder:text-white/30 text-white"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: -15, backgroundColor: "#D4FF00", color: "black" }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 transition-colors"
              >
                <ArrowDownToLine className="w-4 h-4 -rotate-90" />
              </motion.button>
            </div>
          </motion.div>

          {/* Social */}
          <div className="md:col-span-3 md:col-start-7 lg:col-span-2 lg:col-start-7">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-widest uppercase opacity-40 block mb-8"
            >
              Social
            </motion.span>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="flex flex-col gap-6"
            >
              {['LinkedIn', 'X (Twitter)', 'Instagram'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  whileHover={{ x: 10, color: "#D4FF00" }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter opacity-80 hover:opacity-100 transition-colors flex items-center gap-4"
                >
                  {social} <span className="opacity-0 -translate-x-4 transition-all duration-300 text-sm">↗</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Legal */}
          <div className="md:col-span-3 lg:col-span-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-widest uppercase opacity-40 block mb-8"
            >
              Legal
            </motion.span>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
              }}
              className="flex flex-col gap-6"
            >
              {['Privacy Policy', 'Terms of Service', '404'].map((legal) => (
                <motion.a
                  key={legal}
                  href="#"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  whileHover={{ x: 10, color: "#D4FF00" }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter opacity-80 hover:opacity-100 transition-colors flex items-center gap-4"
                >
                  {legal} <span className="opacity-0 -translate-x-4 transition-all duration-300 text-sm">↗</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dynamic Background Glows (matching ContactSection) */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#D4FF00]/10 blur-[80px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3 glow-effect"
      />
      <motion.div
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none -translate-x-1/3 -translate-y-1/3 glow-effect"
      />
    </footer>
  );
}







function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // 0 = intro fully visible, 1 = intro fully hidden / main visible
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { damping: 50, stiffness: 100 });
  const [introVisible, setIntroVisible] = useState(true); // true when progress < 1
  const touchStartY = useRef<number>(0);
  const accumulatedDelta = useRef<number>(0);
  const SCROLL_THRESHOLD = 800; // Increased threshold for a longer, more deliberate transition

  // Intro transforms — fade + scale + slide up + intense blur
  const introOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.2, 0]);
  const introScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);
  const introY = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const introBlur = useTransform(smoothProgress, [0, 0.5, 1], [0, 4, 12]);
  const introBlurStr = useTransform(introBlur, (v) => `blur(${v}px)`);

  // Main content transforms — dramatic slide up from way below + fade in
  const mainY = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);
  const mainOpacity = useTransform(smoothProgress, [0, 0.4, 1], [0, 0.3, 1]);
  const mainScale = useTransform(smoothProgress, [0, 1], [0.95, 1]);

  // Manage Lenis — start only when intro is fully gone
  useEffect(() => {
    if (!introVisible) {
      const lenis = new Lenis({ duration: 1.2 });
      lenisRef.current = lenis;
      function raf(time: number) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
      rafIdRef.current = requestAnimationFrame(raf);
      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        lenis.destroy();
        lenisRef.current = null;
      };
    }
  }, [introVisible]);

  const transitionEndTime = useRef<number>(0);
  const isTransitioning = useRef<boolean>(false);

  // Wheel + touch handling for the intro transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const progress = scrollProgress.get();
      const now = Date.now();

      // COOLING OFF: If we just finished the intro transition, eat all wheel events for 1200ms
      // This prevents the "momentum" of a fast scroll from jumping deep into the page.
      if (!introVisible && now - transitionEndTime.current < 1200) {
        e.preventDefault();
        window.scrollTo(0, 0); // Force stay at top during cooling off
        return;
      }

      // 1. INTRO IS FULLY HIDDEN (Main site)
      if (progress >= 1) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop <= 0 && e.deltaY < 0) {
          // User is at top and scrolling UP → Bring back intro
          e.preventDefault();
          accumulatedDelta.current += e.deltaY;
          const newProgress = Math.max(0, Math.min(1, 1 + accumulatedDelta.current / SCROLL_THRESHOLD));
          scrollProgress.set(newProgress);
          if (newProgress < 1) {
            document.body.style.overflow = "hidden";
            setIntroVisible(true);
            if (lenisRef.current) {
              lenisRef.current.destroy();
              lenisRef.current = null;
            }
          }
        } else {
          accumulatedDelta.current = 0;
        }
        return;
      }

      // 2. INTRO IS VISIBLE (Transition phase)
      // We block ALL default scrolling while in intro
      e.preventDefault();
      accumulatedDelta.current += e.deltaY;
      const newProgress = Math.max(0, Math.min(1, accumulatedDelta.current / SCROLL_THRESHOLD));
      scrollProgress.set(newProgress);

      if (newProgress >= 1) {
        document.body.style.overflow = "auto";
        setIntroVisible(false);
        accumulatedDelta.current = 0;
        transitionEndTime.current = Date.now(); // Mark completion for cooling off

        // Explicit Reset: Ensure we start at the VERY top of the main site
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      const progress = scrollProgress.get();

      if (progress >= 1) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop <= 0 && deltaY < -50) {
          accumulatedDelta.current += deltaY;
          const newProgress = Math.max(0, Math.min(1, 1 + accumulatedDelta.current / SCROLL_THRESHOLD));
          scrollProgress.set(newProgress);
          if (newProgress < 1) {
            document.body.style.overflow = "hidden";
            setIntroVisible(true);
          }
        }
        return;
      }

      if (progress < 1) {
        accumulatedDelta.current = Math.max(0, accumulatedDelta.current + deltaY);
        const newProgress = Math.max(0, Math.min(1, accumulatedDelta.current / SCROLL_THRESHOLD));
        scrollProgress.set(newProgress);
        if (newProgress >= 1) {
          document.body.style.overflow = "auto";
          setIntroVisible(false);
          accumulatedDelta.current = 0;
        }
      }
      touchStartY.current = e.touches[0].clientY;
    };

    document.body.style.overflow = introVisible ? "hidden" : "auto";
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [introVisible, scrollProgress]);

  return (
    <div ref={containerRef} className="relative bg-black w-full min-h-screen">
      {/* Intro Overlay */}
      <motion.div
        className="fixed inset-0 z-[99999] bg-black will-change-transform"
        style={{
          opacity: introOpacity,
          scale: introScale,
          y: introY,
          filter: introBlurStr,
          pointerEvents: introVisible ? "auto" : "none",
        }}
      >
        <Intro scrollProgress={smoothProgress} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="w-full min-h-screen will-change-transform"
        style={{
          y: mainY,
          opacity: mainOpacity,
          scale: mainScale,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);

  const springConfig = { damping: 30, stiffness: 120 };
  const cursorSpringConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothCursorX = useSpring(cursorX, cursorSpringConfig);
  const smoothCursorY = useSpring(cursorY, cursorSpringConfig);
  const smoothCursorScale = useSpring(cursorScale, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
      cursorX.set(clientX);
      cursorY.set(clientY);

      const target = e.target as HTMLElement;
      // Optimized check: only check direct tag or parent for common interactive elements
      const isClickable = target.tagName === 'BUTTON' || target.tagName === 'A' ||
        target.parentElement?.tagName === 'BUTTON' || target.parentElement?.tagName === 'A';
      cursorScale.set(isClickable ? 2.5 : 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, cursorX, cursorY, cursorScale]);
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          scale: smoothCursorScale,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Noise Texture Overlay — GPU accelerated */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.04] overflow-hidden">
        <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat animate-noise gpu-accelerated" />
      </div>

      {/* SVG Filters for Liquid Distortion */}
      <svg className="hidden">
        <filter id="liquid-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.01;0.015;0.01" dur="15s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
        <filter id="liquid-distortion-hover">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="noise">
            <animate attributeName="baseFrequency" values="0.02;0.03;0.02" dur="5s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" />
        </filter>
      </svg>

      {/* Dynamic Background Gradient — GPU composited */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-20 will-change-auto"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]: any) => `radial-gradient(circle at ${50 + x * 20}% ${50 + y * 20}%, #1a3a3a 0%, transparent 50%)`
          )
        }}
      />

      <PageTransition>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }} // delayed to wait for intro
          className="relative"
        >
          {/* Scroll Section 1: Hero */}
          <div className="scroll-section">
            <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
              <div className="p-6 md:p-12 flex flex-col justify-center">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.02,
                        delayChildren: 0.2
                      }
                    }
                  }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter max-w-3xl"
                >
                  {"and Moments that Connect and Leave a Bold ".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 0.8, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="font-light italic inline-block"
                  >
                    イメージ。
                  </motion.span>
                </motion.h1>
              </div>

              <div className="relative p-6 lg:p-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="w-[90%] h-[90%] bg-[#1a1a1a] rounded-2xl overflow-hidden relative group"
                >
                  {/* Layered images for that "repeated" look */}
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src="https://picsum.photos/seed/tokyo-art-1/1200/1600"
                    alt="Artistic visual"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://picsum.photos/seed/tokyo-art-1/1200/1600"
                    alt="Artistic visual"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 mix-blend-screen translate-x-2 translate-y-2 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://picsum.photos/seed/tokyo-art-1/1200/1600"
                    alt="Artistic visual"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 mix-blend-screen -translate-x-2 -translate-y-2 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Overlay for that "distorted" feel from the image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none" />

                  {/* Social Icon */}
                  <div className="absolute bottom-6 right-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      <Twitter size={18} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>

          {/* Scroll Section 2: Portfolio */}
          <div className="scroll-section">
            <section className="p-6 md:p-12 pt-4 pb-24 relative overflow-hidden h-full flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start"
              >
                <div className="relative w-full">
                  <motion.h2
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[15vw] md:text-[20vw] font-bold leading-[0.8] tracking-tighter flex items-baseline relative"
                  >
                    Portfolio
                    <motion.span
                      animate={{
                        opacity: [0, 1, 0, 1, 0],
                        x: [0, 5, -5, 5, 0],
                      }}
                      transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "linear"
                      }}
                      className="absolute inset-0 text-white/20 pointer-events-none"
                    >
                      Portfolio
                    </motion.span>
                    <span className="text-[4vw] md:text-[5vw] font-medium ml-2">™</span>
                  </motion.h2>

                  {/* Use for Free Button */}
                  <div className="absolute bottom-[10%] right-0 md:right-12">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseMove={(e) => {
                        const { clientX, clientY, currentTarget } = e;
                        const { left, top, width, height } = currentTarget.getBoundingClientRect();
                        const x = (clientX - (left + width / 2)) * 0.2;
                        const y = (clientY - (top + height / 2)) * 0.2;
                        currentTarget.style.transform = `translate(${x}px, ${y}px)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `translate(0px, 0px)`;
                      }}
                      className="bg-white text-black px-6 py-3 rounded-xl flex items-center gap-3 font-semibold text-sm md:text-base shadow-2xl transition-transform duration-200 ease-out"
                    >
                      <ArrowDownToLine size={20} />
                      Use for Free
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>

          {/* Scroll Section 3: Experience */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 md:p-12 py-24 border-t border-white/10">
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[3/4] rounded-3xl overflow-hidden bg-[#1a1a1a]"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.2 }}
                  src="https://picsum.photos/seed/portrait-1/1200/1600"
                  alt="Portrait"
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <div className="flex flex-col justify-center items-start">
                <motion.h3
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-12"
                >
                  13+ years™ of digital form, sharp interactions, and relentless creative discipline and effort.
                </motion.h3>

                <div className="flex items-center justify-between w-full">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
                    className="border-2 border-white px-10 py-4 rounded-full font-bold text-lg uppercase tracking-widest transition-colors"
                  >
                    Contact
                  </motion.button>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <Twitter size={18} />
                  </motion.div>
                </div>
              </div>
            </section>
          </div>

          {/* Scroll Section 4: Ticker & Logo Grid */}
          <div className="scroll-section min-h-screen flex flex-col justify-center py-24">
            {/* Second Ticker */}
            <div className="w-full bg-white py-4 overflow-hidden border-y border-white/10">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex items-center text-black font-bold uppercase tracking-tighter text-sm md:text-base"
                  >
                    <span className="mx-8">Digital Nomad</span>
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span className="mx-8">Creative Developer</span>
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span className="mx-8">Art Director</span>
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Logo Grid Section */}
            <section className="p-6 md:p-12 py-24 bg-black relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Cairo", logo: "Cairo" },
                  { name: "oslo.", logo: "oslo." },
                  { name: "Chain", logo: "Chain" },
                  { name: "Studio", logo: "Studio" }
                ].map((brand, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="aspect-square border border-white/10 rounded-2xl flex items-center justify-center group hover:bg-white/5 transition-colors"
                  >
                    <span className="text-2xl md:text-4xl font-bold tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">
                      {brand.logo}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Floating Use for Free Button (Repeated as per image) */}
              <div className="absolute bottom-12 right-12 hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseMove={(e) => {
                    const { clientX, clientY, currentTarget } = e;
                    const { left, top, width, height } = currentTarget.getBoundingClientRect();
                    const x = (clientX - (left + width / 2)) * 0.2;
                    const y = (clientY - (top + height / 2)) * 0.2;
                    currentTarget.style.transform = `translate(${x}px, ${y}px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translate(0px, 0px)`;
                  }}
                  className="bg-white text-black px-6 py-3 rounded-xl flex items-center gap-3 font-semibold text-sm md:text-base shadow-2xl transition-transform duration-200 ease-out"
                >
                  <ArrowDownToLine size={20} />
                  Use for Free
                </motion.button>
              </div>
            </section>
          </div>

          {/* Scroll Section 5: Services */}
          <div className="scroll-section">
            <section className="bg-black py-24 min-h-screen flex flex-col justify-center">
              <div className="px-6 md:px-12 mb-12">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[15vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter flex items-start"
                >
                  Services<span className="text-[4vw] md:text-[3vw] font-medium mt-4 ml-4 opacity-60">(6)</span>
                </motion.h2>
              </div>

              {/* Services Ticker */}
              <div className="w-full bg-white py-3 overflow-hidden border-y border-white/10 mb-24">
                <div className="flex whitespace-nowrap animate-marquee">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center text-black font-medium uppercase tracking-widest text-[10px] md:text-xs">
                      <span className="mx-12">Precise</span>
                      <span className="mx-12">Structured</span>
                      <span className="mx-12">Focused</span>
                      <span className="mx-12">Visual Language</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services List */}
              <div className="px-6 md:px-12 max-w-7xl ml-auto">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.2
                      }
                    }
                  }}
                  className="flex flex-col"
                >
                  {[
                    {
                      id: "01",
                      title: "Art Direction",
                      desc: "We guide every visual decision from start to finish, ensuring clarity, emotion, and impact across every touchpoint."
                    },
                    {
                      id: "02",
                      title: "Brand Identity",
                      desc: "From strategy to execution, we shape consistent brand systems that speak clearly and feel uniquely ownable."
                    },
                    {
                      id: "03",
                      title: "Motion Direction",
                      desc: "We use motion as a design tool — adding clarity, rhythm, and energy to digital experiences with intention."
                    },
                    {
                      id: "04",
                      title: "Framer Sites",
                      desc: "Design meets execution with real-time, scalable websites — all crafted natively inside Framer for speed and precision."
                    },
                    {
                      id: "05",
                      title: "UI/UX Design",
                      desc: "Crafting intuitive digital interfaces that prioritize user experience while maintaining aesthetic excellence."
                    },
                    {
                      id: "06",
                      title: "Creative Strategy",
                      desc: "Bridging the gap between business goals and creative execution through rigorous research and insight."
                    }
                  ].map((service) => (
                    <motion.div
                      key={service.id}
                      variants={{
                        hidden: { opacity: 0, x: -50 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                        }
                      }}
                      className="group border-b border-white/10 py-12 flex flex-col md:flex-row items-start md:items-center gap-8 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg overflow-hidden relative"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                      />
                      <span className="text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity relative z-10">{service.id}</span>
                      <div className="flex-1 relative z-10">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 group-hover:translate-x-4 transition-transform duration-500">
                          {service.title}
                        </h3>
                      </div>
                      <div className="md:w-1/3 relative z-10">
                        <p className="text-sm md:text-base text-white/60 leading-relaxed group-hover:text-white transition-colors duration-500">
                          {service.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </div>

          {/* Scroll Section 6: Selected Works Gallery */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="bg-black py-24 border-t border-white/10 flex flex-col justify-center">
              <div className="px-6 md:px-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row justify-between items-end gap-8"
                >
                  <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                    Selected<br />Works<span className="text-2xl md:text-4xl opacity-30 ml-4">(4)</span>
                  </h2>
                  <p className="text-white/40 max-w-xs text-sm uppercase tracking-widest leading-relaxed">
                    A curated archive of visual explorations, digital products, and artistic directions from the past decade.
                  </p>
                </motion.div>
              </div>

              <div className="px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <GalleryItem key={i} index={i} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Scroll Section 7: What I Do */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="p-6 md:p-12 py-24 border-t border-white/10 bg-black flex flex-col justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40"
                  >
                    What i do
                  </motion.span>
                </div>
                <div className="lg:col-span-8">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    className="flex flex-col gap-2"
                  >
                    {[
                      "WEBSITE DESIGN",
                      "FRAMER DEVELOPMENT",
                      "BRANDING",
                      "UX / UI DESIGN",
                      "BRAND STRATEGY",
                      "ART DIRECTION",
                      "DESIGN SYSTEM"
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="group flex items-center justify-between border-b border-white/5 py-4 cursor-default"
                      >
                        <h3 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter transition-all duration-500 ${i % 2 !== 0 ? 'opacity-40 group-hover:opacity-100' : 'opacity-100'}`}>
                          {item}
                        </h3>
                        <div className="w-0 h-[2px] bg-white group-hover:w-12 transition-all duration-500" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>
          </div>

          {/* Scroll Section 8: Work Experience */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="p-6 md:p-12 py-24 border-t border-white/10 bg-black flex flex-col justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40"
                  >
                    Work experience
                  </motion.span>
                </div>
                <div className="lg:col-span-8">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    className="flex flex-col"
                  >
                    {[
                      { role: "Art direction", company: "Google", years: "2025 - Now" },
                      { role: "Art director", company: "Owl studio", years: "2023 - 2025" },
                      { role: "Senior Designer", company: "Microsoft", years: "2022 - 2023" },
                      { role: "Senior Designer", company: "Meta", years: "2021 - 2022" }
                    ].map((exp, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="grid grid-cols-3 py-6 border-b border-white/5 text-xs md:text-sm group hover:bg-white/5 px-4 -mx-4 rounded-lg transition-colors"
                      >
                        <span className="font-medium opacity-60 group-hover:opacity-100">{exp.role}</span>
                        <span className="font-bold text-center">{exp.company}</span>
                        <span className="text-right opacity-60 group-hover:opacity-100">{exp.years}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>
          </div>

          {/* Scroll Section 9: Awards */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="p-6 md:p-12 py-24 border-t border-white/10 bg-black flex flex-col justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40"
                  >
                    Awards
                  </motion.span>
                </div>
                <div className="lg:col-span-8">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    className="flex flex-col"
                  >
                    {[
                      { name: "Vanguard", org: "Awwwards (SOTD)", year: "2025" },
                      { name: "Apex", org: "FWA ( SOTD )", year: "2024" },
                      { name: "Fabric", org: "Awwwards (SOTD)", year: "2025" },
                      { name: "Olive", org: "CSSDA (WOTD)", year: "2024" }
                    ].map((award, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="grid grid-cols-3 py-6 border-b border-white/5 text-xs md:text-sm group hover:bg-white/5 px-4 -mx-4 rounded-lg transition-colors"
                      >
                        <span className="font-medium opacity-60 group-hover:opacity-100">{award.name}</span>
                        <span className="font-bold text-center">{award.org}</span>
                        <span className="text-right opacity-60 group-hover:opacity-100">{award.year}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>
          </div>

          {/* Scroll Section 10: Blending Design and Code */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="p-6 md:p-12 py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden flex flex-col justify-center">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.04,
                        delayChildren: 0.3
                      }
                    }
                  }}
                  className="mb-24"
                >
                  <AnimatedHeadline />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                  <div className="lg:col-span-4">
                    <motion.div
                      initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a]"
                    >
                      <img
                        src="https://picsum.photos/seed/fashion-1/800/1200"
                        alt="Creative Portrait"
                        className="w-full h-full object-cover grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col md:flex-row gap-12 items-end">
                    <div className="flex-1">
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/60 leading-relaxed mb-8"
                      >
                        We bridge creative direction with real-world execution, combining design and development into one <span className="text-white font-bold">seamless workflow</span> to deliver digital experiences that are thoughtful, fast, and built to perform.
                      </motion.p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-white px-10 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all"
                      >
                        See Works
                      </motion.button>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                      whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                      className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden bg-[#1a1a1a]"
                    >
                      <img
                        src="https://picsum.photos/seed/eyes-1/1200/800"
                        alt="Creative Detail"
                        className="w-full h-full object-cover grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Subtle Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none glow-effect" />
            </section>
          </div>

          {/* Scroll Section 11: Floating Cards */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="bg-black py-24 border-t border-white/10 relative overflow-hidden flex flex-col">
              <div className="px-6 md:px-12 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-12">
                <span>© BRAND PARTNERS パートナー</span>
                <span>(WDX® — 08)</span>
                <span className="hidden md:block">CREATIVE DIRECTION</span>
              </div>

              <div className="flex-1 relative">
                {[
                  { id: 1, img: "car-1", label: "", x: "20%", y: "10%", w: "300px", h: "150px", speed: 40 },
                  { id: 2, img: "manila-1", label: "Manila.", x: "70%", y: "5%", w: "250px", h: "350px", speed: -60 },
                  { id: 3, img: "sofa-1", label: "", x: "75%", y: "55%", w: "200px", h: "250px", speed: 30 },
                  { id: 4, img: "sunset-1", label: ".olzo", x: "60%", y: "70%", w: "280px", h: "200px", speed: -40 },
                  { id: 5, img: "house-1", label: ".olzo", x: "35%", y: "80%", w: "320px", h: "180px", speed: 50 },
                  { id: 6, img: "typewriter-1", label: "Analog", x: "10%", y: "40%", w: "220px", h: "280px", speed: -30 },
                  { id: 7, img: "mountain-1", label: "Peak", x: "45%", y: "15%", w: "180px", h: "240px", speed: 20 },
                  { id: 8, img: "ocean-1", label: "Deep", x: "85%", y: "30%", w: "240px", h: "180px", speed: -50 },
                  { id: 9, img: "forest-1", label: "Wild", x: "5%", y: "75%", w: "260px", h: "200px", speed: 60 },
                  { id: 10, img: "city-1", label: "Grid", x: "50%", y: "50%", w: "200px", h: "200px", speed: -25 },
                  { id: 11, img: "abstract-1", label: "Form", x: "30%", y: "5%", w: "150px", h: "150px", speed: 45 },
                  { id: 12, img: "portrait-2", label: "Soul", x: "80%", y: "80%", w: "180px", h: "260px", speed: -35 },
                  { id: 13, img: "architecture-1", label: "Structure", x: "15%", y: "60%", w: "280px", h: "160px", speed: 15 },
                  { id: 14, img: "minimal-1", label: "Less", x: "55%", y: "85%", w: "200px", h: "120px", speed: -45 },
                  { id: 15, img: "tech-1", label: "Future", x: "90%", y: "10%", w: "120px", h: "180px", speed: 55 },
                ].map((card) => (
                  <Card
                    key={card.id}
                    {...card}
                    smoothX={smoothX}
                    smoothY={smoothY}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Scroll Section 12: Social Links Bar */}
          <div className="scroll-section min-h-screen flex flex-col justify-center">
            <section className="border-y border-white/10 bg-black">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-2 md:grid-cols-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]"
              >
                {[
                  { name: "INSTA", link: "#" },
                  { name: "LNKDN", link: "#" },
                  { name: "X", link: "#" },
                  { name: "DRIBBLE", link: "#" },
                  { name: "Bē", link: "#" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    className={`p-6 flex items-center justify-center gap-1 border-white/10 ${i !== 4 ? 'md:border-r' : ''} ${i % 2 === 0 ? 'border-r md:border-r' : ''} transition-colors group`}
                  >
                    {social.name} <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">↗</span>
                  </motion.a>
                ))}
              </motion.div>
            </section>

            <FAQSection />
            <ContactSection />
            <StudioFooter />
          </div>
        </motion.main>
      </PageTransition>
    </div>
  );
}

function Card({ img, label, x, y, w, h, speed, smoothX, smoothY }: any) {
  const translateX = useTransform(smoothX, (v: number) => v * speed);
  const translateY = useTransform(smoothY, (v: number) => v * speed);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { damping: 25, stiffness: 200 });
  const springTiltY = useSpring(tiltY, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    tiltX.set(y * 12);
    tiltY.set(x * -12);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        x: translateX,
        y: translateY,
        rotateX: springTiltX,
        rotateY: springTiltY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="absolute rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-2xl group cursor-pointer perspective-1000 will-change-transform"
    >
      <motion.div
        style={{ transform: "translateZ(30px)" }}
        className="w-full h-full relative"
      >
        <img
          src={`https://picsum.photos/seed/${img}/400/400`}
          alt={label || "Artistic visual"}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Simplified Scanline Effect */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none opacity-20" />
      </motion.div>
      {label && (
        <div
          style={{ transform: "translateZ(60px)" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-white text-2xl font-bold tracking-tighter drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {label}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
    </motion.div>
  );
}
