import { motion } from "motion/react";
import type { GalleryProject } from "../data/projectGallery";

type ProjectCardProps = {
  project: GalleryProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isLive = Boolean(project.liveUrl);

  const cardClassName =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.05] focus-within:border-white/30 focus-within:bg-white/[0.05]";

  const inner = (
    <>
      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-700 ${
            isLive ? "group-hover:scale-105" : "opacity-80"
          }`}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wider text-white/70">
            {project.typeTag}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wider text-white/70">
            {project.year}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>

        <p
          className={`mt-4 text-right text-xs font-bold uppercase tracking-widest ${
            isLive
              ? "text-white/50 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/90"
              : "text-white/25"
          }`}
        >
          {project.actionText}
        </p>
      </div>
    </>
  );

  if (isLive) {
    return (
      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`${cardClassName} cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
        aria-label={`${project.title} — ${project.actionText}`}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.article
      aria-disabled="true"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`${cardClassName} cursor-default`}
    >
      {inner}
    </motion.article>
  );
}
