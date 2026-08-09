"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "gold" | "default";
}

export default function ScrollProgress({ color = "gold", className, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 h-[3px] z-50 origin-left pointer-events-none",
        color === "gold" ? "bg-gold-gradient shadow-gold-glow" : "bg-text-primary",
        className
      )}
      style={{ scaleX }}
      {...props as unknown as HTMLMotionProps<"div">}
    />
  );
}
