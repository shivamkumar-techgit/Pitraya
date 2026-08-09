"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search, Eye, EyeOff } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import Paragraph from "@/components/typography/Paragraph";
import { Input, Chip } from "@/components/ui";
import OutlineButton from "@/components/buttons/OutlineButton";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id?: string | number;
  question: string;
  answer: string | React.ReactNode;
  icon?: React.ReactNode;
  category?: string;
  defaultOpen?: boolean;
}

export interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FAQItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number | number[];
  variant?: "glass" | "outline" | "minimal";
  enableSearch?: boolean;
  enableCategories?: boolean;
  enableExpandCollapse?: boolean;
}

export default function FAQ({
  items,
  allowMultiple = true,
  defaultOpenIndex = [],
  variant = "glass",
  enableSearch = true,
  enableCategories = true,
  enableExpandCollapse = true,
  className,
  ...props
}: FAQProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    items.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return ["All", ...Array.from(cats)];
  }, [items]);

  // Filter items dynamically based on search and category
  const filteredItems = useMemo(() => {
    return items.map((item, idx) => ({ ...item, originalIndex: idx })).filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      
      const textToSearch = `${item.question} ${typeof item.answer === "string" ? item.answer : ""}`.toLowerCase();
      const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [items, searchQuery, selectedCategory]);

  // Tracking open state indexes
  const [openIndexes, setOpenIndexes] = useState<number[]>(() => {
    if (typeof defaultOpenIndex === "number") return [defaultOpenIndex];
    if (Array.isArray(defaultOpenIndex)) return defaultOpenIndex;
    return [];
  });

  const toggleItem = (idx: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(idx)) {
        setOpenIndexes(openIndexes.filter((i) => i !== idx));
      } else {
        setOpenIndexes([...openIndexes, idx]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(idx) ? [] : [idx]);
    }
  };

  const handleExpandAll = () => {
    const allFilteredIndices = filteredItems.map((item) => item.originalIndex);
    setOpenIndexes(allFilteredIndices);
  };

  const handleCollapseAll = () => {
    setOpenIndexes([]);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)} {...props}>
      
      {/* Search & Bulk Control Bar */}
      {(enableSearch || enableExpandCollapse) && (
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-2">
          {enableSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted z-10 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search pilgrim questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-border-gold/30 rounded-xl bg-surface/30 w-full"
              />
            </div>
          )}

          {enableExpandCollapse && (
            <div className="flex items-center gap-3">
              <OutlineButton
                size="sm"
                onClick={handleExpandAll}
                leftIcon={<Eye className="h-4 w-4" />}
                className="border-gold-primary/20 hover:border-gold-primary text-xs"
              >
                Expand All
              </OutlineButton>
              <OutlineButton
                size="sm"
                onClick={handleCollapseAll}
                leftIcon={<EyeOff className="h-4 w-4" />}
                className="border-gold-primary/20 hover:border-gold-primary text-xs"
              >
                Collapse All
              </OutlineButton>
            </div>
          )}
        </div>
      )}

      {/* Category Selection Tabs */}
      {enableCategories && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 pb-2 border-b border-border/20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchQuery(""); // clear search on category toggle
              }}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer",
                selectedCategory === cat
                  ? "bg-gold-primary text-black border-gold-primary"
                  : "bg-surface/20 text-text-muted border-border-gold/25 hover:border-gold-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Accordion Container */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border-gold/20 rounded-2xl bg-surface/5">
            <Paragraph size="sm" variant="muted">
              No matching questions found for &quot;{searchQuery}&quot;.
            </Paragraph>
          </div>
        ) : (
          filteredItems.map((item) => {
            const idx = item.originalIndex;
            const isOpen = openIndexes.includes(idx);

            if (variant === "minimal") {
              return (
                <div
                  key={item.id || idx}
                  className="border-b border-border/40 py-4 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    className="flex w-full items-center justify-between gap-4 text-left focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon ? (
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gold-primary/10 text-gold-primary shrink-0">
                          {item.icon}
                        </div>
                      ) : (
                        <HelpCircle className="h-5 w-5 text-gold-primary/70 shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-base md:text-lg font-medium transition-colors duration-200",
                          isOpen ? "text-gold-primary font-semibold" : "text-text-primary group-hover:text-gold-primary"
                        )}
                      >
                        {item.question}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-gold-primary transition-transform duration-300 shrink-0",
                        isOpen && "rotate-180"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="pt-3 pl-11 pr-4">
                          {typeof item.answer === "string" ? (
                            <Paragraph size="sm" variant="muted" className="leading-relaxed">
                              {item.answer}
                            </Paragraph>
                          ) : (
                            item.answer
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <GlassCard
                key={item.id || idx}
                padding="none"
                borderGold={isOpen}
                hoverEffect="none"
                className={cn(
                  "overflow-hidden transition-all duration-300 bg-surface/30",
                  variant === "outline" && "bg-surface/50 border-border"
                )}
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none group gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    {item.icon ? (
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary shrink-0 border border-gold-primary/20">
                        {item.icon}
                      </div>
                    ) : (
                      <HelpCircle className="h-5 w-5 text-gold-primary shrink-0" />
                    )}
                    <div>
                      {item.category && (
                        <span className="text-xs font-semibold text-gold-accent uppercase tracking-wider block mb-0.5">
                          {item.category}
                        </span>
                      )}
                      <span
                        className={cn(
                          "text-base md:text-lg font-semibold transition-colors duration-200",
                          isOpen ? "text-gold-primary" : "text-text-primary group-hover:text-gold-primary"
                        )}
                      >
                        {item.question}
                      </span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-hover text-gold-primary transition-transform duration-300 shrink-0",
                      isOpen && "rotate-180 bg-gold-primary/20"
                    )}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-border/30">
                        <div className="pt-4">
                          {typeof item.answer === "string" ? (
                            <Paragraph size="md" variant="muted" className="leading-relaxed font-serif">
                              {item.answer}
                            </Paragraph>
                          ) : (
                            item.answer
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })
        )}
      </div>

    </div>
  );
}
