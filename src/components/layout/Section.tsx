import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Container, { ContainerSize } from "./Container";

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";
export type SectionBackground = "transparent" | "default" | "surface" | "gradient" | "dark";
export type SectionBorder = "none" | "top" | "bottom" | "both";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  background?: SectionBackground;
  border?: SectionBorder;
  container?: boolean;
  containerSize?: ContainerSize;
  as?: "section" | "div" | "article" | "footer";
  children: React.ReactNode;
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-6 md:py-10",
  md: "py-10 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-36",
};

const bgClasses: Record<SectionBackground, string> = {
  transparent: "bg-transparent",
  default: "bg-background",
  surface: "bg-surface",
  gradient: "bg-gradient-dark",
  dark: "bg-black",
};

const borderClasses: Record<SectionBorder, string> = {
  none: "",
  top: "border-t border-border-subtle",
  bottom: "border-b border-border-subtle",
  both: "border-y border-border-subtle",
};

const Section = forwardRef<HTMLElement, SectionProps>(({
  spacing = "lg",
  background = "transparent",
  border = "none",
  container = false,
  containerSize = "xl",
  as: Tag = "section",
  className,
  children,
  ...props
}, ref) => {
  const content = container ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  );

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "relative w-full overflow-hidden",
        spacingClasses[spacing],
        bgClasses[background],
        borderClasses[border],
        className
      )}
      {...props}
    >
      {content}
    </Tag>
  );
});

Section.displayName = "Section";

export default Section;
