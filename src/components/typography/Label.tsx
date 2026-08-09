import React from "react";
import { cn } from "@/lib/utils";

export type LabelSize = "xs" | "sm" | "md" | "lg";
export type LabelVariant = "default" | "gold" | "muted" | "uppercase";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: LabelSize;
  variant?: LabelVariant;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<LabelSize, string> = {
  xs: "text-xs font-medium",
  sm: "text-sm font-medium",
  md: "text-base font-semibold",
  lg: "text-lg font-semibold",
};

const variantClasses: Record<LabelVariant, string> = {
  default: "text-text-primary",
  gold: "text-gold-primary",
  muted: "text-text-muted",
  uppercase: "text-xs font-semibold uppercase tracking-wider text-text-secondary",
};

export default function Label({
  size = "sm",
  variant = "default",
  required = false,
  htmlFor,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "inline-block select-none leading-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error">*</span>}
    </label>
  );
}
