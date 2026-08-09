import React from "react";
import { cn } from "@/lib/utils";
import Section, { SectionProps } from "./Section";
import Container, { ContainerSize } from "./Container";

export interface SectionWrapperProps extends SectionProps {
  containerSize?: ContainerSize;
  /** Gold top-border accent line */
  goldBorder?: boolean;
  /** Ambient background glow blobs */
  glow?: boolean;
}

/**
 * SectionWrapper — opinionated Section preset for homepage sections.
 * Always dark background, always has Container, optional gold accent border and ambient glow.
 * Eliminates repeated className strings across every section component.
 *
 * Usage:
 *   <SectionWrapper id="services" goldBorder glow>
 *     <Heading>...</Heading>
 *   </SectionWrapper>
 */
export default function SectionWrapper({
  containerSize = "xl",
  goldBorder = false,
  glow = false,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Section
      className={cn(
        "relative overflow-hidden bg-black text-text-primary border-b border-border-gold/20",
        goldBorder && "border-t border-border-gold/30",
        className
      )}
      {...props}
    >
      {/* Optional ambient glow blobs */}
      {glow && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gold-primary/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gold-secondary/4 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}
      <Container size={containerSize}>{children}</Container>
    </Section>
  );
}
