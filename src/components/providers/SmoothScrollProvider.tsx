"use client";

/**
 * SmoothScrollProvider — wraps the app with Lenis smooth scroll.
 *
 * Uses the official `lenis/react` integration which handles:
 *  - RAF loop automatically (via options.autoRaf)
 *  - Proper lenis class toggling on <html>
 *  - Cleanup on unmount
 *
 * Exports `useSmoothScroll()` hook for components that need to
 * programmatically scroll (BackToTop, section jumps, etc.)
 */

import React, { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";

// ─── Public hook API ─────────────────────────────────────────────────────────

interface SmoothScrollContextValue {
  /** Scroll to a DOM element, pixel offset, or CSS selector */
  scrollTo: (
    target: HTMLElement | number | string,
    options?: { offset?: number; duration?: number }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
});

/** Access programmatic scrollTo from any client component */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

// ─── Inner consumer (needs to be inside ReactLenis to call useLenis) ─────────

function SmoothScrollInner({ children }: { children: React.ReactNode }) {
  const lenis = useLenis() as Lenis | undefined;

  const scrollTo = useMemo<SmoothScrollContextValue["scrollTo"]>(
    () =>
      (target, options = {}) => {
        if (lenis) {
          lenis.scrollTo(target as never, {
            offset: options.offset ?? 0,
            duration: options.duration ?? 1.2,
          });
        } else {
          // Graceful fallback before Lenis is ready
          if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: "smooth" });
          } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      },
    [lenis]
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/portal");

  // Detect reduced-motion — disable smoothing if user prefers it
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        // Core easing — expo out for snappy deceleration
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        duration: prefersReducedMotion ? 0 : 1.15,
        smoothWheel: !prefersReducedMotion,
        touchMultiplier: 2,
        infinite: false,
        // Let Lenis own the RAF loop
        autoRaf: true,
      }}
    >
      <SmoothScrollInner>{children}</SmoothScrollInner>
    </ReactLenis>
  );
}
