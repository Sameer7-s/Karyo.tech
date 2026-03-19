import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const services = [
  {
    id: 0,
    index: "01",
    title: "Branding",
    description: "We create impactful brand identities that connect.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 1,
    index: "02",
    title: "Development",
    description: "We build seamless, scalable digital products.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 2,
    index: "03",
    title: "Websites",
    description: "We develop powerful platforms that grow with your needs.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 3,
    index: "04",
    title: "Art Direction",
    description: "We create visual narratives that resonate with your audience.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=1000&fit=crop&q=80",
  },
];

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = services[activeIndex];

  return (
    <section className="w-full bg-black py-24 md:py-32 lg:py-40">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 xl:gap-24">
          {/* LEFT — Dynamic Image Card */}
          <div className="w-full max-w-[380px] lg:max-w-none lg:w-[40%] flex-shrink-0">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#111]">
              {/* Image with crossfade */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={active.title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Description text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-white text-sm md:text-base font-medium leading-relaxed"
                    style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}
                  >
                    {active.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT — Services List */}
          <div
            className="w-full lg:w-[60%] flex flex-col justify-center"
            onMouseLeave={() => setActiveIndex(0)}
          >
            {services.map((service) => {
              const isActive = service.id === activeIndex;

              return (
                <motion.div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(service.id)}
                  onClick={() => setActiveIndex(service.id)}
                  className="relative border-b border-white/10 cursor-pointer"
                  animate={{
                    paddingTop: isActive ? 28 : 20,
                    paddingBottom: isActive ? 28 : 20,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Service title */}
                    <motion.h3
                      animate={{
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)",
                        scale: isActive ? 1 : 0.98,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] origin-left"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* Index number */}
                    <motion.span
                      animate={{
                        color: isActive ? "#ef4444" : "rgba(255,255,255,0.25)",
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="text-xs md:text-sm font-normal mt-1"
                      style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}
                    >
                      {`{${service.index}}`}
                    </motion.span>
                  </div>

                  {/* Active indicator bar */}
                  <motion.div
                    className="absolute left-0 bottom-0 h-[1px] bg-white/30"
                    initial={{ width: "0%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
