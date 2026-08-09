"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SacredChakraBgProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  opacity?: number;
  rotateSpeed?: number; // seconds for full 360 spin; 0 = no spin
  position?: "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  color?: string;
}

const positionClasses = {
  center:         "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-right":    "-top-24 -right-24",
  "top-left":     "-top-24 -left-24",
  "bottom-right": "-bottom-24 -right-24",
  "bottom-left":  "-bottom-24 -left-24",
};

/**
 * SacredChakraBg — decorative spinning mandala background element.
 *
 * Uses a CSS keyframe animation instead of Framer Motion's JS-driven
 * infinite loop. CSS animations are compositor-threaded (GPU) and
 * have near-zero CPU overhead, unlike JS-driven RAF animations.
 * Also respects prefers-reduced-motion via the global CSS rule.
 */
export default function SacredChakraBg({
  size = "min(600px, 90vw)",
  opacity = 0.045,
  rotateSpeed = 140,
  position = "center",
  color = "text-gold-primary",
  className,
  ...props
}: SacredChakraBgProps) {
  const sizeStyle = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={cn(
        "absolute z-[2] pointer-events-none flex items-center justify-center overflow-hidden",
        positionClasses[position],
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
      {...props}
    >
      {/* CSS-only rotation — GPU compositor thread, zero JS overhead */}
      <div
        className={cn("flex items-center justify-center shrink-0", color)}
        style={{
          width: sizeStyle,
          height: sizeStyle,
          animation:
            rotateSpeed > 0
              ? `chakra-spin ${rotateSpeed}s linear infinite`
              : undefined,
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          {/* Concentric rings */}
          <circle cx="200" cy="200" r="190" />
          <circle cx="200" cy="200" r="170" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="148" />
          <circle cx="200" cy="200" r="120" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="90" />
          <circle cx="200" cy="200" r="60" strokeDasharray="3 5" />
          <circle cx="200" cy="200" r="30" />

          {/* 8-point main lotus petal lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 200 + 148 * Math.cos(angle);
            const y1 = 200 + 148 * Math.sin(angle);
            return <line key={i} x1="200" y1="200" x2={x1} y2={y1} />;
          })}

          {/* 16-point fine ray lines */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x1 = 200 + 90 * Math.cos(angle);
            const y1 = 200 + 90 * Math.sin(angle);
            const x2 = 200 + 148 * Math.cos(angle);
            const y2 = 200 + 148 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />;
          })}

          {/* 8 Lotus Petal Ellipses */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200" cy="200" rx="28" ry="60"
              transform={`rotate(${i * 45} 200 200)`}
              strokeWidth="0.6"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
