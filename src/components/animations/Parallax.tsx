"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  offset?: number;
  direction?: "up" | "down";
  children: React.ReactNode;
}

export default function Parallax({
  offset = 50,
  direction = "up",
  className,
  children,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const transformValue = direction === "up" ? [offset, -offset] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], transformValue);

  return (
    <div ref={ref} className={cn("relative overflow-hidden w-full h-full", className)} {...props}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
