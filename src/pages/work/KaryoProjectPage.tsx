import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { StudioFooter } from "../../components/StudioFooter";
import { ProjectGallery } from "../../components/ProjectGallery";
import { karyoProject } from "../../data/karyoProject";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function KaryoProjectPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="pt-20 md:pt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 lg:px-16">
          {/* Back */}
          <motion.div {...fadeUp(0)} className="mb-10 md:mb-14">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 transition-colors duration-500 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
              Back
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            {...fadeUp(0.08)}
            className="border-t border-white/[0.08] pt-8 md:pt-10"
          >
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              Selected Systems
            </span>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h1 className="text-4xl font-bold leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {karyoProject.displayName}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-sm border border-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 md:text-xs">
                  {karyoProject.category}
                </span>
                <span className="rounded-sm border border-white/20 bg-white px-2.5 py-1 text-[10px] font-bold tracking-wider text-black md:text-xs">
                  {karyoProject.year}
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/40 md:text-base">
              {karyoProject.title}
            </p>
          </motion.div>

          {/* Project Gallery */}
          <ProjectGallery />

          {/* Overview */}
          <motion.div
            {...fadeUp(0.24)}
            className="mt-12 grid grid-cols-1 gap-10 border-t border-white/[0.08] pt-10 md:mt-16 md:grid-cols-12 md:gap-12 md:pt-12"
          >
            <div className="md:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                Overview
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
                {karyoProject.description}
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-10 sm:flex-row sm:items-center sm:gap-6 md:mt-16 md:pt-12"
          >
            <a
              href={karyoProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-8 py-4 text-sm font-bold text-black transition-colors duration-500 hover:bg-white/90"
            >
              Visit Live Site
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white/70 transition-colors duration-500 hover:border-white/30 hover:text-white"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
