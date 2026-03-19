import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Bot, MessageSquare, Zap, Database, BarChart3, Settings } from "lucide-react";
import { Navbar } from "./Navbar";
import { StudioFooter } from "./StudioFooter";

const useCases = [
  {
    icon: <Bot className="w-6 h-6 text-[#3B82F6]" />,
    title: "AI Lead Generation Automation",
    description: "Automatically capture, qualify, and route leads using intelligent AI workflows.",
    outcome: "Increase qualified leads and reduce manual follow-up work."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-[#22D3EE]" />,
    title: "AI Customer Support Agent",
    description: "Deploy AI-powered chat agents that handle customer inquiries 24/7.",
    outcome: "Reduce support workload and improve response time."
  },
  {
    icon: <Zap className="w-6 h-6 text-[#6366F1]" />,
    title: "Marketing Workflow Automation",
    description: "Automate campaign management, lead nurturing, and CRM updates.",
    outcome: "Increase marketing efficiency and lead conversions."
  },
  {
    icon: <Database className="w-6 h-6 text-[#3B82F6]" />,
    title: "AI Data Processing Automation",
    description: "Automatically analyze large datasets and extract actionable insights.",
    outcome: "Save hours of manual analysis and improve decision making."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#22D3EE]" />,
    title: "Sales Pipeline Automation",
    description: "Automate deal tracking, follow-ups, and CRM updates.",
    outcome: "Improve sales productivity and close deals faster."
  },
  {
    icon: <Settings className="w-6 h-6 text-[#6366F1]" />,
    title: "Internal Operations Automation",
    description: "Automate repetitive operational workflows across teams.",
    outcome: "Reduce operational costs and eliminate manual tasks."
  }
];

export function AIUseCaseShowcase() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#05070F] text-white overflow-hidden selection:bg-[#3B82F6] selection:text-white relative">
        {/* Background Enhancements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#3B82F6] opacity-[0.03] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#6366F1] opacity-[0.03] rounded-full" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[40%] h-[40%] bg-[#22D3EE] opacity-[0.02] rounded-full" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-32 md:py-48 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#3B82F6]"></div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#3B82F6]">
              AI Automation Solutions
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#3B82F6]"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
          >
            How Businesses Use <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#6366F1]">
              AI Automation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-white/50 leading-relaxed max-w-2xl"
          >
            Discover how intelligent automation systems streamline workflows, reduce manual work, and accelerate business growth.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.15)] flex flex-col">
                
                {/* Glow Effect / Border Highlight */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Header Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out shadow-inner">
                  {useCase.icon}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-white/50 leading-relaxed mb-8 flex-1">
                    {useCase.description}
                  </p>

                  {/* Outcome Tag */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-tr from-[#22D3EE]/20 to-[#3B82F6]/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-[#22D3EE]/90 leading-tight group-hover:text-[#22D3EE] transition-colors duration-300">
                      {useCase.outcome}
                    </p>
                  </div>
                </div>

                {/* Interactive Expand Hint (Visual only for now) */}
                <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/5 transition-all duration-300 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 text-white/50 group-hover:text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    
    <StudioFooter />
    </>
  );
}
