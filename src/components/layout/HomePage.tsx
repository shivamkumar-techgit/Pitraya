"use client";

import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import { ScrollProgress, FloatingCTA, BackToTop } from "@/components/navigation";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export interface HomePageProps {
  children: React.ReactNode;
}

/**
 * HomePage is the top-level layout wrapper for the homepage.
 * It handles persistent chrome (Navbar, Footer, floating scroll helpers)
 * so page.tsx only needs to compose section components.
 */
export default function HomePage({ children }: HomePageProps) {
  const { scrollTo } = useSmoothScroll();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Use Lenis for smooth-scrolled section jumping
      scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      window.location.href = "/packages";
    }
  };

  return (
    <>
      {/* Global Navigation */}
      <Navbar onCtaClick={() => scrollToSection("cta")} />

      {/* Page Sections — injected via children */}
      <main id="home-main" className="flex flex-col w-full bg-background min-h-screen">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Scroll Utilities (always-on) */}
      <ScrollProgress />
      <FloatingCTA text="Book Ritual" />
      <BackToTop />
    </>
  );
}
