"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

export default function Carousel({
  items,
  autoplay = false,
  autoplayInterval = 5000,
  className,
  ...props
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right

  const handleNext = React.useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = React.useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, items.length, handleNext]);

  // Slide transition animation parameters
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={cn("relative w-full overflow-hidden py-4", className)} {...props}>
      {/* Slider Viewport */}
      <div className="relative flex justify-center items-center min-h-[380px] w-full px-4 md:px-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full max-w-xl shrink-0"
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls & Dot indicators */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <IconButton
          ariaLabel="Previous slide"
          variant="outline"
          shape="circle"
          size="sm"
          onClick={handlePrev}
          icon={<ChevronLeft className="h-4 w-4 text-gold-primary" />}
          className="border-gold-primary/30 hover:border-gold-primary cursor-pointer"
        />

        {/* Index indicator dots */}
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === index ? "w-6 bg-gold-primary" : "w-2 bg-border-gold/30 hover:bg-border-gold/60"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <IconButton
          ariaLabel="Next slide"
          variant="outline"
          shape="circle"
          size="sm"
          onClick={handleNext}
          icon={<ChevronRight className="h-4 w-4 text-gold-primary" />}
          className="border-gold-primary/30 hover:border-gold-primary cursor-pointer"
        />
      </div>
    </div>
  );
}
