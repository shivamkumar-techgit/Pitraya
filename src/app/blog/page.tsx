import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getSiteUrl } from "@/lib/config/site";
import { getAllArticles, getAllCategories } from "@/lib/blog/repository";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Gaya Pind Daan Wisdom Library — All Guides, Rituals & Pilgrimage Resources | Pitraya",
  description:
    "Expert guides on Gaya Pind Daan rituals, Vishnupad Temple, Falgu River, Pitru Paksha calendar, Gayawal Pandit tradition, dress code, and NRI pilgrimage planning — curated by senior Vedic Acharyas.",
  alternates: { canonical: `${baseUrl}/blog` },
  openGraph: {
    title: "Gaya Pind Daan Wisdom Library | Pitraya",
    description: "Expert pilgrimage guides and Vedic ritual resources curated by Gayawal Tirth Purohits.",
    url: `${baseUrl}/blog`,
    type: "website",
  },
};

const CATEGORY_ICONS: Record<string, string> = {
  All: "✦",
  "Ritual Guides": "🪔",
  "Sacred Places": "🏛️",
  "Travel & Hotels": "✈️",
  "Festivals & Dates": "📅",
  "Family Questions": "👨‍👩‍👦",
  "Company Mission": "🎯",
};

export default function BlogIndexPage() {
  // ALL 9 articles — no filtering, no hiding
  const allArticles = getAllArticles();
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Hero Section ── */}
      <section className="bg-gradient-to-b from-amber-950/30 to-slate-950 border-b border-amber-900/20 px-4 py-14 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <Breadcrumbs items={[{ name: "Wisdom Library", item: "/blog" }]} />
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-5 mt-4">
            ✦ Vedic Wisdom Library
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-amber-100 leading-tight mb-5">
            Gaya Pind Daan<br />
            <span className="text-amber-400">Knowledge Centre</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-4">
            In-depth articles on ancestral rituals, sacred sites, pilgrimage logistics, and Vedic traditions — curated by senior Gayawal Tirth Purohits.
          </p>
          <p className="text-amber-400 font-semibold text-base mb-10">
            {allArticles.length} Articles Available · Click any article to read in full
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="search"
              id="blog-search"
              name="q"
              placeholder="Search guides, rituals, places..."
              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-5 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">🔍</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">

          {/* ── Quick Navigation Index ── */}
          <div className="mb-12 rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">📋 All Articles — Quick Index</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {allArticles.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span className="text-slate-500 text-xs font-mono pt-0.5 shrink-0 w-5">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-amber-400 font-semibold block mb-0.5">
                      {post.isPillar ? "⭐ Cornerstone · " : ""}{post.intentCategory}
                    </span>
                    <span className="text-sm text-slate-200 group-hover:text-amber-300 transition-colors leading-snug block">
                      {post.title}
                    </span>
                  </div>
                  <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Category Filters ── */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm font-medium cursor-default"
              >
                <span>{CATEGORY_ICONS[cat] ?? "•"}</span>
                {cat}
              </span>
            ))}
          </div>

          {/* ── ALL Articles Grid — shows every single article ── */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allArticles.map((post) => (
              <article
                key={post.slug}
                className={`group rounded-xl border transition-all overflow-hidden flex flex-col ${
                  post.isPillar
                    ? "bg-gradient-to-b from-amber-950/40 to-slate-900/80 border-amber-500/40 hover:border-amber-400/70 md:col-span-2 lg:col-span-3"
                    : "bg-slate-900 border-slate-800 hover:border-amber-500/40"
                }`}
              >
                <div className="px-5 pt-5 pb-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {CATEGORY_ICONS[post.intentCategory] ?? "•"} {post.intentCategory}
                    </span>
                    {post.isPillar && (
                      <span className="text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                        ⭐ Cornerstone Guide
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 flex flex-col flex-1">
                  <h2
                    className={`font-bold text-slate-100 mb-3 group-hover:text-amber-300 transition-colors leading-snug ${
                      post.isPillar ? "text-xl md:text-2xl" : "text-base md:text-lg"
                    }`}
                  >
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{post.summary}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>🕐 {post.readTime}</span>
                      <span>·</span>
                      <span>{post.updatedDate}</span>
                      {post.reviewedBy && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-500">✓ Reviewed</span>
                        </>
                      )}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-amber-400 text-xs font-semibold hover:text-amber-300 transition-colors"
                    >
                      Read Full Guide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── Count Confirmation Banner ── */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm">
              Showing all <span className="text-amber-400 font-bold">{allArticles.length} articles</span> in the Wisdom Library.{" "}
              <span className="text-slate-600">New articles are added regularly.</span>
            </p>
          </div>

          {/* ── CTA Strip ── */}
          <div className="mt-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-8 text-center">
            <h2 className="text-2xl font-extrabold text-amber-100 mb-3">Ready to Plan Your Gaya Pilgrimage?</h2>
            <p className="text-slate-300 mb-6">
              Book with verified Gayawal Tirth Purohits. Transparent pricing. Complete ceremony coverage.
            </p>
            <Link
              href="/packages"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              View Pind Daan Packages →
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
