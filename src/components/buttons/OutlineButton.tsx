"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseButtonProps, sizeClasses, iconSizeClasses } from "./types";

export type OutlineButtonProps = BaseButtonProps;

export default function OutlineButton({
  size = "md",
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  animate = true,
  className,
  children,
  disabled,
  ...props
}: OutlineButtonProps) {
  const isButtonDisabled = isDisabled || disabled || isLoading;

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
    "relative inline-flex items-center justify-center font-medium transition-all duration-300",
    "bg-transparent text-gold-primary border border-gold-primary/60 hover:border-gold-primary hover:bg-gold-primary/10 hover:shadow-gold-glow",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-50 disabled:pointer-events-none",
    fullWidth ? "w-full" : "w-auto",
    sizeClasses[size],
    className
  );

  if (animate && !isButtonDisabled) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        disabled={isButtonDisabled}
        className={baseStyles}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button disabled={isButtonDisabled} className={baseStyles} {...props}>
      {buttonContent}
    </button>
  );
}
