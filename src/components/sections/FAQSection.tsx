"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Clock, Sparkles, MapPin, ChevronRight, HelpCircle, BookOpen, Calendar, CheckCircle2, TreePine, Droplets } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: string;
  icon: React.ReactNode;
  question: string;
  answer: string;
  category: string;
  details?: string[];
}

export const defaultHomepageFaqs: FAQItem[] = [
  {
    id: "faq-1",
    icon: <HelpCircle className="h-4 w-4 text-gold-primary" />,
    question: "Who is eligible to perform Pind Daan in Gaya?",
    answer: "According to Vedic dharma, the eldest son holds the primary duty to perform Pind Daan for late parents. However, in his absence, any male relative (including younger brothers, grandsons, or nephews) can perform the rites. Significantly, the scriptures also permit daughters or wives to perform Pind Daan if there are no male descendants in the immediate family tree.",
    category: "Eligibility & Rules",
    details: [
      "Eldest son has primary duty according to Vedic dharma",
      "In his absence, younger brothers, grandsons, or nephews can perform",
      "Daughters and wives are scripturally permitted if no male descendants exist",
    ],
  },
  {
    id: "faq-2",
    icon: <BookOpen className="h-4 w-4 text-gold-primary" />,
    question: "Why are family records (Panjis) checked during the ritual?",
    answer: "The Gayawal Pandits maintain hand-written palm-leaf registers (Panji registers) dating back hundreds of years. These records categorize lineages by Gotra, ancestral village, and family tree branches. Checking these records verifies your ancestors' names, preserves your family history, and ensures that your oblation is officially registered under the correct lineage register.",
    category: "Lineage Verification",
    details: [
      "Gayawal Pandits maintain hand-written palm-leaf registers",
      "Records trace Gotras, family branches, and ancestral home villages",
      "Verifies ancestral names to register your oblation correctly",
    ],
  },
  {
    id: "faq-3",
    icon: <Clock className="h-4 w-4 text-gold-primary" />,
    question: "Can Pind Daan be performed online or in absentia?",
    answer: "While physical presence is highly recommended to experience the spiritual depth of the ritual, Vedic texts recognize Pratinidhi Shraddha (performing rites on behalf of someone else). If you cannot travel to Gaya due to health or visa constraints, a Gayawal Pandit can perform the Sankalpa and Pind Daan in your name via live video stream, with you observing the mantras from home.",
    category: "Absentia Rites",
    details: [
      "Pratinidhi Shraddha is scripturally recognized for absent performers",
      "Live video stream enables real-time Sankalpa and mantra guidance",
      "Pandit performs physical oblation on your behalf at Gaya",
    ],
  },
  {
    id: "faq-4",
    icon: <TreePine className="h-4 w-4 text-gold-primary" />,
    question: "What is the significance of the Akshay Vat tree?",
    answer: "The Akshay Vat is the immortal Banyan tree of Gaya, blessed by Goddess Sita to remain eternal. It is believed to survive the cosmic dissolution (Pralaya). Offering the final leaf oblation at Akshay Vat signifies that the ancestral liberation is complete, sealed eternally, and that the souls of your forefathers are permanently released into Vaikuntha.",
    category: "Immortal Banyan",
    details: [
      "Eternal Banyan tree blessed by Goddess Sita to survive cosmic dissolution",
      "Saves departed souls from rebirth cycles and grants permanent entry to Vaikuntha",
      "Marks the final completion step of the Gaya pilgrimage",
    ],
  },
  {
    id: "faq-5",
    icon: <Droplets className="h-4 w-4 text-gold-primary" />,
    question: "What is the difference between Pind Daan and Tarpan?",
    answer: "Tarpan is the daily or periodic offering of water mixed with sesame seeds, barley, and white flowers to satisfy the thirst of ancestors. Pind Daan is the physical offering of cooked rice balls or barley flour (pindas) mixed with honey, milk, and ghee. Pind Daan is a major ceremony that represents offering solid food to satisfy the ancestors' hunger and release them from worldly ties.",
    category: "Ritual Science",
    details: [
      "Tarpan is the periodic liquid offering (water + sesame + barley) to satisfy thirst",
      "Pind Daan is the solid offering (rice or barley flour balls) to satisfy hunger",
      "Pind Daan is a major release ceremony, while Tarpan is routine ancestral honoring",
    ],
  },
];

export type FAQSectionProps = React.HTMLAttributes<HTMLElement>;

export default function FAQSection({ className, ...props }: FAQSectionProps) {
  const [activeId, setActiveId] = useState<string>("faq-1");
  const activeFaq = defaultHomepageFaqs.find((f) => f.id === activeId) || defaultHomepageFaqs[0];

  return (
    <Section spacing="xl" className={cn("relative py-28 overflow-hidden bg-muted text-text-primary border-b border-border-gold/20", className)} {...props}>
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(700px, 90vw)" opacity={0.04} rotateSpeed={180} position="center" />
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-gold-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>COMMON INQUIRIES</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Frequently Asked{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Questions
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-2xl mx-auto">
            Everything you need to know about preparing for your sacred Pind Daan pilgrimage to Gaya with Pitraya.
          </Paragraph>
        </div>

        {/* SPLIT NAVIGATION LAYOUT — Left Column Question Selector + Right Column Active Answer Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5 COLS: Question Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {defaultHomepageFaqs.map((faq) => {
              const isActive = faq.id === activeId;
              return (
                <button
                  key={faq.id}
                  onClick={() => setActiveId(faq.id)}
                  className="text-left w-full focus:outline-none group"
                >
                  <GlassCard
                    padding="sm"
                    className={cn(
                      "flex items-center gap-3.5 p-4 transition-all duration-300 border cursor-pointer rounded-2xl",
                      isActive
                        ? "border-gold-primary/70 bg-surface-hover/90 shadow-gold-glow scale-[1.01]"
                        : "border-border-gold/20 bg-surface hover:border-gold-primary/45 shadow-sm"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
                        isActive
                          ? "bg-gold-primary text-black border-gold-primary"
                          : "bg-background text-gold-primary border-border-gold/30 group-hover:bg-gold-primary/10"
                      )}
                    >
                      {faq.icon}
                    </div>
                    <div className="flex-1 truncate">
                      <h4
                        className={cn(
                          "text-sm font-semibold transition-colors font-cinzel truncate",
                          isActive ? "text-gold-primary" : "text-text-primary group-hover:text-gold-primary"
                        )}
                      >
                        {faq.question}
                      </h4>
                      <span className="text-[10px] text-text-muted uppercase tracking-widest block mt-0.5">
                        {faq.category}
                      </span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-text-muted shrink-0 transition-transform duration-300",
                        isActive ? "translate-x-1 text-gold-primary" : "group-hover:translate-x-0.5"
                      )}
                    />
                  </GlassCard>
                </button>
              );
            })}
          </div>

          {/* RIGHT 7 COLS: Expanded Answer & Detail Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFaq.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <GlassCard
                  borderGold
                  glow
                  padding="lg"
                  className="bg-gradient-to-br from-surface/80 via-background to-surface space-y-6 rounded-2xl p-8"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-widest">
                      {activeFaq.icon}
                      <span>{activeFaq.category}</span>
                    </div>
                    <Heading size="md" font="cinzel" className="text-text-primary">
                      {activeFaq.question}
                    </Heading>
                  </div>

                  <Paragraph size="sm" variant="muted" className="leading-relaxed text-text-secondary text-base">
                    {activeFaq.answer}
                  </Paragraph>

                  {activeFaq.details && (
                    <div className="pt-4 border-t border-border-gold/20 space-y-3">
                      <span className="text-xs font-bold text-gold-primary uppercase tracking-wider block">
                        Key Guidance Highlights:
                      </span>
                      <ul className="space-y-2">
                        {activeFaq.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-text-secondary">
                            <CheckCircle2 className="h-4 w-4 text-gold-primary shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </Section>
  );
}
