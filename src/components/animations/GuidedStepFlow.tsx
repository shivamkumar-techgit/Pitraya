"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GuidedStepFlowProps extends HTMLMotionProps<"div"> {
  stepIndex?: number;
  totalSteps?: number;
  isActive?: boolean;
  children: React.ReactNode;
  delayOffset?: number;
}

// 1. Line fill variant
export const lineFillVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (custom: number = 0) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      delay: custom * 0.15,
    },
  }),
};

// 2. Glowing Circle variant
export const glowingCircleVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0, boxShadow: "0 0 0px rgba(212, 175, 55, 0)" },
  visible: (custom: number = 0) => ({
    scale: 1,
    opacity: 1,
    boxShadow: [
      "0 0 0px rgba(212, 175, 55, 0)",
      "0 0 20px rgba(212, 175, 55, 0.8)",
      "0 0 12px rgba(212, 175, 55, 0.4)",
    ],
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: custom * 0.15 + 0.2,
    },
  }),
};

// 3. Card Fade In variant
export const cardFadeVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.15 + 0.35,
    },
  }),
};

// 4. Image Zoom reveal variant
export const imageZoomVariants: Variants = {
  hidden: { scale: 1.12, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// 5. Staggered Text Slide variants
export const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.45,
    },
  },
};

export const textSlideItemVariants: Variants = {
  hidden: { opacity: 0, x: -14, y: 6 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function GuidedStepFlow({
  stepIndex = 0,
  totalSteps = 1,
  isActive = true,
  children,
  className,
  delayOffset = 0,
  ...props
}: GuidedStepFlowProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={stepIndex + delayOffset}
      className={cn("relative w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
