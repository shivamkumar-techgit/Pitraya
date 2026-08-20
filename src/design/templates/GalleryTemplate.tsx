"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { motion } from "framer-motion";
import { variants, stagger } from "@/design/animations";

export interface GalleryTemplateProps {
  title: React.ReactNode;
  description: React.ReactNode;
  largeImage: React.ReactNode;
  smallImages: React.ReactNode[];
  cta?: React.ReactNode;
  className?: string;
}

export default function GalleryTemplate({
  title,
  description,
  largeImage,
  smallImages,
  cta,
  className,
}: GalleryTemplateProps) {
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
          <Paragraph size="lg">{description}</Paragraph>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Large Featured Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.fadeUp}
            className="md:col-span-1 rounded-3xl overflow-hidden shadow-lg h-full min-h-[400px]"
          >
            {largeImage}
          </motion.div>

          {/* Small Images Grid */}
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
            className="md:col-span-1 grid grid-cols-2 gap-6"
          >
            {smallImages.slice(0, 4).map((img, i) => (
              <motion.div 
                key={i} 
                variants={variants.fadeUp}
                className="rounded-2xl overflow-hidden shadow-md aspect-square"
              >
                {img}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {cta && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants.fadeUp}
            className="mt-16 text-center"
          >
            {cta}
          </motion.div>
        )}

      </div>
    </section>
  );
}
