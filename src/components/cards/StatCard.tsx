"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import GlassCard from "./GlassCard";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  glow?: boolean;
}

export default function StatCard({
  value,
  label,
  description,
  icon,
  trend,
  glow = false,
  className,
  ...props
}: StatCardProps) {
  return (
    <GlassCard
      glow={glow}
      hoverEffect="lift"
      className={cn("group flex flex-col justify-between p-6 space-y-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        {icon && (
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/20">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <GradientText variant="gold" size="xl" className="font-extrabold tracking-tight">
          {value}
        </GradientText>

        {description && (
          <Paragraph size="xs" variant="muted">
            {description}
          </Paragraph>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 pt-2 border-t border-border/40 text-xs">
          {trend.isPositive !== false ? (
            <div className="flex items-center gap-1 text-success font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{trend.value}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-error font-semibold">
              <TrendingDown className="h-3.5 w-3.5" />
              <span>{trend.value}</span>
            </div>
          )}
          <span className="text-text-muted">vs previous period</span>
        </div>
      )}
    </GlassCard>
  );
}
