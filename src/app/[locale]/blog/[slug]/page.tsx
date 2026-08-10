import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { JsonLd, generateArticleSchema } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";
import {
  getAllArticles,
  getArticleBySlug,
  getAllSlugs,
} from "@/lib/blog/repository";
import { getRelatedArticles } from "@/lib/blog/related";
import InternalLinkHub from "@/components/seo/InternalLinkHub";

const baseUrl = getSiteUrl();

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticleBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Pitraya Wisdom Library`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `${baseUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${baseUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// Intent-based CTA cards
function CtaCard({ ctaType }: { ctaType: string }) {
  const ctas: Record<
    string,
    {
      title: string;
      subtitle: string;
      link: string;
      label: string;
      icon: string;
    }
  > = {
    booking: {
      icon: "🪔",
      title: "Book Your Gaya Pind Daan",
      subtitle:
        "Verified Gayawal Purohit · Transparent Pricing · Complete Ceremony",
      link: "/packages",
      label: "View Pind Daan Packages →",
    },
    "early-booking": {
      icon: "📅",
      title: "Reserve Early for Pitru Paksha 2026",
      subtitle: "Slots fill up fast. Secure your package today.",
      link: "/packages",
      label: "Reserve Pitru Paksha Package →",
    },
    "hotel-package": {
      icon: "🏨",
      title: "Book Pilgrim Hotel & Transport Package",
      subtitle:
        "AC hotel near Vishnupad Temple · Private vehicle transfers included.",
      link: "/packages",
      label: "View Hotel + Ritual Packages →",
    },
    "consult-pandit": {
      icon: "🙏",
      title: "Consult a Gayawal Pandit",
      subtitle:
        "Ask questions about ritual procedure, eligibility, and timing.",
      link: "/packages",
      label: "Book a Consultation →",
    },
  };

  const cta = ctas[ctaType] ?? ctas["booking"];

  return (
    <aside className="my-10 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center md:p-8">
      <div className="mb-3 text-4xl">{cta.icon}</div>
      <h3 className="mb-2 text-xl font-extrabold text-amber-100">
        {cta.title}
      </h3>
      <p className="mb-5 text-sm text-slate-300">{cta.subtitle}</p>
      <Link
        href={cta.link}
        className="inline-block rounded-xl bg-amber-500 px-7 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
      >
        {cta.label}
      </Link>
    </aside>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getArticleBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllArticles();
  const related = getRelatedArticles(post, allPosts, 4);
  const articleUrl = `${baseUrl}/blog/${slug}`;

  // Build FAQ schema data
  const faqSchemaData =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const breadcrumbItems = [
    { name: "Wisdom Library", item: "/blog" },
    ...(post.pillarSlug && post.pillarSlug !== post.slug
      ? [{ name: "Pillar Guide", item: `/blog/${post.pillarSlug}` }]
      : []),
    { name: post.title, item: `/blog/${slug}` },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* JSON-LD Schemas */}
      <JsonLd
        data={generateArticleSchema(
          post.title,
          post.metaDescription,
          articleUrl,
          post.publishDate
        )}
      />
      {faqSchemaData && <JsonLd data={faqSchemaData} />}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${baseUrl}${item.item}`,
          })),
        }}
      />

      {/* Article Header */}
      <header className="border-b border-amber-900/20 bg-gradient-to-b from-amber-950/30 to-slate-950 px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Category + Pillar Badge */}
          <div className="mt-4 mb-5 flex flex-wrap gap-2">
            <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-widest text-amber-400 uppercase">
              {post.intentCategory}
            </span>
            {post.isPillar && (
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-widest text-emerald-400 uppercase">
                ⭐ Cornerstone Pillar Guide
              </span>
            )}
          </div>

          <h1 className="mb-5 text-3xl leading-tight font-extrabold text-slate-100 md:text-5xl">
            {post.title}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-slate-300 italic">
            {post.summary}
          </p>

          {/* EEAT Author & Meta Row */}
          <div className="flex flex-wrap items-center gap-4 border-t border-slate-800 pt-5 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <span className="text-amber-400">✍️</span>
              <span>
                By <strong className="text-slate-200">{post.author}</strong>
              </span>
            </span>
            {post.reviewedBy && (
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>
                  Reviewed by{" "}
                  <strong className="text-slate-200">{post.reviewedBy}</strong>
                </span>
              </span>
            )}
            <span className="flex items-center gap-2">
              <span>📅</span>
              <span>
                Updated{" "}
                <strong className="text-slate-200">{post.updatedDate}</strong>
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span>🕐</span>
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          {/* Main Content */}
          <div className="prose prose-invert prose-amber max-w-none text-base leading-relaxed text-slate-300 md:text-lg">
            {post.content.split("\n\n").map((para, i) => {
              if (para.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="mt-10 mb-4 text-xl font-bold text-amber-300"
                  >
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-12 mb-5 text-2xl font-extrabold text-amber-200"
                  >
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="mb-6 leading-loose text-slate-300">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Sections */}
          {post.sections.length > 0 && (
            <div className="mt-10 space-y-8">
              {post.sections.map((sec, i) => (
                <div key={i} className="border-l-2 border-amber-500/40 pl-5">
                  <h3 className="mb-3 text-lg font-bold text-amber-300">
                    {sec.heading}
                  </h3>
                  <p className="leading-relaxed text-slate-300">{sec.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Contextual Intent-Based CTA */}
          <CtaCard ctaType={post.ctaType} />

          {/* Internal Link Hub Matrix */}
          <InternalLinkHub currentSlug={slug} pillarSlug={post.pillarSlug} />

          {/* FAQ Section */}
          {post.faqs.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-6 text-2xl font-extrabold text-amber-200">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-slate-800 bg-slate-900 transition-all hover:border-amber-500/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-slate-100 transition-colors group-open:text-amber-300">
                      {faq.question}
                      <span className="text-amber-400 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-slate-800 px-5 pt-4 pb-5 text-sm leading-relaxed text-slate-300">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Sources */}
          {post.sources.length > 0 && (
            <section className="mt-10 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="mb-3 text-sm font-bold tracking-widest text-slate-400 uppercase">
                Sources & References
              </h3>
              <ul className="space-y-1">
                {post.sources.map((src, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-400"
                  >
                    <span className="mt-1 text-amber-500">–</span>
                    {src}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-6 text-xl font-extrabold text-amber-200">
                Related Guides
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all hover:border-amber-500/40"
                  >
                    <span className="mb-2 block text-xs font-bold tracking-widest text-amber-400 uppercase">
                      {rel.intentCategory}
                    </span>
                    <h3 className="mb-2 text-sm leading-snug font-bold text-slate-100 transition-colors group-hover:text-amber-300">
                      {rel.title}
                    </h3>
                    <span className="text-xs text-amber-400">Read guide →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
