"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import GlassCard from "./GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import OutlineButton from "@/components/buttons/OutlineButton";
import { cn } from "@/lib/utils";

export interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  location: string;
  rating?: number;
  reviewsCount?: number;
  price?: string;
  tag?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function DestinationCard({
  image,
  title,
  location,
  rating = 4.9,
  reviewsCount,
  price,
  tag,
  actionText = "Explore Destination",
  onAction,
  className,
  ...props
}: DestinationCardProps) {
  return (
    <GlassCard
      padding="none"
      hoverEffect="lift"
      className={cn("group flex flex-col overflow-hidden", className)}
      {...props}
    >
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {tag && (
          <span className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-gold-accent border border-gold-primary/30">
            {tag}
          </span>
        )}

        {rating && (
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-text-primary border border-white/10">
            <Star className="h-3.5 w-3.5 fill-gold-primary text-gold-primary" />
            <span>{rating.toFixed(1)}</span>
            {reviewsCount && <span className="text-text-muted">({reviewsCount})</span>}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <MapPin className="h-3.5 w-3.5 text-gold-primary" />
            <span>{location}</span>
          </div>

          <Heading size="sm" className="group-hover:text-gold-primary transition-colors duration-200">
            {title}
          </Heading>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          {price && (
            <div>
              <span className="text-xs text-text-muted block">Experience from</span>
              <span className="text-lg font-bold text-gold-primary">{price}</span>
            </div>
          )}
          <OutlineButton
            size="sm"
            onClick={() => {
              if (onAction) onAction();
              else window.location.href = "/book-now";
            }}
          >
            {actionText}
          </OutlineButton>
        </div>
      </div>
    </GlassCard>
  );
}
