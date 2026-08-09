"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MouseParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
  tilt?: boolean;
  children: React.ReactNode;
}

export default function MouseParallax({
  strength = 15,
  tilt = false,
  className,
  children,
  ...props
}: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs for smooth transitions
  const springX = useSpring(x, { stiffness: 150, damping: 25 });
  const springY = useSpring(y, { stiffness: 150, damping: 25 });
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative offsets from center of container (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX * strength);
    y.set(relativeY * strength);

    if (tilt) {
      rotateX.set(-relativeY * 10); // Tilt range 10deg
      rotateY.set(relativeX * 10);
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden w-full h-full", className)}
      {...props}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotateX: tilt ? springRotateX : 0,
          rotateY: tilt ? springRotateY : 0,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
