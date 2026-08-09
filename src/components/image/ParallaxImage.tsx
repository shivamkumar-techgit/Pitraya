"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  speed?: number; // Speed scale, e.g. -50 to 50
  aspectRatio?: "square" | "video" | "portrait" | "wide";
}

export default function ParallaxImage({
  src,
  alt,
  speed = 40,
  aspectRatio = "video",
  className,
  ...props
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll details relative to container ref boundaries
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map progress [0, 1] to translation offsets [-speed, speed]
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl w-full", aspectClass, className)}
      {...props}
    >
      <motion.div style={{ y, height: "120%", top: "-10%" }} className="absolute inset-x-0 w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}
