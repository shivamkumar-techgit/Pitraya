"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { motion } from "framer-motion";
import { variants } from "@/design/animations";

export interface StoryTemplateProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description: React.ReactNode;
  statistics?: Array<{ label: string; value: string }>;
  quote?: { text: string; author: string };
  cta?: React.ReactNode;
  imageElement: React.ReactNode;
  imageOnRight?: boolean;
  className?: string;
}

export default function StoryTemplate({
  title,
  subtitle,
  description,
  statistics,
  quote,
  cta,
  imageElement,
  imageOnRight = true,
  className,
}: StoryTemplateProps) {
  return (
    <section className={cn("py-20 md:py-32 bg-surface", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
          !imageOnRight && "lg:grid-flow-col-dense"
        )}>
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.fadeUp}
            className={cn("space-y-8", !imageOnRight && "lg:col-start-2")}
          >
            <div className="space-y-4">
              {subtitle && (
                <Heading size="sm" variant="gold" className="uppercase tracking-widest">
                  {subtitle}
                </Heading>
              )}
              <Heading size="2xl" variant="default">
                {title}
              </Heading>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              {description}
            </div>

            {quote && (
              <blockquote className="border-l-2 border-gold-primary pl-6 py-2 my-8">
                <Paragraph size="lg" font="cormorant" className="italic text-text-primary">
                  &quot;{quote.text}&quot;
                </Paragraph>
                <footer className="mt-2 text-sm text-gold-primary uppercase tracking-wider font-semibold">
                  — {quote.author}
                </footer>
              </blockquote>
            )}

            {statistics && (
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                {statistics.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <Heading size="xl" variant="primary">{stat.value}</Heading>
                    <Paragraph size="sm" variant="muted">{stat.label}</Paragraph>
                  </div>
                ))}
              </div>
            )}

            {cta && (
              <div className="pt-4">
                {cta}
              </div>
            )}
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.fadeUp}
            className={cn("relative rounded-3xl overflow-hidden shadow-lg", !imageOnRight && "lg:col-start-1")}
          >
            {imageElement}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
