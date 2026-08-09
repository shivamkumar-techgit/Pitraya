"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/cards/GlassCard";
import Heading from "@/components/typography/Heading";
import Body from "@/components/typography/Body";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <GlassCard borderGold glow padding="lg" className="max-w-3xl mx-auto bg-gradient-to-r from-surface/90 via-background/90 to-surface/90">
      <div className="text-center space-y-3 mb-6">
        <span className="text-xs font-bold text-gold-primary uppercase tracking-widest block">
          THE SACRED CIRCLE
        </span>
        <Heading size="sm" font="cinzel">
          Subscribe for Celestial Insights & Private Invitations
        </Heading>
        <Body size="sm" variant="muted">
          Receive monthly reflections, seasonal ritual guides, and exclusive sanctuary access.
        </Body>
      </div>

      {subscribed ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center gap-2 text-gold-primary py-3 font-medium text-sm text-center"
        >
          <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
          <span>Welcome to the Sacred Circle. Check your inbox for your welcome guide.</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your sacred email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-xl bg-background/80 border border-border-gold/40 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
          />
          <PrimaryButton type="submit" size="md" rightIcon={<Send className="h-4 w-4" />}>
            Subscribe
          </PrimaryButton>
        </form>
      )}
    </GlassCard>
  );
}
