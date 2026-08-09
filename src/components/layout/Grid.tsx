import React from "react";
import { cn } from "@/lib/utils";

export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type GridColsCount = 1 | 2 | 3 | 4 | 5 | 6 | 12;

export interface ResponsiveCols {
  initial?: GridColsCount;
  sm?: GridColsCount;
  md?: GridColsCount;
  lg?: GridColsCount;
  xl?: GridColsCount;
}

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  cols?: GridColsCount | ResponsiveCols;
  gap?: GridGap;
  align?: "start" | "center" | "end" | "stretch";
  as?: "div" | "section" | "ul" | "ol";
  children: React.ReactNode;
}

const gapClasses: Record<GridGap, string> = {
  none: "gap-0",
  xs: "gap-2 md:gap-3",
  sm: "gap-3 md:gap-4",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
  xl: "gap-8 md:gap-12",
};

const colClassesMap: Record<GridColsCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const smColClassesMap: Record<GridColsCount, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const mdColClassesMap: Record<GridColsCount, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const lgColClassesMap: Record<GridColsCount, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

const xlColClassesMap: Record<GridColsCount, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
  12: "xl:grid-cols-12",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export default function Grid({
  cols = { initial: 1, md: 2, lg: 3 },
  gap = "md",
  align = "stretch",
  as: Tag = "div",
  className,
  children,
  ...props
}: GridProps) {
  let computedCols = "";

  if (typeof cols === "number") {
    computedCols = colClassesMap[cols] || "grid-cols-1";
  } else if (typeof cols === "object") {
    const initial = cols.initial ? colClassesMap[cols.initial] : "grid-cols-1";
    const sm = cols.sm ? smColClassesMap[cols.sm] : "";
    const md = cols.md ? mdColClassesMap[cols.md] : "";
    const lg = cols.lg ? lgColClassesMap[cols.lg] : "";
    const xl = cols.xl ? xlColClassesMap[cols.xl] : "";
    computedCols = cn(initial, sm, md, lg, xl);
  }

  return (
    <Tag
      className={cn(
        "grid w-full",
        computedCols,
        gapClasses[gap],
        alignClasses[align],
        className
      )}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  );
}
