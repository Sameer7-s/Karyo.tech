import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="w-full bg-black py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/30 block mb-4">
            Stay Updated
          </span>
          <h3
            className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Join our newsletter
          </h3>
          <p className="text-sm text-white/40 mb-8 max-w-md">
            Thoughts on design, AI, and creative direction — sent occasionally,
            when there's something worth saying.
          </p>

          <div className="relative w-full max-w-md group">
            <input
              type="email"
              placeholder="YOUR EMAIL HERE"
              className="w-full bg-white/[0.03] border border-white/10 py-4 px-6 pr-14 rounded-full text-[11px] font-bold tracking-widest uppercase focus:outline-none focus:border-[#4FC3F7]/40 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(79,195,247,0.08)] transition-all duration-300 placeholder:text-white/25 text-white"
            />
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#4FC3F7" }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
