"use client";

import React, { useEffect, useRef } from "react";

export interface GoldenParticlesProps {
  particleCount?: number;
  className?: string;
}

export default function GoldenParticles({ particleCount = 30, className }: GoldenParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect user's reduced-motion preference — skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Throttle resize to avoid layout thrash
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Particle pool — reduced from 45 to configurable (default 30) for better perf
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: Math.random() * 0.35 + 0.08,
      speedX: Math.sin(Math.random() * Math.PI) * 0.25,
      opacity: Math.random() * 0.6 + 0.15,
      pulseSpeed: Math.random() * 0.018 + 0.004,
    }));

    // Track tab visibility — pause when hidden to save CPU
    let isVisible = !document.hidden;
    const handleVisibility = () => { isVisible = !document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const render = () => {
      rafId = requestAnimationFrame(render);
      if (!isVisible) return; // ← skip frames when tab is hidden

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.18;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        p.opacity += p.pulseSpeed;
        if (p.opacity > 0.75 || p.opacity < 0.15) p.pulseSpeed = -p.pulseSpeed;

        ctx.save();
        ctx.globalAlpha = Math.max(0.08, p.opacity);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#D4AF37";
        // Only apply shadow for larger particles (cheap culling)
        if (p.size > 1.5) {
          ctx.shadowBlur = p.size * 2.5;
          ctx.shadowColor = "#D4AF37";
        }
        ctx.fill();
        ctx.restore();
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className ?? ""}`}
      aria-hidden="true"
      style={{ willChange: "transform" }}
    />
  );
}
