import { motion } from "motion/react";
import type { GalleryProject } from "../data/projectGallery";

type ProjectCardProps = {
  project: GalleryProject;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CARD_LIFT = -6;
const CARD_TRANSITION = { duration: 0.9, ease: EASE };
const IMAGE_TRANSITION =
  "transition-[transform,filter] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
const IMAGE_HOVER =
  "scale-100 brightness-[0.98] saturate-100 group-hover:scale-[1.05] group-hover:brightness-[1.06]";

const HOVER_ACCENTS = {
  cyan: {
    border: "hover:border-cyan-400/25 focus-within:border-cyan-400/25",
    shadow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]",
    frameBorder: "group-hover:border-cyan-400/20 group-hover:shadow-[inset_0_0_60px_rgba(34,211,238,0.06)]",
    overlay:
      "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, transparent 45%, rgba(59,130,246,0.06) 100%)",
    hideDarkVeil: false,
  },
  pink: {
    border: "hover:border-pink-400/30 focus-within:border-pink-400/30",
    shadow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.12)]",
    frameBorder: "group-hover:border-pink-400/25 group-hover:shadow-[inset_0_0_50px_rgba(236,72,153,0.08)]",
    overlay:
      "linear-gradient(135deg, rgba(236,72,153,0.14) 0%, transparent 50%, rgba(244,114,182,0.08) 100%)",
    hideDarkVeil: false,
  },
  gold: {
    border: "hover:border-amber-400/30 focus-within:border-amber-400/30",
    shadow: "hover:shadow-[0_0_44px_rgba(217,169,96,0.14)]",
    frameBorder: "group-hover:border-amber-400/30 group-hover:shadow-[inset_0_0_55px_rgba(217,169,96,0.1)]",
    overlay:
      "linear-gradient(135deg, rgba(217,169,96,0.16) 0%, transparent 48%, rgba(180,120,60,0.08) 100%)",
    hideDarkVeil: false,
  },
  neutral: {
    border: "hover:border-white/25 focus-within:border-white/25",
    shadow: "hover:shadow-[0_0_36px_rgba(255,255,255,0.07)]",
    frameBorder: "group-hover:border-white/20",
    overlay: null,
    hideDarkVeil: true,
  },
} as const;

function PremiumImageBlock({ project }: { project: GalleryProject }) {
  return (
    <div className="project-image-wrapper relative">
      {project.inProgress && (
        <div className="pointer-events-none absolute left-4 top-4 z-[3] flex flex-col gap-1.5 sm:left-5 sm:top-5">
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            Running Project
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
            Work in Progress
          </span>
        </div>
      )}
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isLive = Boolean(project.liveUrl);
  const isBrightBeauty = Boolean(project.brightBeautyCard);
  const isHuntAi = Boolean(project.huntAiCard);
  const isPremiumCssCard = isBrightBeauty || isHuntAi;
  const premiumHover = Boolean(project.premiumHover);
  const accent = HOVER_ACCENTS[project.hoverAccent ?? "neutral"];
  const objectPosition =
    project.imagePosition === "top" ? "object-top" : "object-center";

  const cardClassName = isBrightBeauty
    ? "project-card-bright-beauty group relative flex h-full flex-col p-4"
    : isHuntAi
      ? "project-card-hunt-ai group relative flex h-full flex-col p-4"
      : [
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/[0.03] p-4 transition-[border-color,background-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:bg-white/[0.05]",
        premiumHover
          ? `border-white/10 hover:bg-white/[0.05] ${accent.border} ${accent.shadow}`
          : "border-white/10 hover:border-white/30 hover:bg-white/[0.05] focus-within:border-white/30",
      ].join(" ");

  const imageClassName = `h-full w-full min-h-full min-w-full object-cover ${objectPosition} will-change-[transform,filter] ${IMAGE_TRANSITION} ${IMAGE_HOVER}`;

  const imageBlock = isPremiumCssCard ? (
    <PremiumImageBlock project={project} />
  ) : (
    <div
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border bg-[#050505] transition-[border-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        premiumHover
          ? `border-white/10 ${accent.frameBorder}`
          : "border-white/10"
      }`}
    >
      {premiumHover && accent.overlay && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
          aria-hidden
          style={{ background: accent.overlay }}
        />
      )}
      {premiumHover && !accent.hideDarkVeil && (
        <div
          className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            project.inProgress
              ? "opacity-50 group-hover:opacity-25"
              : "opacity-80 group-hover:opacity-55"
          }`}
          aria-hidden
        />
      )}
      {project.inProgress && accent.hideDarkVeil && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-t from-black/35 to-transparent transition-opacity duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0"
          aria-hidden
        />
      )}
      {project.inProgress && (
        <div className="pointer-events-none absolute left-4 top-4 z-[3] flex flex-col gap-1.5 sm:left-5 sm:top-5">
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            Running Project
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
            Work in Progress
          </span>
        </div>
      )}
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        className={imageClassName}
      />
    </div>
  );

  const inner = (
    <>
      {imageBlock}

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
          className={`mt-4 text-right text-xs font-bold uppercase tracking-widest transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isLive || project.inProgress
              ? "text-white/45 group-hover:translate-x-1 group-hover:text-white/80"
              : "text-white/25"
          }`}
        >
          {project.actionText}
        </p>
      </div>
    </>
  );

  if (isLive && isPremiumCssCard) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardClassName} cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
        aria-label={`${project.title} — ${project.actionText}`}
      >
        {inner}
      </a>
    );
  }

  if (isLive) {
    return (
      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: CARD_LIFT }}
        transition={CARD_TRANSITION}
        className={`${cardClassName} cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
        aria-label={`${project.title} — ${project.actionText}`}
      >
        {inner}
      </motion.a>
    );
  }

  if (isPremiumCssCard) {
    return (
      <article aria-disabled="true" className={`${cardClassName} cursor-default`}>
        {inner}
      </article>
    );
  }

  return (
    <motion.article
      aria-disabled="true"
      whileHover={{ y: CARD_LIFT }}
      transition={CARD_TRANSITION}
      className={`${cardClassName} cursor-default`}
    >
      {inner}
    </motion.article>
  );
}
