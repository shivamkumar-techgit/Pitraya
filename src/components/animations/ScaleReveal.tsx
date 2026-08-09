"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScaleRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  initialScale?: number;
  viewportOnce?: boolean;
  children: React.ReactNode;
}

export default function ScaleReveal({
  delay = 0,
  duration = 0.55,
  initialScale = 0.92,
  viewportOnce = true,
  className,
  children,
  ...props
}: ScaleRevealProps) {
  return (
    <motion.div
      initial={{ scale: initialScale, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: viewportOnce, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
        delay,
        duration
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
