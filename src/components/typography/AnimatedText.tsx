"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  variant?: "fade" | "word-reveal" | "slide-up";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  duration?: number;
}

export default function AnimatedText({
  text,
  variant = "word-reveal",
  as: Tag = "div",
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: AnimatedTextProps) {
  const words = text.split(" ");

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: variant === "slide-up" ? 25 : variant === "word-reveal" ? 10 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [0.215, 0.61, 0.355, 1] as any, // easeOutCubic
      },
    },
  };

  if (variant === "fade") {
    return (
      <Tag className={className} {...props}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay, duration }}
        >
          {text}
        </motion.span>
      </Tag>
    );
  }

  // Word-by-word reveal (standard typewriter stagger look)
  return (
    <Tag className={className} {...props}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.28em] whitespace-nowrap"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
