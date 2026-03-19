import { useState } from "react";
import { motion } from "motion/react";

const services = [
  {
    id: "01",
    title: "Art Direction",
    description:
      "We guide every visual decision from start to finish, ensuring clarity, emotion, and impact across every touchpoint.",
  },
  {
    id: "02",
    title: "Brand Identity",
    description:
      "From strategy to execution, we shape consistent brand systems that speak clearly and feel uniquely ownable.",
  },
  {
    id: "03",
    title: "Motion Direction",
    description:
      "We use motion as a design tool — adding clarity, rhythm, and energy to digital experiences with intention.",
  },
  {
    id: "04",
    title: "Framer Sites",
    description:
      "Design meets execution with real-time, scalable websites — all crafted natively inside Framer for speed and precision.",
  },
];

export function ServicesList() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full bg-black py-24 md:py-32 lg:py-40">
      <div
        className="max-w-[1300px] mx-auto px-6 md:px-12"
        onMouseLeave={() => setHoveredId(null)}
      >
        {services.map((service) => {
          const isActive = hoveredId === service.id;
          const isAnyHovered = hoveredId !== null;
          const isDimmed = isAnyHovered && !isActive;

          return (
            <motion.div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onClick={() => setHoveredId(service.id)}
              className="border-b border-white/[0.08] cursor-pointer py-10 md:py-14"
              animate={{
                opacity: isDimmed ? 0.35 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Left: Index + Title */}
                <div className="flex items-center gap-4 md:gap-6 flex-1">
                  <motion.span
                    animate={{
                      color: isActive
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.25)",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-xs md:text-sm font-normal w-6 flex-shrink-0"
                    style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}
                  >
                    {service.id}
                  </motion.span>

                  <motion.h3
                    animate={{
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.02em] origin-left"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {service.title}
                  </motion.h3>
                </div>

                {/* Right: Description */}
                <motion.p
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    color: isActive
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.5)",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="md:w-[38%] md:flex-shrink-0 text-sm md:text-[15px] leading-relaxed pl-10 md:pl-0"
                  style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}
                >
                  {service.description}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
