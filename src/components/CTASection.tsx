import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-black py-32 md:py-44 relative overflow-hidden">
      {/* Subtle white radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white opacity-[0.04] blur-[140px] rounded-full" />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-white/30 block mb-6">
            Ready to Start?
          </span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-8"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/50">
              Extraordinary
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/45 max-w-xl mb-12 leading-relaxed">
            Whether you need AI automation, a premium website, or a complete
            brand overhaul — we're ready to make it happen.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-base md:text-lg overflow-hidden transition-colors duration-500 hover:text-white"
          >
            <span className="absolute inset-0 w-full h-full bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-3">
              Let's Work Together
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
