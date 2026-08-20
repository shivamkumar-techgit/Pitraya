"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import IconButton from "@/components/buttons/IconButton";
import DesktopMenu, { MenuItem } from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MegaMenu from "./MegaMenu";
import WisdomLibraryMegaMenu from "./WisdomLibraryMegaMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";
import Logo from "@/components/common/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  logoText?: string;
  items?: MenuItem[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const defaultNavItems: MenuItem[] = [
  { label: "Home",           href: "/" },
  { label: "Experiences",    href: "/#services", isMega: true },
  { label: "Packages",       href: "/packages" },
  { label: "Wisdom Library", href: "/blog",      isMega: true },
  { label: "Lineage Portal", href: "/lineage-portal" },
  { label: "AI Planner",     href: "/planner" },
  { label: "Sanctuaries",    href: "/#destinations" },
  { label: "Contact",        href: "/contact" },
];

const WATCHED_SECTIONS = ["hero", "story", "journey", "services", "destinations", "testimonials", "faq", "blogs", "cta"];

export default function Navbar({
  logoText = "PITRAYA",
  items = defaultNavItems,
  ctaText = "Book Sanctuary",
  onCtaClick,
}: NavbarProps) {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega]         = useState<"experiences" | "wisdom" | null>(null);
  const closeTimer                          = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router                              = useRouter();

  const activeSection = useActiveSection(WATCHED_SECTIONS);
  const activeHref    = activeSection ? `#${activeSection}` : "";

  // Scroll listener for sticky header background styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /** Debounced open — prevents flicker when cursor travels from nav item → mega menu */
  const openMega = (name: "experiences" | "wisdom") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(name);
  };

  /** Delay close so cursor can reach the mega menu panel without it disappearing */
  const scheduleMegaClose = () => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 140);
  };

  const cancelMegaClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isScrolled = scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform",
          "bg-surface/95 backdrop-blur-2xl border-b border-border shadow-sm",
          isScrolled ? "py-2.5" : "py-3.5"
        )}
      >
        <Container size="xl" className="flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 lg:px-8">
          {/* Brand Logo */}
          <Logo size="md" variant="full" text={logoText} tagline="ANCESTRAL RITES • GAYA" className="shrink-0" />

          {/* Desktop Navigation (visible on lg screens and up) */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-4">
            <DesktopMenu
              items={items}
              activeHref={activeHref}
              onHoverMegaItem={(itemLabel) => {
                if (itemLabel === "Experiences") openMega("experiences");
                else if (itemLabel === "Wisdom Library") openMega("wisdom");
                else scheduleMegaClose();
              }}
              onHoverLeaveNav={scheduleMegaClose}
            />

            {/* Desktop CTA, Theme & Language Switcher */}
            <div className="flex items-center gap-3 shrink-0 ml-2">
              <ThemeToggle />
              <LanguageSwitcher variant="compact" />
              <PrimaryButton 
                size="sm" 
                className="shrink-0 whitespace-nowrap"
                onClick={() => {
                  if (onCtaClick) onCtaClick();
                  else router.push("/packages");
                }}
              >
                {ctaText}
              </PrimaryButton>
            </div>
          </div>

          {/* Mobile / Tablet Menu Button Toggle (hidden on lg desktop) */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle className="h-9 w-9" />
            <IconButton
              ariaLabel={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="border border-border-gold/20 hover:border-gold-primary/50 text-text-primary hover:text-gold-primary"
              icon={
                mobileMenuOpen ? (
                  <X className="h-5 w-5 text-gold-primary" />
                ) : (
                  <Menu className="h-5 w-5 text-text-primary" />
                )
              }
            />
          </div>
        </Container>

        {/* Full-width mega menus */}
        <div
          onMouseEnter={cancelMegaClose}
          onMouseLeave={scheduleMegaClose}
          className="hidden lg:block"
        >
          <MegaMenu isOpen={activeMega === "experiences"} />
          <WisdomLibraryMegaMenu isOpen={activeMega === "wisdom"} />
        </div>
      </header>

      {/* Mobile / Tablet Responsive Slide-out Drawer (contains Language Switcher at bottom) */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={items}
        ctaText={ctaText}
        onCtaClick={onCtaClick}
      />
    </>
  );
}
