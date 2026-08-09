import React from "react";
import { cn } from "@/lib/utils";

export type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type SpacerAxis = "vertical" | "horizontal" | "both";

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpacerSize;
  axis?: SpacerAxis;
}

const heightClasses: Record<SpacerSize, string> = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
  xl: "h-16",
  "2xl": "h-24",
  "3xl": "h-32",
};

const widthClasses: Record<SpacerSize, string> = {
  xs: "w-2",
  sm: "w-4",
  md: "w-8",
  lg: "w-12",
  xl: "w-16",
  "2xl": "w-24",
  "3xl": "w-32",
};

export default function Spacer({
  size = "md",
  axis = "vertical",
  className,
  ...props
}: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "shrink-0 select-none",
        (axis === "vertical" || axis === "both") && heightClasses[size],
        (axis === "horizontal" || axis === "both") && widthClasses[size],
        className
      )}
      {...props}
    />
  );
}
