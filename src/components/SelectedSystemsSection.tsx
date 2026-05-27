import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { karyoProject } from "../data/karyoProject";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  accent: string;
  to?: string;
  hoverLabel?: string;
  previewOnHover?: boolean;
};

const projects: Project[] = [
  {
    title: karyoProject.title,
    category: karyoProject.category,
    year: karyoProject.year,
    description: karyoProject.description,
    image: karyoProject.image,
    accent: "rgba(255, 255, 255, 0.12)",
    to: karyoProject.route,
    hoverLabel: "View Project",
    previewOnHover: true,
  },
  {
    title: "FlowSync",
    category: "Workflow System",
    year: "2025",
    description:
      "Enterprise automation dashboard connecting APIs, CRM systems, and AI agents into one operational pipeline.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    accent: "rgba(34, 211, 238, 0.14)",
  },
  {
    title: "Nexa Analytics",
    category: "AI Dashboard",
    year: "2024",
    description:
      "Real-time AI analytics platform delivering predictive insights, reporting automation, and intelligent monitoring.",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80&auto=format&fit=crop",
    accent: "rgba(168, 85, 247, 0.14)",
  },
  {
    title: "Vector OS",
    category: "Internal Tools",
    year: "2025",
    description:
      "AI-powered internal operations system designed for scaling teams, automating repetitive tasks, and workflow management.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80&auto=format&fit=crop",
    accent: "rgba(255, 255, 255, 0.1)",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 280, damping: 28 });
  const smoothY = useSpring(cursorY, { stiffness: 280, damping: 28 });
  const isHovered = useMotionValue(0);
  const smoothHover = useSpring(isHovered, { stiffness: 300, damping: 30 });

  const imageScale = useTransform(smoothHover, [0, 1], [1, 1.06]);
  const borderOpacity = useTransform(smoothHover, [0, 1], [0.1, 0.35]);
  const borderColor = useTransform(
    borderOpacity,
    (o) => `rgba(255, 255, 255, ${o})`
  );
  const cursorScale = useTransform(smoothHover, [0, 1], [0.6, 1]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    },
    [cursorX, cursorY]
  );

  const imageClassName = project.previewOnHover
    ? "h-full w-full object-cover object-top opacity-75 grayscale-[0.2] transition-[filter,opacity,transform] duration-700 ease-out will-change-transform group-hover:opacity-100 group-hover:grayscale-0"
    : "h-full w-full object-cover opacity-50 grayscale transition-[filter,opacity] duration-700 ease-out will-change-transform group-hover:opacity-75 group-hover:grayscale-[0.35]";

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_PREMIUM }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => isHovered.set(1)}
      onMouseLeave={() => {
        isHovered.set(0);
        cursorX.set(0);
        cursorY.set(0);
      }}
      className={`gallery-card group relative flex flex-col border-t border-white/[0.08] pt-6 md:pt-8 ${
        project.to ? "cursor-pointer" : ""
      }`}
    >
      {project.to && (
        <Link
          to={project.to}
          className="absolute inset-0 z-30 rounded-sm"
          aria-label={`View ${project.title}`}
        />
      )}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-5">
        <motion.h3
          className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.4, ease: EASE_PREMIUM }}
        >
          {project.title}
        </motion.h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm border border-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white md:text-xs">
            {project.category}
          </span>
          <span className="rounded-sm border border-white/20 bg-white px-2.5 py-1 text-[10px] font-bold tracking-wider text-black transition-colors duration-500 group-hover:bg-white/90 md:text-xs">
            {project.year}
          </span>
        </div>
      </div>

      <motion.div
        style={{ borderColor }}
        className="relative aspect-[4/3] overflow-hidden rounded-sm border bg-[#0a0a0a] will-change-transform"
      >
        <motion.div
          className="pointer-events-none absolute z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-sm md:block"
          style={{
            left: smoothX,
            top: smoothY,
            opacity: smoothHover,
            scale: cursorScale,
          }}
        />

        {!project.previewOnHover && (
          <>
            <div
              className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${project.accent} 0%, transparent 55%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40" />
          </>
        )}
        <div
          className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${
            project.previewOnHover
              ? "opacity-40 group-hover:opacity-25"
              : "opacity-70 group-hover:opacity-90"
          }`}
        />

        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{ scale: imageScale }}
          className={imageClassName}
        />

        <div className="absolute bottom-4 right-4 z-[3] flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/0 transition-all duration-500 group-hover:text-white/80">
          {project.hoverLabel ?? "View System"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </motion.div>

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/45 transition-colors duration-500 group-hover:text-white/60 md:mt-5 md:text-[15px]">
        {project.description}
      </p>
    </motion.article>
  );
}

export function SelectedSystemsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-black py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-10 lg:mb-20"
        >
          <div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              AI Engineering
            </span>
            <h2 className="text-4xl font-bold leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Selected
              <br />
              Systems
              <span className="ml-2 text-xl font-bold text-white/25 sm:ml-3 sm:text-2xl md:text-3xl">
                (4)
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-xs uppercase leading-relaxed tracking-widest text-white/40 md:text-sm">
            Automation infrastructure, intelligent agents, and scalable digital
            products built for modern enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:gap-x-12">
          {projects.map((project, i) => (
            <React.Fragment key={project.title}>
              <ProjectCard project={project} index={i} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
