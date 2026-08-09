import React from "react";
import { cn } from "@/lib/utils";

export type ContentWidth = "xs" | "sm" | "md" | "lg" | "xl" | "prose";

export interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContentWidth;
  center?: boolean;
  children: React.ReactNode;
}

const widthClasses: Record<ContentWidth, string> = {
  xs:    "max-w-xs",
  sm:    "max-w-sm",
  md:    "max-w-2xl",
  lg:    "max-w-4xl",
  xl:    "max-w-6xl",
  prose: "max-w-3xl",
};

/**
 * ContentWrapper — constrains prose/text blocks to readable widths.
 * Use inside Section or Container for heading + description blocks.
 *
 * Usage:
 *   <ContentWrapper width="prose" center>
 *     <Heading>...</Heading>
 *     <Paragraph>...</Paragraph>
 *   </ContentWrapper>
 */
export default function ContentWrapper({
  width = "prose",
  center = true,
  className,
  children,
  ...props
}: ContentWrapperProps) {
  return (
    <div
      className={cn(
        "w-full",
        widthClasses[width],
        center && "mx-auto text-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
