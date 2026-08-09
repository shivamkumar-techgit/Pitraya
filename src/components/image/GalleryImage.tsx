"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import IconButton from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

export interface GalleryImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  category?: string;
  title?: string;
  description?: string;
}

export default function GalleryImage({
  src,
  alt,
  category,
  title,
  description,
  className,
  ...props
}: GalleryImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={cn("group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-surface/10 border border-border/10", className)}
        onClick={() => setIsOpen(true)}
        {...props}
      >
        {/* Gallery Image */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 30vw"
        />

        {/* Dark gold overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

        {/* Text descriptions overlay */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end text-left z-10">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            {category && (
              <span className="text-[10px] font-bold text-gold-primary tracking-widest uppercase mb-1 block">
                {category}
              </span>
            )}
            {title && (
              <Heading size="sm" font="cinzel" className="text-white line-clamp-1 group-hover:text-gold-primary transition-colors">
                {title}
              </Heading>
            )}
            {description && (
              <Paragraph size="xs" variant="muted" className="line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {description}
              </Paragraph>
            )}
          </div>
        </div>

        {/* Zoom trigger hover icon */}
        <span className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white border border-border-gold/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
          <Maximize2 className="h-4 w-4 text-gold-primary" />
        </span>
      </div>

      {/* Full Screen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setIsOpen(false)}
          >
            {/* Close trigger button */}
            <div className="absolute top-6 right-6 z-55">
              <IconButton
                ariaLabel="Close image details"
                variant="outline"
                shape="circle"
                onClick={() => setIsOpen(false)}
                icon={<X className="h-5 w-5 text-gold-primary" />}
                className="border-gold-primary/30 hover:border-gold-primary cursor-pointer"
              />
            </div>

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col md:flex-row rounded-3xl overflow-hidden border border-border-gold/30 bg-surface/50 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()} // stops close triggers on modal body
            >
              {/* Media Section */}
              <div className="relative flex-1 min-h-[300px] md:min-h-[500px]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Descriptions Sidebar */}
              <div className="p-6 md:p-8 w-full md:w-[320px] shrink-0 flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l border-border-gold/20">
                {category && (
                  <span className="text-[10px] font-bold text-gold-primary tracking-widest uppercase block bg-gold-primary/10 border border-gold-primary/20 px-3 py-1 rounded-full w-max">
                    {category}
                  </span>
                )}
                {title && (
                  <Heading size="sm" font="cinzel" className="text-white">
                    {title}
                  </Heading>
                )}
                {description && (
                  <Paragraph size="sm" variant="muted" className="leading-relaxed font-serif">
                    {description}
                  </Paragraph>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
