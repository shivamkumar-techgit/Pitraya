"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane,
  Train,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  ChevronRight,
  Globe,
  Headphones,
  Package,
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { JsonLd, generateBreadcrumbSchema, generateFaqSchema } from "@/components/seo/JsonLd";
import type { CityData } from "@/data/cities";

export interface CityPindDaanClientProps {
  city: CityData;
}

export default function CityPindDaanClient({ city }: CityPindDaanClientProps) {
  const breadcrumbItems = [
    { name: "Pind Daan Services", item: "/packages" },
    { name: "City Pilgrimages", item: "/pind-daan-from" },
    { name: `From ${city.name}`, item: `/pind-daan-from/${city.slug}` },
  ];

  const faqs = [
    {
      question: `How long does it take to travel from ${city.name} to Gaya?`,
      answer: `By air, it takes approximately ${city.travelHoursByAir} hours from ${city.primaryAirport || city.name}. By train, the journey is around ${city.travelHoursByTrain} hours from ${city.nearestRailway}. Pitraya Rituals coordinates all transport logistics seamlessly.`,
    },
    {
      question: `Can I book Pind Daan from ${city.name} directly?`,
      answer: `Yes. Residents of ${city.name} can book Gaya Pind Daan through our online packages or WhatsApp. We handle all coordination from travel booking to ceremony execution. For ${city.nriHub ? "NRI" : "local"} families, we offer ${city.nriHub ? "video-witnessed ceremonies or in-person pilgrimages" : "full in-person coordination"}.`,
    },
    {
      question: `Does ${city.name} have a direct flight to Gaya?`,
      answer: `Most flights from ${city.name} connect through Delhi or other hubs before reaching Gaya. Pitraya Rituals can arrange your complete flight itinerary, including ${city.nriHub ? "international connections for overseas travelers" : "domestic connections"}.`,
    },
  ];

  return (
    <main className="min-h-screen bg-[#07080E] text-text-primary selection:bg-gold-primary selection:text-black">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={generateFaqSchema(faqs)} />

      <Navbar />

      <div className="px-4 pt-24 pb-0 max-w-7xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold-primary/8" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 bg-gold-primary/10 border border-gold-primary/25 rounded-full px-5 py-2 text-xs font-bold text-gold-primary font-cinzel uppercase tracking-widest mb-6">
              <Globe className="h-3.5 w-3.5" />
              Pilgrimage from Your City
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-6xl font-bold font-cinzel leading-tight mb-6">
            Gaya Pind Daan from <span className="text-gold-gradient">{city.name}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
            Complete ancestral liberation ceremony coordination from {city.name} to the sacred Gaya Kshetra. We handle all travel, logistics, ritual execution, and Vamsavali documentation — so your family can focus on honoring your ancestors.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link href="/packages" className="inline-flex items-center gap-2.5 bg-gold-primary hover:bg-gold-secondary text-black font-bold font-cinzel text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-gold-glow">
              <Package className="h-4 w-4" />
              View Packages & Book Now
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Plane,
              label: "By Air",
              time: `${city.travelHoursByAir} hours`,
              detail: city.primaryAirport || "International/Domestic Flights",
            },
            {
              icon: Train,
              label: "By Train",
              time: `${city.travelHoursByTrain} hours`,
              detail: city.nearestRailway,
            },
            {
              icon: MapPin,
              label: "Distance to Gaya",
              time: `${city.distanceKm} km`,
              detail: `From ${city.name}`,
            },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-surface/50 border border-gold-primary/20 rounded-2xl p-6 text-center">
              <item.icon className="h-10 w-10 text-gold-primary mx-auto mb-4" />
              <h3 className="text-sm font-bold font-cinzel uppercase tracking-wide text-text-secondary mb-2">{item.label}</h3>
              <p className="text-2xl font-bold text-text-primary mb-1">{item.time}</p>
              <p className="text-xs text-text-muted">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 border-t border-border-gold/10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-cinzel text-text-primary mb-4">
              Why {city.name} Families Choose Pitraya
            </h2>
            <p className="text-text-secondary">
              Seamless coordination from your doorstep to the sacred Gaya Kshetra
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Headphones,
                title: "24/7 Support in Your Language",
                desc: `Your dedicated coordinator speaks ${city.region}-India dialect and handles all arrangements from ${city.name}.`,
              },
              {
                icon: Users,
                title: city.nriHub ? "NRI & Overseas Families Welcome" : "Family-Centric Coordination",
                desc: city.nriHub ? `Families in USA, UK, Canada, UAE, and ${city.keyNRICountries?.join(", ") || "40+ countries"} trust Pitraya for proxy Pind Daan and video-witnessed ceremonies.` : `Whether visiting in person or arranging remotely, we coordinate with your family's needs from ${city.name}.`,
              },
              {
                icon: Clock,
                title: "All-Inclusive Package",
                desc: `Flights/trains, AC hotel near Vishnupad, all 45 Dhaams, Vamsavali registry, and Brahmin Bhojan — arranged from ${city.name}.`,
              },
              {
                icon: CheckCircle2,
                title: "Verified Gayawal Purohits",
                desc: "Access to 500+ senior Purohits registered in the 1,500-year-old Vamsavali lineage registry with full transparency.",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-surface/40 border border-gold-primary/15 rounded-xl p-6 flex gap-4">
                <item.icon className="h-6 w-6 text-gold-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 border-t border-border-gold/10">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold font-cinzel text-text-primary mb-3">
              Common Questions from {city.name}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-surface/40 border border-gold-primary/15 rounded-xl p-6">
                <p className="font-bold text-text-primary mb-3">{faq.question}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 border-t border-border-gold/10">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gold-primary/10 to-surface/60 border border-gold-primary/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold font-cinzel text-text-primary mb-4">
            Ready to Honor Your Ancestors?
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Every day, families from {city.name} perform Pind Daan through Pitraya Rituals. Start your booking today — our coordinators respond within 15 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages" className="inline-flex items-center justify-center gap-2 bg-gold-primary hover:bg-gold-secondary text-black font-bold font-cinzel px-8 py-3.5 rounded-xl transition-all">
              <Package className="h-4 w-4" />
              Browse Packages
            </Link>
            <a href="https://wa.me/918434457228?text=Namaste%20Pitraya%20Team" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-cinzel px-8 py-3.5 rounded-xl transition-all">
              <Headphones className="h-4 w-4" />
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
