import React from "react";
import { cn } from "@/lib/utils";

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type StackDirection = "vertical" | "horizontal" | "col" | "row";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  as?: "div" | "ul" | "ol" | "nav" | "form" | "section";
  children: React.ReactNode;
}

const gapClasses: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1.5 md:gap-2",
  sm: "gap-2.5 md:gap-3",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
  xl: "gap-8 md:gap-12",
};

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export default function Stack({
  direction = "vertical",
  gap = "md",
  align,
  justify = "start",
  wrap = false,
  as: Tag = "div",
  className,
  children,
  ...props
}: StackProps) {
  const isRow = direction === "horizontal" || direction === "row";
  const defaultAlign = isRow ? "center" : "stretch";

  return (
    <Tag
      className={cn(
        "flex w-full",
        isRow ? "flex-row" : "flex-col",
        gapClasses[gap],
        alignClasses[align || defaultAlign],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
