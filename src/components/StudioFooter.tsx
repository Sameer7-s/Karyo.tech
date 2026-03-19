import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ── Ease tokens ── */
const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Social SVG icons (outline style) ── */
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path fill="currentColor" stroke="none" d="M16.7 13.9c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.2-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.3 0-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.3s1.1 2.7 1.2 3c.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.1-.3-.2-.6-.3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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



export function StudioFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], [120, 0]);

  return (
    <footer
      ref={sectionRef}
      className="bg-black text-white pt-24 md:pt-32 pb-0 font-sans selection:bg-white selection:text-black border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto relative z-10 px-6 md:px-12 lg:px-20">




        {/* ═══════════════════════════════════════════
            SOCIAL + LEGAL + LOCATIONS GRID
        ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-8 md:mb-12">
          {/* Social — left */}
          <div className="md:col-span-4 lg:col-span-3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-widest uppercase opacity-40 block mb-8"
            >
              Social
            </motion.span>
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              {socialIcons.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: EASE_PREMIUM,
                  }}
                  className="text-white/60 hover:text-white transition-all duration-300 ease-out flex items-center justify-center relative group"
                >
                  <div className="relative z-10 p-2 md:p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                    {s.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Legal — middle */}
          <div className="md:col-span-3 lg:col-span-2 md:col-start-5">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-widest uppercase opacity-40 block mb-8"
            >
              Legal
            </motion.span>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
              className="flex flex-col gap-6"
            >
              {["Privacy Policy", "Terms of Service"].map((legal) => (
                <motion.a
                  key={legal}
                  href="#"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.8, ease: EASE_PREMIUM },
                    },
                  }}
                  whileHover={{ x: 5, color: "white" }}
                  className="text-sm md:text-base font-medium tracking-wide text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  {legal}{" "}
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 text-sm">
                    ↗
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Locations — beside Legal */}
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-widest uppercase opacity-40 block mb-8"
            >
              Where We're Available
            </motion.span>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.25 },
                },
              }}
              className="flex flex-col gap-5"
            >
              {["Bangalore", "Hyderabad", "Uttar Pradesh"].map((location) => (
                <motion.div
                  key={location}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.8, ease: EASE_PREMIUM },
                    },
                  }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 cursor-default group"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm md:text-base font-medium tracking-wide">
                    {location}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation — right aligned */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-11">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-widest uppercase opacity-40 block mb-8"
            >
              Navigation
            </motion.span>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.35 },
                },
              }}
              className="flex flex-col gap-6"
            >
              {[
                { name: "Home", href: "/" },
                { name: "Work", href: "/#work" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.8, ease: EASE_PREMIUM },
                    },
                  }}
                  whileHover={{ x: 4, color: "white" }}
                  className="text-sm md:text-base font-medium tracking-wide text-gray-400 hover:text-white transition-all duration-300 ease-out flex w-fit"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>



      {/* ═══════════════════════════════════════════
          BIG LOGO SECTION
      ═══════════════════════════════════════════ */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mb-10 w-full relative z-10 overflow-hidden">
        <h2 className="text-[25vw] md:text-[18vw] font-bold leading-[0.75] tracking-tighter select-none flex justify-center flex-wrap sm:flex-nowrap overflow-hidden">
          {["K", "A", "R", "Y", "O", "®"].map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: i * 0.08,
                ease: EASE_PREMIUM,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* ═══════════════════════════════════════════
          BACKGROUND GLOWS
      ═══════════════════════════════════════════ */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/10 blur-[100px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3"
      />
      <motion.div
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 -translate-y-1/3"
      />
    </footer>
  );
}
