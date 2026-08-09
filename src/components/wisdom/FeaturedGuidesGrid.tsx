"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight, Search } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog/repository";

export interface FeaturedGuidesGridProps extends React.HTMLAttributes<HTMLElement> {
  articles: BlogPost[];
}

const INTENT_CATEGORIES = [
  "All",
  "Ritual Guides",
  "Sacred Places",
  "Travel & Hotels",
  "Festivals & Dates",
  "Family Questions",
  "Company Mission",
];

export default function FeaturedGuidesGrid({
  articles = [],
  className,
  ...props
}: FeaturedGuidesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Multi-field filtering
  const filteredGuides = articles.filter((guide) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      guide.title.toLowerCase().includes(q) ||
      guide.summary.toLowerCase().includes(q) ||
      guide.intentCategory.toLowerCase().includes(q) ||
      guide.keywords.some((k) => k.toLowerCase().includes(q)) ||
      guide.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCat =
      selectedCategory === "All" ||
      guide.intentCategory === selectedCategory ||
      guide.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <Section
      spacing="xl"
      className={cn(
        "relative py-16 overflow-hidden bg-[#07080E] text-text-primary border-b border-border-gold/20",
        className
      )}
      {...props}
    >
      <SacredChakraBg size="min(750px, 95vw)" opacity={0.045} rotateSpeed={160} position="center" />

      <Container size="xl" className="relative z-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-gold-primary/20 pb-6">
          <div>
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel block mb-1">
              AUTHENTIC PILGRIMAGE DOCUMENTATION
            </span>
            <Heading size="xl" font="cinzel">
              Featured{" "}
              <GradientText variant="gold" size="inherit" font="cinzel">
                Pilgrimage Guides
              </GradientText>
            </Heading>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-4 py-1.5 rounded-full border border-emerald-500/30">
            {filteredGuides.length} of {articles.length} Articles
          </span>
        </div>

        {/* Search + Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-primary/50" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, ritual, sacred place, keyword..."
              className="w-full bg-surface/80 border border-border-gold/30 focus:border-gold-primary rounded-xl pl-11 pr-5 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-gold-primary/20 text-sm transition-all font-cinzel"
            />
          </div>
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {INTENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-2 rounded-full text-xs font-bold font-cinzel uppercase tracking-wide border transition-all",
                  selectedCategory === cat
                    ? "bg-gold-primary text-black border-gold-primary"
                    : "bg-transparent text-text-muted border-border-gold/30 hover:border-gold-primary hover:text-gold-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Index */}
        {!searchQuery && selectedCategory === "All" && (
          <div className="rounded-2xl bg-surface/50 border border-border-gold/20 p-5">
            <p className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel mb-3">
              📋 All {articles.length} Articles — Quick Index
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {articles.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-gold-primary/10 transition-colors"
                >
                  <span className="text-text-muted text-xs font-mono pt-0.5 shrink-0 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-gold-primary font-bold block mb-0.5 font-cinzel uppercase">
                      {post.isPillar ? "⭐ Cornerstone · " : ""}{post.intentCategory}
                    </span>
                    <span className="text-sm text-text-primary group-hover:text-gold-primary transition-colors leading-snug block">
                      {post.title}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-gold-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide, idx) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <GlassCard
                  borderGold
                  hoverEffect="lift"
                  padding="none"
                  className="h-full flex flex-col justify-between overflow-hidden bg-surface/90 border border-gold-primary/30 group"
                >
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={guide.featuredImage}
                        alt={guide.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <span className="absolute top-4 left-4 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-gold-primary border border-gold-primary/40 font-cinzel uppercase">
                        {guide.isPillar ? "⭐ Cornerstone" : guide.intentCategory}
                      </span>
                      <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{guide.readTime}</span>
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-2">
                      <h3 className="text-base font-bold font-cinzel text-text-primary group-hover:text-gold-primary transition-colors leading-snug line-clamp-2">
                        {guide.title}
                      </h3>
                      <Paragraph size="sm" variant="muted" className="line-clamp-3 text-xs leading-relaxed">
                        {guide.summary}
                      </Paragraph>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-3 border-t border-border-gold/20 flex items-center justify-between">
                      <div className="text-[11px]">
                        <span className="font-bold text-text-primary block font-cinzel">{guide.author}</span>
                        {guide.reviewedBy && (
                          <span className="text-emerald-400 text-[10px]">✓ Reviewed</span>
                        )}
                      </div>
                      <Link
                        href={`/blog/${guide.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-gold-primary hover:text-gold-accent transition-colors font-cinzel uppercase tracking-wider"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-surface/50 border border-border space-y-3">
            <BookOpen className="h-10 w-10 text-gold-primary mx-auto opacity-50" />
            <h4 className="text-lg font-bold font-cinzel text-text-primary">No Articles Match Your Search</h4>
            <p className="text-xs text-text-muted">
              Try &ldquo;Pind Daan&rdquo;, &ldquo;Vishnupad&rdquo;, &ldquo;Falgu River&rdquo;, or &ldquo;Hotels&rdquo;.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
