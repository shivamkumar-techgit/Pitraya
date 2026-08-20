"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { motion } from "framer-motion";
import { variants } from "@/design/animations";

export interface ComparisonTemplateProps {
  title: React.ReactNode;
  description: React.ReactNode;
  tableHeaders: string[];
  tableRows: Array<{
    label: string;
    values: React.ReactNode[];
    highlight?: boolean;
  }>;
  cta?: React.ReactNode;
  className?: string;
}

export default function ComparisonTemplate({
  title,
  description,
  tableHeaders,
  tableRows,
  cta,
  className,
}: ComparisonTemplateProps) {
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
          variants={variants.fadeUp}
          className="max-w-5xl mx-auto overflow-x-auto rounded-3xl border border-border bg-surface shadow-md"
        >
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-surface-hover">
                {tableHeaders.map((header, i) => (
                  <th key={i} className={cn("p-6 font-cinzel text-lg font-bold text-text-primary", i > 0 && "text-center")}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={cn("border-b border-border transition-colors hover:bg-surface-hover/50", row.highlight && "bg-gold-primary/5")}>
                  <td className="p-6 font-medium text-text-primary">
                    {row.label}
                  </td>
                  {row.values.map((val, j) => (
                    <td key={j} className="p-6 text-center text-text-secondary">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {cta && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants.fadeUp}
            className="mt-12 text-center"
          >
            {cta}
          </motion.div>
        )}

      </div>
    </section>
  );
}
