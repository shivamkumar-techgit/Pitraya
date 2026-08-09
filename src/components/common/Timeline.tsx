"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import OutlineButton from "@/components/buttons/OutlineButton";
import GoldenParticles from "@/components/animations/GoldenParticles";
import {
  glowingCircleVariants,
  cardFadeVariants,
  imageZoomVariants,
  textContainerVariants,
  textSlideItemVariants,
} from "@/components/animations/GuidedStepFlow";
import { cn } from "@/lib/utils";

export interface GenericTimelineItem {
  id?: string | number;
  title: string;
  description: string | React.ReactNode;
  image?: string;
  date?: string;
  icon?: React.ReactNode;
  badge?: string;
  link?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: GenericTimelineItem[];
  layout?: "alternating" | "left" | "horizontal";
  showLine?: boolean;
  showParticles?: boolean;
}

export default function Timeline({
  items,
  layout = "alternating",
  showLine = true,
  showParticles = true,
  className,
  ...props
}: TimelineProps) {
  if (layout === "horizontal") {
    return (
      <div className={cn("relative w-full overflow-x-auto pb-6 scrollbar-none", className)} {...props}>
        {showParticles && <GoldenParticles particleCount={20} className="opacity-40" />}
        <div className="flex items-stretch gap-6 min-w-max px-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={idx}
              variants={cardFadeVariants}
              className="w-[320px] md:w-[380px] shrink-0"
            >
              <GlassCard borderGold hoverEffect="lift" className="h-full flex flex-col justify-between p-6 space-y-4">
                <motion.div variants={textContainerVariants} className="space-y-3">
                  {/* Step 4: Image Zooms */}
                  {item.image && (
                    <motion.div
                      variants={imageZoomVariants}
                      className="relative h-44 w-full overflow-hidden rounded-xl group"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </motion.div>
                  )}

                  {/* Step 5: Text Slides */}
                  <motion.div variants={textSlideItemVariants} className="flex items-center justify-between">
                    {item.date && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/30">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                    )}
                    {item.badge && (
                      <span className="text-xs font-semibold text-gold-accent bg-surface-hover px-2.5 py-0.5 rounded-full border border-border">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>

                  <motion.div variants={textSlideItemVariants} className="flex items-center gap-2">
                    {item.icon && (
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gold-primary/10 text-gold-primary shrink-0">
                        {item.icon}
                      </div>
                    )}
                    <Heading size="sm">{item.title}</Heading>
                  </motion.div>

                  <motion.div variants={textSlideItemVariants}>
                    {typeof item.description === "string" ? (
                      <Paragraph size="sm" variant="muted">
                        {item.description}
                      </Paragraph>
                    ) : (
                      item.description
                    )}
                  </motion.div>
                </motion.div>

                {item.link && (
                  <motion.div variants={textSlideItemVariants} className="pt-2">
                    <OutlineButton size="sm" rightIcon={<ArrowRight className="h-4 w-4" />} onClick={item.link.onClick}>
                      {item.link.text}
                    </OutlineButton>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  const isLeft = layout === "left";

  return (
    <div className={cn("relative w-full max-w-5xl mx-auto py-4 overflow-hidden", className)} {...props}>
      {/* Step 6: Background Particles Move (Very Subtle) */}
      {showParticles && <GoldenParticles particleCount={25} className="opacity-30 pointer-events-none" />}

      {/* Step 1: Progress line slowly fills */}
      {showLine && (
        <div
          className={cn(
            "absolute top-0 bottom-0 w-0.5 bg-border-gold/20 overflow-hidden z-0",
            isLeft ? "left-6 md:left-8" : "left-6 md:left-1/2 -translate-x-1/2"
          )}
        >
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-gold-primary via-gold-primary/60 to-transparent shadow-gold-glow"
          />
        </div>
      )}

      <div className="space-y-12 relative z-10">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={item.id || idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={idx}
              className={cn(
                "relative flex flex-col md:flex-row items-stretch",
                !isLeft && isEven ? "md:flex-row-reverse" : "",
                isLeft && "pl-14 md:pl-20"
              )}
            >
              {/* Step 3: Card Fades In */}
              <motion.div
                variants={cardFadeVariants}
                custom={idx}
                className={cn("w-full", !isLeft ? "md:w-1/2 px-2 md:px-8" : "w-full")}
              >
                <GlassCard hoverEffect="lift" borderGold className="p-6 space-y-4 overflow-hidden group">
                  <motion.div variants={textContainerVariants} className="space-y-4">
                    {/* Step 4: Image Zooms */}
                    {item.image && (
                      <motion.div
                        variants={imageZoomVariants}
                        className="relative h-48 w-full overflow-hidden rounded-xl mb-3"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </motion.div>
                    )}

                    {/* Step 5: Text Slides */}
                    <motion.div variants={textSlideItemVariants} className="flex items-center justify-between flex-wrap gap-2">
                      {item.date && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/30">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.date}
                        </span>
                      )}
                      {item.badge && (
                        <span className="text-xs font-semibold text-gold-accent bg-surface-hover px-2.5 py-0.5 rounded-full border border-border">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>

                    <motion.div variants={textSlideItemVariants} className="flex items-center gap-3">
                      {item.icon ? (
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-primary/15 text-gold-primary shrink-0 border border-gold-primary/30">
                          {item.icon}
                        </div>
                      ) : (
                        <Sparkles className="h-5 w-5 text-gold-primary shrink-0" />
                      )}
                      <Heading size="sm">{item.title}</Heading>
                    </motion.div>

                    <motion.div variants={textSlideItemVariants}>
                      {typeof item.description === "string" ? (
                        <Paragraph size="sm" variant="muted" className="leading-relaxed">
                          {item.description}
                        </Paragraph>
                      ) : (
                        item.description
                      )}
                    </motion.div>

                    {item.link && (
                      <motion.div variants={textSlideItemVariants} className="pt-2">
                        <OutlineButton size="sm" rightIcon={<ArrowRight className="h-4 w-4" />} onClick={item.link.onClick}>
                          {item.link.text}
                        </OutlineButton>
                      </motion.div>
                    )}
                  </motion.div>
                </GlassCard>
              </motion.div>

              {/* Step 2: Circle Glows */}
              <motion.div
                variants={glowingCircleVariants}
                custom={idx}
                className={cn(
                  "absolute flex h-9 w-9 items-center justify-center rounded-full bg-background border-2 border-gold-primary shadow-gold-glow z-10",
                  isLeft
                    ? "left-6 md:left-8 -translate-x-1/2 top-6"
                    : "left-6 md:left-1/2 -translate-x-1/2 top-6"
                )}
              >
                <div className="h-3 w-3 rounded-full bg-gold-primary animate-pulse shadow-sm shadow-gold-primary" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
