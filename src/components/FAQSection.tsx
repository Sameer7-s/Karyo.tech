import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const faqs = [
  {
    question: "How do you integrate AI into existing business workflows?",
    answer:
      "We design AI systems that plug directly into your current operations — from customer support and automation to internal tools and analytics — without disrupting your existing workflow.",
  },
  {
    question: "How long does it take to launch an AI solution?",
    answer:
      "Most projects move from strategy to deployment within a few weeks depending on complexity, integrations, and scale requirements.",
  },
  {
    question: "Can you build custom AI tools for our business?",
    answer:
      "Yes. Every solution is tailored around your workflows, goals, and infrastructure — whether it's AI automation, internal dashboards, chat systems, or intelligent agents.",
  },
  {
    question: "Do you provide support after deployment?",
    answer:
      "We continue optimizing, monitoring, and improving your systems after launch to ensure long-term performance, reliability, and scalability.",
  },
];

function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_PREMIUM }}
      className="relative"
    >
      <motion.div
        layout
        whileHover={{ scale: isOpen ? 1 : 1.008 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`
          relative overflow-hidden rounded-2xl border transition-colors duration-500
          ${
            isOpen
              ? "border-white/20 bg-white/[0.05] shadow-[0_0_60px_rgba(255,255,255,0.06)] backdrop-blur-xl"
              : "border-white/[0.08] bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]"
          }
        `}
      >
        {/* Active glow */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
            />
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="group relative z-10 w-full flex items-start gap-4 sm:gap-6 md:gap-8 text-left p-5 sm:p-6 md:p-8"
        >
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] pt-2 shrink-0 transition-colors duration-500 ${
              isOpen ? "text-white/70" : "text-white/30"
            }`}
          >
            {num}
          </span>

          <div className="flex-1 min-w-0 flex items-start justify-between gap-4 sm:gap-6">
            <motion.span
              layout
              className={`text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-bold tracking-tight leading-snug pr-2 transition-all duration-500 group-hover:translate-x-1 ${
                isOpen ? "text-white" : "text-white/90"
              }`}
            >
              {question}
            </motion.span>

            <motion.div
              animate={{
                rotate: isOpen ? 45 : 0,
                scale: isOpen ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className={`
                w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full border flex items-center justify-center
                transition-colors duration-500
                ${
                  isOpen
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/50 group-hover:border-white/25"
                }
              `}
            >
              <Plus className="w-[18px] h-[18px] sm:w-5 sm:h-5" strokeWidth={1.5} />
            </motion.div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 320, damping: 32 },
                opacity: { duration: 0.35, ease: EASE_PREMIUM },
              }}
              className="overflow-hidden relative z-10"
            >
              <motion.p
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pl-[3.25rem] sm:pl-[4.5rem] md:pl-[5.5rem] pr-5 sm:pr-6 md:pr-8 text-sm sm:text-base text-white/50 leading-relaxed max-w-3xl"
              >
                {answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-black py-16 sm:py-20 md:py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Ambient gradient */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[900px] h-[60vh] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
          className="mb-10 md:mb-16 lg:mb-20"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/30 block mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-white max-w-3xl">
            Built for teams shipping with AI
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/40 max-w-xl leading-relaxed">
            Straight answers to what founders and operators ask before partnering
            with us.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              index={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
