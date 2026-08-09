"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BlurImageProps extends Omit<ImageProps, "onLoad"> {
  containerClassName?: string;
}

export default function BlurImage({
  src,
  alt,
  containerClassName,
  className,
  ...props
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl bg-surface/10 aspect-video w-full", containerClassName)}
    >
      <motion.div
        animate={{
          filter: isLoaded ? "blur(0px)" : "blur(15px)",
          scale: isLoaded ? 1 : 1.03
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn("object-cover", className)}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </motion.div>
    </div>
  );
}
