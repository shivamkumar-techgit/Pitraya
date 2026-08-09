"use client";

import React from "react";
import { motion, useInView, type UseInViewOptions, type Variant, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type MotionSectionPreset = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";

export interface MotionSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  preset?: MotionSectionPreset;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
  children: React.ReactNode;
}

const presets: Record<MotionSectionPreset, { hidden: Variant; visible: Variant }> = {
  fadeUp:    { hidden: { opacity: 0, y: 48 },  visible: { opacity: 1, y: 0 } },
  fadeIn:    { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  slideLeft: { hidden: { opacity: 0, x: 60 },  visible: { opacity: 1, x: 0 } },
  slideRight:{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  scale:     { hidden: { opacity: 0, scale: 0.93 }, visible: { opacity: 1, scale: 1 } },
};

/**
 * MotionSection — viewport-triggered animated section wrapper.
 * Replaces raw <section> + manual motion.div boilerplate in every component.
 *
 * Usage:
 *   <MotionSection preset="fadeUp" delay={0.1}>
 *     ...content
 *   </MotionSection>
 */
export default function MotionSection({
  as: Tag = "section",
  preset = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  margin = "-80px",
  className,
  children,
  ...props
}: MotionSectionProps) {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin });
  const { hidden, visible } = presets[preset];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden,
        visible: { ...visible, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={cn("relative w-full", className)}
      {...props as unknown as HTMLMotionProps<"section">}
    >
      {children}
    </motion.section>
  );
}
