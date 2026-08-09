"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BlurRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  blurAmount?: number;
  yOffset?: number;
  viewportOnce?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function BlurReveal({
  delay = 0,
  duration = 0.6,
  blurAmount = 12,
  yOffset = 16,
  viewportOnce = true,
  className,
  children,
  ...props
}: BlurRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        y: yOffset,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={{ once: viewportOnce, margin: "-40px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
