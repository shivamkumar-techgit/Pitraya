"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  User,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  HelpCircle,
  Share2,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ReadingProgressBar from "./ReadingProgressBar";
import TableOfContents from "./TableOfContents";
import PitrayaAIAssistantWidget from "./PitrayaAIAssistantWidget";
import { FeaturedGuide, featuredGuides } from "@/data/guidesData";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface WisdomArticleReaderProps {
  guide: FeaturedGuide;
}

const tocItems = [
  { id: "overview", label: "1. Overview" },
  { id: "history", label: "2. History & Mythology" },
  { id: "importance", label: "3. Why Performed & Benefits" },
  { id: "who-can-perform", label: "4. Who Should Perform" },
  { id: "materials", label: "5. Things to Carry & Materials" },
  { id: "procedure", label: "6. Complete Step-by-Step Rites" },
  { id: "scientific", label: "7. Scientific & Spiritual View" },
  { id: "best-time", label: "8. Best Time & Muhurat" },
  { id: "mistakes", label: "9. Common Mistakes to Avoid" },
  { id: "faqs", label: "10. Frequently Asked Questions" },
  { id: "related", label: "11. Related Articles" },
  { id: "cta", label: "12. Book Ritual CTA" },
];

export default function WisdomArticleReader({ guide }: WisdomArticleReaderProps) {
  const relatedArticles = featuredGuides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="relative bg-[#07080D] text-text-primary min-h-screen pt-20">
      {/* Sticky Top Reading Progress Bar */}
      <ReadingProgressBar articleTitle={guide.title} />

      <Section spacing="lg" className="relative overflow-hidden py-16">
        <SacredChakraBg size="min(750px, 95vw)" opacity={0.045} rotateSpeed={160} position="top-right" />

        <Container size="xl" className="relative z-10 space-y-12">
          
          {/* ARTICLE HERO BANNER */}
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel">
              <BookOpen className="h-3.5 w-3.5" />
              <span>WISDOM LIBRARY ARTICLE • {guide.category}</span>
            </div>

            {/* H1 SEO TITLE */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-text-primary leading-tight">
              {guide.title}
            </h1>

            {/* AUTHOR & METADATA */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted border-y border-gold-primary/20 py-3">
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-7 rounded-full overflow-hidden border border-gold-primary">
                  <Image src={guide.authorAvatar} alt={guide.author} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
                <span className="font-bold text-text-primary font-cinzel">{guide.author} ({guide.authorRole})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
                <Clock className="h-3.5 w-3.5" />
                <span>{guide.readTime}</span>
              </div>
              <span>•</span>
              <span className="text-gold-primary font-semibold">Vetted by Gayawal Purohit</span>
            </div>

            {/* MAIN HERO IMAGE */}
            <div className="relative h-[320px] sm:h-[450px] w-full rounded-3xl overflow-hidden border-2 border-gold-primary/40 shadow-2xl shadow-gold-glow">
              <Image src={guide.image} alt={guide.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>
          </div>

          {/* 3-COLUMN READER LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: STICKY TABLE OF CONTENTS (3 COLS) */}
            <div className="hidden lg:block lg:col-span-3">
              <TableOfContents items={tocItems} />
            </div>

            {/* CENTER COLUMN: 12-SECTION ARTICLE BODY (6 COLS) */}
            <div className="lg:col-span-6 space-y-12 leading-relaxed text-text-secondary">
              
              {/* SECTION 1: OVERVIEW */}
              <section id="overview" className="space-y-4 pt-4 border-t border-gold-primary/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary flex items-center gap-2">
                  <span>1. Overview</span>
                </h2>
                <p className="text-base leading-relaxed text-text-primary font-serif">
                  {guide.excerpt} In Vedic philosophy, performing oblation for one&apos;s ancestors is recognized not merely as a family tradition, but as an essential spiritual obligation known as <em>Pitru Rin</em>.
                </p>
                <div className="p-4 rounded-2xl bg-surface/90 border border-gold-primary/30 text-xs space-y-2">
                  <span className="font-bold text-gold-primary font-cinzel block">Key Takeaways:</span>
                  <ul className="space-y-1 text-text-muted">
                    <li>✓ Oblation offered at Gaya reaches ancestors across seven generations.</li>
                    <li>✓ Handwritten palm-leaf Panji registers verify your family Gotra.</li>
                    <li>✓ Ceremonies are conducted by hereditary Gayawal Pandits.</li>
                  </ul>
                </div>
              </section>

              {/* SECTION 2: HISTORY & MYTHOLOGY */}
              <section id="history" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  2. History &amp; Scriptural Chronicles
                </h2>
                <p className="text-sm leading-relaxed">
                  According to the <strong>Vayu Purana</strong> and <strong>Garuda Purana</strong>, the demon Gayasura performed thousands of years of penance until Lord Vishnu granted him a sacred boon: anyone who steps upon his body or performs oblations at Gaya will attain instant salvation (Moksha).
                </p>
                <blockquote className="p-4 rounded-2xl bg-gradient-to-r from-gold-primary/10 via-surface to-background border-l-4 border-gold-primary text-xs font-serif italic text-gold-accent">
                  &ldquo;Namas te devadevesha, Gaya-theertha nivasa chakra-dhara... Obeying Lord Vishnu&apos;s footprint at Vishnupad grants unconditional freedom from rebirth.&rdquo; — Vayu Purana Chapter 105
                </blockquote>
              </section>

              {/* SECTION 3: WHY PERFORMED & BENEFITS */}
              <section id="importance" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  3. Why It is Performed &amp; Spiritual Benefits
                </h2>
                <p className="text-sm leading-relaxed">
                  Performing oblation brings profound peace to both the departed souls and the living family:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/20 space-y-1">
                    <span className="font-bold text-emerald-400 block font-cinzel">✓ Ancestral Freedom</span>
                    <p className="text-text-muted">Frees departed souls from lower subtle realms into heavenly peace.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/20 space-y-1">
                    <span className="font-bold text-emerald-400 block font-cinzel">✓ Lineage Protection</span>
                    <p className="text-text-muted">Protects seven future generations from obstacles and family disharmony.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 4: WHO CAN PERFORM */}
              <section id="who-can-perform" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  4. Who Should Perform? (Rules &amp; Exceptions)
                </h2>
                <p className="text-sm leading-relaxed">
                  While the eldest son holds primary scriptural duty, Vedic texts permit any male relative, daughter, or wife if no immediate male descendant exists.
                </p>
                <div className="p-4 rounded-xl bg-background/90 border border-border space-y-2 text-xs">
                  <span className="font-bold text-gold-primary font-cinzel block">Scriptural Eligibility Matrix:</span>
                  <p>• Eldest Son / Sons • Grandsons • Nephews • Unmarried / Married Daughters • Wives</p>
                </div>
              </section>

              {/* SECTION 5: MATERIALS & THINGS TO CARRY */}
              <section id="materials" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  5. Required Materials &amp; Things to Carry
                </h2>
                <ul className="space-y-2 text-xs text-text-secondary">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> White unstitched traditional cotton clothes (Dhoti / Saree)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Names, Gotra, and photos of departed parents &amp; grandparents</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Valid Government Photo ID proof for Panji registration</li>
                </ul>
              </section>

              {/* SECTION 6: COMPLETE STEP-BY-STEP RITES */}
              <section id="procedure" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  6. Complete Step-by-Step Procedure Timeline
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/30 space-y-1">
                    <span className="font-bold text-gold-primary uppercase font-cinzel block">Step 1: Sankalpa &amp; Phalgu River Tarpan</span>
                    <p className="text-text-muted">Purification bath, water &amp; sesame seed oblations offered at Phalgu Nadi.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/30 space-y-1">
                    <span className="font-bold text-gold-primary uppercase font-cinzel block">Step 2: Vishnupad Basalt Footprint Oblation</span>
                    <p className="text-text-muted">Pindas (rice flour &amp; sesame balls) placed upon Lord Vishnu&apos;s footprint.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/30 space-y-1">
                    <span className="font-bold text-gold-primary uppercase font-cinzel block">Step 3: Immortal Banyan Tree (Akshay Vat) Leaf Seal</span>
                    <p className="text-text-muted">Final Pinda offered under Akshay Vat to permanently conclude the obligation.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 7: SCIENTIFIC & SPIRITUAL VIEW */}
              <section id="scientific" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  7. Scientific Perspective &amp; Energy Dynamics
                </h2>
                <p className="text-sm leading-relaxed">
                  Modern bio-resonance research reveals that subtle intention, sound vibrations of Vedic mantras, and organic sesame seed oblations create acoustic resonance matching ancestral bio-fields.
                </p>
              </section>

              {/* SECTION 8: BEST TIME & MUHURAT */}
              <section id="best-time" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  8. Best Time &amp; Auspicious Muhurat
                </h2>
                <p className="text-sm leading-relaxed">
                  Morning hours (Brahma Muhurat 06:30 AM – 09:30 AM) during <strong>Pitru Paksha</strong> (September-October) or monthly <strong>Amavasya</strong> are most auspicious.
                </p>
              </section>

              {/* SECTION 9: COMMON MISTAKES TO AVOID */}
              <section id="mistakes" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  9. Common Mistakes to Avoid
                </h2>
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold font-cinzel">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Important Guidelines:</span>
                  </div>
                  <p>• Avoid engaging unverified local touts. Only consult registered Gayawal Pandits holding official Panji registers.</p>
                  <p>• Avoid consuming non-sattvik meals or alcohol before/during ritual days.</p>
                </div>
              </section>

              {/* SECTION 10: FAQS */}
              <section id="faqs" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>10. Frequently Asked Questions</span>
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-border space-y-1">
                    <span className="font-bold text-text-primary block font-cinzel">Q: How many days are required in Gaya?</span>
                    <p className="text-text-muted">A: 1-Day or 2-Day itineraries are sufficient to complete the 3-Vedi Pind Daan rites comfortably.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-border space-y-1">
                    <span className="font-bold text-text-primary block font-cinzel">Q: Are hotel stays included in package bookings?</span>
                    <p className="text-text-muted">A: Yes, all Pitraya pilgrimage packages include pre-checked hotel stays with AC private vehicle transfers.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 11: RELATED ARTICLES */}
              <section id="related" className="space-y-4 pt-6 border-t border-border-gold/20">
                <h2 className="text-2xl font-bold font-cinzel text-gold-primary">
                  11. Read Next in Wisdom Library
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((rel) => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`}>
                      <GlassCard borderGold hoverEffect="lift" className="p-3 space-y-2 h-full bg-surface/80 text-left">
                        <div className="relative h-24 w-full rounded-lg overflow-hidden">
                          <Image src={rel.image} alt={rel.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                        </div>
                        <h4 className="text-xs font-bold font-cinzel text-text-primary line-clamp-2">{rel.title}</h4>
                      </GlassCard>
                    </Link>
                  ))}
                </div>
              </section>

              {/* SECTION 12: BOOK RITUAL CTA */}
              <section id="cta" className="pt-8 border-t-2 border-gold-primary/40">
                <GlassCard borderGold glow padding="lg" className="bg-gradient-to-r from-gold-primary/20 via-surface to-background text-center space-y-4 p-8">
                  <Sparkles className="h-8 w-8 text-gold-primary mx-auto shadow-gold-glow animate-pulse" />
                  <h3 className="text-2xl font-bold font-cinzel text-text-primary">
                    Ready to Perform Your Ancestral Duty in Gaya?
                  </h3>
                  <p className="text-xs text-text-secondary font-serif italic max-w-md mx-auto">
                    Reserve your sacred Pind Daan pilgrimage under the guidance of hereditary Gayawal Pandits.
                  </p>
                  <PrimaryButton
                    size="lg"
                    onClick={() => window.location.href = "/book-now"}
                    className="mx-auto shadow-gold-glow"
                  >
                    Book Pilgrimage Package
                  </PrimaryButton>
                </GlassCard>
              </section>

            </div>

            {/* RIGHT COLUMN: STICKY PITRAYA AI ASSISTANT (3 COLS) */}
            <div className="lg:col-span-3 space-y-6">
              <PitrayaAIAssistantWidget articleTopic={guide.title} />
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
