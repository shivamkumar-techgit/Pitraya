"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GradientText from "@/components/typography/GradientText";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Variant: 'full' (emblem + text + tagline), 'compact' (emblem + text), 'mark' (emblem only), 'stacked' (centered stacked) */
  variant?: "full" | "compact" | "mark" | "stacked";
  /** Custom logo text */
  text?: string;
  /** Subtitle/Tagline */
  tagline?: string;
  /** Whether logo links to home */
  href?: string;
  /** Animated hover effect */
  interactive?: boolean;
}

/**
 * Authentic Sacred Pitraya Logo Emblem (SVG)
 * Combines Sacred Lotus (Padma), Divine Diya Flame (Jyoti), and Ancestral Sun Rays (Moksha Yantra).
 */
export function PitrayaLogoEmblem({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 transition-transform duration-500", className)}
      aria-label="Pitraya Sacred Emblem"
    >
      <defs>
        {/* Metallic Gold Gradients */}
        <linearGradient id="pitrayaGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="30%" stopColor="#F5D061" />
          <stop offset="70%" stopColor="#E6B325" />
          <stop offset="100%" stopColor="#997008" />
        </linearGradient>

        <linearGradient id="pitrayaFlameGlow" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FFE066" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#996500" />
        </linearGradient>

        <radialGradient id="pitrayaHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5D061" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#E6B325" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background Ambient Glow */}
      <circle cx="50" cy="50" r="46" fill="url(#pitrayaHalo)" />

      {/* Outer Yantra Ring & Rays (8 Sacred Directions / Ashta-Dikpala) */}
      <circle cx="50" cy="50" r="44" stroke="url(#pitrayaGoldPrimary)" strokeWidth="1" strokeDasharray="1 3" opacity="0.6" />
      <circle cx="50" cy="50" r="40" stroke="url(#pitrayaGoldPrimary)" strokeWidth="1.2" opacity="0.8" />

      {/* 8 Radial Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1="50"
          y1="6"
          x2="50"
          y2="10"
          stroke="url(#pitrayaGoldPrimary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Outer Lotus Petals (8 Symmetrical Petals) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={i}
          d="M 50 14 C 44 26, 44 36, 50 42 C 56 36, 56 26, 50 14 Z"
          fill="url(#pitrayaGoldPrimary)"
          opacity="0.35"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Inner Lotus Flower (4 Main Petals) */}
      <path
        d="M 50 20 C 35 34, 35 56, 50 64 C 65 56, 65 34, 50 20 Z"
        fill="url(#pitrayaGoldPrimary)"
        opacity="0.65"
      />
      <path
        d="M 20 50 C 34 35, 56 35, 64 50 C 56 65, 34 65, 20 50 Z"
        fill="url(#pitrayaGoldPrimary)"
        opacity="0.65"
      />

      {/* Central Sacred Diya / Kalash Base */}
      <path
        d="M 36 62 Q 50 74 64 62 Q 56 78 44 78 Q 36 78 36 62 Z"
        fill="url(#pitrayaGoldPrimary)"
      />

      {/* Central Flame of Eternal Peace (Jyoti) */}
      <path
        d="M 50 32 C 44 44, 42 54, 50 60 C 58 54, 56 44, 50 32 Z"
        fill="url(#pitrayaFlameGlow)"
      />
      {/* Inner Flame Core */}
      <path
        d="M 50 40 C 47 47, 46 52, 50 56 C 54 52, 53 47, 50 40 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />

      {/* Base Accent Ring */}
      <circle cx="50" cy="50" r="4.5" fill="url(#pitrayaGoldPrimary)" />
    </svg>
  );
}

export default function Logo({
  size = "md",
  variant = "full",
  text = "PITRAYA",
  tagline = "ANCESTRAL RITES • GAYA",
  href = "/",
  interactive = true,
  className,
  ...props
}: LogoProps) {
  const sizeConfig = {
    sm: { emblem: 28, text: "text-base", tagline: "text-[8px]" },
    md: { emblem: 36, text: "text-lg md:text-xl", tagline: "text-[9px]" },
    lg: { emblem: 48, text: "text-2xl md:text-3xl", tagline: "text-[10px]" },
    xl: { emblem: 64, text: "text-3xl md:text-4xl", tagline: "text-[11px]" },
  }[size];

  const content = (
    <div
      className={cn(
        "group inline-flex items-center gap-3 select-none cursor-pointer",
        variant === "stacked" && "flex-col text-center gap-2",
        className
      )}
      {...props}
    >
      {/* Animated Emblem Wrapper */}
      <motion.div
        whileHover={interactive ? { scale: 1.06, rotate: 5 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex items-center justify-center shrink-0"
      >
        <PitrayaLogoEmblem size={sizeConfig.emblem} className="drop-shadow-[0_0_12px_rgba(230,179,37,0.3)]" />
      </motion.div>

      {/* Text Block */}
      {variant !== "mark" && (
        <div className={cn("flex flex-col", variant === "stacked" && "items-center")}>
          <GradientText
            variant="gold"
            size="inherit"
            font="cinzel"
            className={cn(
              "font-bold tracking-[0.2em] leading-none uppercase drop-shadow-sm transition-all duration-300 group-hover:brightness-110",
              sizeConfig.text
            )}
          >
            {text}
          </GradientText>

          {variant === "full" && tagline && (
            <span
              className={cn(
                "font-cinzel text-gold-primary/80 tracking-[0.22em] uppercase mt-1 font-semibold whitespace-nowrap inline-block transition-colors group-hover:text-gold-primary",
                sizeConfig.tagline
              )}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`${text} - Home`}>
        {content}
      </Link>
    );
  }

  return content;
}
