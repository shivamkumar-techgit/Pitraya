"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  CheckCircle2,
  Award,
  Crown,
  ShieldCheck,
  Flame,
  Camera,
  Hotel,
  Car,
  Users,
  Calendar,
  ArrowRight,
  Plus,
  Minus,
  Info,
  Coins,
  Coffee,
  Bookmark,
  Compass,
  ArrowLeft,
  Download,
  Upload,
  Lock,
  Phone,
  User,
  Clock,
  LogOut,
  MapPin,
  HelpCircle,
  Send,
  FileText,
} from "lucide-react";

import HomePage from "@/components/layout/HomePage";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { cn } from "@/lib/utils";

// --- TYPES & DATA DEFINITIONS ---

interface TimelineStep {
  id: string;
  label: string;
  time: string;
  status: "completed" | "active" | "locked";
  desc: string;
}

interface DayTimeline {
  day: string;
  title: string;
  steps: TimelineStep[];
}

const initialTimeline: DayTimeline[] = [
  {
    day: "Day 1",
    title: "Arrival & Orientation",
    steps: [
      { id: "step-1", label: "VIP Airport Pick-up", time: "10:30 AM", status: "completed", desc: "Private Innova MPV pickup with baggage assist." },
      { id: "step-2", label: "Resort Check-in", time: "12:00 PM", status: "completed", desc: "Check-in at Bodhgaya Regency (Rooms 204 & 205)." },
      { id: "step-3", label: "Panji Record verification", time: "03:30 PM", status: "completed", desc: "Verification of family genealogy rolls with Acharya Dwivedi." },
      { id: "step-4", label: "Evening Mahabodhi Darshan", time: "05:30 PM", status: "active", desc: "Guided walk inside Mahabodhi temple garden & meditation under Bodhi tree." },
    ]
  },
  {
    day: "Day 2",
    title: "Sacred Ancestral Rites",
    steps: [
      { id: "step-5", label: "Sunrise Falgu Ghat Purifications", time: "06:00 AM", status: "locked", desc: "Dawn bath, holy water Tarpan rituals & primary Sankalpa." },
      { id: "step-6", label: "Vishnupad Pind Daan Puja", time: "08:30 AM", status: "locked", desc: "Main ancestral offerings inside Vishnupad Temple VIP sanctum." },
      { id: "step-7", label: "Akshay Vat Oblations", time: "11:00 AM", status: "locked", desc: "Final offerings at the eternal Banyan tree." },
      { id: "step-8", label: "Sattvik Brahmin Bhojan", time: "01:00 PM", status: "locked", desc: "Brahmin feast fed by purohit staff on your behalf." },
    ]
  },
  {
    day: "Day 3",
    title: "Varanasi Extension & Aarti",
    steps: [
      { id: "step-9", label: "Transfer to Varanasi", time: "08:00 AM", status: "locked", desc: "Inter-city private transfer to Kashi." },
      { id: "step-10", label: "Ganga Aarti Cruise", time: "05:30 PM", status: "locked", desc: "Private family boat ride to witness Ganga Aarti from river." }
    ]
  }
];

export default function CustomerDashboardPage() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingId, setBookingId] = useState("PITR-84920");
  const [phoneNumber, setPhoneNumber] = useState("+91 84344 57228");
  
  // Dashboard Tab State
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "stay" | "priest" | "genealogy" | "payments" | "documents" | "support">("overview");

  // Timeline Step interactive checkbox updates
  const [timelineData, setTimelineData] = useState<DayTimeline[]>(initialTimeline);

  // ID Upload simulations
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "Harish_Sharma_Aadhar.pdf",
    "Ganga_Sharma_Aadhar.pdf"
  ]);
  const [uploadProgress, setUploadProgress] = useState(false);

  // Chat Support states
  const [chatMessages, setChatMessages] = useState([
    { sender: "Rohit (Pitraya)", text: "Pranam Sharma Ji, Chauffeur Ramesh is on standby outside the airport. He has the wheelchair pre-loaded as requested.", time: "10:15 AM" },
    { sender: "You", text: "Thank you Rohit, we are just exiting the terminal.", time: "10:20 AM" },
    { sender: "Rohit (Pitraya)", text: "Excellent, Ramesh will assist with the bags. Have a blessed journey to the resort.", time: "10:22 AM" }
  ]);
  const [newMsg, setNewMsg] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingId.trim() && phoneNumber.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleToggleStep = (dayIdx: number, stepIdx: number) => {
    const updated = [...timelineData];
    const step = updated[dayIdx].steps[stepIdx];
    if (step.status === "completed") {
      step.status = "active";
    } else if (step.status === "active") {
      step.status = "completed";
    }
    setTimelineData(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      setUploadProgress(true);
      setTimeout(() => {
        setUploadedFiles([...uploadedFiles, name]);
        setUploadProgress(false);
      }, 1200);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages([...chatMessages, { sender: "You", text: newMsg, time: "10:45 AM" }]);
    setNewMsg("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "Rohit (Pitraya)", text: "We have also confirmed the Ganga boat ride at Dashashwamedh Ghat for tomorrow evening in Kashi. All VIP passes are ready.", time: "10:46 AM" }
      ]);
    }, 1500);
  };

  return (
    <HomePage>
      <Section className="relative py-28 overflow-hidden bg-background text-text-primary pt-36 min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-background pointer-events-none" />
        
        <Container size="xl" className="relative z-10">
          
          <AnimatePresence mode="wait">
            
            {/* 1. VEDIC LOGIN PORTAL SCREEN */}
            {!isLoggedIn ? (
              <motion.div
                key="login-screen"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="max-w-md mx-auto py-12"
              >
                <GlassCard glow borderGold padding="xl" className="space-y-6 bg-gradient-to-b from-gold-primary/5 to-surface/80 border-gold-primary/30 shadow-gold-glow">
                  
                  <div className="text-center space-y-2">
                    <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest block font-cinzel">Vedic Portal</span>
                    <Heading size="md" font="cinzel" className="text-white uppercase tracking-wider">
                      Access Your Sacred Journey
                    </Heading>
                    <Paragraph size="sm" variant="muted" className="font-serif italic leading-relaxed text-xs">
                      Verify credentials below to view assigned priests, drivers, hotels, and lineage search scrolls.
                    </Paragraph>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                    
                    <div className="space-y-1.5">
                      <label className="text-text-secondary font-medium">Booking Reference ID</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gold-primary" />
                        <input
                          type="text"
                          required
                          value={bookingId}
                          onChange={(e) => setBookingId(e.target.value)}
                          placeholder="e.g. PITR-84920"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-border-gold/15 text-white focus:outline-none focus:border-gold-primary font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-text-secondary font-medium">Registered Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gold-primary" />
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-border-gold/15 text-white focus:outline-none focus:border-gold-primary font-sans"
                        />
                      </div>
                    </div>

                    <PrimaryButton
                      fullWidth
                      size="lg"
                      type="submit"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Access Sacred Portal
                    </PrimaryButton>

                    <p className="text-[10px] text-text-muted text-center pt-2">
                      Need help accessing? Contact Gaya Helpline at <span className="text-white font-bold">+91 70000 88888</span>
                    </p>

                  </form>

                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-xs"
              >
                
                {/* 2A. LEFT SIDEBAR: Nav Toggles & Profile Details */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Coordinator Status Banner */}
                  <GlassCard padding="md" className="border-gold-primary/30 bg-gradient-to-r from-gold-primary/10 via-surface/35 to-surface space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-ping" />
                      <strong className="text-white tracking-wide uppercase font-cinzel text-[10px] block">Live Status update</strong>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      &quot;Chauffeur <strong className="text-white">Ramesh</strong> is currently arriving at Gaya Junction platform to receive the Sharma Family.&quot;
                    </p>
                  </GlassCard>

                  {/* Profile Header */}
                  <GlassCard padding="md" className="border-border-gold/10 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-gold-primary uppercase font-cinzel tracking-widest block">Reference ID</span>
                      <strong className="text-base font-cinzel text-white uppercase block">
                        PITR-84920
                      </strong>
                      <span className="text-[11px] text-text-secondary block">Sharma Family Pilgrimage</span>
                      <span className="text-[10px] text-text-muted italic block">Bodhgaya & Varanasi Plan</span>
                    </div>
                    <div className="pt-2 border-t border-border-gold/10 flex items-center justify-between text-text-muted">
                      <span>Status:</span>
                      <span className="text-gold-primary font-bold uppercase tracking-wider text-[9px]">Active In Gaya</span>
                    </div>
                  </GlassCard>

                  {/* Sidebar Toggles */}
                  <div className="flex flex-col gap-1.5 font-sans">
                    {[
                      { id: "overview", label: "Portal Overview", icon: <Compass className="h-4 w-4" /> },
                      { id: "timeline", label: "Sacred Timeline", icon: <Clock className="h-4 w-4" /> },
                      { id: "stay", label: "Stay & Transfers", icon: <Hotel className="h-4 w-4" /> },
                      { id: "priest", label: "Your Priest", icon: <Flame className="h-4 w-4" /> },
                      { id: "genealogy", label: "Genealogy Tree", icon: <Award className="h-4 w-4" /> },
                      { id: "payments", label: "Payments Summary", icon: <Coins className="h-4 w-4" /> },
                      { id: "documents", label: "Documents Vault", icon: <FileText className="h-4 w-4" /> },
                      { id: "support", label: "24x7 Chat Concierge", icon: <Users className="h-4 w-4" /> },
                    ].map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                           onClick={() => setActiveTab(tab.id as typeof activeTab)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border text-left font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none",
                            isActive
                              ? "bg-gold-gradient text-black border-gold-primary shadow-gold-glow"
                              : "bg-surface/20 border-border-gold/10 text-text-secondary hover:border-gold-primary/20 hover:text-white"
                          )}
                        >
                          {tab.icon}
                          <span className="text-[10px]">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <SecondaryButton
                    fullWidth
                    size="sm"
                    onClick={() => setIsLoggedIn(false)}
                    leftIcon={<LogOut className="h-4 w-4 text-red-400" />}
                  >
                    Exit Sacred Portal
                  </SecondaryButton>

                </div>

                {/* 2B. RIGHT CONTAINER: Stateful tab contents view */}
                <div className="lg:col-span-9">
                  <AnimatePresence mode="wait">
                    
                    {/* OVERVIEW TAB */}
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-8"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <GlassCard padding="md" className="border-border-gold/15 bg-surface space-y-1">
                            <span className="text-[9px] text-text-muted uppercase tracking-wider block">Assigned Chauffeur</span>
                            <strong className="text-sm text-white block">Ramesh Kumar</strong>
                            <span className="text-[10px] text-gold-primary block">BR-02-P-8899 (Innova MPV)</span>
                          </GlassCard>
                          <GlassCard padding="md" className="border-border-gold/15 bg-surface space-y-1">
                            <span className="text-[9px] text-text-muted uppercase tracking-wider block">Assigned Priest</span>
                            <strong className="text-sm text-white block">Acharya S. Dwivedi</strong>
                            <span className="text-[10px] text-gold-primary block">Vishnupad VIP Mandap Rites</span>
                          </GlassCard>
                          <GlassCard padding="md" className="border-border-gold/15 bg-surface space-y-1">
                            <span className="text-[9px] text-text-muted uppercase tracking-wider block">Assigned stay</span>
                            <strong className="text-sm text-white block">Bodhgaya Regency</strong>
                            <span className="text-[10px] text-gold-primary block">Room 204 & 205 (Executive)</span>
                          </GlassCard>
                        </div>

                        {/* Interactive progress dashboard */}
                        <GlassCard padding="lg" className="border-gold-primary/20 space-y-6">
                          <div className="flex justify-between items-center">
                            <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">Pilgrimage Completion Tracker</h3>
                            <span className="text-gold-primary font-bold font-cinzel uppercase text-[10px]">35% COMPLETE</span>
                          </div>
                          
                          {/* visual timeline steps */}
                          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                            {[
                              { label: "Arrival Pickup", status: "completed" },
                              { label: "Genealogy search", status: "completed" },
                              { label: "Gaya Rituals", status: "active" },
                              { label: "Kashi Transfers", status: "locked" },
                              { label: "Moksha blessings", status: "locked" }
                            ].map((step, idx) => {
                              return (
                                <div key={idx} className="space-y-2 text-center flex flex-col items-center">
                                  <div className={cn(
                                    "h-8 w-8 rounded-full border flex items-center justify-center font-bold text-xs",
                                    step.status === "completed" ? "bg-gold-primary/20 border-gold-primary text-gold-primary" :
                                    step.status === "active" ? "bg-gold-gradient border-gold-primary text-black font-black" :
                                    "bg-surface/30 border-border-gold/10 text-text-muted"
                                  )}>
                                    {step.status === "completed" ? <Check className="h-4 w-4" /> : idx + 1}
                                  </div>
                                  <strong className={cn(
                                    "text-[10px] font-cinzel block uppercase tracking-wide",
                                    step.status === "active" ? "text-gold-primary" : "text-text-secondary"
                                  )}>{step.label}</strong>
                                </div>
                              );
                            })}
                          </div>
                        </GlassCard>

                        {/* Summary and quick downloads */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <GlassCard padding="lg" className="border-border-gold/15 space-y-4">
                            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Astrological Weather & Crowd Advisory</h4>
                            <ul className="space-y-2 text-text-secondary">
                              <li className="flex items-start gap-2">
                                <Info className="h-4 w-4 text-gold-primary shrink-0 mt-0.5" />
                                <span>Falcon River ghat water level is steady at 1.2 meters, ideal for Tarpan immersion rites.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Info className="h-4 w-4 text-gold-primary shrink-0 mt-0.5" />
                                <span>Vishnupad Temple VIP queue is pre-registered for 8:30 AM to bypass the main crowd.</span>
                              </li>
                            </ul>
                          </GlassCard>

                          <GlassCard padding="lg" className="border-border-gold/15 space-y-4">
                            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Quick Document Vault Access</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border-gold/10">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-gold-primary" />
                                  <span>Shraddha Rites Booking Invoice</span>
                                </div>
                                <button type="button" className="text-gold-primary hover:text-white" aria-label="Download receipt">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border-gold/10">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-gold-primary" />
                                  <span>Ancestral Lineage Verification Certificate</span>
                                </div>
                                <span className="text-[9px] uppercase font-bold text-text-muted">Generating...</span>
                              </div>
                            </div>
                          </GlassCard>
                        </div>

                      </motion.div>
                    )}

                    {/* JOURNEY TIMELINE TAB */}
                    {activeTab === "timeline" && (
                      <motion.div
                        key="timeline-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <GlassCard padding="lg" className="border-border-gold/15 space-y-6">
                          <div className="space-y-1">
                            <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">Sacred Journey Timeline</h3>
                            <p className="text-text-secondary">Track the spiritual milestones of your pilgrimage. Click on checkpoints to mark progress.</p>
                          </div>
                          
                          <div className="space-y-8 pt-4">
                            {timelineData.map((dayItem, dayIdx) => (
                              <div key={dayIdx} className="space-y-4">
                                <h4 className="font-cinzel text-xs font-bold text-gold-primary uppercase tracking-widest border-b border-border-gold/15 pb-2">
                                  {dayItem.day} — {dayItem.title}
                                </h4>
                                <div className="space-y-3.5">
                                  {dayItem.steps.map((step, stepIdx) => (
                                    <div
                                      key={step.id}
                                      onClick={() => step.status !== "locked" && handleToggleStep(dayIdx, stepIdx)}
                                      className={cn(
                                        "p-4 rounded-xl border flex items-start gap-4 transition-all select-none",
                                        step.status === "completed" ? "bg-gold-primary/5 border-gold-primary/30 text-white" :
                                        step.status === "active" ? "bg-muted border-gold-primary text-white scale-[1.01] cursor-pointer" :
                                        "bg-surface/10 border-border-gold/5 text-text-muted cursor-not-allowed opacity-60"
                                      )}
                                    >
                                      <button
                                        type="button"
                                        disabled={step.status === "locked"}
                                        className={cn(
                                          "h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                                          step.status === "completed" ? "bg-gold-primary text-black border-gold-primary" : "border-border-gold"
                                        )}
                                      >
                                        {step.status === "completed" && <Check className="h-3 w-3 stroke-[3]" />}
                                      </button>
                                      <div className="space-y-1 flex-1">
                                        <div className="flex justify-between items-center">
                                          <strong className="text-xs font-bold block">{step.label}</strong>
                                          <span className="text-[10px] text-text-muted">{step.time}</span>
                                        </div>
                                        <p className="text-[11px] leading-relaxed text-text-secondary">{step.desc}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* STAY & TRANSFERS TAB */}
                    {activeTab === "stay" && (
                      <motion.div
                        key="stay-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        {/* Accommodation Card */}
                        <GlassCard padding="lg" className="border-border-gold/15 space-y-6 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="relative h-40 w-full rounded-xl overflow-hidden border border-border-gold/15">
                              <Image src="/images/hotel_bodhgaya_regency.png" alt="Bodhgaya Regency" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest block font-cinzel">CONFIRMED RESORT</span>
                              <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">Bodhgaya Regency Resort</h3>
                              <p className="text-[11px] text-text-secondary leading-relaxed flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-gold-primary shrink-0 mt-0.5" />
                                <span>Mastipur, Near Mahabodhi Temple, Bodh Gaya, Bihar 824231</span>
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border-gold/10 space-y-2 text-[11px] text-text-secondary">
                            <div className="flex justify-between"><span>Assigned Rooms:</span><strong className="text-white">Rooms 204 & 205 (Executive Suite)</strong></div>
                            <div className="flex justify-between"><span>Check-in Date:</span><strong className="text-white">July 31, 2026</strong></div>
                            <div className="flex justify-between"><span>Inclusions:</span><strong className="text-white">Complimentary Breakfast & Dinner (Pure Sattvik)</strong></div>
                          </div>
                        </GlassCard>

                        {/* Chauffeur Card */}
                        <GlassCard padding="lg" className="border-border-gold/15 space-y-6 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="relative h-40 w-full rounded-xl overflow-hidden border border-border-gold/15">
                              <Image src="/images/transport_family_mpv.png" alt="Innova Crysta MPV" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest block font-cinzel">VERIFIED CHAUFFEUR</span>
                              <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">Ramesh Kumar</h3>
                              <p className="text-[11px] text-text-secondary leading-relaxed">
                                AC MPV transfer assigned for all inter-city Gaya, Bodh Gaya, and Varanasi routes. Chauffeur is native to Gaya.
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border-gold/10 space-y-3 text-[11px] text-text-secondary">
                            <div className="flex justify-between"><span>Vehicle Type:</span><strong className="text-white">AC Toyota Innova Crysta MPV</strong></div>
                            <div className="flex justify-between"><span>License Plate:</span><strong className="text-white">BR-02-P-8899</strong></div>
                            <a
                              href="tel:+919876599999"
                              className="inline-flex items-center justify-center gap-2 w-full p-2.5 rounded-lg border border-gold-primary/30 text-gold-primary font-bold uppercase tracking-wider hover:bg-gold-primary/10 transition-colors text-center text-[10px]"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              <span>Call Ramesh (+91 98765 99999)</span>
                            </a>
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* SACRED PRIEST TAB */}
                    {activeTab === "priest" && (
                      <motion.div
                        key="priest-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="max-w-xl mx-auto"
                      >
                        <GlassCard padding="lg" className="border-border-gold/15 space-y-6 text-center">
                          <div className="relative h-44 w-44 rounded-full overflow-hidden border-2 border-gold-primary/65 mx-auto">
                            <Image src="/images/journey_hotel.png" alt="Acharya Shrikant Dwivedi" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                          </div>
                          
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest block font-cinzel">HEREDITARY GAYAWAL PUROHIT</span>
                            <Heading size="sm" font="cinzel" className="text-white uppercase tracking-wider">
                              Acharya Shrikant Dwivedi Ji
                            </Heading>
                            <p className="text-[11px] text-text-secondary leading-relaxed font-serif italic max-w-sm mx-auto">
                              &quot;Serving families in genealogical line validation and Shraddha karma rites across 250+ years of ancestral temple logs.&quot;
                            </p>
                          </div>

                          <div className="pt-4 border-t border-border-gold/10 space-y-2 text-left text-[11px] text-text-secondary">
                            <div className="flex justify-between"><span>Ghat Location:</span><strong className="text-white">Holy Falgu River ghat, VIP Private Mandap</strong></div>
                            <div className="flex justify-between"><span>Lineage Specialization:</span><strong className="text-white">Gayawal Panji Genealogies (Sharma/Vedic lines)</strong></div>
                            <div className="flex justify-between"><span>Spoken Languages:</span><strong className="text-white">Sanskrit, Hindi, Maithili</strong></div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* GENEALOGY SCROLL TAB */}
                    {activeTab === "genealogy" && (
                      <motion.div
                        key="genealogy-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <GlassCard padding="lg" className="border-border-gold/15 space-y-4">
                          <div className="space-y-1">
                            <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">Your Family Genealogy Scroll</h3>
                            <p className="text-text-secondary">Verified records sourced from Gayawal archives tracing your ancestral line back 5 generations.</p>
                          </div>

                          {/* Traditional parchment SVG Scroll container */}
                          <div className="p-4 sm:p-8 rounded-2xl bg-[#FAF6EC] border border-[#EBE3D0] shadow-inner text-[#4A3E31] overflow-x-auto min-h-[420px] flex items-center justify-center font-cinzel">
                            <svg className="w-[600px] h-[360px]" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                              
                              {/* Connecting lineage path lines */}
                              <path d="M 300 65 L 300 110" stroke="#B08C69" strokeWidth="2" strokeDasharray="3 3" />
                              <path d="M 300 135 L 300 180" stroke="#B08C69" strokeWidth="2" strokeDasharray="3 3" />
                              <path d="M 300 205 L 300 250" stroke="#B08C69" strokeWidth="2" strokeDasharray="3 3" />
                              
                              {/* Generation 4 */}
                              <rect x="200" y="20" width="200" height="45" rx="8" fill="#F4EDE0" stroke="#B08C69" strokeWidth="1.5" />
                              <text x="300" y="38" textAnchor="middle" fill="#5C4D3C" fontSize="10" fontWeight="bold">GREAT-GREAT GRANDFATHER</text>
                              <text x="300" y="52" textAnchor="middle" fill="#7D6B58" fontSize="9">Shri Harish Chand Sharma (1862 - 1928)</text>

                              {/* Generation 3 */}
                              <rect x="200" y="90" width="200" height="45" rx="8" fill="#F4EDE0" stroke="#B08C69" strokeWidth="1.5" />
                              <text x="300" y="108" textAnchor="middle" fill="#5C4D3C" fontSize="10" fontWeight="bold">GREAT GRANDFATHER</text>
                              <text x="300" y="122" textAnchor="middle" fill="#7D6B58" fontSize="9">Shri Kedar Nath Sharma (1894 - 1959)</text>

                              {/* Generation 2 */}
                              <rect x="200" y="160" width="200" height="45" rx="8" fill="#F4EDE0" stroke="#B08C69" strokeWidth="1.5" />
                              <text x="300" y="178" textAnchor="middle" fill="#5C4D3C" fontSize="10" fontWeight="bold">GRANDFATHER</text>
                              <text x="300" y="192" textAnchor="middle" fill="#7D6B58" fontSize="9">Shri Dwarka Prasad Sharma (1928 - 1994)</text>

                              {/* Generation 1 */}
                              <rect x="200" y="230" width="200" height="45" rx="8" fill="#F4EDE0" stroke="#B08C69" strokeWidth="1.5" />
                              <text x="300" y="248" textAnchor="middle" fill="#5C4D3C" fontSize="10" fontWeight="bold">FATHER</text>
                              <text x="300" y="262" textAnchor="middle" fill="#7D6B58" fontSize="9">Shri Ganga Ram Sharma (1958 - Present)</text>

                              {/* Current generation block */}
                              <path d="M 300 275 L 300 310" stroke="#B08C69" strokeWidth="2" />
                              <circle cx="300" cy="315" r="14" fill="#B08C69" />
                              <text x="300" y="319" textAnchor="middle" fill="#FAF6EC" fontSize="10" fontWeight="bold">YOU</text>
                              
                            </svg>
                          </div>

                          <div className="flex justify-between items-center text-text-muted text-[11px] pt-2">
                            <span>Last updated: Sourced on July 25, 2026</span>
                            <button
                              type="button"
                              className="text-gold-primary hover:text-white flex items-center gap-1 font-bold"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download Leather Scroll PDF</span>
                            </button>
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* PAYMENTS SUMMARY TAB */}
                    {activeTab === "payments" && (
                      <motion.div
                        key="payments-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <GlassCard padding="lg" className="border-border-gold/15 space-y-6">
                          <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">Payments & Invoice summary</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-surface border border-border-gold/10">
                              <span className="text-text-muted block text-[10px] uppercase">Total Investment</span>
                              <strong className="text-xl font-cinzel text-white block mt-1">₹49,999</strong>
                            </div>
                            <div className="p-4 rounded-xl bg-surface border border-border-gold/10">
                              <span className="text-text-muted block text-[10px] uppercase">Deposit Paid</span>
                              <strong className="text-xl font-cinzel text-green-400 block mt-1">₹24,999</strong>
                            </div>
                            <div className="p-4 rounded-xl bg-surface border border-border-gold/10">
                              <span className="text-text-muted block text-[10px] uppercase">Pending Balance</span>
                              <strong className="text-xl font-cinzel text-red-400 block mt-1">₹25,000</strong>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border-gold/10 space-y-3">
                            <strong className="text-white uppercase tracking-wider text-[10px] block">Payment Timeline Logs</strong>
                            <div className="space-y-2 text-[11px] text-text-secondary">
                              <div className="flex justify-between p-3 rounded-lg bg-black/30 border border-border-gold/5">
                                <span>Paid via UPI (Ref #TXN984920) - Deposit Booking</span>
                                <strong className="text-green-400">₹24,999</strong>
                              </div>
                              <div className="flex justify-between p-3 rounded-lg bg-black/30 border border-border-gold/5 items-center">
                                <span>Pending Balance (Due on ritual completion)</span>
                                <button type="button" className="bg-gold-gradient text-black px-3 py-1 rounded text-[10px] font-bold uppercase cursor-pointer">Pay Balance Now</button>
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* DOCUMENTS VAULT TAB */}
                    {activeTab === "documents" && (
                      <motion.div
                        key="documents-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <GlassCard padding="lg" className="border-border-gold/15 space-y-6">
                          <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">Documents Vault</h3>
                          
                          {/* File upload selector */}
                          <div className="p-6 rounded-2xl border-2 border-dashed border-border-gold/20 bg-surface text-center space-y-3">
                            <Upload className="h-8 w-8 text-gold-primary mx-auto" />
                            <div className="text-xs space-y-1">
                              <strong className="text-white block">Upload Family Aadhar / ID Scan</strong>
                              <p className="text-text-muted">Required by temple priests and local hotels for VIP access registration.</p>
                            </div>
                            <label className="inline-block">
                              <input
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                                disabled={uploadProgress}
                              />
                              <span className="bg-gold-gradient text-black text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer hover:scale-[1.02] transition-transform inline-block">
                                {uploadProgress ? "Uploading..." : "Select Document File"}
                              </span>
                            </label>
                          </div>

                          {/* list of uploaded files */}
                          <div className="space-y-3 pt-4 border-t border-border-gold/10">
                            <strong className="text-white uppercase tracking-wider text-[10px] block">Uploaded Documents</strong>
                            <div className="space-y-2 text-[11px] text-text-secondary">
                              {uploadedFiles.map((file, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-black/30 border border-border-gold/5">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gold-primary" />
                                    <span>{file}</span>
                                  </div>
                                  <span className="text-[10px] text-green-400 font-bold uppercase">Verified</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}

                    {/* CONCIERGE CHAT SUPPORT TAB */}
                    {activeTab === "support" && (
                      <motion.div
                        key="support-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="max-w-xl mx-auto"
                      >
                        <GlassCard padding="none" className="border-border-gold/15 overflow-hidden flex flex-col h-[520px] bg-surface">
                          
                          {/* Chat Header */}
                          <div className="p-4 border-b border-border-gold/10 flex items-center justify-between bg-muted shrink-0">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gold-primary/20 border border-gold-primary flex items-center justify-center text-gold-primary font-bold">R</div>
                              <div>
                                <strong className="text-xs text-white block">Rohit Sen</strong>
                                <span className="text-[10px] text-green-400 block font-sans">Active Coordinator</span>
                              </div>
                            </div>
                            <span className="text-[9px] uppercase tracking-wider font-bold text-text-muted">24x7 SUPPORT</span>
                          </div>

                          {/* Chat messages area */}
                          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
                            {chatMessages.map((msg, idx) => {
                              const isSelf = msg.sender === "You";
                              return (
                                <div key={idx} className={cn(
                                  "flex flex-col max-w-[80%] rounded-2xl p-3.5 space-y-1.5",
                                  isSelf
                                    ? "bg-gold-gradient text-black ml-auto rounded-tr-none"
                                    : "bg-surface/30 border border-border-gold/5 text-text-secondary rounded-tl-none"
                                )}
                                >
                                  <span className={cn("text-[9px] block", isSelf ? "text-black/60" : "text-gold-primary/80")}>
                                    {msg.sender}
                                  </span>
                                  <p className="leading-relaxed">{msg.text}</p>
                                  <span className={cn("text-[8px] text-right block", isSelf ? "text-black/50" : "text-text-muted")}>
                                    {msg.time}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Chat footer input form */}
                          <form onSubmit={handleSendMessage} className="p-3 border-t border-border-gold/10 bg-muted flex items-center gap-2 shrink-0">
                            <input
                              type="text"
                              value={newMsg}
                              onChange={(e) => setNewMsg(e.target.value)}
                              placeholder="Type coordinator query..."
                              className="flex-1 p-3 rounded-lg bg-black/45 border border-border-gold/10 text-white focus:outline-none focus:border-gold-primary font-sans"
                            />
                            <button
                              type="submit"
                              className="h-11 w-11 rounded-lg bg-gold-gradient flex items-center justify-center text-black cursor-pointer"
                              aria-label="Send message"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </form>

                        </GlassCard>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </Container>
      </Section>
    </HomePage>
  );
}
