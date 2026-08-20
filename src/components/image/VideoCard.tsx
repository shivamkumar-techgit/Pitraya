"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import IconButton from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  videoSrc: string;
  poster?: string;
  title?: string;
  description?: string;
  hoverPlay?: boolean;
  aspectRatio?: "square" | "video" | "portrait";
}

export default function VideoCard({
  videoSrc,
  poster,
  title,
  description,
  hoverPlay = false,
  aspectRatio = "video",
  className,
  ...props
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleMouseEnter = () => {
    if (hoverPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverPlay && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]"
  }[aspectRatio];

  return (
    <GlassCard
      borderGold
      padding="none"
      hoverEffect="lift"
      className={cn("group overflow-hidden relative w-full", aspectClass, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover absolute inset-0"
      />

      {/* Dark overlay mask on hover/idle */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 opacity-60 group-hover:opacity-80 z-10" />

      {/* Video Content & Text details */}
      <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between text-left pointer-events-none">
        
        {/* Top Control - Mute Trigger */}
        <div className="self-end pointer-events-auto">
          <IconButton
            ariaLabel={isMuted ? "Unmute video" : "Mute video"}
            variant="outline"
            shape="circle"
            size="sm"
            onClick={toggleMute}
            icon={isMuted ? <VolumeX className="h-4 w-4 text-gold-primary" /> : <Volume2 className="h-4 w-4 text-gold-primary" />}
            className="bg-black/40 border-border-gold/20 cursor-pointer"
          />
        </div>

        {/* Bottom Play button, titles, descriptions */}
        <div className="space-y-3 pointer-events-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="h-10 w-10 shrink-0 rounded-full bg-gold-primary text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold-primary/20"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="h-4.5 w-4.5 fill-black" /> : <Play className="h-4.5 w-4.5 fill-black pl-0.5" />}
            </button>
            
            <div className="space-y-0.5">
              {title && (
                <Heading size="sm" font="cinzel" className="text-white">
                  {title}
                </Heading>
              )}
              {description && (
                <Paragraph size="xs" variant="muted" className="line-clamp-1">
                  {description}
                </Paragraph>
              )}
            </div>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
