"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { motion } from "framer-motion";
import { variants, stagger } from "@/design/animations";

export interface TestimonialTemplateProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  testimonials: Array<{
    quote: string;
    author: string;
    role?: string;
    rating?: number;
    avatar?: React.ReactNode;
  }>;
  className?: string;
}

export default function TestimonialTemplate({
  title,
  description,
  testimonials,
  className,
}: TestimonialTemplateProps) {
  return (
    <section className={cn("py-24 bg-surface", className)}>
      <div className="container mx-auto px-4 md:px-6">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants.fadeUp}
          className="text-center max-w-3xl mx-auto space-y-6 mb-16"
        >
          <Heading size="2xl">{title}</Heading>
          {description && <Paragraph size="lg">{description}</Paragraph>}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {testimonials.map((item, i) => (
            <motion.div 
              key={i} 
              variants={variants.fadeUp}
              className="bg-background border border-border rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-4">
                {item.rating && (
                  <div className="flex gap-1 text-gold-primary">
                    {Array.from({ length: item.rating }).map((_, r) => (
                      <span key={r}>★</span>
                    ))}
                  </div>
                )}
                <Paragraph size="lg" font="cormorant" className="italic text-text-primary">
                  &quot;{item.quote}&quot;
                </Paragraph>
              </div>
              
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border-subtle">
                {item.avatar && (
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    {item.avatar}
                  </div>
                )}
                <div>
                  <Heading size="sm" as="div">{item.author}</Heading>
                  {item.role && <Paragraph size="xs" variant="muted">{item.role}</Paragraph>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
