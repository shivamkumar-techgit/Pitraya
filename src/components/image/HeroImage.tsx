"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HeroImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  parallaxSpeed?: number;
}

export default function HeroImage({
  src,
  alt,
  overlayClassName,
  children,
  parallaxSpeed = 0,
  className,
  ...props
}: HeroImageProps) {
  return (
    <div
      className={cn("relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black flex items-center justify-center", className)}
      {...props}
    >
      {/* Zooming background image wrapper */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Cinematic dark shadow gradient layers */}
      <div className={cn("absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black z-10 pointer-events-none", overlayClassName)} />

      {/* Particle dust overlays */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-10" />

      {/* Overlay contents */}
      {children && (
        <div className="relative z-20 text-center max-w-4xl px-4 md:px-8 space-y-6">
          {children}
        </div>
      )}
    </div>
  );
}
