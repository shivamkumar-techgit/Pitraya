/**
 * Pitraya Design Tokens — Spacing
 *
 * Only these values are allowed for padding, margin, gap.
 * Map to Tailwind's default scale (1 unit = 4px).
 */

export const spacing = {
  /** 4px */
  1: "0.25rem",
  /** 8px */
  2: "0.5rem",
  /** 12px */
  3: "0.75rem",
  /** 16px */
  4: "1rem",
  /** 20px */
  5: "1.25rem",
  /** 24px */
  6: "1.5rem",
  /** 32px */
  8: "2rem",
  /** 40px */
  10: "2.5rem",
  /** 48px */
  12: "3rem",
  /** 64px */
  16: "4rem",
  /** 80px */
  20: "5rem",
  /** 96px */
  24: "6rem",
  /** 120px */
  30: "7.5rem",
  /** 160px */
  40: "10rem",
} as const;

/**
 * Section spacing reference
 *
 * Section vertical padding: py-20 md:py-28 lg:py-32
 * Section heading → content gap: space-y-12 md:space-y-16
 * Heading → description gap: space-y-4
 * Card internal padding: p-6 md:p-8
 * Inline icon → text gap: gap-2 or gap-3
 */
