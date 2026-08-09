"use client";

import React from "react";
import { Check, X } from "lucide-react";
import GlassCard from "./GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { cn } from "@/lib/utils";

export interface PricingFeatureItem {
  text: string;
  included?: boolean;
}

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  price: string;
  period?: string;
  features: Array<string | PricingFeatureItem>;
  isPopular?: boolean;
  badge?: string;
  buttonText?: string;
  onSelect?: () => void;
}

export default function PricingCard({
  title,
  subtitle,
  price,
  period = "/ month",
  features = [],
  isPopular = false,
  badge = "Most Popular",
  buttonText = "Select Plan",
  onSelect,
  className,
  ...props
}: PricingCardProps) {
  return (
    <GlassCard
      glow={isPopular}
      borderGold={isPopular}
      hoverEffect="lift"
      className={cn(
        "relative flex flex-col justify-between p-8 space-y-6 transition-all duration-300",
        isPopular && "bg-gradient-to-b from-gold-primary/10 via-surface to-surface border-gold-primary/60 scale-105 z-10",
        className
      )}
      {...props}
    >
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-xs font-bold text-black shadow-md uppercase tracking-wider">
          {badge}
        </span>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <Heading size="md" className={isPopular ? "text-gold-primary" : "text-text-primary"}>
            {title}
          </Heading>
          {subtitle && (
            <Paragraph size="sm" variant="muted">
              {subtitle}
            </Paragraph>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-black text-text-primary">{price}</span>
          <span className="text-sm text-text-muted">{period}</span>
        </div>

        <div className="h-px w-full bg-border/40" />

        <ul className="space-y-3">
          {features.map((feature, index) => {
            const isItemObj = typeof feature === "object";
            const text = isItemObj ? feature.text : feature;
            const included = isItemObj ? feature.included !== false : true;

            return (
              <li key={index} className="flex items-center gap-3 text-sm">
                {included ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-primary/20 text-gold-primary shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-text-muted shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </div>
                )}
                <span className={included ? "text-text-primary" : "text-text-muted line-through"}>
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pt-4">
        {isPopular ? (
          <PrimaryButton fullWidth onClick={onSelect}>
            {buttonText}
          </PrimaryButton>
        ) : (
          <SecondaryButton fullWidth onClick={onSelect}>
            {buttonText}
          </SecondaryButton>
        )}
      </div>
    </GlassCard>
  );
}
