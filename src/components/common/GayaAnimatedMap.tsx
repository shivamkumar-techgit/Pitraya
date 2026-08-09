"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, Compass } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface MapNode {
  id: string;
  name: string;
  category: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage offset on SVG map
  significance: string;
  era: string;
}

export const gayaMapNodes: MapNode[] = [
  {
    id: "vishnupad",
    name: "Vishnupad Temple",
    category: "Sacred Footprint",
    description: "Houses the 40cm footprint of Lord Vishnu etched into solid basalt rock. The supreme site for ancestral liberation.",
    coordinates: { x: 48, y: 38 },
    significance: "Lord Vishnu's eternal blessing for Mukti",
    era: "Vedic Era & Ramayana Epics",
  },
  {
    id: "phalgu",
    name: "Phalgu River Ghats",
    category: "Sacred Waters",
    description: "The mystical river where Goddess Sita offered Pinda Daan to King Dasharatha, witnessed by the eternal elements.",
    coordinates: { x: 62, y: 52 },
    significance: "Sacred water oblation for soul peace",
    era: "Ramayana Era",
  },
  {
    id: "akshayavat",
    name: "Akshayavat Banyan Tree",
    category: "Immortal Tree",
    description: "The eternal undying Banyan Tree blessed by Sita Devi to remain immortal. Ancestors receive everlasting peace under its shade.",
    coordinates: { x: 35, y: 65 },
    significance: "Eternal shelter for ancestral spirits",
    era: "Treta Yuga",
  },
  {
    id: "mangla",
    name: "Mangla Gauri Temple",
    category: "Shakti Peeth",
    description: "One of the 18 sacred Maha Shakti Peeths, embodying divine maternal protection and spiritual strength.",
    coordinates: { x: 28, y: 28 },
    significance: "Divine mother protection & grace",
    era: "Puranic Age",
  },
  {
    id: "bodhgaya",
    name: "Bodh Gaya Sanctum",
    category: "Enlightenment Site",
    description: "Located nearby where Prince Siddhartha achieved supreme Buddha enlightenment under the sacred Bodhi Tree.",
    coordinates: { x: 75, y: 78 },
    significance: "Universal awakening & supreme truth",
    era: "500 BCE",
  },
];

export default function GayaAnimatedMap({ className }: { className?: string }) {
  const [selectedNode, setSelectedNode] = useState<MapNode>(gayaMapNodes[0]);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-3xl glass-panel border-gold-primary/30 p-6 md:p-8 bg-black/80", className)}>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* SVG Animated Map Canvas */}
        <div className="relative w-full lg:w-3/5 h-[360px] sm:h-[420px] bg-gradient-to-br from-surface/80 via-black to-surface/40 rounded-2xl border border-border-gold/30 overflow-hidden select-none">
          {/* Topographical Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            
            {/* Animated Connecting Pathways between Nodes */}
            <motion.path
              d="M 48% 38% L 62% 52% L 75% 78%"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 48% 38% L 35% 65% L 28% 28%"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* River Vector Flow Curve */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
            <path
              d="M 60% 0% Q 65% 40%, 60% 70% T 70% 100%"
              fill="none"
              stroke="#E5C158"
              strokeWidth="6"
              strokeLinecap="round"
              className="filter blur-[1px]"
            />
            <text x="63%" y="25%" fill="#D4AF37" fontSize="10" letterSpacing="3" fontWeight="bold" opacity="0.6" transform="rotate(20 180,60)">
              PHALGU RIVER
            </text>
          </svg>

          {/* Interactive Map Nodes Pins */}
          {gayaMapNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;

            return (
              <div
                key={node.id}
                style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedNode(node)}
              >
                {/* Glowing Pulse Ring */}
                <div
                  className={cn(
                    "absolute -inset-3 rounded-full bg-gold-primary/30 animate-ping opacity-75 transition-all",
                    isSelected ? "scale-150 bg-gold-primary/50" : "group-hover:scale-125"
                  )}
                />

                {/* Pin Button Icon */}
                <div
                  className={cn(
                    "relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-gold-glow",
                    isSelected
                      ? "bg-gold-primary text-black border-white scale-110"
                      : "bg-black/80 text-gold-primary border-gold-primary/70 group-hover:bg-gold-primary group-hover:text-black"
                  )}
                >
                  <MapPin className="h-4 w-4" />
                </div>

                {/* Node Label Tooltip */}
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-10 whitespace-nowrap rounded-md bg-black/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase border border-gold-primary/40 transition-all duration-200 pointer-events-none",
                    isSelected ? "text-gold-primary opacity-100 scale-100" : "text-text-secondary opacity-70 group-hover:opacity-100"
                  )}
                >
                  {node.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Map Node Preview Card */}
        <div className="w-full lg:w-2/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard borderGold glow padding="lg" className="space-y-4 bg-gradient-to-b from-surface to-background">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gold-primary/15 px-3 py-1 text-xs font-bold text-gold-primary border border-gold-primary/30 uppercase tracking-widest">
                    {selectedNode.category}
                  </span>
                  <span className="text-xs font-medium text-text-muted">{selectedNode.era}</span>
                </div>

                <div className="space-y-1">
                  <Heading size="md" font="cinzel" className="text-gold-primary">
                    {selectedNode.name}
                  </Heading>
                  <span className="text-xs text-text-secondary italic block">
                    &ldquo;{selectedNode.significance}&rdquo;
                  </span>
                </div>

                <Paragraph size="sm" variant="muted" className="leading-relaxed">
                  {selectedNode.description}
                </Paragraph>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-gold-accent">
                  <Compass className="h-4 w-4 animate-spin-slow" />
                  <span>Interactive Sacred Map Coordinates</span>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
