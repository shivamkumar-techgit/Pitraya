"use client";

import React from "react";
import Image from "next/image";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import GlassCard from "./GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  onClick?: () => void;
}

export default function BlogCard({
  image,
  title,
  excerpt,
  category = "Pitraya Guide",
  date,
  readTime = "5 min read",
  author,
  onClick,
  className,
  ...props
}: BlogCardProps) {
  return (
    <GlassCard
      padding="none"
      hoverEffect="lift"
      onClick={onClick}
      className={cn("group flex flex-col overflow-hidden cursor-pointer", className)}
      {...props}
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-gold-primary border border-gold-primary/30">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-xs text-text-muted">
            {date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {readTime}
              </span>
            )}
          </div>

          <Heading size="sm" className="group-hover:text-gold-primary transition-colors duration-200 line-clamp-2">
            {title}
          </Heading>

          <Paragraph size="sm" variant="muted" className="line-clamp-2">
            {excerpt}
          </Paragraph>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          {author ? (
            <div className="flex items-center gap-2.5">
              {author.avatar ? (
                <div className="relative h-7 w-7 overflow-hidden rounded-full border border-gold-primary/40">
                  <Image src={author.avatar} alt={author.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-primary/20 text-xs font-bold text-gold-primary">
                  {author.name.charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium text-text-secondary">{author.name}</span>
            </div>
          ) : (
            <span />
          )}

          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover text-text-secondary group-hover:bg-gold-primary group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
