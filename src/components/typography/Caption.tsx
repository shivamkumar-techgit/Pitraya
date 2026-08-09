import React from "react";
import { cn } from "@/lib/utils";

export type CaptionVariant = "default" | "gold" | "muted" | "primary";

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: CaptionVariant;
  align?: "left" | "center" | "right";
  as?: "span" | "p" | "div";
  uppercase?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<CaptionVariant, string> = {
  default: "text-text-muted",
  gold: "text-gold-primary",
  muted: "text-text-muted/70",
  primary: "text-text-secondary",
};

export default function Caption({
  variant = "default",
  align = "left",
  as: Tag = "span",
  uppercase = true,
  className,
  children,
  ...props
}: CaptionProps) {
  return (
    <Tag
      className={cn(
        "text-[10px] md:text-xs tracking-widest font-sans font-medium",
        variantClasses[variant],
        uppercase && "uppercase",
        align === "center" && "text-center block",
        align === "right" && "text-right block",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
