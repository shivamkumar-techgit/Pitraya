"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle,
  MessageSquare, Calendar, Users, Headphones, ChevronRight,
  Share2, Globe, Video, Rss, Loader2, Star
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { extractContactErrorMessage, validateContactFormInput } from "@/lib/contact/contactForm";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */
const INQUIRY_TYPES = [
  { value: "booking", label: "Book a Pind Daan Ceremony" },
  { value: "package", label: "Package & Pricing Inquiry" },
  { value: "nri", label: "NRI / International Pilgrim" },
  { value: "remote", label: "Remote / Proxy Pind Daan" },
  { value: "pitru-paksha", label: "Pitru Paksha 2026 Booking" },
  { value: "general", label: "General Inquiry" },
  { value: "other", label: "Other" },
];

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: "+91 84344 57228",
    subValue: "Available 5 AM – 9 PM IST",
    href: "tel:+918434457228",
    whatsapp: "https://wa.me/918434457228?text=Namaste%20Pitraya%20Team",
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    badge: "Fastest Response",
  },
  {
    icon: Mail,
    label: "Email",
    value: "pitrayaenquiry@gmail.com",
    subValue: "Reply within 4 hours",
    href: "mailto:pitrayaenquiry@gmail.com",
    color: "from-gold-primary/20 to-gold-primary/5",
    border: "border-gold-primary/30",
    iconColor: "text-gold-primary",
    badge: "Primary",
  },
  {
    icon: MapPin,
    label: "Visit Our Office",
    value: "Vishnupad Dhaam Road",
    subValue: "Gaya, Bihar 823001",
    href: "https://maps.google.com/?q=Vishnupad+Temple+Gaya+Bihar",
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
    badge: "Walk-in Welcome",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "05:00 AM – 09:00 PM",
    subValue: "7 days a week · Year-round",
    href: null,
    color: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
    badge: "Daily",
  },
];

const QUICK_LINKS = [
  { label: "Book Pind Daan", href: "/packages", icon: Calendar },
  { label: "Explore Packages", href: "/packages", icon: Star },
  { label: "Wisdom Library", href: "/blog", icon: MessageSquare },
  { label: "Meet Our Pandits", href: "/about", icon: Users },
];

/* Real WhatsApp number & email (from footer ContactCard) */
const WA_NUMBER = "918434457228";
const WA_MSG = "Namaste%20Pitraya%20Team";
const REAL_EMAIL = "pitrayaenquiry@gmail.com";
const REAL_PHONE = "+91 84344 57228";
const REAL_PHONE_TEL = "+918434457228";

const TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    location: "Toronto, Canada",
    text: "The Pitraya team guided us through every step with patience. My father's Pind Daan was conducted flawlessly by the Gayawal Purohit.",
    stars: 5,
  },
  {
    name: "Priya Menon",
    location: "Dubai, UAE",
    text: "As the only daughter in our family, I was worried about performing Pind Daan alone. They made the entire ceremony dignified and spiritually complete.",
    stars: 5,
  },
  {
    name: "Suresh Agarwal",
    location: "Mumbai",
    text: "Transparent pricing, verified Pandit, and the Vamsavali certificate gave us peace of mind. Will recommend to every Hindu family.",
    stars: 5,
  },
];

/* ─────────────────────────────────────────────
   MAIN CLIENT COMPONENT
───────────────────────────────────────────── */
export default function ContactPageClient() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", subject: "",
    inquiryType: "booking", message: "", preferredContact: "whatsapp",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  /* ── Validation ── */
  function validate(): boolean {
    const errs = validateContactFormInput({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      subject: form.subject,
      inquiryType: form.inquiryType,
      preferredContact: form.preferredContact,
    });
    setErrors(errs as Partial<Record<keyof FormData, string>>);
    return Object.keys(errs).length === 0;
  }

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      setSubmitMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setSubmitMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus("error");
        setSubmitMessage(extractContactErrorMessage(payload));
        return;
      }

      setStatus("success");
      setSubmitMessage("");
    } catch {
      setStatus("error");
      setSubmitMessage("Something went wrong. Please try WhatsApp or email directly.");
    }
  }

  function update(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  /* ── Input shared styles ── */
  const inputCls = (field: keyof FormData) =>
    cn(
      "w-full bg-surface/60 border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted",
      "focus:outline-none focus:ring-2 focus:ring-gold-primary/30 focus:border-gold-primary/60 transition-all duration-200",
      errors[field] ? "border-red-500/60" : "border-border-gold/30 hover:border-gold-primary/40"
    );

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-gold-primary selection:text-black overflow-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Sacred geometry background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold-primary/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold-primary/10" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-gold-primary/10 border border-gold-primary/25 rounded-full px-5 py-2 text-xs font-bold text-gold-primary font-cinzel uppercase tracking-widest mb-6">
              <Headphones className="h-3.5 w-3.5" />
              Pitraya Rituals · Gaya Vishnupad
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-cinzel leading-tight mb-6"
          >
            We Are Here to{" "}
            <span className="text-gold-gradient">Guide You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Reach our Pitraya team for pilgrimage guidance, ceremony bookings, NRI consultations, and any ancestral rite questions. Our coordinators and Gayawal Pandits are available every day.
          </motion.p>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {QUICK_LINKS.map((ql) => (
              <Link
                key={ql.label}
                href={ql.href}
                className="group flex items-center gap-2 bg-surface/60 hover:bg-gold-primary/10 border border-border-gold/30 hover:border-gold-primary/50 rounded-full px-4 py-2 text-xs font-cinzel font-semibold text-text-secondary hover:text-gold-primary transition-all duration-200"
              >
                <ql.icon className="h-3.5 w-3.5" />
                {ql.label}
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CHANNELS GRID ── */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_CHANNELS.map((ch, i) => (
            <motion.div
              key={ch.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div
                className={cn(
                  "relative h-full rounded-2xl border p-6 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1",
                  `bg-gradient-to-br ${ch.color}`,
                  ch.border
                )}
              >
                <span className="absolute top-3 right-3 text-[9px] font-bold font-cinzel uppercase tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/20 rounded-full px-2 py-0.5">
                  {ch.badge}
                </span>
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center bg-black/20", ch.border, "border")}>
                  <ch.icon className={cn("h-5 w-5", ch.iconColor)} />
                </div>
                <div>
                  <p className="text-xs font-bold font-cinzel uppercase tracking-widest text-text-muted mb-1">{ch.label}</p>
                  {ch.href ? (
                    <a
                      href={ch.href}
                      target={ch.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={cn("text-sm font-bold text-text-primary hover:underline block", ch.iconColor)}
                    >
                      {ch.value}
                    </a>
                  ) : (
                    <p className={cn("text-sm font-bold", ch.iconColor)}>{ch.value}</p>
                  )}
                  <p className="text-xs text-text-muted mt-0.5">{ch.subValue}</p>
                </div>
                {ch.whatsapp && (
                  <a
                    href={ch.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> WhatsApp Us
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MAIN SECTION: FORM + MAP ── */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── CONTACT FORM (3/5) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-surface/50 border border-gold-primary/20 backdrop-blur-sm overflow-hidden">
              {/* Form header */}
              <div className="px-8 pt-8 pb-6 border-b border-border-gold/20">
                <span className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-gold-primary">
                  Send a Message
                </span>
                <h2 className="text-2xl font-bold font-cinzel text-text-primary mt-1">
                  How Can We Help You?
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  Fill in the form and a Pitraya coordinator will respond within 4 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-10 flex flex-col items-center text-center gap-4"
                  >
                    <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold font-cinzel text-text-primary">
                      Message Received!
                    </h3>
                    <p className="text-sm text-text-secondary max-w-sm">
                      Thank you, <strong className="text-text-primary">{form.name}</strong>. Our team will contact you at <strong className="text-gold-primary">{form.email}</strong> within 4 hours. Jai Shri Vishnu 🙏
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setSubmitMessage(""); setErrors({}); setForm({ name: "", email: "", phone: "", subject: "", inquiryType: "booking", message: "", preferredContact: "whatsapp" }); }}
                      className="mt-2 inline-flex items-center gap-2 bg-gold-primary text-black font-bold font-cinzel text-xs px-6 py-2.5 rounded-full hover:bg-gold-secondary transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 space-y-5"
                    noValidate
                  >
                    {/* Inquiry type */}
                    <div>
                      <label className="block text-xs font-bold font-cinzel text-text-secondary uppercase tracking-wide mb-2">
                        Type of Inquiry <span className="text-gold-primary">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {INQUIRY_TYPES.map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => update("inquiryType", t.value)}
                            className={cn(
                              "text-left px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150",
                              form.inquiryType === t.value
                                ? "bg-gold-primary/15 border-gold-primary text-gold-primary"
                                : "bg-surface/40 border-border-gold/20 text-text-muted hover:border-gold-primary/40 hover:text-text-secondary"
                            )}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold font-cinzel text-text-secondary uppercase tracking-wide mb-1.5">
                          Full Name <span className="text-gold-primary">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Rajesh Sharma"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={inputCls("name")}
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold font-cinzel text-text-secondary uppercase tracking-wide mb-1.5">
                          Phone / WhatsApp <span className="text-gold-primary">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={inputCls("phone")}
                          autoComplete="tel"
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold font-cinzel text-text-secondary uppercase tracking-wide mb-1.5">
                          Email Address <span className="text-gold-primary">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="rajesh@example.com"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputCls("email")}
                          autoComplete="email"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold font-cinzel text-text-secondary uppercase tracking-wide mb-1.5">
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          placeholder="e.g. Pind Daan for Mother"
                          value={form.subject}
                          onChange={(e) => update("subject", e.target.value)}
                          className={inputCls("subject")}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold font-cinzel text-text-secondary uppercase tracking-wide mb-1.5">
                        Message <span className="text-gold-primary">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Please describe your inquiry — ancestor details, preferred dates, number of family members, gotra if known..."
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={cn(inputCls("message"), "resize-none leading-relaxed")}
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.message
                          ? <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</p>
                          : <span />}
                        <span className="text-[10px] text-text-muted font-mono">{form.message.length}/1000</span>
                      </div>
                    </div>

                    {/* Preferred contact method */}
                    <div>
                      <label className="block text-xs font-bold font-cinzel text-text-secondary uppercase tracking-wide mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-3">
                        {["whatsapp", "call", "email"].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => update("preferredContact", m)}
                            className={cn(
                              "px-4 py-2 rounded-full border text-xs font-bold font-cinzel uppercase tracking-wide transition-all",
                              form.preferredContact === m
                                ? "bg-gold-primary text-black border-gold-primary"
                                : "bg-transparent text-text-muted border-border-gold/30 hover:border-gold-primary/40"
                            )}
                          >
                            {m === "whatsapp" ? "WhatsApp" : m.charAt(0).toUpperCase() + m.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Error state */}
                    {status === "error" && (
                      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                        <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                        <p className="text-xs text-red-400">{submitMessage || "Something went wrong. Please try WhatsApp or email directly."}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center gap-2.5 bg-gold-primary hover:bg-gold-secondary text-black font-bold font-cinzel text-sm py-3.5 rounded-xl transition-all duration-200 hover:shadow-gold-glow disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                    >
                      {status === "submitting" ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending Message…</>
                      ) : (
                        <><Send className="h-4 w-4" /> Send Message</>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-text-muted">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" prefetch className="text-gold-primary hover:underline">Privacy Policy</Link>.
                      We never share your data with third parties.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── RIGHT PANEL (2/5): Map + Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gold-primary/20 bg-surface/50">
              <div className="px-5 pt-5 pb-3">
                <p className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-gold-primary">Our Location</p>
                <h3 className="text-base font-bold font-cinzel text-text-primary mt-0.5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold-primary" /> Pitraya Rituals Gaya Office
                </h3>
                <p className="text-xs text-text-muted mt-0.5">Vishnupad Dhaam Road, Gaya, Bihar 823001</p>
              </div>
              <div className="relative h-52 w-full">
                <iframe
                  title="Pitraya Rituals Gaya Office on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.518!2d85.0002!3d24.7955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzM0LjgiTiA4NcKwMDAnMC43IkU!5e0!3m2!1sen!2sin!4v1722762000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="px-5 py-3 border-t border-border-gold/20">
                <a
                  href="https://maps.google.com/?q=Vishnupad+Temple+Gaya+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-gold-primary hover:underline flex items-center gap-1"
                >
                  Open in Google Maps <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="rounded-2xl border border-border-gold/20 bg-surface/40 p-4 space-y-3">
              <p className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-gold-primary flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Office Hours
              </p>
              {[
                { day: "Monday – Friday", hours: "05:00 AM – 09:00 PM" },
                { day: "Saturday & Sunday", hours: "05:00 AM – 09:00 PM" },
                { day: "Pitru Paksha (Sep 7–21)", hours: "04:00 AM – 10:00 PM" },
                { day: "Amavasya Days", hours: "04:30 AM – 09:30 PM" },
              ].map((row) => (
                <div key={row.day} className="flex justify-between items-center text-xs border-b border-border-gold/10 pb-2 last:border-0 last:pb-0">
                  <span className="text-text-secondary font-medium">{row.day}</span>
                  <span className="text-gold-primary font-bold font-mono">{row.hours}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-emerald-900/40 border border-emerald-500/30 hover:border-emerald-400/50 p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold font-cinzel text-emerald-300">Chat on WhatsApp</p>
                <p className="text-xs text-emerald-500 mt-0.5">{REAL_PHONE} · Usually within 15 min</p>
              </div>
              <ChevronRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Social Links */}
            <div className="rounded-2xl border border-border-gold/20 bg-surface/40 p-4">
              <p className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-gold-primary mb-4">Follow Pitraya</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Share2, label: "Instagram", handle: "@pitrayarituals", href: "https://instagram.com/pitrayarituals", color: "text-pink-400" },
                  { icon: Globe, label: "Facebook", handle: "Pitraya Rituals", href: "https://facebook.com/pitrayarituals", color: "text-blue-400" },
                  { icon: Video, label: "YouTube", handle: "Pitraya Channel", href: "https://youtube.com/@pitrayarituals", color: "text-red-400" },
                  { icon: Rss, label: "Twitter / X", handle: "@pitraya", href: "https://twitter.com/pitraya", color: "text-sky-400" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group hover:bg-surface/60 rounded-xl p-2 transition-colors"
                  >
                    <s.icon className={cn("h-4 w-4 shrink-0", s.color)} />
                    <div>
                      <p className="text-xs font-bold text-text-primary leading-none">{s.label}</p>
                      <p className="text-[10px] text-text-muted">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-4 pb-20 border-t border-border-gold/10 pt-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-gold-primary">What Pilgrims Say</span>
            <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-text-primary mt-2">
              Trusted by 5,000+ Families
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-surface/50 border border-gold-primary/15 p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-gold-primary fill-gold-primary" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border-gold/15">
                  <div className="h-9 w-9 rounded-full bg-gold-primary/15 border border-gold-primary/25 flex items-center justify-center text-gold-primary font-bold font-cinzel text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary font-cinzel">{t.name}</p>
                    <p className="text-[10px] text-text-muted">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ STRIP ── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-gold-primary/8 to-surface/60 border border-gold-primary/20 p-8"
          >
            <p className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-gold-primary mb-2">Quick Answers</p>
            <h2 className="text-xl font-bold font-cinzel text-text-primary mb-6">Common Contact Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How quickly will you respond?", a: "WhatsApp messages are answered within 15 minutes during office hours. Email is answered within 4 hours. Form submissions receive an automated confirmation immediately." },
                { q: "Can I book directly via WhatsApp?", a: "Yes — WhatsApp is our most popular booking channel. Simply send your ancestor's name, gotra, preferred dates, and number of family members to +91 98000 00000." },
                { q: "I am calling from abroad. What is the best time to call?", a: "Our office is open 5 AM – 9 PM IST. For North America, this is 7:30 PM – 11:30 AM EST (previous day). We also offer video consultation via Zoom — ask your coordinator." },
                { q: "Can I visit your Gaya office without an appointment?", a: "Yes — walk-ins are welcome at our Vishnupad Dhaam Road office. However, for detailed ceremony consultation or Vamsavali record search, a prior appointment ensures dedicated time with our senior Purohit." },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border-gold/15 last:border-0 pb-4 last:pb-0">
                  <p className="text-sm font-bold font-cinzel text-text-primary mb-1.5">{faq.q}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border-gold/15">
              <Link href="/blog/pind-daan-faq-complete" prefetch className="inline-flex items-center gap-2 text-xs font-bold text-gold-primary hover:text-gold-secondary font-cinzel uppercase tracking-wide transition-colors">
                Read our Full 30-Question FAQ <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
