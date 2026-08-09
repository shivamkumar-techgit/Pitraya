"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseButtonProps, sizeClasses, iconSizeClasses } from "./types";

export interface MagneticButtonProps extends BaseButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  strength?: number;
  glow?: boolean;
}

const variantClasses = {
  primary: "bg-gold-gradient text-black font-semibold hover:brightness-110",
  secondary: "bg-surface text-text-primary hover:text-gold-primary border border-border hover:border-gold-primary/50",
  outline: "bg-transparent text-gold-primary border border-gold-primary/60 hover:border-gold-primary hover:bg-gold-primary/10",
  ghost: "bg-transparent text-text-secondary hover:text-gold-primary hover:bg-surface-hover/80",
};

export default function MagneticButton({
  size = "md",
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  animate = true,
  strength = 0.35,
  glow = true,
  className,
  children,
  disabled,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isButtonDisabled = isDisabled || disabled || isLoading;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || isButtonDisabled) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const buttonContent = (
    <>
      {isLoading ? (
        <Loader2 className={cn("animate-spin", iconSizeClasses[size])} />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </>
  );

  const baseStyles = cn(
    "relative inline-flex items-center justify-center font-semibold transition-all duration-300 select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    variant === "primary" && glow && "shadow-gold-glow",
    fullWidth ? "w-full" : "w-auto",
    sizeClasses[size],
    className
  );

  return (
    <motion.button
      ref={ref}
      style={animate && !isButtonDisabled ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      disabled={isButtonDisabled}
      className={baseStyles}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {buttonContent}
    </motion.button>
  );
}
