import React from "react";
import { cn } from "@/lib/utils";

export type SmallVariant = "default" | "gold" | "muted" | "primary";

export interface SmallProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SmallVariant;
  align?: "left" | "center" | "right";
  as?: "span" | "p" | "div";
  children: React.ReactNode;
}

const variantClasses: Record<SmallVariant, string> = {
  default: "text-text-muted",
  gold: "text-gold-secondary",
  muted: "text-text-muted/65",
  primary: "text-text-secondary",
};

export default function Small({
  variant = "default",
  align = "left",
  as: Tag = "span",
  className,
  children,
  ...props
}: SmallProps) {
  return (
    <Tag
      className={cn(
        "text-xs leading-normal font-sans",
        variantClasses[variant],
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
