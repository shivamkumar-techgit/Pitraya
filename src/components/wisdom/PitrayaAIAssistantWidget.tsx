"use client";

import React, { useState } from "react";
import { Sparkles, Send, MessageSquare, PhoneCall, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { cn } from "@/lib/utils";

export interface PitrayaAIAssistantWidgetProps {
  articleTopic?: string;
}

export default function PitrayaAIAssistantWidget({ articleTopic = "Pind Daan Rites" }: PitrayaAIAssistantWidgetProps) {
  const [question, setQuestion] = useState("Can I perform Pind Daan after marriage?");
  const [isAnswering, setIsAnswering] = useState(false);
  const [answer, setAnswer] = useState<string | null>(
    "Yes. According to Garuda Purana (Chapter 11), a married person holds full scriptural authority to perform Pind Daan for late parents, grandparents, and in-law ancestors. Your spouse may participate alongside you during the Sankalpa and Tarpan."
  );

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsAnswering(true);
    setTimeout(() => {
      setIsAnswering(false);
      setAnswer(
        `Based on Vayu Purana scriptures and Gayawal Panji rules: "${question}" is fully permissible. Rites at Gaya Vishnupad provide permanent ancestral liberation regardless of family branch or timing.`
      );
    }, 1000);
  };

  return (
    <GlassCard borderGold glow padding="md" className="sticky top-24 bg-gradient-to-br from-surface/95 via-background to-surface/95 p-5 space-y-4 border-2 border-gold-primary/60 shadow-gold-glow">
      <div className="flex items-center gap-2 border-b border-gold-primary/30 pb-3">
        <div className="p-2 rounded-xl bg-gold-primary text-black font-bold shadow-gold-glow">
          <Sparkles className="h-4 w-4 fill-black" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
            OFFICIAL KNOWLEDGE ASSISTANT
          </span>
          <h4 className="text-sm font-bold font-cinzel text-text-primary">
            Need Help? Ask Pitraya AI
          </h4>
        </div>
      </div>

      <p className="text-xs text-text-secondary font-serif italic">
        Have specific questions about {articleTopic}, Gotra rules, or family eligibility?
      </p>

      {/* QUESTION INPUT FORM */}
      <form onSubmit={handleAsk} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="w-full px-3 py-2.5 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-xs focus:outline-none focus:border-gold-primary shadow-inner"
          />
          <button
            type="submit"
            disabled={isAnswering}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gold-primary text-black font-bold text-[11px] hover:scale-105 transition-transform"
          >
            {isAnswering ? "..." : <Send className="h-3.5 w-3.5" />}
          </button>
        </div>
      </form>

      {/* AI ANSWER DISPLAY */}
      {answer && (
        <div className="p-3.5 rounded-xl bg-surface/90 border border-gold-primary/30 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-gold-primary font-bold font-cinzel text-[11px]">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Pitraya AI Verified Answer:</span>
          </div>
          <p className="text-text-secondary leading-relaxed font-serif italic text-xs">
            &ldquo;{answer}&rdquo;
          </p>
        </div>
      )}

      {/* CTA BUTTONS */}
      <div className="pt-2 border-t border-border-gold/20 space-y-2">
        <PrimaryButton
          size="sm"
          onClick={() => window.location.href = "/book-now"}
          className="w-full text-xs shadow-gold-glow"
        >
          Book Ritual Consultation
        </PrimaryButton>
        <SecondaryButton
          size="sm"
          onClick={() => window.location.href = "/contact"}
          leftIcon={<PhoneCall className="h-3.5 w-3.5" />}
          className="w-full text-xs"
        >
          Speak With Gayawal Pandit
        </SecondaryButton>
      </div>
    </GlassCard>
  );
}
