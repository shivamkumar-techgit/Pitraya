"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { cn } from "@/lib/utils";

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  features?: string[];
  price?: string;
  badge?: string;
  actionText?: string;
  onAction?: () => void;
  actionComponent?: React.ReactNode;
}

export default function ServiceCard({
  icon,
  title,
  description,
  image,
  features = [],
  price,
  badge,
  actionText = "Explore Service",
  onAction,
  actionComponent,
  className,
  ...props
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Map mouse position to degree tilt (max 8 degrees tilt)
    const tiltX = (mouseY / (height / 2)) * -8;
    const tiltY = (mouseX / (width / 2)) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease" : "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      className={cn(
        "group flex flex-col justify-between overflow-hidden rounded-2xl bg-surface/40 backdrop-blur-md border border-border-gold/30 hover:border-gold-primary/70 hover:shadow-gold-glow hover:bg-surface/60 transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="space-y-6">
        {/* Large Image Zoom Container */}
        {image && (
          <div className="relative w-full h-[240px] overflow-hidden select-none border-b border-border-gold/25">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            {badge && (
              <span className="absolute top-4 right-4 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold text-black shadow-lg">
                {badge}
              </span>
            )}
          </div>
        )}

        <div className="px-6 pb-2 space-y-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30 group-hover:bg-gold-primary/20 transition-all duration-300">
                {icon}
              </div>
            )}
            <Heading size="md" className="group-hover:text-gold-primary transition-colors duration-300 font-cinzel">
              {title}
            </Heading>
          </div>

          <Paragraph size="sm" variant="muted" className="leading-relaxed">
            {description}
          </Paragraph>

          {price && (
            <div className="pt-3 border-t border-border/40 flex items-center justify-between">
              <span className="text-xs text-text-muted uppercase tracking-wider">Starting at</span>
              <span className="text-xl font-bold text-gold-primary">{price}</span>
            </div>
          )}

          {features.length > 0 && (
            <ul className="space-y-2.5 pt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Check className="h-4 w-4 text-gold-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="p-6 pt-2">
        {actionComponent || (
          <PrimaryButton fullWidth onClick={onAction}>
            {actionText}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
