"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);

  const cursorSpringConfig = { damping: 25, stiffness: 300 };
  const smoothCursorX = useSpring(cursorX, cursorSpringConfig);
  const smoothCursorY = useSpring(cursorY, cursorSpringConfig);
  const smoothCursorScale = useSpring(cursorScale, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);

      const target = e.target as HTMLElement;
      
      // Standard clickable elements
      const isClickable = target.tagName === 'BUTTON' || target.tagName === 'A' ||
        target.parentElement?.tagName === 'BUTTON' || target.parentElement?.tagName === 'A';

      // Specific hover cards found in the app
      const isSystemCard = target.closest('.system-card');
      const isGalleryCard = target.closest('.gallery-card');
      
      if (isSystemCard || isGalleryCard) {
        cursorScale.set(3.5);
      } else if (isClickable) {
        cursorScale.set(2.5);
      } else {
        cursorScale.set(1);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, cursorScale]);

  return (
    <>
      {/* Custom Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[99999] hidden md:block will-change-transform"
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          height: 6,
          width: 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Custom Cursor Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99998] hidden md:block border will-change-transform"
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          scale: smoothCursorScale,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: useTransform(smoothCursorScale, [1, 3.5], ["rgba(255,255,255,0.25)", "rgba(255,255,255,0.7)"]),
          boxShadow: useTransform(smoothCursorScale, [1, 3.5], ["0 0 0px rgba(255,255,255,0)", "0 0 12px rgba(255,255,255,0.3)"]),
        }}
      />
    </>
  );
}
