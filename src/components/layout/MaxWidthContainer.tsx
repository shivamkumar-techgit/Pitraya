import React from "react";
import { cn } from "@/lib/utils";

export type MaxWidthSize = "sm" | "md" | "lg" | "xl" | "2xl" | "screen-xl" | "screen-2xl" | "full";

export interface MaxWidthContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: MaxWidthSize;
  center?: boolean;
  /** Horizontal padding — follows mobile-first scale */
  px?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizeClasses: Record<MaxWidthSize, string> = {
  sm:          "max-w-screen-sm",
  md:          "max-w-screen-md",
  lg:          "max-w-screen-lg",
  xl:          "max-w-7xl",
  "2xl":       "max-w-[1440px]",
  "screen-xl": "max-w-screen-xl",
  "screen-2xl":"max-w-screen-2xl",
  full:        "max-w-full",
};

const pxClasses: Record<NonNullable<MaxWidthContainerProps["px"]>, string> = {
  none: "px-0",
  sm:   "px-3 md:px-4",
  md:   "px-4 md:px-6 lg:px-8",
  lg:   "px-6 md:px-10 lg:px-14",
};

/**
 * MaxWidthContainer — semantic alias for Container with explicit naming.
 * Prefer this for top-level page sections where the intent is clear.
 *
 * Usage:
 *   <MaxWidthContainer size="xl" px="md">
 *     ...
 *   </MaxWidthContainer>
 */
export default function MaxWidthContainer({
  size = "xl",
  center = true,
  px = "md",
  className,
  children,
  ...props
}: MaxWidthContainerProps) {
  return (
    <div
      className={cn(
        "w-full",
        sizeClasses[size],
        pxClasses[px],
        center && "mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
