"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  paddingTop?: boolean | "navbar";
  minHeight?: boolean;
  children: React.ReactNode;
}

export default function PageWrapper({
  animated = true,
  paddingTop = true,
  minHeight = true,
  className,
  children,
  ...props
}: PageWrapperProps) {
  const baseStyles = cn(
    "relative w-full flex flex-col overflow-x-hidden",
    minHeight && "min-h-screen bg-background text-text-primary",
    paddingTop === true && "pt-16 md:pt-20",
    paddingTop === "navbar" && "pt-20 md:pt-24",
    className
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={baseStyles}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseStyles} {...props}>
      {children}
    </div>
  );
}
