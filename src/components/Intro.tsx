"use client";
import React, { useState, useEffect, useRef } from "react";
import { SparklesCore } from "./ui/sparkles";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   Glassmorphism Navbar
───────────────────────────────────────── */
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = ["Home", "Gallery", "Work", "Contact"];

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[99998]"
        >
            <div
                className={`mx-4 mt-4 rounded-2xl border border-white/10 px-6 py-3 transition-all duration-500 ${scrolled
                        ? "bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                        : "bg-white/[0.03] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                    }`}
                style={{
                    background: scrolled
                        ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                }}
            >
                <div className="grid grid-cols-3 items-center gap-4">

                    {/* LEFT — Brand */}
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-base font-bold tracking-[0.12em] text-white select-none">
                            KARYO<span className="text-[10px] align-super ml-0.5 opacity-60">®</span>
                        </span>
                    </motion.div>

                    {/* CENTER — Nav Links (desktop) */}
                    <div className="hidden md:flex flex-col items-center gap-1">
                        <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/30 mb-1">
                            Quick Links
                        </span>
                        <nav className="flex items-center gap-7">
                            {links.map((link, i) => (
                                <motion.a
                                    key={link}
                                    href="#"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 group transition-colors duration-300 hover:text-[#4FC3F7]"
                                >
                                    {link}
                                    {/* hover underline glow */}
                                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#4FC3F7] shadow-[0_0_8px_#4FC3F7] transition-all duration-300 group-hover:w-full rounded-full" />
                                    {/* hover top glow dot */}
                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4FC3F7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_6px_#4FC3F7]" />
                                </motion.a>
                            ))}
                        </nav>
                    </div>

                    {/* RIGHT — Info text (desktop) + hamburger (mobile) */}
                    <div className="flex items-center justify-end gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="hidden md:flex flex-col items-end text-right"
                        >
                            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                                Based in Tokyo 東京
                            </span>
                            <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-white/25">
                                Art Director + Framer Developer
                            </span>
                        </motion.div>

                        {/* Hamburger (mobile only) */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 5.5, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="block h-[1.5px] bg-white/80 rounded-full origin-center"
                                style={{ width: 20 }}
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                                className="block h-[1.5px] bg-white/80 rounded-full"
                                style={{ width: 14 }}
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -5.5, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="block h-[1.5px] bg-white/80 rounded-full origin-center"
                                style={{ width: 20 }}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-4 mt-2 rounded-2xl border border-white/10 overflow-hidden origin-top"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                        }}
                    >
                        <nav className="flex flex-col px-6 py-4 gap-4">
                            {links.map((link, i) => (
                                <motion.a
                                    key={link}
                                    href="#"
                                    onClick={() => setMenuOpen(false)}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-[#4FC3F7] transition-colors duration-300"
                                >
                                    {link}
                                </motion.a>
                            ))}
                            <div className="border-t border-white/10 pt-3 mt-1">
                                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Based in Tokyo 東京</p>
                                <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-white/20 mt-1">Art Director + Framer Developer</p>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

/* ─────────────────────────────────────────
   Cursor Parallax for Particles
───────────────────────────────────────── */
function useParallaxMouse(sensitivity = 0.02) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, { damping: 40, stiffness: 80 });
    const smoothY = useSpring(y, { damping: 40, stiffness: 80 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            x.set((e.clientX / window.innerWidth - 0.5) * sensitivity * 120);
            y.set((e.clientY / window.innerHeight - 0.5) * sensitivity * 120);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [x, y, sensitivity]);

    return { smoothX, smoothY };
}

/* ─────────────────────────────────────────
   Main Intro Component
───────────────────────────────────────── */
export function Intro() {
    const { smoothX, smoothY } = useParallaxMouse(0.025);

    // Translate particles slightly on cursor move for parallax depth
    const layer1X = useTransform(smoothX, v => v * 1.0);
    const layer1Y = useTransform(smoothY, v => v * 1.0);
    const layer2X = useTransform(smoothX, v => v * 1.6);
    const layer2Y = useTransform(smoothY, v => v * 1.6);

    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">

            {/* ── Glassmorphism Navbar ── */}
            <Navbar />

            {/* ── Particle Background Layer 1 (white stars, parallax) ── */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ x: layer1X, y: layer1Y }}
            >
                <SparklesCore
                    id="tsparticlesIntroWhite"
                    background="transparent"
                    minSize={0.5}
                    maxSize={1.2}
                    particleDensity={90}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.7}
                />
            </motion.div>

            {/* ── Particle Background Layer 2 (blue highlights, deeper parallax) ── */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ x: layer2X, y: layer2Y }}
            >
                <SparklesCore
                    id="tsparticlesIntroBlue"
                    background="transparent"
                    minSize={0.8}
                    maxSize={1.8}
                    particleDensity={35}
                    className="w-full h-full"
                    particleColor="#4FC3F7"
                    speed={0.4}
                />
            </motion.div>

            {/* ── Central hero content ── */}
            <div className="relative z-20 flex flex-col items-center text-center px-6">

                {/* KARYO Title with glow */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[18vw] md:text-[15vw] lg:text-[13vw] font-black tracking-tighter leading-[0.85] text-white uppercase select-none"
                    style={{
                        textShadow: "0 0 80px rgba(79,195,247,0.25), 0 0 200px rgba(79,195,247,0.1)",
                    }}
                >
                    KARYO
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.55, y: 0 }}
                    transition={{ duration: 1.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-5 text-[10px] md:text-sm lg:text-base font-light text-white tracking-[0.4em] uppercase"
                >
                    Build.&nbsp; Automate.&nbsp; Scale.
                </motion.p>

                {/* Glowing separator line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-8 origin-center"
                >
                    <div className="relative w-64 md:w-96 h-px">
                        {/* Base line */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4FC3F7]/60 to-transparent rounded-full" />
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent rounded-full blur-sm opacity-60" />
                    </div>
                </motion.div>

                {/* Dense center sparkle burst (original) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.4 }}
                    className="relative w-[32rem] max-w-[90vw] h-32 mt-2"
                >
                    {/* Side gradients */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 2.2, delay: 0.6, ease: "easeInOut" }}
                        className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm origin-center"
                    />
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 2.2, delay: 0.9, ease: "easeInOut" }}
                        className="absolute inset-x-16 top-0 h-[5px] w-[60%] bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm origin-center"
                    />
                    <SparklesCore
                        background="transparent"
                        minSize={0.3}
                        maxSize={0.9}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                    {/* Mask */}
                    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(320px_180px_at_top,transparent_20%,white)]" />
                </motion.div>
            </div>

            {/* ── Ambient bottom glow (scroll glow effect) ── */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 3, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px origin-center"
            >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#4FC3F7]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4FC3F7]/20 to-transparent blur-xl" />
            </motion.div>

            {/* ── Scroll Indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/30">
                    Scroll to Explore
                </span>
                {/* Animated pill */}
                <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
                    <motion.div
                        animate={{ y: [0, 10, 0], opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-1.5 rounded-full bg-[#4FC3F7] shadow-[0_0_6px_#4FC3F7]"
                    />
                </div>
            </motion.div>
        </div>
    );
}
