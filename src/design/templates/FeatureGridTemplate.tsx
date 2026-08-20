"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { motion } from "framer-motion";
import { variants, stagger } from "@/design/animations";

export interface FeatureGridTemplateProps {
  title: React.ReactNode;
  description: React.ReactNode;
  features: Array<{
    icon?: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
  }>;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function FeatureGridTemplate({
  title,
  description,
  features,
  columns = 3,
  className,
}: FeatureGridTemplateProps) {
  return (
    <section className={cn("py-24 bg-background", className)}>
      <div className="container mx-auto px-4 md:px-6">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants.fadeUp}
          className="text-center max-w-3xl mx-auto space-y-6 mb-16"
        >
          <Heading size="2xl">{title}</Heading>
          <Paragraph size="lg">{description}</Paragraph>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: stagger.cards
              }
            }
          }}
          className={cn(
            "grid gap-6 md:gap-8 max-w-7xl mx-auto",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={variants.fadeUp}
              className="bg-surface border border-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {feature.icon && (
                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 text-gold-primary flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
              )}
              <Heading size="md" className="mb-3">{feature.title}</Heading>
              <Paragraph size="sm">{feature.description}</Paragraph>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
