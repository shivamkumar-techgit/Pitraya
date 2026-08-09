import React from "react";
import { cn } from "@/lib/utils";

export type SubHeadingSize = "sm" | "md" | "lg" | "xl";

export interface SubHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: SubHeadingSize;
  as?: "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";
  variant?: "default" | "gold" | "muted" | "accent";
  font?: "sans" | "serif" | "cinzel" | "cormorant";
  align?: "left" | "center" | "right";
  uppercase?: boolean;
  children: React.ReactNode;
}

const sizeClasses: Record<SubHeadingSize, string> = {
  sm: "text-xs md:text-sm font-semibold tracking-wider",
  md: "text-sm md:text-base font-medium tracking-wide",
  lg: "text-base md:text-lg font-medium tracking-wide",
  xl: "text-lg md:text-xl font-semibold tracking-normal",
};

const variantClasses: Record<NonNullable<SubHeadingProps["variant"]>, string> = {
  default: "text-text-secondary",
  gold: "text-gold-secondary",
  muted: "text-text-muted",
  accent: "text-gold-accent",
};

const fontClasses: Record<NonNullable<SubHeadingProps["font"]>, string> = {
  sans: "font-sans",
  serif: "font-serif",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
};

export default function SubHeading({
  size = "md",
  as: Tag = "h3",
  variant = "default",
  font = "sans",
  align = "left",
  uppercase = false,
  className,
  children,
  ...props
}: SubHeadingProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        fontClasses[font],
        uppercase && "uppercase",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
