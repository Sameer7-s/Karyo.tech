import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Linkedin, Twitter, Calendar, ChevronDown, ArrowRight } from "lucide-react";

/* ── B&W ContactSection ── */
export function ContactSection() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [projectTypeOpen, setProjectTypeOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("AI Automation");

    const projectTypes = [
        "AI Automation",
        "AI Chatbot",
        "Workflow Automation",
        "Custom AI System"
    ];

    const inputClasses = (fieldName: string) => `
        w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30
        transition-all duration-300 outline-none
        hover:border-white/20
        ${focusedField === fieldName
            ? "border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] bg-white/[0.03]"
            : ""}
    `;

    return (
        <section className="relative bg-black py-16 sm:py-20 md:py-28 lg:py-40 overflow-hidden text-white selection:bg-white selection:text-black" id="contact">
            {/* Background — pure black with a faint white radial */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white opacity-[0.025] rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-white opacity-[0.015] rounded-full -translate-x-1/3 translate-y-1/3" />
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-40" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 flex flex-col items-center">
                {/* Header */}
                <div className="w-full text-center md:text-left mb-10 md:mb-16 lg:mb-24 flex flex-col items-center md:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-[1px] w-8 bg-white/20" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                            GET IN TOUCH
                        </span>
                        <div className="h-[1px] w-8 bg-white/20" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.05] text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Let's Build <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                            Intelligent Automation
                        </span><br className="hidden md:block" /> Together
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="text-base md:text-xl text-white/50 leading-relaxed max-w-2xl"
                    >
                        Tell us about your project and discover how AI automation can transform your business.
                    </motion.p>
                </div>

                {/* 2-Column Content */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 flex flex-col"
                    >
                        <p className="text-white/50 text-lg leading-relaxed mb-12">
                            We partner with forward-thinking companies to design intelligent automation systems that streamline workflows and unlock new growth opportunities.
                        </p>

                        <div className="space-y-8 flex-1">
                            <div className="flex items-start gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white/[0.06] group-hover:border-white/25 transition-all duration-300">
                                    <Mail className="w-5 h-5 text-white/40 group-hover:text-white/90 transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Email</p>
                                    <p className="text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300">hello@agency.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white/[0.06] group-hover:border-white/25 transition-all duration-300">
                                    <MapPin className="w-5 h-5 text-white/40 group-hover:text-white/90 transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Location</p>
                                    <p className="text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300">Remote / Global</p>
                                </div>
                            </div>
                        </div>

                        {/* Social & Booking Links */}
                        <div className="mt-10 md:mt-16 pt-8 md:pt-12 border-t border-white/8 flex flex-wrap gap-3 md:gap-4">
                            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 text-sm font-medium text-white/70 hover:text-white">
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </a>
                            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 text-sm font-medium text-white/70 hover:text-white">
                                <Twitter className="w-4 h-4" /> Twitter
                            </a>
                            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] transition-all duration-300 text-sm font-medium text-white/80 hover:text-white group">
                                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" /> Book a Free Strategy Call
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7"
                    >
                        <form className="bg-white/[0.02] backdrop-blur-sm border border-white/8 rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Name Input */}
                                <div className="relative group">
                                    <motion.label
                                        animate={{ y: focusedField === 'name' ? -5 : 0, opacity: focusedField === 'name' ? 1 : 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold uppercase tracking-wider z-10 text-white/60"
                                    >
                                        Name
                                    </motion.label>
                                    <input
                                        type="text"
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="John Doe"
                                        className={inputClasses('name')}
                                    />
                                </div>
                                {/* Email Input */}
                                <div className="relative group">
                                    <motion.label
                                        animate={{ y: focusedField === 'email' ? -5 : 0, opacity: focusedField === 'email' ? 1 : 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold uppercase tracking-wider z-10 text-white/60"
                                    >
                                        Email
                                    </motion.label>
                                    <input
                                        type="email"
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="john@company.com"
                                        className={inputClasses('email')}
                                    />
                                </div>
                            </div>

                            {/* Company Input */}
                            <div className="relative group mb-6">
                                <motion.label
                                    animate={{ y: focusedField === 'company' ? -5 : 0, opacity: focusedField === 'company' ? 1 : 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold uppercase tracking-wider z-10 text-white/60"
                                >
                                    Company
                                </motion.label>
                                <input
                                    type="text"
                                    onFocus={() => setFocusedField('company')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Company Name"
                                    className={inputClasses('company')}
                                />
                            </div>

                            {/* Project Type Dropdown */}
                            <div className="relative group mb-6">
                                <motion.label
                                    animate={{ y: focusedField === 'type' || projectTypeOpen ? -5 : 0, opacity: focusedField === 'type' || projectTypeOpen ? 1 : 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold uppercase tracking-wider z-20 text-white/60"
                                >
                                    Project Type
                                </motion.label>
                                <div
                                    className={`relative cursor-pointer ${inputClasses('type')}`}
                                    onClick={() => {
                                        setProjectTypeOpen(!projectTypeOpen);
                                        setFocusedField(projectTypeOpen ? null : 'type');
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={selectedType ? 'text-white' : 'text-white/30'}>
                                            {selectedType || 'Select a project type'}
                                        </span>
                                        <motion.div animate={{ rotate: projectTypeOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                                            <ChevronDown className="w-5 h-5 text-white/40" />
                                        </motion.div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {projectTypeOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-30"
                                        >
                                            {projectTypes.map((type) => (
                                                <div
                                                    key={type}
                                                    onClick={() => {
                                                        setSelectedType(type);
                                                        setProjectTypeOpen(false);
                                                        setFocusedField(null);
                                                    }}
                                                    className="px-4 py-3 hover:bg-white/[0.06] cursor-pointer text-white/70 hover:text-white transition-colors duration-200"
                                                >
                                                    {type}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Message Input */}
                            <div className="relative group mb-8">
                                <motion.label
                                    animate={{ y: focusedField === 'message' ? -5 : 0, opacity: focusedField === 'message' ? 1 : 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold uppercase tracking-wider z-10 text-white/60"
                                >
                                    Message
                                </motion.label>
                                <textarea
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Tell us about your automation needs..."
                                    rows={4}
                                    className={`${inputClasses('message')} resize-none`}
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.015 }}
                                whileTap={{ scale: 0.985 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full relative group overflow-hidden rounded-xl bg-white text-black font-bold text-lg py-5 flex items-center justify-center gap-3 transition-colors duration-500 hover:text-white"
                                type="button"
                            >
                                <span className="absolute inset-0 w-full h-full bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Start the Conversation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
