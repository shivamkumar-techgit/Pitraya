import React from "react";
import { cn } from "@/lib/utils";

export type DisplaySize = "sm" | "md" | "lg" | "xl";
export type DisplayVariant = "default" | "gold" | "muted" | "primary";
export type DisplayFont = "sans" | "serif" | "cinzel" | "cormorant";

export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: DisplaySize;
  variant?: DisplayVariant;
  font?: DisplayFont;
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "span" | "div";
  children: React.ReactNode;
}

const sizeClasses: Record<DisplaySize, string> = {
  sm: "text-4xl md:text-5xl font-extrabold tracking-tight leading-none",
  md: "text-5xl md:text-7xl font-black tracking-tighter leading-none",
  lg: "text-6xl md:text-8xl font-black tracking-tighter leading-none",
  xl: "text-7xl md:text-9xl font-black tracking-tighter leading-none",
};

const variantClasses: Record<DisplayVariant, string> = {
  default: "text-text-primary",
  gold: "text-gold-primary",
  muted: "text-text-muted",
  primary: "text-text-primary",
};

const fontClasses: Record<DisplayFont, string> = {
  sans: "font-sans",
  serif: "font-serif",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
};

export default function Display({
  size = "md",
  variant = "default",
  font = "cinzel",
  align = "left",
  as: Tag = "h1",
  className,
  children,
  ...props
}: DisplayProps) {
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
