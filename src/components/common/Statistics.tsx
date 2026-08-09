"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Users, Calendar, Star, Headphones } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import GradientText from "@/components/typography/GradientText";
import Paragraph from "@/components/typography/Paragraph";
import Grid from "@/components/layout/Grid";
import { cn } from "@/lib/utils";

export interface StatDataItem {
  numericValue?: number;
  suffix?: string;
  prefix?: string;
  displayValue?: string; // String value if not strictly numeric (e.g. "24×7")
  label: string;
  description?: string;
  icon?: React.ReactNode;
  decimals?: number;
}

export interface StatisticsProps extends React.HTMLAttributes<HTMLDivElement> {
  stats?: StatDataItem[];
  columns?: 2 | 4;
  variant?: "glass" | "solid" | "minimal";
  animate?: boolean;
}

const defaultStats: StatDataItem[] = [
  {
    numericValue: 15000,
    suffix: "+",
    label: "Families",
    description: "Trusted by thousands of holistic wellness seekers worldwide.",
    icon: <Users className="h-6 w-6 text-gold-primary" />,
  },
  {
    numericValue: 28,
    suffix: "+",
    label: "Years",
    description: "Decades of refined wisdom and sacred sanctuary heritage.",
    icon: <Calendar className="h-6 w-6 text-gold-primary" />,
  },
  {
    numericValue: 4.9,
    suffix: "★",
    decimals: 1,
    label: "Rating",
    description: "Near-perfect client satisfaction score across global retreats.",
    icon: <Star className="h-6 w-6 text-gold-primary fill-gold-primary/20" />,
  },
  {
    displayValue: "24×7",
    label: "Support",
    description: "Dedicated Sanctuary Concierge available day and night.",
    icon: <Headphones className="h-6 w-6 text-gold-primary" />,
  },
];

export default function Statistics({
  stats = defaultStats,
  columns = 4,
  variant = "glass",
  animate = true,
  className,
  ...props
}: StatisticsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <Grid cols={{ initial: 1, sm: 2, lg: columns }} gap="lg">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <GlassCard
              glow
              hoverEffect="lift"
              className="group flex flex-col justify-between p-6 space-y-4 text-center items-center border-gold-primary/20 hover:border-gold-primary/50"
            >
              {stat.icon && (
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-primary/10 border border-gold-primary/30 group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black transition-all duration-300">
                  {stat.icon}
                </div>
              )}

              <div className="space-y-1">
                <GradientText variant="gold" size="2xl" font="cinzel" className="font-extrabold tracking-tight">
                  {stat.prefix}
                  {stat.numericValue !== undefined ? (
                    inView ? (
                      <CountUp
                        start={0}
                        end={stat.numericValue}
                        duration={2.5}
                        decimals={stat.decimals || 0}
                        separator=","
                      />
                    ) : (
                      "0"
                    )
                  ) : (
                    stat.displayValue
                  )}
                  {stat.suffix}
                </GradientText>

                <h3 className="text-base font-semibold text-text-primary uppercase tracking-wider font-cinzel pt-1">
                  {stat.label}
                </h3>
              </div>

              {stat.description && (
                <Paragraph size="xs" align="center" variant="muted">
                  {stat.description}
                </Paragraph>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </Grid>
    </div>
  );
}
