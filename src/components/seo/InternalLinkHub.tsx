import React from "react";
import Link from "next/link";

export interface InternalLinkHubProps {
  currentSlug?: string;
  pillarSlug?: string | null;
  currentCity?: string;
  className?: string;
}

export default function InternalLinkHub({
  currentSlug,
  pillarSlug,
  currentCity,
  className = "",
}: InternalLinkHubProps) {
  const dhaamLinks = [
    { title: "Falgu River Tarpan Rites", href: "/blog/falgu-river-history" },
    { title: "Vishnupad Temple Dhaam", href: "/blog/vishnupad-temple-guide" },
    {
      title: "Akshayvat Immortal Banyan",
      href: "/blog/akshayvat-sacred-banyan-tree",
    },
    { title: "Pretsila Hill Rites", href: "/blog/pretshila-hill-guide" },
  ];

  const ritualLinks = [
    {
      title: "Complete Gaya Pind Daan Guide",
      href: "/blog/gaya-pind-daan-guide",
    },
    {
      title: "Vedic Shradh Karma Procedure",
      href: "/blog/shradh-process-step-by-step",
    },
    { title: "How to Perform Tarpan", href: "/blog/how-to-perform-tarpan" },
    {
      title: "Narayan Bali Puja in Gaya",
      href: "/blog/narayan-bali-puja-gaya",
    },
  ];

  const travelLinks = [
    {
      title: "Hotels Near Vishnupad Temple",
      href: "/blog/gaya-hotels-near-vishnupad",
    },
    {
      title: "Gaya Travel & Logistics Guide",
      href: "/blog/gaya-travel-hotel-transport",
    },
    {
      title: "Gaya Airport Flight Transfers",
      href: "/blog/gaya-airport-guide",
    },
    {
      title: "Gaya Railway Station Guide",
      href: "/blog/gaya-railway-station-guide",
    },
  ];

  const packageLinks = [
    { title: "Essential Pind Daan Package", href: "/packages/gaya-pind-daan" },
    {
      title: "Heritage Pilgrimage Package",
      href: "/packages/heritage-pilgrimage",
    },
    { title: "Supreme Moksha Package", href: "/packages/supreme-moksha" },
    {
      title: "Pitru Paksha 2026 Reserve",
      href: "/blog/pitru-paksha-special-package-2026",
    },
  ];

  const glossaryTerms = [
    { name: "#Pind", href: "/glossary#pind" },
    { name: "#Tarpan", href: "/glossary#tarpan" },
    { name: "#Shradh", href: "/glossary#shradh" },
    { name: "#GayawalPurohit", href: "/glossary#gayawal-purohit" },
    { name: "#Moksha", href: "/glossary#moksha" },
    { name: "#PanjiRecords", href: "/glossary#panji" },
  ];

  return (
    <section
      className={`my-12 rounded-3xl border border-amber-500/20 bg-slate-900/90 p-6 md:p-8 ${className}`}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between border-b border-amber-500/20 pb-4">
        <div>
          <span className="mb-1 block text-xs font-bold tracking-widest text-amber-400 uppercase">
            🕸️ TOPICAL PILGRIMAGE NETWORK
          </span>
          <h3 className="text-xl font-bold text-slate-100">
            Explore Related Guides, Packages & Logistics
            {currentCity ? ` for Pilgrims from ${currentCity}` : ""}
          </h3>
        </div>
        <Link
          href="/packages"
          className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-400 md:mt-0"
        >
          <span>View All Packages →</span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Sacred Dhaams */}
        <div>
          <h4 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-amber-300">
            <span>📍</span> Sacred Dhaams & Vedis
          </h4>
          <ul className="space-y-2 text-xs">
            {dhaamLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block transition-colors hover:text-amber-300 ${
                    currentSlug === link.href.replace("/blog/", "")
                      ? "font-bold text-amber-400"
                      : "text-slate-300"
                  }`}
                >
                  • {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Core Rituals */}
        <div>
          <h4 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-amber-300">
            <span>🪔</span> Vedic Ritual Guides
          </h4>
          <ul className="space-y-2 text-xs">
            {ritualLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block transition-colors hover:text-amber-300 ${
                    currentSlug === link.href.replace("/blog/", "")
                      ? "font-bold text-amber-400"
                      : "text-slate-300"
                  }`}
                >
                  • {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Hotels & Travel */}
        <div>
          <h4 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-amber-300">
            <span>🏨</span> Hotels & Travel Logistics
          </h4>
          <ul className="space-y-2 text-xs">
            {travelLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block transition-colors hover:text-amber-300 ${
                    currentSlug === link.href.replace("/blog/", "")
                      ? "font-bold text-amber-400"
                      : "text-slate-300"
                  }`}
                >
                  • {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Packages & Booking */}
        <div>
          <h4 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-amber-300">
            <span>📦</span> Pind Daan Packages
          </h4>
          <ul className="space-y-2 text-xs">
            {packageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-slate-300 transition-colors hover:text-amber-300"
                >
                  • {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Glossary Bar & Direct Booking CTA */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold tracking-widest text-slate-400 uppercase">
            📖 Vedic Glossary:
          </span>
          {glossaryTerms.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-slate-300 transition-colors hover:border-amber-500/40 hover:bg-amber-500/20"
            >
              {t.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="font-bold text-amber-400 hover:underline"
          >
            Consult Gayawal Pandit
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            href="/packages"
            className="font-bold text-amber-400 hover:underline"
          >
            Book Ceremony Online
          </Link>
        </div>
      </div>
    </section>
  );
}
