"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2, Play, Volume2, VolumeX } from "lucide-react";
import GlassCard from "./GlassCard";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
  comment: string;
  date?: string;
  verified?: boolean;
  videoSrc?: string;
  bgImage?: string;
}

export default function ReviewCard({
  author,
  role = "Verified Client",
  avatar,
  rating = 5,
  comment,
  date,
  verified = true,
  videoSrc,
  bgImage,
  className,
  ...props
}: ReviewCardProps) {
  const [muted, setMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <GlassCard
      padding={videoSrc ? "none" : "md"}
      hoverEffect="glow"
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden min-h-[360px] rounded-3xl border border-border-gold/30 bg-surface/30",
        className
      )}
      {...props}
    >
      {/* 1. Video Testimonial Background */}
      {videoSrc ? (
        <>
          <div className="absolute inset-0 w-full h-full z-0">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 z-1" />
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-gold-primary border border-gold-primary/30 hover:border-gold-primary transition-all cursor-pointer"
            title={muted ? "Unmute Video Testimonial" : "Mute Video Testimonial"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Centered Play indicator */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold-primary/15 backdrop-blur-md text-gold-primary border border-gold-primary/30 group-hover:scale-110 group-hover:bg-gold-primary/30 group-hover:border-gold-primary transition-all pointer-events-none shadow-gold-glow">
            <Play className="h-6 w-6 fill-gold-primary/20" />
          </div>

          {/* Glass Overlay Content Block at the bottom */}
          <div className="relative z-10 mt-auto w-full p-6 bg-black/60 backdrop-blur-md border-t border-border-gold/20 flex flex-col gap-4">
            <div className="space-y-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < rating ? "fill-gold-primary text-gold-primary" : "fill-border text-border"
                    )}
                  />
                ))}
              </div>
              <Paragraph size="sm" className="italic text-white font-serif leading-relaxed">
                &ldquo;{comment}&rdquo;
              </Paragraph>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 pt-3">
              {avatar ? (
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gold-primary/40">
                  <Image src={avatar} alt={author} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-primary/25 text-xs font-bold text-gold-primary">
                  {author.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-white font-cinzel">{author}</span>
                  {verified && <CheckCircle2 className="h-3 w-3 text-gold-primary" />}
                </div>
                <span className="text-[10px] text-text-secondary block">{role}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* 2. Standard Text/Avatar Glassmorphism Testimonial Card */
        <>
          <Quote className="absolute top-4 right-4 h-10 w-10 text-gold-primary/10 group-hover:text-gold-primary/20 transition-colors duration-300 pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < rating ? "fill-gold-primary text-gold-primary" : "fill-border text-border"
                  )}
                />
              ))}
            </div>

            <Paragraph size="sm" variant="primary" className="italic leading-relaxed">
              &ldquo;{comment}&rdquo;
            </Paragraph>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40 relative z-10">
            <div className="flex items-center gap-3">
              {avatar ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold-primary/40">
                  <Image src={avatar} alt={author} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-primary/20 text-sm font-bold text-gold-primary">
                  {author.charAt(0)}
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-text-primary font-cinzel">{author}</span>
                  {verified && <CheckCircle2 className="h-3.5 w-3.5 text-gold-primary" />}
                </div>
                <span className="text-xs text-text-muted">{role}</span>
              </div>
            </div>

            {date && <span className="text-xs text-text-muted">{date}</span>}
          </div>
        </>
      )}
    </GlassCard>
  );
}
