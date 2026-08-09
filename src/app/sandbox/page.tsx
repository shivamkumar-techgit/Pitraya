"use client";

import React, { useState } from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import {
  Display,
  Heading,
  SubHeading,
  Title,
  Body,
  Caption,
  Small,
  Label,
  GradientText,
  AnimatedText,
} from "@/components/typography";
import {
  Divider,
  Chip,
  Select,
  Checkbox,
  Radio,
  Switch,
} from "@/components/ui";
import {
  GlassCard,
  ServiceCard,
  DestinationCard,
  BlogCard,
  FeatureCard,
  ReviewCard,
  GalleryCard,
  StatCard,
  ImageCard,
  PricingCard,
} from "@/components/cards";
import {
  Breadcrumb,
  ScrollProgress,
  FloatingCTA,
  BackToTop,
} from "@/components/navigation";
import {
  FooterLinks,
  Newsletter,
  SocialLinks,
  ContactCard,
  FooterBottom,
} from "@/components/footer";
import {
  FadeIn,
  SlideUp,
  SlideLeft,
  SlideRight,
  BlurReveal,
  ScaleReveal,
  RotateReveal,
  StaggerChildren,
  TextReveal,
  CounterAnimation,
  Parallax,
  MouseParallax,
  Magnetic,
  Floating,
} from "@/components/animations";
import { ContactSection } from "@/components/sections";
import { Timeline, GenericTimelineItem, ReusableCounter, Carousel, FAQ } from "@/components/common";
import {
  ImageWithReveal,
  ParallaxImage,
  GalleryImage,
  HeroImage,
  BlurImage,
  VideoCard,
} from "@/components/image";
import { Sparkles, Calendar, Heart, Compass, MapPin, Landmark, Clock } from "lucide-react";

export default function SandboxPage() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioChecked, setRadioChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [selectVal, setSelectVal] = useState("");

  return (
    <Section spacing="xl" className="bg-black text-text-primary min-h-screen py-16">
      <Container size="md" className="space-y-12">
        <div className="space-y-2 border-b border-border-gold/30 pb-6">
          <Heading size="lg" font="cinzel" className="text-gold-primary">
            Core UI Components Sandbox
          </Heading>
          <Body size="sm" variant="muted">
            Preview of Divider, Chip, Select, Checkbox, Radio, and Switch.
          </Body>
        </div>

        {/* 1. Divider Preview */}
        <div className="space-y-4" id="sandbox-divider">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            1. Divider
          </Heading>
          <p className="text-xs text-text-muted">Horizontal with central text label</p>
          <Divider>Vedic Rites</Divider>
          <p className="text-xs text-text-muted mt-2">Dotted vertical separator in flex grid</p>
          <div className="flex h-8 items-center gap-4 text-sm">
            <span>Left Side</span>
            <Divider orientation="vertical" variant="dotted" thickness="md" />
            <span>Right Side</span>
          </div>
        </div>

        {/* 2. Chip Preview */}
        <div className="space-y-4" id="sandbox-chip">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            2. Chip
          </Heading>
          <div className="flex flex-wrap gap-3">
            <Chip variant="solid" color="gold">Solid Gold</Chip>
            <Chip variant="outline" color="default">Outline Default</Chip>
            <Chip variant="glass" color="success">Glass Success</Chip>
            <Chip variant="glass" color="error">Glass Error</Chip>
            <Chip variant="glass" color="muted" onClose={() => alert("Closed Chip!")}>
              Removable Chip
            </Chip>
          </div>
        </div>

        {/* 3. Select Preview */}
        <div className="space-y-4" id="sandbox-select">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            3. Select Menu
          </Heading>
          <Select
            placeholder="Choose Sacred Place..."
            value={selectVal}
            onChange={(e) => setSelectVal(e.target.value)}
            className="max-w-xs"
          >
            <option value="vishnupad">Vishnupad Temple</option>
            <option value="falgu">Phalgu River</option>
            <option value="akshayvat">Akshay Vat Banyan</option>
          </Select>
        </div>

        {/* 4. Checkbox Preview */}
        <div className="space-y-4" id="sandbox-checkbox">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            4. Checkbox
          </Heading>
          <Checkbox
            label="Trace Ancestry Lineage"
            description="Access Gaya Purohit historical registers for verification"
            checked={checkboxChecked}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
          />
        </div>

        {/* 5. Radio Preview */}
        <div className="space-y-4" id="sandbox-radio">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            5. Radio Option
          </Heading>
          <Radio
            label="Lineage Certificate"
            description="Printed certificate hand-signed by teerth purohit"
            checked={radioChecked}
            onChange={(e) => setRadioChecked(e.target.checked)}
          />
        </div>

        {/* 6. Switch Preview */}
        <div className="space-y-4" id="sandbox-switch">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            6. Switch Toggle
          </Heading>
          <Switch
            label="VIP Chauffeur Escort"
            description="Dedicated transport from Bodhgaya / Gaya Airport"
            checked={switchChecked}
            onChange={(e) => setSwitchChecked(e.target.checked)}
          />
        </div>

        {/* 7. Typography Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-typography">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            7. Typography System
          </Heading>
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">Display</span>
              <Display size="sm" variant="gold">Vedic Rituals</Display>
            </div>
            
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">Heading</span>
              <Heading size="md" font="cinzel">Sacred Gaya Ancestral Oblation</Heading>
            </div>
            
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">SubHeading</span>
              <SubHeading size="md" variant="accent" uppercase>The Assurance of Sanctity</SubHeading>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">Title</span>
              <Title size="sm">Trace Your Complete Lineage Registers</Title>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">Body</span>
              <Body size="md" variant="default">
                Connect with centuries of historical records. Our Purohits are direct descendants of Gaya teerth families.
              </Body>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">Caption</span>
              <Caption variant="gold">Certified by Gaya Vidwat Parishad</Caption>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">Small</span>
              <Small variant="default">Subject to local schedule timings and teerth availability.</Small>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">GradientText</span>
              <GradientText variant="gold" size="lg" font="cinzel" className="font-bold">
                REVERENCE & SERENITY
              </GradientText>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-1">AnimatedText</span>
              <AnimatedText text="Where every ritual honours a lifetime of memories." variant="word-reveal" as="p" className="text-lg italic font-serif text-white" />
            </div>
          </div>
        </div>

        {/* 8. Card System Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-cards">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            8. Reusable Card System
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GlassCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">GlassCard (Base Card wrapper)</span>
              <GlassCard hoverEffect="lift" className="p-6">
                <Title size="sm" className="mb-2">Base Glass Panel</Title>
                <Body size="sm" variant="muted">Simple border-gold layout with custom lift hover animations.</Body>
              </GlassCard>
            </div>

            {/* ServiceCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">ServiceCard (3D Perspective mouse tilt)</span>
              <ServiceCard
                title="Pinda Daan Oblation"
                description="Traditional ceremony led by lineage Vedic Purohits."
                image="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400"
                icon={<Sparkles className="h-5 w-5" />}
                price="From $150"
              />
            </div>

            {/* DestinationCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">DestinationCard</span>
              <DestinationCard
                image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400"
                title="Hyatt Place Zen Haven"
                location="Gaya City"
                rating={4.9}
                reviewsCount={120}
                price="$220/night"
                tag="Sanctuary Suite"
              />
            </div>

            {/* BlogCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">BlogCard</span>
              <BlogCard
                image="https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&w=400"
                title="The Geometry of Vishnupad"
                excerpt="An in-depth look at the historic footprint stamp of Lord Vishnu."
                category="Sacred Sites"
                date="July 15, 2026"
                readTime="7 min read"
                author={{ name: "Acharya Shastri" }}
              />
            </div>

            {/* FeatureCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">FeatureCard</span>
              <FeatureCard
                icon={<Sparkles className="h-6 w-6" />}
                title="100% Certified Vedic Purohits"
                description="Certified directly by the Gaya Vidwat Parishad council."
                badge="Verified"
              />
            </div>

            {/* ReviewCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">ReviewCard</span>
              <ReviewCard
                author="Elena Rostova"
                role="Wellness Advocate"
                comment="The ceremony completely reset my emotional body. I felt a deep sense of ancestral peace."
                rating={5}
                verified={true}
              />
            </div>

            {/* GalleryCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">GalleryCard</span>
              <GalleryCard
                image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400"
                title="Sacred Ritual Grounds"
                category="Pilgrimage"
                description="Visual capture of the river Phalgu sand oblation rituals."
              />
            </div>

            {/* StatCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">StatCard</span>
              <StatCard
                value="12,400+"
                label="Ancestors Honoured"
                description="Successful Vedic oblation records"
                icon={<Heart className="h-5 w-5" />}
              />
            </div>

            {/* ImageCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">ImageCard</span>
              <ImageCard
                image="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=400"
                title="Zen Partner Suites"
                badge="Luxury Stays"
                description="Premium hotel partner listings mapped to comfort templates."
              />
            </div>

            {/* PricingCard */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted">PricingCard</span>
              <PricingCard
                title="Standard Pilgrimage Package"
                subtitle="Complete single-day ancestral oblation package"
                price="$350"
                features={[
                  "Teerth Purohit assignment",
                  "Airport reception transfer",
                  "Lineage register check",
                  { text: "VIP transport", included: false }
                ]}
              />
            </div>
          </div>
        </div>

        {/* 9. Navigation Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-navigation">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            9. Navigation System
          </Heading>

          <div className="space-y-4">
            <span className="text-xs text-text-muted">Breadcrumb Trail</span>
            <Breadcrumb
              items={[
                { label: "Rituals Stays", href: "/destinations" },
                { label: "Bodhgaya Regency Zen Suite" }
              ]}
            />
          </div>
        </div>

        {/* 10. Footer Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-footer">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            10. Footer System
          </Heading>

          <div className="space-y-6">
            <div>
              <span className="text-xs text-text-muted mb-2 block font-sans">Newsletter Signup Card</span>
              <Newsletter />
            </div>

            <div>
              <span className="text-xs text-text-muted mb-2 block font-sans">FooterLinks Grid</span>
              <FooterLinks />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-xs text-text-muted mb-2 block font-sans">ContactCard details</span>
                <ContactCard />
              </div>
              <div>
                <span className="text-xs text-text-muted mb-2 block font-sans">SocialLinks buttons</span>
                <SocialLinks className="items-start" />
              </div>
            </div>

            <div>
              <span className="text-xs text-text-muted mb-2 block font-sans">FooterBottom copyright</span>
              <FooterBottom />
            </div>
          </div>
        </div>

        {/* 11. Animation Wrappers Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-animations">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            11. Animation Reusable Wrappers
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FadeIn */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">FadeIn</span>
              <FadeIn duration={0.8}>
                <div className="p-4 rounded-xl border border-border bg-surface/30 text-sm">
                  This card fades in smoothly.
                </div>
              </FadeIn>
            </div>

            {/* SlideUp */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">SlideUp</span>
              <SlideUp duration={0.7} distance={40}>
                <div className="p-4 rounded-xl border border-border bg-surface/30 text-sm">
                  This card slides up from 40px below.
                </div>
              </SlideUp>
            </div>

            {/* SlideLeft */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">SlideLeft</span>
              <SlideLeft duration={0.7} distance={50}>
                <div className="p-4 rounded-xl border border-border bg-surface/30 text-sm">
                  This card slides left from the right.
                </div>
              </SlideLeft>
            </div>

            {/* SlideRight */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">SlideRight</span>
              <SlideRight duration={0.7} distance={50}>
                <div className="p-4 rounded-xl border border-border bg-surface/30 text-sm">
                  This card slides right from the left.
                </div>
              </SlideRight>
            </div>

            {/* BlurReveal */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">BlurReveal</span>
              <BlurReveal duration={1}>
                <div className="p-4 rounded-xl border border-border bg-surface/30 text-sm text-gold-primary font-bold">
                  Decentralized Sacred Wisdom Revealed
                </div>
              </BlurReveal>
            </div>

            {/* ScaleReveal */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">ScaleReveal</span>
              <ScaleReveal initialScale={0.8}>
                <div className="p-4 rounded-xl border border-border bg-surface/30 text-sm">
                  This pops in with a spring scaling zoom.
                </div>
              </ScaleReveal>
            </div>

            {/* RotateReveal */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">RotateReveal</span>
              <RotateReveal initialRotate={-10}>
                <div className="p-4 rounded-xl border border-border bg-surface/30 text-sm">
                  Rotates and scales into position.
                </div>
              </RotateReveal>
            </div>

            {/* StaggerChildren */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">StaggerChildren</span>
              <StaggerChildren staggerDelay={0.15}>
                <div className="space-y-2">
                  <SlideUp className="p-2 rounded-lg bg-surface/20 text-xs">Child One</SlideUp>
                  <SlideUp className="p-2 rounded-lg bg-surface/20 text-xs">Child Two</SlideUp>
                  <SlideUp className="p-2 rounded-lg bg-surface/20 text-xs">Child Three</SlideUp>
                </div>
              </StaggerChildren>
            </div>

            {/* TextReveal */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">TextReveal</span>
              <TextReveal text="Gaya Vidwat Parishad Certified Purohits" variant="word-reveal" className="text-sm font-semibold font-cinzel text-white" />
            </div>

            {/* CounterAnimation */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">CounterAnimation</span>
              <div className="text-2xl font-bold text-gold-primary">
                <CounterAnimation end={12800} suffix="+" start={12500} duration={3} />
              </div>
            </div>

            {/* Floating */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans">Floating (Hovering Breathing)</span>
              <Floating duration={4} yOffset={10}>
                <div className="p-4 rounded-xl border border-gold-primary/30 bg-surface/30 text-sm">
                  Floating slowly in space
                </div>
              </Floating>
            </div>

            {/* Magnetic */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans block">Magnetic</span>
              <Magnetic strength={0.4} range={50}>
                <button className="px-4 py-2 rounded-xl bg-gold-primary text-black font-semibold text-xs cursor-pointer">
                  Pull Me
                </button>
              </Magnetic>
            </div>

            {/* MouseParallax */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <span className="text-xs text-text-muted font-sans block">MouseParallax (Move your mouse here)</span>
              <MouseParallax strength={25} tilt className="border border-border-gold/30 rounded-xl p-8 bg-surface/30 text-center min-h-[120px] flex items-center justify-center">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-gold-accent">3D Cursor Translation Layer</div>
                  <div className="text-xs text-text-muted">Mouse coordinates tilt this component</div>
                </div>
              </MouseParallax>
            </div>
          </div>
        </div>

        {/* 12. ContactSection Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-contact">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            12. Contact Section Component
          </Heading>

          <div className="border border-border-gold/25 rounded-2xl overflow-hidden shadow-2xl">
            <ContactSection />
          </div>
        </div>

        {/* 13. Reusable Generic Timeline Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-timeline">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            13. Generic Reusable Timeline
          </Heading>

          <div className="space-y-12">
            {/* Case A: Ritual Process Timeline */}
            <div className="space-y-4">
              <span className="text-sm font-semibold text-gold-accent font-cinzel tracking-widest uppercase">
                A. Ritual Process (Horizontal Scroll Layout)
              </span>
              <Timeline
                layout="horizontal"
                items={[
                  {
                    date: "Hour 01",
                    title: "Shastra Dialogue",
                    description: "Meet your purohit for lineage verification.",
                    icon: <Compass className="h-4 w-4" />
                  },
                  {
                    date: "Hour 03",
                    title: "Phalgu Oblation",
                    description: "Offer sand oblation at the river bank.",
                    icon: <Landmark className="h-4 w-4" />
                  },
                  {
                    date: "Hour 05",
                    title: "Banyan Blessing",
                    description: "Tie sacred threads at Akshayavat.",
                    icon: <Sparkles className="h-4 w-4" />
                  }
                ]}
              />
            </div>

            {/* Case B: Company Journey Timeline */}
            <div className="space-y-4">
              <span className="text-sm font-semibold text-gold-accent font-cinzel tracking-widest uppercase text-center block">
                B. Company Journey (Alternating Center Layout)
              </span>
              <Timeline
                layout="alternating"
                items={[
                  {
                    date: "Year 2021",
                    title: "Registry Archives Digitalization",
                    description: "We started cataloging ancient paper registries onto secure networks.",
                    icon: <Clock className="h-4 w-4" />,
                    badge: "Milestone"
                  },
                  {
                    date: "Year 2024",
                    title: "Sanctuary Partnerships",
                    description: "Established 5-star comfort suites map templates in Gaya and Bodhgaya.",
                    icon: <Landmark className="h-4 w-4" />,
                    badge: "Expansion"
                  }
                ]}
              />
            </div>

            {/* Case C: Travel Plan Timeline */}
            <div className="space-y-4">
              <span className="text-sm font-semibold text-gold-accent font-cinzel tracking-widest uppercase">
                C. Travel Plan (Left Layout alignment)
              </span>
              <Timeline
                layout="left"
                items={[
                  {
                    date: "Day 01 - Arrival",
                    title: "Vedic Chauffeur Pick-up",
                    description: "Chauffeur transfer from Gaya Airport to Bodhgaya partner resort.",
                    icon: <MapPin className="h-4 w-4" />
                  },
                  {
                    date: "Day 02 - Ceremonies",
                    title: "Ancestral Teerth Oblation",
                    description: "Perform oblation at Vishnupad temple with lineage purohits.",
                    icon: <Sparkles className="h-4 w-4" />
                  }
                ]}
              />
            </div>
          </div>
        </div>

        {/* 14. Reusable Counter Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-counter">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            14. Reusable Statistic Counter
          </Heading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReusableCounter
              number={18500}
              suffix="+"
              label="Families Guided"
              description="Lineage records verified for oblation journeys."
              icon={<Heart className="h-6 w-6 text-gold-primary" />}
            />
            <ReusableCounter
              number={4.95}
              suffix="/5"
              decimals={2}
              label="Sanctuary Rating"
              description="Rating score verified by Gaya Vidwat Parishad council."
              icon={<Sparkles className="h-6 w-6 text-gold-primary" />}
            />
            <ReusableCounter
              number={24}
              suffix="x7 Support"
              label="Global Helpline"
              description="Dedicated Sanctuary Concierge available 24/7."
              icon={<Clock className="h-6 w-6 text-gold-primary" />}
            />
          </div>
        </div>

        {/* 15. Reusable Testimonials Carousel Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-carousel">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            15. Reusable Review Carousel (Rating Stars & Author Info)
          </Heading>

          <div className="mx-auto max-w-2xl">
            <Carousel
              items={[
                <ReviewCard
                  key={1}
                  author="Elena Rostova"
                  role="Wellness Advocate"
                  comment="The oblation ceremonies completely reset my energetic pathways. Our family felt an overwhelming sense of peace and ancestral guidance."
                  rating={5}
                  verified={true}
                  date="July 10, 2026"
                />,
                <ReviewCard
                  key={2}
                  author="Advait Shastri"
                  role="Genealogy Researcher"
                  comment="Connecting with the Purohit registry records verified lineage documents back to 7 generations. Truly an emotional experience."
                  rating={5}
                  verified={true}
                  date="June 18, 2026"
                />,
                <ReviewCard
                  key={3}
                  author="Marcus Aurelius"
                  role="Pilgrimage Seeker"
                  comment="The video review details play beautifully, and the guides walk you step by step with care. Unparalleled concierge stays."
                  rating={4}
                  verified={false}
                  date="May 24, 2026"
                  videoSrc="/videos/kling_20260720_VIDEO_Ultra_real_3630_0 (1).mov"
                />
              ]}
            />
          </div>
        </div>

        {/* 16. Reusable FAQ System Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-faq">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            16. Interactive FAQ Accordion (Search & Categories Filter)
          </Heading>

          <div className="border border-border-gold/20 rounded-2xl p-6 bg-surface/10">
            <FAQ
              allowMultiple={true}
              enableSearch={true}
              enableCategories={true}
              enableExpandCollapse={true}
              items={[
                {
                  question: "What is ancestral Pinda Daan?",
                  answer: "It is a sacred ceremony performed to satisfy ancestral souls, helping them navigate standard transitions into the light.",
                  category: "Oblation"
                },
                {
                  question: "How long is a lineage record consultation?",
                  answer: "Lineage catalog checks usually last between 30 and 45 solar minutes under guidance from local Purohit registry leaders.",
                  category: "Consultations"
                },
                {
                  question: "Is transport provided from Gaya Airport?",
                  answer: "Yes, our wellness stays include luxury Vedic chauffeurs waiting at airport arrivals.",
                  category: "Logistics"
                }
              ]}
            />
          </div>
        </div>

        {/* 17. Image Components Preview */}
        <div className="space-y-6 pt-6 border-t border-border-gold/30" id="sandbox-images">
          <Heading size="sm" font="cinzel" className="text-text-primary">
            17. Luxury Image & Video Components
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ImageWithReveal */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans block">ImageWithReveal (Gold Reveal Mask)</span>
              <ImageWithReveal
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                alt="Reveal Portrait"
                direction="left"
                className="h-64"
              />
            </div>

            {/* ParallaxImage */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans block">ParallaxImage (Scroll translates relative to container)</span>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
                alt="Scroll Parallax"
                speed={30}
                aspectRatio="video"
              />
            </div>

            {/* GalleryImage */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans block">GalleryImage (Hover Zoom & Integrated Lightbox modal)</span>
              <GalleryImage
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
                alt="Vishnupad temple"
                category="Sanctuary"
                title="Vishnupad Teerth Ghat"
                description="The sacred footprint marks the spot where Lord Vishnu conquered Gayasur."
              />
            </div>

            {/* BlurImage */}
            <div className="space-y-2">
              <span className="text-xs text-text-muted font-sans block">BlurImage (Progressive loading blur reduction transition)</span>
              <BlurImage
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600"
                alt="Vedic tea"
              />
            </div>

            {/* VideoCard */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <span className="text-xs text-text-muted font-sans block">VideoCard (Ambient loop background with volume overlays)</span>
              <VideoCard
                videoSrc="/videos/kling_20260720_VIDEO_Ultra_real_3630_0 (1).mov"
                title="Sacred Banyan Canopy"
                description="Infinite sound and wellness rituals under banyan shadows."
              />
            </div>

            {/* HeroImage */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <span className="text-xs text-text-muted font-sans block">HeroImage (Banner with dust overlays and centered title slots)</span>
              <HeroImage
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"
                alt="Yoga Sunset"
                className="h-[300px] rounded-2xl"
              >
                <Heading size="lg" font="cinzel" className="text-gold-primary">
                  Where Sacred Memory Restores Peace
                </Heading>
              </HeroImage>
            </div>
          </div>
        </div>
      </Container>

      {/* Floating Scroll helpers */}
      <ScrollProgress />
      <FloatingCTA text="Reserve Sanctuary" />
      <BackToTop />
    </Section>
  );
}
