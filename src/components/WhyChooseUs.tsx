import { motion } from "motion/react";
import { 
  Scissors, 
  Heart, 
  Sparkles, 
  Brush, 
  Flower2, 
  Palette, 
  Droplet, 
  Eye 
} from "lucide-react";

const services = [
  {
    icon: <Scissors className="w-6 h-6" />,
    title: "Hair Styling",
    description: "Couture cuts & cinematic blowouts.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Bridal Makeup",
    description: "Heirloom looks for your day.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Facial Treatment",
    description: "Lit-from-within glow rituals.",
  },
  {
    icon: <Brush className="w-6 h-6" />,
    title: "Nail Art",
    description: "Hand-painted, gallery-worthy nails.",
  },
  {
    icon: <Flower2 className="w-6 h-6" />,
    title: "Spa & Massage",
    description: "Restorative body ceremonies.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Hair Coloring",
    description: "Custom-blended dimension.",
  },
  {
    icon: <Droplet className="w-6 h-6" />,
    title: "Skin Care",
    description: "Personalised dermal science.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Eyebrow Styling",
    description: "Architectural brow design.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full bg-black py-20 sm:py-28 md:py-32 lg:py-40 relative border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/50 block mb-4">
            — Our Rituals
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Curated <span className="italic text-gradient">beauty</span> services
          </h2>
          <p className="mt-6 text-white/60 md:text-lg">
            Every ritual is tailored to your features, your mood, your moment.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:shadow-luxe hover:-translate-y-1"
            >
              {/* Card Background Animations */}
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-soft"></div>
                <div className="shimmer absolute inset-0"></div>
              </div>

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-luxe text-black shadow-glow transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                {item.icon}
              </div>

              {/* Content */}
              <h3
                className="mt-8 text-2xl font-semibold tracking-tight text-white transition-colors duration-500"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>

              {/* Hover Action */}
              <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/40">
                <span className="underline-grow">Discover</span>
                <span className="transition-transform duration-500 group-hover:translate-x-2 text-gradient">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
