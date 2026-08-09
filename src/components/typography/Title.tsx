import React from "react";
import { cn } from "@/lib/utils";

export type TitleSize = "sm" | "md" | "lg";
export type TitleVariant = "default" | "gold" | "muted" | "primary";
export type TitleFont = "sans" | "serif" | "cinzel" | "cormorant";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: TitleSize;
  variant?: TitleVariant;
  font?: TitleFont;
  align?: "left" | "center" | "right";
  as?: "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";
  children: React.ReactNode;
}

const sizeClasses: Record<TitleSize, string> = {
  sm: "text-lg md:text-xl font-semibold tracking-wide",
  md: "text-xl md:text-2xl font-bold tracking-tight",
  lg: "text-2xl md:text-3xl font-bold tracking-tight",
};

const variantClasses: Record<TitleVariant, string> = {
  default: "text-text-primary",
  gold: "text-gold-primary",
  muted: "text-text-muted",
  primary: "text-text-primary",
};

const fontClasses: Record<TitleFont, string> = {
  sans: "font-sans",
  serif: "font-serif",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
};

export default function Title({
  size = "md",
  variant = "default",
  font = "serif",
  align = "left",
  as: Tag = "h3",
  className,
  children,
  ...props
}: TitleProps) {
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
