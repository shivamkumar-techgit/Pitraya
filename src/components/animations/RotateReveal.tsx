"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RotateRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  initialRotate?: number;
  viewportOnce?: boolean;
  children: React.ReactNode;
}

export default function RotateReveal({
  delay = 0,
  duration = 0.6,
  initialRotate = -6,
  viewportOnce = true,
  className,
  children,
  ...props
}: RotateRevealProps) {
  return (
    <motion.div
      initial={{ rotate: initialRotate, opacity: 0, scale: 0.95 }}
      whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
      viewport={{ once: viewportOnce, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 18,
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
