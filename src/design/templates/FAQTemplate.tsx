"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "@/design/animations";

export interface FAQTemplateProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  faqs: Array<{
    question: string;
    answer: React.ReactNode;
  }>;
  className?: string;
}

export default function FAQTemplate({
  title,
  description,
  faqs,
  className,
}: FAQTemplateProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={cn("py-24 bg-background", className)}>
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.fadeUp}
            className="lg:col-span-5 space-y-6"
          >
            <Heading size="2xl">{title}</Heading>
            {description && <Paragraph size="lg">{description}</Paragraph>}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.fadeUp}
            className="lg:col-span-7 space-y-4"
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-colors duration-300",
                    isOpen ? "border-gold-primary bg-surface shadow-md" : "border-border bg-surface/50 hover:bg-surface"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
                    aria-expanded={isOpen}
                  >
                    <Heading size="sm" as="h3" className="mb-0">{faq.question}</Heading>
                    <div className={cn(
                      "w-6 h-6 flex items-center justify-center rounded-full border transition-transform duration-300 flex-shrink-0",
                      isOpen ? "border-gold-primary text-gold-primary rotate-180" : "border-border-subtle text-text-muted"
                    )}>
                      ↓
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5">
                          <Paragraph size="md">{faq.answer}</Paragraph>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
