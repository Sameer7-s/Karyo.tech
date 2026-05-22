import React, { useEffect } from "react";
import { SparklesCore } from "./ui/sparkles";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "motion/react";

/* ─────────────────────────────────────────
   Interactive KARYO Letter
───────────────────────────────────────── */
function Letter({ char }: { char: string; [key: string]: any }) {
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
   Wave Item
───────────────────────────────────────── */
function WaveItem({ i, scrollProgress }: { i: number; scrollProgress?: MotionValue<number>; [key: string]: any }) {
    const fallback = useMotionValue(0);
    const progress = scrollProgress || fallback;
    const waveScale = useTransform(progress, [0, 1], [1, 1.5 + i * 0.5]);
    const waveOpacity = useTransform(progress, [0, 0.5, 1], [1, 0.5, 0]);
    const waveY = useTransform(progress, [0, 1], [0, 50 * (i + 1)]);

    return (
        <motion.div
            style={{ scaleX: waveScale, opacity: waveOpacity, y: waveY }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 + i * 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`h-[1px] w-full bg-gradient-to-r from-transparent via-[#4FC3F7]/30 to-transparent blur-[1px]${i === 1 ? ' w-[70%] opacity-50' : ''}`}
        />
    );
}

/* ─────────────────────────────────────────
   Main Intro Component
   Props: scrollProgress + smoothX/Y passed from App to avoid duplicate listeners
───────────────────────────────────────── */
interface IntroProps {
    scrollProgress?: MotionValue<number>;
    smoothX?: MotionValue<number>;
    smoothY?: MotionValue<number>;
}

export function Intro({ scrollProgress, smoothX, smoothY }: IntroProps) {
    // Fall back to local motion values if not provided (standalone usage)
    const localMouseX = useMotionValue(0);
    const localMouseY = useMotionValue(0);

    const activeX = smoothX || localMouseX;
    const activeY = smoothY || localMouseY;

    // 3D parallax — only attach listener if props not supplied
    useEffect(() => {
        if (smoothX && smoothY) return; // parent already tracking mouse

        const handleMouseMove = (e: MouseEvent) => {
            localMouseX.set(e.clientX);
            localMouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [smoothX, smoothY, localMouseX, localMouseY]);

    // Smooth springs for 3D parallax — derived from the unified motion values
    const halfW = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const halfH = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    // When smoothX/Y are from App, they're already -0.5…0.5 (normalized).
    // When local, they're raw px values. Scale accordingly.
    const isNormalized = !!smoothX;
    const rotateX = useSpring(useTransform(activeY, (y) => isNormalized ? y * -5 : (y - halfH) * -0.008), { damping: 30, stiffness: 100 });
    const rotateY = useSpring(useTransform(activeX, (x) => isNormalized ? x * 5 : (x - halfW) * 0.008), { damping: 30, stiffness: 100 });
    const translX = useSpring(useTransform(activeX, (x) => isNormalized ? x * 8 : (x - halfW) * 0.012), { damping: 35, stiffness: 80 });
    const translY = useSpring(useTransform(activeY, (y) => isNormalized ? y * 8 : (y - halfH) * 0.012), { damping: 35, stiffness: 80 });

    const titleLetters = "KARYO".split("");

    // Scroll-reactive transforms for sparkle center line
    const scrollFallback = useMotionValue(0);
    const scrollVal = scrollProgress || scrollFallback;
    const sparkleOpacity = useTransform(scrollVal, [0, 0.4, 0.8], [1, 0.5, 0]);
    const sparkleScaleX = useTransform(scrollVal, [0, 1], [1, 1.4]);
    const sparkleY = useTransform(scrollVal, [0, 1], [0, 80]);

    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative selection:bg-[#4FC3F7] selection:text-black">

            {/* ── Background: Deep Starfield ── */}
            <div className="absolute inset-0 z-0 scale-110" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
                <SparklesCore
                    id="heroStarsDense"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.1}
                    particleDensity={80}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.3}
                />
            </div>

            {/* ── Background: Cyber Blue Highlights ── */}
            <div className="absolute inset-0 z-0" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
                <SparklesCore
                    id="heroStarsBlue"
                    background="transparent"
                    minSize={0.8}
                    maxSize={1.8}
                    particleDensity={20}
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
                    className="relative"
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
                    {[0, 1].map((i) => (
                        <WaveItem key={i} i={i} scrollProgress={scrollProgress} />
                    ))}
                </div>

                {/* Dense Sparkle Center Line (Scroll Reactive) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        opacity: sparkleOpacity,
                        scaleX: sparkleScaleX,
                        y: sparkleY
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
                        particleDensity={600}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                        speed={0.2}
                    />
                    {/* Shadow Mask to fade particles vertically */}
                    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(40%_50%_at_top,transparent_0%,white_100%)] opacity-80" />
                </motion.div>
            </div>

            {/* ── Cinematic Transition Blur & Gradient Fade ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[30vh] md:h-[40vh] pointer-events-none z-10"
                style={{
                    background: "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,1) 100%)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    maskImage: "linear-gradient(to bottom, transparent, black 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 100%)"
                }}
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

                {/* Animated Scroll Pill */}
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
