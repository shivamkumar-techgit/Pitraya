"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/cards/GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface NewsletterProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export default function Newsletter({
  title = "Join the Circle of Wisdom",
  description = "Subscribe to receive lineage chronicle updates, wellness retreats announcements, and teerth calendar alerts in Gaya.",
  className,
  ...props
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <GlassCard
      borderGold
      glow
      className={cn("max-w-md w-full bg-surface/30 p-6 md:p-8 text-center space-y-6 mx-auto", className)}
      {...props}
    >
      {subscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-6 space-y-3"
        >
          <CheckCircle2 className="h-12 w-12 text-success mx-auto animate-bounce" />
          <Heading size="sm" font="cinzel" className="text-gold-primary">
            Subscribed
          </Heading>
          <Paragraph size="xs" variant="muted">
            We will dispatch calendar configurations to your mail.
          </Paragraph>
        </motion.div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-primary/10 text-gold-primary border border-gold-primary/35 mb-2">
              <Mail className="h-5 w-5" />
            </div>
            <Heading size="sm" font="cinzel" className="text-white">
              {title}
            </Heading>
            <Paragraph size="xs" variant="muted" className="leading-relaxed">
              {description}
            </Paragraph>
          </div>

          <div className="relative">
            <Input
              type="email"
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-border-gold/30 rounded-xl px-4 w-full bg-surface/30 pr-12 text-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-gold-primary text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </form>
      )}
    </GlassCard>
  );
}
