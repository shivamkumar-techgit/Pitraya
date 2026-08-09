"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, QrCode, CheckCircle2, Landmark, Download, Share2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export type SacredCertificatePreviewSectionProps = React.HTMLAttributes<HTMLElement>;

export default function SacredCertificatePreviewSection({ className, ...props }: SacredCertificatePreviewSectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn("relative py-28 overflow-hidden bg-background text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Sacred Rotating Circular Chakra */}
      <SacredChakraBg size="min(700px, 90vw)" opacity={0.045} rotateSpeed={140} position="center" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <Award className="h-3.5 w-3.5" />
            <span>OFFICIAL HERITAGE DOCUMENTATION</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Sacred Lineage{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Certificate Preview
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted">
            Issued and sealed by hereditary Gayawal Pandits, your digital certificate serves as official proof of ancestral Pind Daan completion.
          </Paragraph>
        </div>

        {/* LUXURY GOLDEN PARCHMENT CERTIFICATE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-2 sm:p-4 rounded-3xl bg-gradient-to-br from-gold-primary via-gold-secondary to-gold-primary shadow-2xl shadow-gold-glow">
            <div className="rounded-[1.75rem] bg-[#0E0C08] p-6 sm:p-12 border-2 border-gold-primary/60 space-y-8 relative overflow-hidden text-center">
              
              {/* Inner Watermark Chakra */}
              <SacredChakraBg size="400px" opacity={0.07} rotateSpeed={180} position="center" />

              {/* CERTIFICATE HEADER */}
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-[0.3em] font-cinzel border-b border-gold-primary/30 pb-1">
                  <Landmark className="h-4 w-4" />
                  <span>GAYA TEERTH PUROHIT MAHASABHA</span>
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-bold font-cinzel text-gold-primary tracking-wide">
                  Sacred Lineage Certificate
                </h3>
                
                <p className="text-xs text-text-muted font-serif italic">
                  This certifies that ancestral oblation (Pind Daan & Tarpan) was performed according to Garuda Purana rites.
                </p>
              </div>

              {/* CERTIFICATE DATA FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left relative z-10 py-4 border-y border-gold-primary/30">
                <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/20 space-y-1">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">Verified Family</span>
                  <p className="text-sm font-bold text-text-primary font-cinzel">Sharma Family (Gotra Kashyap)</p>
                </div>

                <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/20 space-y-1">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">Native Place</span>
                  <p className="text-sm font-bold text-text-primary font-cinzel">Madhubani, Bihar</p>
                </div>

                <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/20 space-y-1">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">Panji Archive Ref</span>
                  <p className="text-sm font-mono font-bold text-gold-primary">PANJI-GA-1936-8821</p>
                </div>

                <div className="p-3.5 rounded-xl bg-surface/80 border border-gold-primary/20 space-y-1">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">Officiating Priest</span>
                  <p className="text-sm font-bold text-text-primary font-cinzel">Pt. Mishra Ji (Gayawal Purohit)</p>
                </div>
              </div>

              {/* CERTIFICATE FOOTER: SEAL & QR CODE */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 pt-2">
                {/* Official Seal Badge */}
                <div className="flex items-center gap-3 text-left">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-gold-primary to-amber-600 flex items-center justify-center text-black font-bold text-xl shadow-lg border-2 border-white shrink-0">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gold-primary font-cinzel uppercase tracking-wider">
                      Verified by Gayawal Pandit
                    </span>
                    <span className="block text-[11px] text-text-muted">
                      100% Hereditary Panji Seal
                    </span>
                  </div>
                </div>

                {/* QR Code Verification */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/90 border border-gold-primary/40">
                  <QrCode className="h-10 w-10 text-gold-primary shrink-0" />
                  <div className="text-left space-y-0.5">
                    <span className="block text-[11px] font-bold text-emerald-400 font-cinzel uppercase tracking-wider">
                      QR Verification Enabled
                    </span>
                    <span className="block text-[10px] text-text-muted">
                      Scan to verify digital record online
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ACTION BUTTONS BELOW CERTIFICATE */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <PrimaryButton leftIcon={<Download className="h-4 w-4" />} size="md">
              Download Sample Certificate (PDF)
            </PrimaryButton>
            <SecondaryButton leftIcon={<Share2 className="h-4 w-4" />} size="md">
              Share Lineage Certificate
            </SecondaryButton>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
