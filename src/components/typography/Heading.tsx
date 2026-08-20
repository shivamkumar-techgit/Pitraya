import React from "react";
import { cn } from "@/lib/utils";

export type HeadingSize = "sm" | "md" | "lg" | "xl" | "2xl" | "display";
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: HeadingSize;
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  variant?: "default" | "gold" | "muted" | "primary";
  font?: "sans" | "serif" | "cinzel" | "cormorant";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

const sizeClasses: Record<HeadingSize, string> = {
  sm: "text-base md:text-xl font-semibold tracking-tight",
  md: "text-xl md:text-3xl font-bold tracking-tight",
  lg: "text-3xl md:text-4xl font-bold tracking-tight",
  xl: "text-4xl md:text-6xl font-extrabold tracking-tight",
  "2xl": "text-5xl md:text-7xl font-black tracking-tight",
  display: "text-[clamp(3rem,8vw,7rem)] font-black tracking-tighter leading-none",
};

const variantClasses: Record<NonNullable<HeadingProps["variant"]>, string> = {
  default: "text-text-primary",
  gold: "text-gold-primary",
  muted: "text-text-muted",
  primary: "text-primary",
};

const fontClasses: Record<NonNullable<HeadingProps["font"]>, string> = {
  sans: "font-sans",
  serif: "font-serif",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
};

const defaultTagForSize: Record<HeadingSize, HeadingProps["as"]> = {
  sm: "h4",
  md: "h3",
  lg: "h2",
  xl: "h1",
  "2xl": "h1",
  display: "h1",
};

export default function Heading({
  size = "xl",
  level,
  as,
  variant = "default",
  font = "cinzel",
  align = "left",
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as || (level ? (`h${level}` as const) : defaultTagForSize[size] || "h1");

  return (
    <Tag
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        fontClasses[font],
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
