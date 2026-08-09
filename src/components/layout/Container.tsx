import React from "react";
import { cn } from "@/lib/utils";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type ContainerPadding = "none" | "sm" | "md" | "lg";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: ContainerSize;
  padding?: ContainerPadding;
  centered?: boolean;
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
  children: React.ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-7xl",
  "2xl": "max-w-[1440px]",
  full: "max-w-full",
};

const paddingClasses: Record<ContainerPadding, string> = {
  none: "px-0",
  sm: "px-3 md:px-4",
  md: "px-4 md:px-6 lg:px-8",
  lg: "px-6 md:px-10 lg:px-12",
};

export default function Container({
  size = "xl",
  padding = "md",
  centered = true,
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full",
        sizeClasses[size],
        paddingClasses[padding],
        centered && "mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
