"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "./ui/sparkles";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Navbar } from "./Navbar";

/* ─────────────────────────────────────────
   Interactive KARYO Letter
───────────────────────────────────────── */
function Letter({ char }: { char: string;[key: string]: any }) {
    return (
        <motion.span
            variants={{
                hidden: { opacity: 0, y: 40, scale: 0.85 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                }
            }}
            className="inline-block karyo-letter-glow text-white opacity-95"
        >
            {char}
        </motion.span>
    );
}

/* ─────────────────────────────────────────
   Main Intro Component
───────────────────────────────────────── */
export function Intro({ scrollProgress }: { scrollProgress?: any }) {
    // Mouse tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for 3D parallax
    const rotateX = useSpring(useTransform(mouseY, (y: number) => (y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.008), { damping: 30, stiffness: 100 });
    const rotateY = useSpring(useTransform(mouseX, (x: number) => (x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.008), { damping: 30, stiffness: 100 });
    const translX = useSpring(useTransform(mouseX, (x: number) => (x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.012), { damping: 35, stiffness: 80 });
    const translY = useSpring(useTransform(mouseY, (y: number) => (y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.012), { damping: 35, stiffness: 80 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const titleLetters = "KARYO".split("");

    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative selection:bg-[#4FC3F7] selection:text-black">
            <Navbar />

            {/* ── Background: Deep Starfield ── */}
            <div className="absolute inset-0 z-0 scale-110">
                <SparklesCore
                    id="heroStarsDense"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.1}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.3}
                />
            </div>

            {/* ── Background: Cyber Blue Highlights ── */}
            <div className="absolute inset-0 z-0">
                <SparklesCore
                    id="heroStarsBlue"
                    background="transparent"
                    minSize={0.8}
                    maxSize={1.8}
                    particleDensity={25}
                    className="w-full h-full"
                    particleColor="#4FC3F7"
                    speed={0.5}
                />
            </div>

            {/* ── Central Hero Content Container ── */}
            <div className="relative z-20 flex flex-col items-center text-center px-6 perspective-[1500px]">

                {/* 3D Parallax Title Group */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        x: translX,
                        y: translY,
                        transformStyle: "preserve-3d"
                    }}
                    className="relative active:scale-95 transition-transform duration-500"
                >
                    {/* Cinematic Title Reveal */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: { staggerChildren: 0.08, delayChildren: 0.4 }
                            }
                        }}
                        className="text-[25vw] sm:text-[22vw] md:text-[18vw] font-black tracking-[-0.04em] leading-[0.8] uppercase select-none relative max-w-full overflow-hidden"
                    >
                        {titleLetters.map((char, i) => (
                            <Letter key={i} char={char} />
                        ))}
                    </motion.h1>

                    {/* Ambient Glow behind title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 -z-10 bg-radial-gradient from-[#4FC3F7]/15 via-transparent to-transparent"
                        style={{ transform: "translateZ(-40px)" }}
                    />
                </motion.div>

                {/* Tagline Animation */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 text-[10px] md:text-xs lg:text-sm font-light text-white tracking-[0.5em] uppercase w-full overflow-hidden"
                >
                    <span className="block translate-y-0">Build.&nbsp; Automate.&nbsp; Scale.</span>
                </motion.p>

                {/* Energy Pulse Waves Below Title (Scroll Reactive) */}
                <div className="relative w-full max-w-lg mt-12 flex flex-col items-center gap-4">
                    {[0, 1].map((i) => {
                        // Waves expand and fade as user scrolls
                        const waveScale = useTransform(scrollProgress || useMotionValue(0), [0, 1], [1, 1.5 + i * 0.5]);
                        const waveOpacity = useTransform(scrollProgress || useMotionValue(0), [0, 0.5, 1], [1, 0.5, 0]);
                        const waveY = useTransform(scrollProgress || useMotionValue(0), [0, 1], [0, 50 * (i + 1)]);

                        return (
                            <motion.div
                                key={i}
                                style={{ scaleX: waveScale, opacity: waveOpacity, y: waveY }}
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 2, delay: 1.5 + i * 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className={`h-[1px] w-full bg-gradient-to-r from-transparent via-[#4FC3F7]/30 to-transparent blur-[1px] ${i === 1 ? 'w-[70%] opacity-50' : ''} animate-energy-pulse`}
                            />
                        );
                    })}
                </div>

                {/* Dense Sparkle Center Line (Scroll Reactive) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        opacity: useTransform(scrollProgress || useMotionValue(0), [0, 0.4, 0.8], [1, 0.5, 0]),
                        scaleX: useTransform(scrollProgress || useMotionValue(0), [0, 1], [1, 1.4]),
                        y: useTransform(scrollProgress || useMotionValue(0), [0, 1], [0, 80])
                    }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="relative w-[40rem] max-w-[90vw] h-24 mt-6 pointer-events-none"
                >
                    {/* Horizontal Laser Line */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                        className="absolute inset-x-0 top-0 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent blur-sm origin-center"
                    />
                    <SparklesCore
                        background="transparent"
                        minSize={0.2}
                        maxSize={0.8}
                        particleDensity={1000}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                        speed={0.2}
                    />
                    {/* Shadow Mask to fade particles vertically */}
                    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(40%_50%_at_top,transparent_0%,white_100%)] opacity-80" />
                </motion.div>
            </div>

            {/* ── Cinematic Ambient Bottom Glow ── */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2.5, delay: 1.8 }}
                className="absolute bottom-0 left-0 right-0 h-[25vh] bg-gradient-to-t from-[#4FC3F7]/10 to-transparent pointer-events-none z-10"
            />

            {/* ── Scroll Indicator Overlay ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40"
            >
                <div className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[8px] uppercase tracking-[0.5em] font-black text-white">
                        Discovery
                    </span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </div>

                {/* Advanced Animated Scroll Pill */}
                <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2 bg-white/5 backdrop-blur-sm shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                    <motion.div
                        animate={{
                            y: [0, 14, 0],
                            opacity: [0, 1, 0],
                            scaleY: [1, 1.5, 1]
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-2 rounded-full bg-[#4FC3F7] shadow-[0_0_10px_#4FC3F7]"
                    />
                </div>
            </motion.div>
        </div>
    );
}
