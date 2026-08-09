"use client";

import React, { useState, useEffect } from "react";
import { List, ChevronRight } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

export interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 100) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <GlassCard borderGold padding="md" className="sticky top-24 bg-surface/90 backdrop-blur-xl p-5 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel border-b border-gold-primary/30 pb-2">
        <List className="h-4 w-4" />
        <span>Contents</span>
      </div>

      <nav className="space-y-1 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 cursor-pointer select-none font-cinzel",
                isActive
                  ? "bg-gold-primary text-black font-bold shadow-gold-glow"
                  : "text-text-secondary hover:text-gold-primary hover:bg-surface/60"
              )}
            >
              <span>{item.label}</span>
              {isActive && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
            </button>
          );
        })}
      </nav>
    </GlassCard>
  );
}
