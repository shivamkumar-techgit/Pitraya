"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Globe, Plane, ArrowRight } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { JsonLd, generateBreadcrumbSchema } from "@/components/seo/JsonLd";
import { getCitiesByRegion } from "@/data/cities";

const regions = ["North", "South", "East", "West"] as const;

const regionDescriptions: Record<(typeof regions)[number], string> = {
  North: "Metropolitan hubs and pilgrim centers of Northern India",
  South: "Tech hubs, coastal cities, and IT centers of Southern India",
  East: "Cultural centers and emerging metros of Eastern India",
  West: "Business capitals and port cities of Western India",
};

const regionIcons: Record<(typeof regions)[number], React.ReactNode> = {
  North: "🏔️",
  South: "🌴",
  East: "🌾",
  West: "🏙️",
};

export default function CityHubClient() {
  return (
    <main className="min-h-screen bg-[#07080E] text-text-primary selection:bg-gold-primary selection:text-black">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Services", item: "/packages" },
          { name: "City Pilgrimages", item: "/pind-daan-from" },
        ])}
      />

      <Navbar />

      <div className="px-4 pt-24 pb-0 max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { name: "Services", item: "/packages" },
            { name: "City Pilgrimages", item: "/pind-daan-from" },
          ]}
        />
      </div>

      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold-primary/8" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-gold-primary/10 border border-gold-primary/25 rounded-full px-5 py-2 text-xs font-bold text-gold-primary font-cinzel uppercase tracking-widest mb-6">
              <Globe className="h-3.5 w-3.5" />
              50+ Indian Cities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-cinzel leading-tight mb-6"
          >
            Gaya Pind Daan <span className="text-gold-gradient">from Your City</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            No matter where you live in India — from Delhi to Chennai, Mumbai to Kolkata — Pitraya Rituals coordinates your complete Gaya Pind Daan pilgrimage with seamless travel arrangements, verified Gayawal Pandits, and full ceremony execution.
          </motion.p>
        </div>
      </section>

      <section className="px-4 py-12 border-t border-b border-border-gold/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "50+", label: "Indian Cities" },
            { num: "5000+", label: "Families Served Yearly" },
            { num: "500+", label: "Verified Gayawal Pandits" },
            { num: "1500+", label: "Years of Vamsavali Records" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-gold-primary mb-1">{stat.num}</p>
              <p className="text-xs md:text-sm text-text-muted font-cinzel uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {regions.map((region, regionIdx) => {
        const regionCities = getCitiesByRegion(region);
        return (
          <section key={region} className="px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{regionIcons[region]}</span>
                  <div>
                    <h2 className="text-3xl font-bold font-cinzel text-text-primary">
                      {region} India
                    </h2>
                    <p className="text-sm text-text-muted mt-1">
                      {regionDescriptions[region]}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionCities.map((city, i) => (
                  <motion.div
                    key={city.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/pind-daan-from/${city.slug}`}
                      className="group block h-full bg-surface/40 hover:bg-surface/70 border border-gold-primary/15 hover:border-gold-primary/40 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-text-primary text-lg group-hover:text-gold-primary transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-xs text-text-muted mt-0.5">{city.state}</p>
                        </div>
                        {city.nriHub && (
                          <span className="inline-flex items-center gap-1 bg-gold-primary/20 border border-gold-primary/40 text-gold-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            NRI Hub
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <Plane className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                          <span>
                            {city.travelHoursByAir}h flight
                            {city.primaryAirport ? ` via ${city.primaryAirport}` : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <MapPin className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                          <span>{city.distanceKm} km away</span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-bold text-gold-primary group-hover:gap-2 transition-all">
                        View Pilgrimage
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {regionIdx < regions.length - 1 && (
                <div className="mt-20 border-t border-border-gold/10" />
              )}
            </div>
          </section>
        );
      })}

      <section className="px-4 py-20 border-t border-border-gold/10 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-cinzel text-text-primary mb-4">
              How City Pilgrimages Work
            </h2>
            <p className="text-text-secondary">
              Same complete ceremony, coordinated from your city
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Select Your City",
                desc: "Choose your city to see travel options, flight times, and NRI coordination details.",
              },
              {
                num: "2",
                title: "Browse Packages",
                desc: "All Pitraya packages include pre-arranged transport from your city, AC hotel, and Gayawal coordination.",
              },
              {
                num: "3",
                title: "Book & Coordinate",
                desc: "Our city-based coordinator confirms all arrangements and keeps you updated till ceremony day.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-surface/60 border border-gold-primary/20 rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gold-primary/20 border border-gold-primary/40 mb-4">
                    <span className="text-lg font-bold text-gold-primary">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.desc}</p>
                </div>

                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2">
                    <ArrowRight className="h-5 w-5 text-gold-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gold-primary/10 to-surface/60 border border-gold-primary/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold font-cinzel text-text-primary mb-4">
            Start Your Gaya Pilgrimage Today
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Select your city, choose your package, and let Pitraya Rituals handle all coordination. Respond within 15 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 bg-gold-primary hover:bg-gold-secondary text-black font-bold font-cinzel px-8 py-3.5 rounded-xl transition-all"
            >
              Browse All Packages
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/918434457228?text=Namaste%20Pitraya%20Team"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-cinzel px-8 py-3.5 rounded-xl transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
