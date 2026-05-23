import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "motion/react";
import { SparklesCore } from "./ui/sparkles";

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
            className="inline-block text-white opacity-95"
        >
            {char}
        </motion.span>
    );
}

interface IntroProps {
    scrollProgress?: MotionValue<number>;
    smoothX?: MotionValue<number>;
    smoothY?: MotionValue<number>;
}

export function Intro({ scrollProgress, smoothX, smoothY }: IntroProps) {
    const localMouseX = useMotionValue(0);
    const localMouseY = useMotionValue(0);

    const activeX = smoothX || localMouseX;
    const activeY = smoothY || localMouseY;

    useEffect(() => {
        if (smoothX && smoothY) return;

        const handleMouseMove = (e: MouseEvent) => {
            localMouseX.set(e.clientX);
            localMouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [smoothX, smoothY, localMouseX, localMouseY]);

    const halfW = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const halfH = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    const isNormalized = !!smoothX;
    const rotateX = useSpring(useTransform(activeY, (y) => isNormalized ? y * -5 : (y - halfH) * -0.008), { damping: 30, stiffness: 100 });
    const rotateY = useSpring(useTransform(activeX, (x) => isNormalized ? x * 5 : (x - halfW) * 0.008), { damping: 30, stiffness: 100 });
    const translX = useSpring(useTransform(activeX, (x) => isNormalized ? x * 8 : (x - halfW) * 0.012), { damping: 35, stiffness: 80 });
    const translY = useSpring(useTransform(activeY, (y) => isNormalized ? y * 8 : (y - halfH) * 0.012), { damping: 35, stiffness: 80 });

    const titleLetters = "KARYO".split("");

    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative selection:bg-white selection:text-black">
            
            {/* ── Background: White Dot Sparkles ── */}
            <div className="absolute inset-0 z-0 scale-110" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
                <SparklesCore
                    id="heroStarsDense"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.5}
                    particleDensity={80}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.4}
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
                        className="text-[25vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] font-black font-orbitron tracking-tighter leading-[0.8] uppercase select-none relative max-w-full overflow-hidden animate-blink"
                    >
                        {titleLetters.map((char, i) => (
                            <Letter key={i} char={char} />
                        ))}
                    </motion.h1>
                </motion.div>

                {/* Tagline Animation */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-8 text-sm md:text-base font-medium text-white/50 tracking-widest uppercase w-full overflow-hidden"
                >
                    <span className="block translate-y-0">Build. Automate. Scale.</span>
                </motion.p>
            </div>
            
            {/* Minimal Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40 opacity-50 hover:opacity-100 transition-opacity"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white">
                    Scroll
                </span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </div>
    );
}
