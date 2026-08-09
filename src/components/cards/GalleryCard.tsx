"use client";

import React from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import GlassCard from "./GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface GalleryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  category?: string;
  description?: string;
  onZoom?: () => void;
}

export default function GalleryCard({
  image,
  title,
  category,
  description,
  onZoom,
  className,
  ...props
}: GalleryCardProps) {
  return (
    <GlassCard
      padding="none"
      hoverEffect="lift"
      className={cn("group flex flex-col overflow-hidden h-72 cursor-pointer", className)}
      {...props}
    >
      <div className="relative w-full h-full">
        {/* Gallery Image */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 z-10" />

        {/* Zoom Icon indicator */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onZoom?.();
          }}
          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-gold-primary/30 flex items-center justify-center text-gold-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-gold-primary hover:scale-105"
        >
          <ZoomIn className="h-4 w-4" />
        </div>

        {/* Caption details */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col justify-end space-y-2">
          {category && (
            <span className="text-[10px] font-semibold text-gold-primary uppercase tracking-widest">
              {category}
            </span>
          )}
          <Heading size="sm" className="text-white leading-tight font-cinzel text-shadow-md">
            {title}
          </Heading>
          {description && (
            <Paragraph size="xs" className="text-text-secondary line-clamp-2 leading-relaxed font-serif">
              {description}
            </Paragraph>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
