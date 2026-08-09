"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/cards/GlassCard";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import Label from "@/components/typography/Label";
import PhoneInput from "./PhoneInput";
import { cn } from "@/lib/utils";

export type ContactFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function ContactForm({ className, ...props }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Instant UI response (0ms delay)
    setSubmitted(true);

    try {
      fetch("https://formsubmit.co/ajax/shkshvm@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Contact Form Inquiry from ${name}`,
          _template: "table",
          Name: name,
          Email: email,
          Phone: phone || "Not provided",
          Message: message || "None",
        })
      }).catch((err) => console.log("Background email send:", err));
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  return (
    <GlassCard
      borderGold
      glow
      className={cn("w-full bg-surface/30 p-6 md:p-8 mx-auto max-w-lg space-y-6", className)}
      {...props}
    >
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 space-y-4"
        >
          <CheckCircle2 className="h-14 w-14 text-success mx-auto animate-bounce" />
          <Heading size="md" font="cinzel" className="text-gold-primary">
            Request Transmitted to shkshvm@gmail.com
          </Heading>
          <Paragraph size="sm" variant="muted" className="max-w-xs mx-auto font-serif">
            A lineage purohit coordinator will reach out to you within 24 hours.
          </Paragraph>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cform-name">Your Name</Label>
            <Input
              id="cform-name"
              required
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 border-border-gold/30 rounded-xl px-4 bg-surface/30 w-full"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cform-email">Your Email</Label>
            <Input
              id="cform-email"
              type="email"
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-border-gold/30 rounded-xl px-4 bg-surface/30 w-full"
            />
          </div>

          <PhoneInput
            value={phone}
            onChange={(val) => setPhone(val)}
          />

          <div className="space-y-1.5">
            <Label htmlFor="cform-msg">Message details</Label>
            <Textarea
              id="cform-msg"
              placeholder="How can our sanctuary assist you?"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-border-gold/30 rounded-xl p-4 bg-surface/30 w-full"
            />
          </div>

          <PrimaryButton type="submit" fullWidth rightIcon={<Send className="h-4 w-4" />}>
            Transmit Message
          </PrimaryButton>
        </form>
      )}
    </GlassCard>
  );
}
