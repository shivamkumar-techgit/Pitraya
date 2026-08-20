"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface TreeNode {
  relation: string;
  name: string;
  year: string;
  location: string;
  status: string;
  badge: string;
}

const familyTreeNodes: TreeNode[] = [
  {
    relation: "Great Grandfather",
    name: "Late Pt. Mahadeo Sharma",
    year: "Recorded 1898",
    location: "Gaya Vishnupad Sanctum",
    status: "Moksha Granted • Registered",
    badge: "Generation I",
  },
  {
    relation: "Grandfather",
    name: "Late Ram Prasad Sharma",
    year: "Recorded 1936",
    location: "Phalgu River Ghats",
    status: "Panji Entry Verified",
    badge: "Generation II",
  },
  {
    relation: "Father",
    name: "Late Shiv Kumar Sharma",
    year: "Recorded 1978",
    location: "Akshay Vat Banyan",
    status: "Pind Daan Completed",
    badge: "Generation III",
  },
  {
    relation: "You (Pilgrim)",
    name: "Rameshwar Sharma",
    year: "Present 2026",
    location: "Active Lineage Holder",
    status: "Fulfilling Sacred Duty",
    badge: "Current Generation",
  },
  {
    relation: "Children",
    name: "Aarav & Diya Sharma",
    year: "Future Generation",
    location: "Inheritors of Blessings",
    status: "Protected Lineage",
    badge: "Generation V",
  },
];

export type DigitalFamilyTreeSectionProps = React.HTMLAttributes<HTMLElement>;

export default function DigitalFamilyTreeSection({ className, ...props }: DigitalFamilyTreeSectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn("relative py-28 overflow-hidden bg-muted text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Sacred Rotating Circular Chakra */}
      <SacredChakraBg size="min(750px, 95vw)" opacity={0.045} rotateSpeed={170} position="center" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <Users className="h-3.5 w-3.5" />
            <span>VISUAL ANCESTRAL HIERARCHY</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Digital Family{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Tree
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted">
            Trace five generations of your ancestral lineage connected seamlessly from great grandfathers to your children.
          </Paragraph>
        </div>

        {/* ANIMATED FAMILY TREE FLOW */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Connecting Progress Line */}
          <div className="absolute top-8 bottom-8 left-6 md:left-1/2 -translate-x-1/2 w-1 bg-border-gold/20 overflow-hidden z-0">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 0 }}
              className="w-full h-full bg-gold-gradient shadow-gold-glow"
            />
          </div>

          {/* TREE NODES */}
          <div className="space-y-10 relative z-10">
            {familyTreeNodes.map((node, idx) => {
              const isEven = idx % 2 === 0;
              const isCurrent = node.relation.includes("You");

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={cn(
                    "flex flex-col md:flex-row items-center",
                    isEven ? "md:flex-row-reverse" : "",
                    "pl-14 md:pl-0"
                  )}
                >
                  {/* Content Card Container */}
                  <div className="w-full md:w-1/2 px-2 md:px-8">
                    <GlassCard
                      borderGold={isCurrent}
                      glow={isCurrent}
                      className={cn(
                        "p-6 space-y-3 transition-all duration-300",
                        isCurrent
                          ? "bg-gradient-to-br from-gold-primary/20 via-surface to-background border-2 border-gold-primary shadow-gold-glow"
                          : "bg-surface/80 hover:bg-surface"
                      )}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/30 font-cinzel">
                          {node.badge}
                        </span>
                        <span className="text-xs font-mono font-semibold text-emerald-400">
                          {node.year}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-gold-accent uppercase tracking-wider font-cinzel">
                          {node.relation}
                        </h4>
                        <p className="text-lg font-bold text-text-primary font-cinzel mt-0.5">
                          {node.name}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-border-gold/20 flex items-center justify-between text-xs text-text-muted">
                        <span>📍 {node.location}</span>
                        <span className="font-semibold text-gold-primary">✓ {node.status}</span>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Node Circle Indicator */}
                  <motion.div
                    animate={{
                      scale: isCurrent ? [1, 1.2, 1] : 1,
                      boxShadow: isCurrent
                        ? "0 0 25px rgba(212, 175, 55, 0.9)"
                        : "0 0 10px rgba(212, 175, 55, 0.3)",
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={cn(
                      "absolute md:static flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background z-20 shrink-0",
                      isCurrent
                        ? "border-white bg-gold-primary text-black"
                        : "border-gold-primary text-gold-primary",
                      "left-6 md:left-auto -translate-x-1/2 md:translate-x-0"
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
