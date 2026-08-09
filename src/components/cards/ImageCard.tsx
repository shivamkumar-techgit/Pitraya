"use client";

import React from "react";
import Image from "next/image";
import GlassCard from "./GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  badge?: string;
  description?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
}

export default function ImageCard({
  image,
  title,
  badge,
  description,
  aspectRatio = "video",
  className,
  ...props
}: ImageCardProps) {
  return (
    <GlassCard
      padding="none"
      hoverEffect="lift"
      className={cn("group flex flex-col overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn("relative w-full overflow-hidden", {
          "aspect-square": aspectRatio === "square",
          "aspect-video": aspectRatio === "video",
          "aspect-[3/4]": aspectRatio === "portrait",
          "h-64": aspectRatio === "auto",
        })}
      >
        {/* Main Image */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge details */}
        {badge && (
          <span className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-gold-primary border border-gold-primary/30 shadow-md">
            {badge}
          </span>
        )}
      </div>

      {/* Content panel */}
      <div className="p-6 space-y-2 relative z-10 bg-surface/10 backdrop-blur-xs flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <Heading size="sm" className="group-hover:text-gold-primary transition-colors duration-200 font-cinzel">
            {title}
          </Heading>
          {description && (
            <Paragraph size="sm" variant="muted" className="line-clamp-3 leading-relaxed font-serif">
              {description}
            </Paragraph>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
