"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonSize } from "./types";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  size?: ButtonSize;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  shape?: "circle" | "square";
  isLoading?: boolean;
  isDisabled?: boolean;
  animate?: boolean;
  ariaLabel: string;
  children?: React.ReactNode;
}

const squareSizeClasses: Record<ButtonSize, string> = {
  xs: "w-8 h-8 p-0 text-xs",
  sm: "w-9 h-9 p-0 text-sm",
  md: "w-11 h-11 p-0 text-base",
  lg: "w-13 h-13 p-0 text-lg",
  xl: "w-15 h-15 p-0 text-xl",
};

const iconInnerSizes: Record<ButtonSize, string> = {
  xs: "w-3.5 h-3.5",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

const variantClasses = {
  primary: "bg-gold-gradient text-black font-semibold hover:brightness-110 shadow-gold-glow",
  secondary: "bg-surface text-text-primary border border-border hover:border-gold-primary/50 hover:text-gold-primary",
  ghost: "bg-transparent text-text-secondary hover:text-gold-primary hover:bg-surface-hover/80",
  outline: "bg-transparent text-gold-primary border border-gold-primary/60 hover:border-gold-primary hover:bg-gold-primary/10 hover:shadow-gold-glow",
};

export default function IconButton({
  icon,
  size = "md",
  variant = "secondary",
  shape = "square",
  isLoading = false,
  isDisabled = false,
  animate = true,
  ariaLabel,
  className,
  children,
  disabled,
  ...props
}: IconButtonProps) {
  const isButtonDisabled = isDisabled || disabled || isLoading;
  const renderIcon = icon || children;

  const buttonContent = isLoading ? (
    <Loader2 className={cn("animate-spin", iconInnerSizes[size])} />
  ) : (
    <span className="inline-flex items-center justify-center">{renderIcon}</span>
  );

  const baseStyles = cn(
    "relative inline-flex items-center justify-center transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-50 disabled:pointer-events-none",
    shape === "circle" ? "rounded-full" : "rounded-xl",
    squareSizeClasses[size],
    variantClasses[variant],
    className
  );

  if (animate && !isButtonDisabled) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        disabled={isButtonDisabled}
        aria-label={ariaLabel}
        className={baseStyles}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button disabled={isButtonDisabled} aria-label={ariaLabel} className={baseStyles} {...props}>
      {buttonContent}
    </button>
  );
}
