import React from "react";
import { motion } from "motion/react";

export function LoginBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Soft Ambient Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)`,
        }}
      />

      {/* Orbit Rings Container */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 mix-blend-screen blur-[0.5px]">
        {/* Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-white/20 border-dashed"
        >
          {/* Orbital Node */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
        </motion.div>

        {/* Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full border border-white/10"
        >
          {/* Orbital Node */}
          <div className="absolute bottom-1/4 right-[10%] w-3 h-3 rounded-full bg-white/80 shadow-[0_0_15px_#fff]" />
        </motion.div>

        {/* Ring 3 */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 240, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute w-[160vw] h-[60vw] max-w-[1600px] max-h-[600px] rounded-[50%] border border-white/5 rotate-45"
        />

        {/* Ring 4 (Elliptical) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[160vw] max-w-[600px] max-h-[1600px] rounded-[50%] border border-white/5 -rotate-45"
        />
      </div>

      {/* Static Stars / Particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() > 0.8 ? "2px" : "1px",
              height: Math.random() > 0.8 ? "2px" : "1px",
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              opacity: [
                Math.random() * 0.5 + 0.1,
                Math.random() * 0.8 + 0.4,
                Math.random() * 0.5 + 0.1,
              ],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* HUD Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/20 opacity-30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/20 opacity-30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/20 opacity-30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/20 opacity-30" />

      {/* Subtle Scanner Line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
