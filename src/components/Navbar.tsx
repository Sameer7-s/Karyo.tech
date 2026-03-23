import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 10);
    });

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const links = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Work", href: "/work" },
        { name: "Contact", href: "/contact" }
    ];

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-700 ease-in-out border-b ${scrolled
                    ? "py-3 bg-[rgba(5,5,10,0.85)] backdrop-blur-[24px] border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                    : "py-4 md:py-6 bg-transparent border-transparent"
                    }`}
            >
                <div className="max-w-[1800px] mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between">
                    {/* LEFT — Brand */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="group flex items-center gap-1.5"
                            onClick={() => setMenuOpen(false)}
                        >
                            <motion.span
                                className="text-lg font-bold tracking-[0.15em] text-white select-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                KARYO<span className="text-[10px] align-super ml-0.5 opacity-50 group-hover:opacity-100 transition-opacity">®</span>
                            </motion.span>
                        </Link>
                    </div>

                    {/* CENTER — Desktop Quick Links */}
                    <div className="hidden md:flex flex-col items-center justify-center">
                        <nav className="flex items-center gap-10">
                            {links.map((link, i) => (
                                <Link key={link.name} to={link.href} className="group">
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="relative text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors duration-500 cursor-pointer block"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white/70 transition-all duration-500 group-hover:w-full rounded-full" />
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 scale-0 group-hover:scale-100" />
                                    </motion.div>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* RIGHT — Desktop Connect Button + Mobile Hamburger */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Connect Button */}
                        <Link to="/contact" className="hidden md:block">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group px-6 py-2.5 rounded-full border border-white/20 bg-white/[0.03] overflow-hidden flex items-center justify-center cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                                <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500">
                                    Connect Us
                                </span>
                            </motion.div>
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] active:scale-95 transition-transform"
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 h-4 flex flex-col justify-between items-center">
                                <motion.span
                                    animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="block w-5 h-[1.5px] bg-white origin-center"
                                />
                                <motion.span
                                    animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="block w-5 h-[1.5px] bg-white"
                                />
                                <motion.span
                                    animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="block w-5 h-[1.5px] bg-white origin-center"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Full-Screen Mobile Menu Overlay ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-3xl font-bold tracking-tight text-white/80 hover:text-white transition-colors duration-300"
                                        style={{ fontFamily: "'Syne', sans-serif" }}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Mobile Connect Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-12"
                        >
                            <Link
                                to="/contact"
                                onClick={() => setMenuOpen(false)}
                                className="px-10 py-4 rounded-full border border-white/20 bg-white text-black font-bold text-sm uppercase tracking-[0.2em] active:scale-95 transition-transform"
                            >
                                Connect Us
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
