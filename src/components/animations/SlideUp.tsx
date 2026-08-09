"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SlideUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  distance?: number;
  viewportOnce?: boolean;
  children: React.ReactNode;
}

export default function SlideUp({
  delay = 0,
  duration = 0.5,
  distance = 30,
  viewportOnce = true,
  className,
  children,
  ...props
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ y: distance, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: viewportOnce, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
