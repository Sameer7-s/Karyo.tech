import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const columnReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE_PREMIUM },
  }),
};

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path fill="currentColor" stroke="none" d="M16.7 13.9c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.2-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.3 0-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.3s1.1 2.7 1.2 3c.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.1-.3-.2-.6-.3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const socialIcons = [
  { icon: <WhatsAppIcon />, label: "WhatsApp", href: "#" },
  { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/karyo.agency/" },
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://www.linkedin.com/in/karyo-agency/" },
  { icon: <XIcon />, label: "X", href: "#" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const legalLinks = ["Privacy Policy", "Terms of Service"];
const locations = ["Bangalore", "Hyderabad", "Uttar Pradesh"];

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold tracking-[0.28em] uppercase text-white/35 mb-6 md:mb-8 lg:mb-10">
      {children}
    </span>
  );
}

function FooterLink({
  href,
  children,
  internal,
}: {
  href: string;
  children: React.ReactNode;
  internal?: boolean;
}) {
  const className =
    "group relative inline-block text-sm md:text-[15px] font-medium tracking-wide text-white/50 hover:text-white transition-colors duration-500 w-fit";

  const underline = (
    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/80 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
  );

  if (internal) {
    return (
      <Link to={href} className={className}>
        {children}
        {underline}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
      {underline}
    </a>
  );
}

export function StudioFooter() {
  return (
    <footer className="studio-footer relative w-full overflow-hidden text-white font-sans selection:bg-white selection:text-black border-t border-white/[0.08]">
      {/* Grain texture */}
      <div className="studio-footer-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      {/* Sci-fi accent — glowing node + trace line */}
      <div
        className="pointer-events-none absolute left-6 md:left-10 lg:left-16 bottom-[38%] z-[2] hidden md:flex flex-col items-center gap-3"
        aria-hidden
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]"
        />
        <div className="h-28 w-px bg-gradient-to-b from-white/35 via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1800px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-14 sm:pt-16 md:pt-20 lg:pt-24">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-left md:grid-cols-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-20">
          {/* SOCIAL */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={columnReveal}
            className="md:border-r md:border-white/[0.06] md:pr-6 lg:pr-10"
          >
            <ColumnLabel>Social</ColumnLabel>
            <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
              {socialIcons.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 3.5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 28px rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-white/70 backdrop-blur-md transition-colors duration-500 hover:border-white/40 hover:bg-white/[0.06] hover:text-white shadow-[0_0_16px_rgba(255,255,255,0.06)]"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* LEGAL */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={columnReveal}
            className="md:border-r md:border-white/[0.06] md:px-6 lg:px-10"
          >
            <ColumnLabel>Legal</ColumnLabel>
            <ul className="flex flex-col items-start gap-5 md:gap-6 lg:gap-7">
              {legalLinks.map((legal) => (
                <li key={legal}>
                  <FooterLink href="#">{legal}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* WHERE WE'RE AVAILABLE */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={columnReveal}
            className="md:border-r md:border-white/[0.06] md:px-6 lg:px-10"
          >
            <ColumnLabel>Where We&apos;re Available</ColumnLabel>
            <ul className="flex flex-col items-start gap-5 md:gap-6 lg:gap-7">
              {locations.map((location) => (
                <li key={location}>
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="group flex cursor-default items-center justify-start gap-3 text-white/50 transition-colors duration-500 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-sm md:text-[15px] font-medium tracking-wide">
                      {location}
                    </span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={columnReveal}
            className="md:pl-6 lg:pl-10"
          >
            <ColumnLabel>Navigation</ColumnLabel>
            <ul className="flex flex-col items-start gap-5 md:gap-6 lg:gap-7">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href} internal>
                    {link.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ═══ KARYO logo — clean, no glow ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE_PREMIUM }}
          className="footer-logo-wrap relative mt-12 sm:mt-16 md:mt-20 mb-6 md:mb-8 flex flex-col items-center justify-center overflow-hidden bg-black pb-4 isolate"
        >
          <h2 className="footer-logo-text relative z-10 flex flex-nowrap justify-center whitespace-nowrap text-[22vw] sm:text-[20vw] md:text-[16vw] lg:text-[13vw] xl:text-[11vw] font-bold leading-[0.78] tracking-[-0.04em] text-white select-none shadow-none [text-shadow:none] [filter:none] bg-transparent">
            {["K", "A", "R", "Y", "O"].map((char, i) => (
              <motion.span
                key={char + i}
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  delay: 0.2 + i * 0.07,
                  ease: EASE_PREMIUM,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </motion.div>
      </div>
    </footer>
  );
}
