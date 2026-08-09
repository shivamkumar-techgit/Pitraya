"use client";

import React from "react";
import GlassCard from "./GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  variant?: "default" | "gold" | "glass";
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  badge,
  variant = "glass",
  className,
  ...props
}: FeatureCardProps) {
  return (
    <GlassCard
      hoverEffect="lift"
      borderGold={variant === "gold"}
      className={cn(
        "group flex flex-col items-start gap-4 p-6 transition-all duration-300",
        variant === "gold" && "bg-gradient-to-b from-surface to-surface-hover/80",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black">
          {icon}
        </div>
        {badge && (
          <span className="rounded-full bg-gold-primary/15 px-3 py-1 text-xs font-semibold text-gold-primary border border-gold-primary/30">
            {badge}
          </span>
        )}
      </div>

      <div className="space-y-2 mt-2">
        <Heading size="sm" className="group-hover:text-gold-primary transition-colors duration-200">
          {title}
        </Heading>
        <Paragraph size="sm" variant="muted">
          {description}
        </Paragraph>
      </div>
    </GlassCard>
  );
}
