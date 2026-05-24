import { motion } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import {
  projectGalleryDescription,
  projectGalleryHeading,
  projectGalleryItems,
} from "../data/projectGallery";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function ProjectGallery() {
  return (
    <section
      className="mt-10 border-t border-white/[0.08] pt-10 md:mt-14 md:pt-12"
      aria-labelledby="project-gallery-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <h2
          id="project-gallery-heading"
          className="text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          {projectGalleryHeading}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60 md:text-base">
          {projectGalleryDescription}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {projectGalleryItems.map((project) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            className="h-full"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
