export type GalleryProject = {
  title: string;
  typeTag: string;
  year: string;
  description: string;
  actionText: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
};

export const projectGalleryItems: GalleryProject[] = [
  {
    title: "KARYO Website",
    typeTag: "Premium Website",
    year: "2025",
    description:
      "High-performance AI automation agency website with cinematic motion, premium dark UI, and conversion-focused structure.",
    actionText: "Visit Site ↗",
    image: "/assets/premium-website-preview.png",
    imageAlt: "KARYO Website preview",
    liveUrl: "https://karyo-tech-gcd8.vercel.app",
  },
  {
    title: "HUNT AI",
    typeTag: "CVE Hunter",
    year: "2025",
    description:
      "AI-powered firmware vulnerability scanner that analyzes firmware components, detects versions, and maps them against CVE intelligence.",
    actionText: "Coming Soon",
    image: "/assets/hunt-ai-preview.png",
    imageAlt: "HUNT AI CVE Hunter preview",
  },
  {
    title: "Kairo AI",
    typeTag: "AI Automation",
    year: "2025",
    description:
      "Custom AI workflow automation platform designed for intelligent support systems and internal task orchestration.",
    actionText: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Kairo AI automation platform preview",
  },
  {
    title: "Nexa Analytics",
    typeTag: "AI Dashboard",
    year: "2024",
    description:
      "AI-powered analytics platform delivering intelligent reporting, monitoring, and predictive operational insights.",
    actionText: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Nexa Analytics dashboard preview",
  },
];

export const projectGalleryHeading = "Project Gallery";

export const projectGalleryDescription =
  "Explore selected web experiences, AI systems, and automation platforms designed with cinematic UI, intelligent workflows, and scalable digital infrastructure.";
