export type GalleryProject = {
  title: string;
  typeTag: string;
  year: string;
  description: string;
  actionText: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
  /** Cinematic image zoom, glow, and brightness on hover */
  premiumHover?: boolean;
  hoverAccent?: "cyan" | "pink" | "gold" | "neutral";
  /** Active build — shows running / in-progress status on card */
  inProgress?: boolean;
  /** Crop focal point inside the preview frame */
  imagePosition?: "top" | "center";
  /** PRD hover: lift, scale, image zoom 1.08 */
  brightBeautyCard?: boolean;
  huntAiCard?: boolean;
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
    imagePosition: "top",
    premiumHover: true,
    hoverAccent: "neutral",
  },
  {
    title: "HUNT AI",
    typeTag: "CVE Hunter",
    year: "2025",
    description:
      "AI-powered firmware vulnerability scanner that analyzes firmware components, detects versions, and maps them against CVE intelligence.",
    actionText: "Visit Site ↗",
    image: "/assets/hunt-ai-preview.png",
    imageAlt: "HUNT AI CVE Hunter initializing screen preview",
    liveUrl: "https://cve-hunter.vercel.app/",
    huntAiCard: true,
  },
  {
    title: "Bright Beauty",
    typeTag: "Luxury Atelier",
    year: "2025",
    description:
      "Definitive bridal experience website for Lucknow's premier luxury atelier — heritage storytelling, cinematic hero, and consult-led conversion.",
    actionText: "Running Project · Work in Progress",
    image: "/assets/bright-beauty-preview.png",
    imageAlt:
      "Bright Beauty Atelier white luxury bridal landing page preview",
    premiumHover: true,
    hoverAccent: "neutral",
    inProgress: true,
    imagePosition: "top",
    brightBeautyCard: true,
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
    premiumHover: true,
    hoverAccent: "neutral",
    imagePosition: "center",
  },
];

export const projectGalleryHeading = "Project Gallery";

export const projectGalleryDescription =
  "Explore selected web experiences, AI systems, and automation platforms designed with cinematic UI, intelligent workflows, and scalable digital infrastructure.";
