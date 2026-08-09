"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import GlassCard from "@/components/cards/GlassCard";
import GradientText from "@/components/typography/GradientText";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface ReusableCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number;
  suffix?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  duration?: number;
  decimals?: number;
}

export default function ReusableCounter({
  number,
  suffix = "",
  label,
  description,
  icon,
  duration = 2.5,
  decimals = 0,
  className,
  ...props
}: ReusableCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <GlassCard
        glow
        hoverEffect="lift"
        className="group flex flex-col justify-between p-6 space-y-4 text-center items-center border-gold-primary/20 hover:border-gold-primary/50 h-full"
      >
        {icon && (
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-primary/10 border border-gold-primary/30 group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black transition-all duration-300">
            {icon}
          </div>
        )}

        <div className="space-y-1">
          <GradientText variant="gold" size="xl" font="cinzel" className="font-extrabold tracking-tight">
            {inView ? (
              <CountUp
                start={0}
                end={number}
                duration={duration}
                decimals={decimals}
                separator=","
              />
            ) : (
              "0"
            )}
            {suffix}
          </GradientText>

          <Heading size="sm" className="font-cinzel tracking-wider uppercase pt-1">
            {label}
          </Heading>
        </div>

        {description && (
          <Paragraph size="xs" align="center" variant="muted" className="leading-relaxed font-serif">
            {description}
          </Paragraph>
        )}
      </GlassCard>
    </div>
  );
}
