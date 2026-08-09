"use client";

import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseButtonProps, sizeClasses, iconSizeClasses } from "./types";

export interface PrimaryButtonProps extends BaseButtonProps {
  glow?: boolean;
}

export default function PrimaryButton({
  size = "md",
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  animate = true,
  glow = true,
  className,
  children,
  disabled,
  onClick,
  ...props
}: PrimaryButtonProps) {
  const isButtonDisabled = isDisabled || disabled || isLoading;
  const buttonRef = useRef<HTMLButtonElement>(null);

  /** CSS ripple on click — adds a class that triggers the ::after keyframe,
   *  then removes it so it can re-trigger on the next click */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isButtonDisabled || !buttonRef.current) return;

      // Remove first to allow re-triggering on rapid clicks
      buttonRef.current.classList.remove("btn-ripple-effect");
      // Force a reflow so removing+adding in the same tick works
      void buttonRef.current.offsetWidth;
      buttonRef.current.classList.add("btn-ripple-effect");

      // Auto-remove after animation completes (600ms)
      const timer = setTimeout(() => {
        buttonRef.current?.classList.remove("btn-ripple-effect");
      }, 600);

      onClick?.(e);
      return () => clearTimeout(timer);
    },
    [isButtonDisabled, onClick]
  );

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
    // Layout
    "relative inline-flex items-center justify-center font-semibold overflow-hidden",
    // Colours & gradient
    "text-black bg-gold-gradient",
    // Hover / active states — stronger press feel
    "hover:brightness-110 active:scale-[0.96] active:brightness-95",
    // Transitions — include shadow for smooth glow toggle
    "transition-all duration-200 ease-out",
    // Focus ring
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Disabled
    "disabled:opacity-50 disabled:pointer-events-none disabled:brightness-100",
    // Glow shadow
    glow && "shadow-gold-glow hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]",
    // Width
    fullWidth ? "w-full" : "w-auto",
    // Size
    sizeClasses[size],
    className
  );

  if (animate && !isButtonDisabled) {
    return (
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        disabled={isButtonDisabled}
        className={baseStyles}
        onClick={handleClick as unknown as React.MouseEventHandler}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button
      ref={buttonRef}
      disabled={isButtonDisabled}
      className={baseStyles}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
