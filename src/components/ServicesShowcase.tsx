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
    description: "We build scalable digital systems with clean code.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 2,
    index: "03",
    title: "Websites",
    description: "We design responsive websites that perform beautifully.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 3,
    index: "04",
    title: "Art Direction",
    description: "We craft visual direction with clarity and style.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 4,
    index: "05",
    title: "SEO Optimization",
    description: "We improve visibility, ranking, and search performance.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 5,
    index: "06",
    title: "AI Automation",
    description: "We automate workflows using smart AI-powered systems.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop&q=80",
  },
];

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  // Framer Motion variants for heading hover translation
  const itemVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -4 },
  };

  return (
    <section className="w-full bg-black py-16 md:py-24 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-stretch">
          
          {/* LEFT — Dynamic Image Card */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full">
            <div className="absolute inset-0 w-full h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full overflow-hidden rounded-[24px] bg-[#0d0d0d] shadow-2xl border border-white/[0.05]"
              >
                {/* Image with crossfade */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={active.title}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-10" />

                {/* Bottom-left Caption Text */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12 z-20">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-white text-lg md:text-xl font-medium tracking-tight max-w-[85%] leading-snug"
                    >
                      {active.description}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT — Services List */}
          <div className="flex flex-col justify-between h-full">
            {services.map((service) => {
              const isActive = service.id === activeIndex;

              return (
                <motion.div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(service.id)}
                  onClick={() => setActiveIndex(service.id)}
                  initial="initial"
                  whileHover="hover"
                  className="relative cursor-pointer py-6 lg:py-8 first:pt-0 last:pb-0 group"
                >
                  {/* Service Text & Index Container */}
                  <motion.div
                    variants={itemVariants}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-start gap-4 origin-left"
                  >
                    {/* Service Title */}
                    <h3
                      className={`font-semibold tracking-tight transition-colors duration-300 text-[clamp(2.2rem,6vw,3.5rem)] lg:text-[clamp(3rem,4.5vw,4.8rem)] leading-none select-none ${
                        isActive ? "text-white" : "text-white/30 group-hover:text-white/70"
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Small index number */}
                    <span
                      className={`text-xs md:text-sm font-medium font-mono mt-1 lg:mt-2 transition-all duration-300 ${
                        isActive
                          ? "text-white opacity-100 scale-100"
                          : "text-white/30 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:text-white/70"
                      }`}
                    >
                      {`{${service.index}}`}
                    </span>
                  </motion.div>

                  {/* Thin divider line (remains static) */}
                  <div
                    className={`absolute left-0 right-0 bottom-0 h-[1px] transition-colors duration-300 ${
                      isActive ? "bg-white/40" : "bg-white/10 group-hover:bg-white/20"
                    }`}
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
