"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GlassCardPadding = "none" | "sm" | "md" | "lg" | "xl";
export type GlassCardHover = "lift" | "glow" | "border" | "none";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: GlassCardPadding;
  hoverEffect?: GlassCardHover;
  glow?: boolean;
  /** true = gold border, false = no border (clean luxury default), omitted = subtle glass border */
  borderGold?: boolean;
  noBorder?: boolean;
  animate?: boolean;
  children: React.ReactNode;
}

const paddingClasses: Record<GlassCardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export default function GlassCard({
  padding = "md",
  hoverEffect = "lift",
  glow = false,
  borderGold = false,
  noBorder = false,
  animate = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  const baseStyles = cn(
    "relative rounded-2xl transition-all duration-300 overflow-hidden text-text-primary",
    // Border logic: gold border | no border | default glass border
    borderGold
      ? "glass-panel border-gold-primary/40"
      : noBorder
        ? "[background:var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]"
        : "glass-panel",
    paddingClasses[padding],
    glow && "shadow-gold-glow",
    hoverEffect === "lift" && "hover:-translate-y-1.5 hover:shadow-xl",
    hoverEffect === "glow" && "hover:shadow-gold-glow",
    hoverEffect === "border" && "hover:border-gold-primary",
    className
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={baseStyles}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseStyles} {...props}>
      {children}
    </div>
  );
}
