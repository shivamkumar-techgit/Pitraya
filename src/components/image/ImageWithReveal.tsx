"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ImageWithRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  direction?: "left" | "right" | "top" | "bottom";
  duration?: number;
  revealColor?: string;
}

export default function ImageWithReveal({
  src,
  alt,
  direction = "left",
  duration = 0.6,
  revealColor = "bg-gold-primary",
  className,
  ...props
}: ImageWithRevealProps) {
  // Define cover block overlay animations based on directional sweeps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blockVariants: any = {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : "0%",
      y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : "0%",
    },
    reveal: {
      x: ["-100%", "0%", "100%"],
      transition: { duration: duration * 1.5, ease: [0.77, 0, 0.175, 1] }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const verticalBlockVariants: any = {
    hidden: {
      y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : "0%",
    },
    reveal: {
      y: ["-100%", "0%", "100%"],
      transition: { duration: duration * 1.5, ease: [0.77, 0, 0.175, 1] }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageVariants: any = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: duration * 0.6, duration: duration }
    }
  };

  const isVertical = direction === "top" || direction === "bottom";

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl w-full h-full min-h-[200px]", className)}
      {...props}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="w-full h-full relative"
      >
        {/* Underlay Image */}
        <motion.div variants={imageVariants} className="w-full h-full relative min-h-[inherit]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Sliding Mask Block */}
        <motion.div
          initial="hidden"
          whileInView="reveal"
          viewport={{ once: true, margin: "-10%" }}
          variants={isVertical ? verticalBlockVariants : blockVariants}
          className={cn("absolute inset-0 z-20 pointer-events-none", revealColor)}
        />
      </motion.div>
    </div>
  );
}
