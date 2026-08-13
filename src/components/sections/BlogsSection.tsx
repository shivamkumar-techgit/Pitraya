"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface BlogPost {
  id: string;
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

const pitrayaBlogs: BlogPost[] = [
  {
    id: "blog-1",
    slug: "what-is-pind-daan",
    image: "/images/pinda_daan_ceremony.png",
    title:
      "Understanding Pinda Daan: The Complete Vedic Guide to Ancestral Liberation",
    excerpt:
      "Explore the ancient oblation ritual, the energy of sesame and rice pindas, and why Gaya remains the supreme realm of salvation according to the Garuda Purana.",
    category: "Vedic Wisdom",
    date: "July 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Acharya Shastri",
      avatar: "/images/avatar_acharya_shastri.png",
      role: "Vedic Scholar",
    },
  },
  {
    id: "blog-2",
    slug: "why-vishnupad-temple-important",
    image: "/images/gaya_vishnupad_temple.png",
    title: "The Geometry of Vishnupad Footprint & Vayu Purana Chronicles",
    excerpt:
      "An in-depth look at the historic Vayu Purana chronicles describing Lord Vishnu's 40cm footprint stamped in solid basalt at Gaya.",
    category: "Sacred Sites",
    date: "July 15, 2026",
    readTime: "7 min read",
    author: {
      name: "Pt. Shastri Ji",
      avatar: "/images/gayawal_pandit_ritual.png",
      role: "Vedic Scholar",
    },
  },
  {
    id: "blog-3",
    slug: "can-daughters-perform-pind-daan",
    image: "/images/family_pind_daan.png",
    title:
      "Can Daughters Perform Pind Daan? Scriptural Laws & Vedic Exceptions Clarified",
    excerpt:
      "Vedic texts permit daughters and wives to perform oblation if no male descendant exists. Discover the exact scriptural passages from Garuda Purana.",
    category: "Vedic Law",
    date: "July 10, 2026",
    readTime: "4 min read",
    author: {
      name: "Pt. Mishra Ji",
      avatar: "/images/avatar_acharya_shastri.png",
      role: "Senior Gayawal Purohit",
    },
  },
];

export default function BlogsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const heroPost = pitrayaBlogs[0];
  const sidePosts = pitrayaBlogs.slice(1);

  return (
    <Section
      spacing="xl"
      className={cn(
        "text-text-primary border-border-gold/20 relative overflow-hidden border-b bg-[#0A0805] py-28",
        className
      )}
      {...props}
    >
      {/* Background Ambience Glow & Sacred Circular Chakra */}
      <SacredChakraBg
        size="min(600px, 85vw)"
        opacity={0.04}
        rotateSpeed={150}
        position="top-right"
      />
      <div className="bg-gold-primary/5 pointer-events-none absolute top-1/3 right-1/4 h-[500px] w-[600px] rounded-full blur-[180px]" />

      <Container size="xl" className="relative z-10 space-y-14">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gold-primary/10 text-gold-primary border-gold-primary/30 font-cinzel inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>CHAPTER 06 • SACRED KNOWLEDGE</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Pitraya Wisdom{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Library ⭐
            </GradientText>
          </Heading>

          <Paragraph
            size="lg"
            align="center"
            variant="muted"
            className="mx-auto max-w-2xl font-serif italic"
          >
            Authentic guides written in collaboration with Gayawal Pandits to
            help families understand rituals, traditions, travel, history and
            spiritual significance.
          </Paragraph>
        </div>

        {/* MAGAZINE LAYOUT — 1 Hero Card Left (7 cols) + 2 Compact Vertical Cards Right (5 cols) */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* LEFT 7 COLS: Hero Article Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex lg:col-span-7"
          >
            <Link href={`/blog/${heroPost.slug}`} className="group flex w-full">
              <GlassCard
                borderGold
                glow
                padding="none"
                className="from-surface via-background to-surface flex w-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br"
              >
                {/* Featured Image */}
                <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px]">
                  <Image
                    src={heroPost.image}
                    alt={heroPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <span className="bg-gold-primary absolute top-4 left-4 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-widest text-black uppercase shadow-md">
                    {heroPost.category}
                  </span>
                  <div className="text-gold-accent absolute right-6 bottom-4 left-6 flex items-center gap-4 text-xs font-medium">
                    <span>{heroPost.date}</span>
                    <span>•</span>
                    <span>{heroPost.readTime}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between space-y-4 p-6 sm:p-8">
                  <div className="space-y-2">
                    <Heading
                      size="md"
                      font="cinzel"
                      className="text-text-primary group-hover:text-gold-primary transition-colors"
                    >
                      {heroPost.title}
                    </Heading>
                    <Paragraph
                      size="sm"
                      variant="muted"
                      className="leading-relaxed"
                    >
                      {heroPost.excerpt}
                    </Paragraph>
                  </div>

                  <div className="border-border-gold/20 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="border-gold-primary/30 relative h-9 w-9 overflow-hidden rounded-full border">
                        <Image
                          src={heroPost.author.avatar}
                          alt={heroPost.author.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-cinzel text-text-primary text-xs font-bold">
                          {heroPost.author.name}
                        </h4>
                        <p className="text-text-muted text-[10px]">
                          {heroPost.author.role}
                        </p>
                      </div>
                    </div>

                    <span className="text-gold-primary inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1">
                      <span>Read Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>

          {/* RIGHT 5 COLS: 2 Vertical Compact Article Cards */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {sidePosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="flex flex-1"
              >
                <Link href={`/blog/${post.slug}`} className="group flex w-full">
                  <GlassCard
                    borderGold
                    padding="none"
                    className="bg-surface/40 hover:bg-surface/70 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl transition-colors duration-300 sm:flex-row"
                  >
                    <div className="relative h-[160px] shrink-0 overflow-hidden sm:h-full sm:w-[40%]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:bg-gradient-to-r" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between space-y-3 p-5">
                      <div className="space-y-1.5">
                        <div className="text-gold-primary flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
                          <span>{post.category}</span>
                          <span className="text-text-muted">
                            {post.readTime}
                          </span>
                        </div>
                        <Heading
                          size="sm"
                          font="cinzel"
                          className="text-text-primary group-hover:text-gold-primary transition-colors"
                        >
                          {post.title}
                        </Heading>
                      </div>

                      <div className="border-border-gold/20 flex items-center justify-between border-t pt-2">
                        <span className="text-text-muted text-[11px] font-medium">
                          {post.author.name}
                        </span>
                        <span className="text-gold-primary inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1">
                          <span>Read</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to explore all blogs in Wisdom Library */}
        <div className="pt-4 text-center">
          <Link
            href="/blog"
            className="bg-gold-primary font-cinzel hover:bg-gold-secondary hover:shadow-gold-glow inline-flex transform items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Explore All Wisdom Guides</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
