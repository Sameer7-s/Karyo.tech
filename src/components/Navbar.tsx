"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 10);
    });

    const links = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Work", href: "/work" },
        { name: "Contact", href: "/contact" }
    ];

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out border-b ${scrolled
                ? "py-3 bg-[rgba(5,5,10,0.75)] backdrop-blur-[24px] border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                : "py-6 bg-transparent border-transparent"
                }`}
        >
            <div className="max-w-[1800px] mx-auto px-8 md:px-12 grid grid-cols-3 items-center">
                {/* LEFT — Brand */}
                <div className="flex items-center">
                    <motion.a
                        href="/"
                        className="group flex items-center gap-1.5"
                    >
                        <span className="text-lg font-bold tracking-[0.15em] text-white select-none">
                            KARYO<span className="text-[10px] align-super ml-0.5 opacity-50 group-hover:opacity-100 transition-opacity">®</span>
                        </span>
                    </motion.a>
                </div>

                {/* CENTER — Quick Links */}
                <div className="hidden md:flex flex-col items-center justify-center">
                    <nav className="flex items-center gap-10">
                        {links.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-500 group"
                            >
                                {link.name}
                                {/* White underline on hover */}
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white/70 transition-all duration-500 group-hover:w-full rounded-full" />
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 scale-0 group-hover:scale-100" />
                            </motion.a>
                        ))}
                    </nav>
                </div>

                {/* RIGHT — Magnetic Connect Button */}
                <div className="flex justify-end hidden sm:flex">
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group px-6 py-2.5 rounded-full border border-white/20 bg-white/[0.03] overflow-hidden flex items-center justify-center cursor-pointer"
                    >
                        {/* Hover fill background */}
                        <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                        
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Button Text */}
                        <span className="relative z-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500">
                            Connect Us
                        </span>
                    </motion.a>
                </div>
            </div>
        </motion.header>
    );
}
