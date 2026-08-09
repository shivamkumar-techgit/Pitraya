"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingProps {
  duration?: number;
  yOffset?: number;
  className?: string;
  children: React.ReactNode;
}

export default function Floating({
  duration = 3,
  yOffset = 8,
  className,
  children
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={cn("w-fit", className)}
    >
      {children}
    </motion.div>
  );
}
