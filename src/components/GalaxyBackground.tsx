import React, { useRef, useEffect, useCallback } from "react";
import { MotionValue } from "motion/react";

/* ── Types ── */
interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  layer: 0 | 1 | 2;
}

interface GalaxyBackgroundProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

/* ── Constants ── */
const PARALLAX_FACTORS = [0.2, 0.5, 1.0];
const STAR_MAX_SHIFT = 2;

/* ── Helpers ── */
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createStars(width: number, height: number, isMobile: boolean): Star[] {
  const stars: Star[] = [];

  // Fewer stars on mobile for 30fps-budget savings
  const farCount   = isMobile ? 60  : Math.round(rand(120, 160));
  const midCount   = isMobile ? 15  : 30;
  const nearCount  = isMobile ? 20  : Math.round(rand(40, 60));

  for (let i = 0; i < farCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1,
      baseOpacity: rand(0.2, 0.4),
      twinkleSpeed: rand(0.003, 0.008),
      twinkleOffset: Math.random() * Math.PI * 2,
      layer: 0,
    });
  }

  for (let i = 0; i < midCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.2,
      baseOpacity: rand(0.35, 0.6),
      twinkleSpeed: rand(0.004, 0.009),
      twinkleOffset: Math.random() * Math.PI * 2,
      layer: 1,
    });
  }

  for (let i = 0; i < nearCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: rand(1.5, 2),
      baseOpacity: rand(0.5, 0.8),
      twinkleSpeed: rand(0.005, 0.01),
      twinkleOffset: Math.random() * Math.PI * 2,
      layer: 2,
    });
  }

  return stars;
}

/* ── Component ── */
export function GalaxyBackground({ smoothX, smoothY }: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);

  // Track mouse values reactively
  useEffect(() => {
    const unsubX = smoothX.on("change", (v) => (mouseRef.current.x = v));
    const unsubY = smoothY.on("change", (v) => (mouseRef.current.y = v));
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY]);

  // Detect mobile
  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    starsRef.current = createStars(w, h, isMobileRef.current);
  }, []);

  useEffect(() => {
    initCanvas();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    // Mobile: skip every other frame (effectively 30fps)
    let frameSkip = 0;

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => { initCanvas(); };
    window.addEventListener("resize", handleResize, { passive: true });

    function draw() {
      if (!isVisible) return;

      // Throttle to ~30fps on mobile
      if (isMobileRef.current) {
        frameSkip = (frameSkip + 1) % 2;
        if (frameSkip !== 0) {
          rafRef.current = requestAnimationFrame(draw);
          return;
        }
      }

      const w = canvas!.style.width ? parseInt(canvas!.style.width) : window.innerWidth;
      const h = canvas!.style.height ? parseInt(canvas!.style.height) : window.innerHeight;

      ctx!.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMobile = isMobileRef.current;

      frameRef.current += 1;

      for (const star of starsRef.current) {
        const twinkle = Math.sin(frameRef.current * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity + twinkle * 0.15;

        const pFactor = PARALLAX_FACTORS[star.layer];
        const ox = isMobile ? 0 : mx * STAR_MAX_SHIFT * pFactor;
        const oy = isMobile ? 0 : my * STAR_MAX_SHIFT * pFactor;

        const drawX = star.x + ox;
        const drawY = star.y + oy;

        ctx!.beginPath();
        ctx!.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        const blue = star.layer === 2 ? 255 : 230;
        ctx!.fillStyle = `rgba(220, 230, ${blue}, ${Math.max(0, Math.min(1, opacity))})`;
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, [initCanvas]);

  /* Nebula transforms — subtle parallax */
  const nebulaStyle1 = {
    right: "-10%",
    bottom: "20%",
    width: "60vw",
    height: "60vw",
    maxWidth: "900px",
    maxHeight: "900px",
    background: "radial-gradient(circle, rgba(106, 92, 255, 0.18) 0%, transparent 70%)",
    position: "absolute" as const,
    // Static position — no continuous JS animation
  };

  const nebulaStyle2 = {
    left: "-5%",
    top: "40%",
    width: "50vw",
    height: "50vw",
    maxWidth: "750px",
    maxHeight: "750px",
    background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
    position: "absolute" as const,
  };

  const nebulaStyle3 = {
    right: "15%",
    top: "5%",
    width: "45vw",
    height: "45vw",
    maxWidth: "700px",
    maxHeight: "700px",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, transparent 70%)",
    position: "absolute" as const,
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* ── Base gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #000000 0%, #0B0B1A 40%, #0A0F2C 70%, #050510 100%)`,
        }}
      />

      {/* ── Star canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* ── Static nebula glows — GPU-composited, no JS animation ── */}
      <div style={nebulaStyle1} />
      <div style={nebulaStyle2} />
      <div style={nebulaStyle3} />

      {/* ── Hero focus light ── */}
      <div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "80vw",
          height: "50vh",
          maxWidth: "1200px",
          background: "radial-gradient(ellipse, rgba(91, 61, 245, 0.12) 0%, rgba(30, 144, 255, 0.06) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
