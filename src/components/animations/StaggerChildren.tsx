"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StaggerChildrenProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  initialDelay?: number;
  viewportOnce?: boolean;
  children: React.ReactNode;
}

export default function StaggerChildren({
  staggerDelay = 0.12,
  initialDelay = 0,
  viewportOnce = true,
  className,
  children,
  ...props
}: StaggerChildrenProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: "-40px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
