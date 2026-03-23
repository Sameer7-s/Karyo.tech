import React from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

export function AnimatedHeadline() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const spotY = useSpring(mouseY, { damping: 30, stiffness: 100 });


  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)`;

  const lines = [
    "Blending design and code with functional clarity and creative precision.",
    "Delivering thoughtful digital systems with structure, flow, and expressive interaction."
  ];

  return (
    <section className="p-4 sm:p-6 md:p-12 py-20 sm:py-28 md:py-40 bg-[#0A0A0A] relative overflow-hidden">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="max-w-7xl mx-auto relative group z-10"
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-6xl lg:text-[5.2rem] font-bold leading-[1.1] tracking-tight text-white/20 transition-colors duration-700 group-hover:text-white/10 flex flex-wrap items-center"
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

          {/* Spotlight Layer (Lime Green / Gradient) */}
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
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-6xl lg:text-[5.2rem] font-bold leading-[1.1] tracking-tight text-white flex flex-wrap items-center"
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
    </section>
  );
}
