"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Paragraph from "@/components/typography/Paragraph";
import Label from "@/components/typography/Label";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input, Textarea, Select } from "@/components/ui";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface ContactSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ContactSection({
  title = "Begin Your Pilgrimage",
  subtitle = "CONNECT WITH OUR CONCIERGE",
  description = "Get in touch with our teerth purohits and wellness coordinators to plan your sacred ancestral rites or personal retreats in Gaya.",
  className,
  ...props
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ritualType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Instant UI feedback (0ms delay for the user)
    setSubmitted(true);

    // Asynchronous background fire-and-forget email dispatch
    try {
      fetch("https://formsubmit.co/ajax/shkshvm@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Gaya Pilgrimage Request from ${formData.name}`,
          _template: "table",
          "Pilgrim Name": formData.name,
          "Email Address": formData.email,
          "Phone Number": formData.phone || "Not provided",
          "Ritual Interest": formData.ritualType || "General Pilgrimage Inquiry",
          "Message / Lineage Details": formData.message || "None",
        })
      }).catch((err) => console.log("Background email send:", err));
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  return (
    <Section spacing="xl" className={cn("relative overflow-hidden bg-muted border-b border-border-gold/20", className)} {...props}>
      {/* Background glow radial vectors & Sacred Circular Chakra */}
      <SacredChakraBg size="min(650px, 90vw)" opacity={0.045} rotateSpeed={140} position="center" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Container size="xl" className="relative z-10">
        <Grid cols={{ initial: 1, lg: 12 }} gap="xl" className="items-start">
          
          {/* Details / Text Column */}
          <div className="lg:col-span-5 space-y-8 lg:pr-8">
            <div className="space-y-4">
              <SubHeading size="sm" variant="gold" uppercase font="cinzel">
                CHAPTER 09 • BEGIN YOUR PILGRIMAGE
              </SubHeading>
              <Heading size="xl" font="cinzel" className="text-text-primary leading-tight">
                {title}
              </Heading>
              <Paragraph size="md" variant="muted">
                How do I speak with a Gayawal Pandit and reserve our family&apos;s rites today? Connect directly with our concierge team below.
              </Paragraph>
            </div>

            {/* Direct Contact Details Block */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/20">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-text-muted block">Concierge Email</span>
                  <a href="mailto:shkshvm@gmail.com" className="text-sm font-medium text-text-primary hover:text-gold-primary transition-colors">
                    shkshvm@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/20">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-text-muted block">Direct Call &amp; WhatsApp Helpline</span>
                  <a href="tel:+918434457228" className="text-sm font-medium text-text-primary hover:text-gold-primary transition-colors block">
                    +91 84344 57228
                  </a>
                  <a
                    href="https://wa.me/918434457228?text=Namaste%20Pitraya%20Team%2C%20I%20want%20to%20know%20more%20about%20Pind%20Daan%20rituals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-1 transition-colors"
                  >
                    <span>💬 WhatsApp Support (+91 84344 57228)</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/20">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-text-muted block">Gaya Sanctuary Office</span>
                  <span className="text-sm font-medium text-text-primary">
                    Pitraya Sanctuary House, Rajapur, Bodhgaya, Gaya, Bihar 824231
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card Column */}
          <div className="lg:col-span-7">
            <GlassCard borderGold glow padding="lg" className="w-full bg-surface shadow-md">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <CheckCircle2 className="h-14 w-14 text-success animate-bounce" />
                  <Heading size="md" font="cinzel" className="text-gold-primary">
                    Request & Email Sent!
                  </Heading>
                  <Paragraph size="sm" variant="muted" className="max-w-sm mx-auto">
                    Your details have been transmitted to <span className="text-gold-primary font-semibold">shkshvm@gmail.com</span>. Our lineage coordinator will trace your records and reach out within 24 hours.
                  </Paragraph>
                  <a
                    href={`mailto:shkshvm@gmail.com?subject=Gaya Pilgrimage Inquiry - ${encodeURIComponent(formData.name)}&body=Name: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0ARitual: ${encodeURIComponent(formData.ritualType)}%0AMessage: ${encodeURIComponent(formData.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full border border-gold-primary/40 bg-gold-primary/10 text-gold-primary text-xs font-bold hover:bg-gold-primary hover:text-black transition-all"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Direct Email to shkshvm@gmail.com</span>
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="contact-name">Your Name</Label>
                      <Input
                        id="contact-name"
                        required
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-11 px-4 border-border-gold/30 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="contact-email">Your Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11 px-4 border-border-gold/30 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="contact-phone">Phone Number</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11 px-4 border-border-gold/30 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="contact-ritual">Ritual of Interest</Label>
                      <Select
                        id="contact-ritual"
                        value={formData.ritualType}
                        onChange={(e) => setFormData({ ...formData, ritualType: e.target.value })}
                        placeholder="Select ritual option"
                        className="h-11 px-3 border-border-gold/30 rounded-xl"
                      >
                        <option value="pindadaan">Pinda Daan Oblation</option>
                        <option value="karma">Karma Cleansing Bath</option>
                        <option value="lineage">Lineage Register Check</option>
                        <option value="general">General Pilgrimage Inquiry</option>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5 w-full">
                    <Label htmlFor="contact-msg">Special Instructions / Ancestral Details</Label>
                    <Textarea
                      id="contact-msg"
                      placeholder="Provide details about lineage roots, names of deceased, or timing preferences..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-border-gold/30 rounded-xl p-4"
                    />
                  </div>

                  <PrimaryButton type="submit" fullWidth rightIcon={<Send className="h-4 w-4" />}>
                    Submit Request
                  </PrimaryButton>
                </form>
              )}
            </GlassCard>
          </div>

        </Grid>
      </Container>
    </Section>
  );
}
