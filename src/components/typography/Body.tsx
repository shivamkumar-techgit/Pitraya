import React from "react";
import { cn } from "@/lib/utils";

export type BodySize = "sm" | "md" | "lg";
export type BodyVariant = "default" | "muted" | "gold" | "primary" | "subtle";
export type BodyFont = "sans" | "serif" | "cinzel" | "cormorant";

export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: BodySize;
  variant?: BodyVariant;
  font?: BodyFont;
  leading?: "normal" | "relaxed" | "loose";
  align?: "left" | "center" | "right" | "justify";
  as?: "p" | "span" | "div";
  children: React.ReactNode;
}

const sizeClasses: Record<BodySize, string> = {
  sm: "text-xs md:text-sm",
  md: "text-sm md:text-base",
  lg: "text-base md:text-lg",
};

const variantClasses: Record<BodyVariant, string> = {
  default: "text-text-secondary",
  muted: "text-text-muted",
  gold: "text-gold-secondary",
  primary: "text-text-primary",
  subtle: "text-text-secondary/80",
};

const fontClasses: Record<BodyFont, string> = {
  sans: "font-sans",
  serif: "font-serif",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
};

const leadingClasses = {
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

export default function Body({
  size = "md",
  variant = "default",
  font = "sans",
  leading = "relaxed",
  align = "left",
  as: Tag = "p",
  className,
  children,
  ...props
}: BodyProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        fontClasses[font],
        leadingClasses[leading],
        align === "center" && "text-center",
        align === "right" && "text-right",
        align === "justify" && "text-justify",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
