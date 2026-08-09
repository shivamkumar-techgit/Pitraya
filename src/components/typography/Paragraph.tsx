import React from "react";
import { cn } from "@/lib/utils";

export type ParagraphSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ParagraphVariant = "default" | "muted" | "gold" | "subtle" | "primary";
export type ParagraphFont = "sans" | "serif" | "cinzel" | "cormorant";

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: ParagraphSize;
  variant?: ParagraphVariant;
  font?: ParagraphFont;
  leading?: "normal" | "relaxed" | "loose";
  align?: "left" | "center" | "right" | "justify";
  as?: "p" | "span" | "div";
  children: React.ReactNode;
}

const sizeClasses: Record<ParagraphSize, string> = {
  xs: "text-xs",
  sm: "text-xs md:text-sm",
  md: "text-sm md:text-base",
  lg: "text-base md:text-lg",
  xl: "text-lg md:text-xl",
};

const variantClasses: Record<ParagraphVariant, string> = {
  default: "text-text-secondary",
  muted: "text-text-muted",
  gold: "text-gold-secondary",
  subtle: "text-text-secondary/80",
  primary: "text-text-primary",
};

const fontClasses: Record<ParagraphFont, string> = {
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

export default function Paragraph({
  size = "md",
  variant = "default",
  font = "sans",
  leading = "relaxed",
  align = "left",
  as: Tag = "p",
  className,
  children,
  ...props
}: ParagraphProps) {
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
