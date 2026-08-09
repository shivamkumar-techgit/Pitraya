import React from "react";
import { cn } from "@/lib/utils";

export type GradientVariant = "gold" | "silver" | "sunset" | "emerald";
export type GradientSize = "inherit" | "sm" | "md" | "lg" | "xl" | "2xl" | "display";

export interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: GradientVariant;
  size?: GradientSize;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  animate?: boolean;
  font?: "sans" | "serif" | "cinzel" | "cormorant";
  children: React.ReactNode;
}

const variantStyles: Record<GradientVariant, string> = {
  gold: "text-gold-gradient",
  silver: "bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-200 text-transparent bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
  sunset: "bg-gradient-to-r from-amber-400 via-rose-500 to-amber-200 text-transparent bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
  emerald: "bg-gradient-to-r from-emerald-400 via-gold-primary to-teal-300 text-transparent bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
};

const sizeStyles: Record<GradientSize, string> = {
  inherit: "",
  sm: "text-lg md:text-xl font-semibold",
  md: "text-xl md:text-2xl font-bold",
  lg: "text-2xl md:text-3xl font-bold",
  xl: "text-3xl md:text-5xl font-extrabold tracking-tight",
  "2xl": "text-4xl md:text-6xl font-black tracking-tight",
  display: "text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none",
};

const fontClasses: Record<NonNullable<GradientTextProps["font"]>, string> = {
  sans: "font-sans",
  serif: "font-serif",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
};

export default function GradientText({
  variant = "gold",
  size = "inherit",
  as: Tag = "span",
  animate = false,
  font = "sans",
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        variantStyles[variant],
        sizeStyles[size],
        fontClasses[font],
        animate && "animate-pulse",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
