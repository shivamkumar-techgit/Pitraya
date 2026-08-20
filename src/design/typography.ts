/**
 * Pitraya Design Tokens — Typography
 *
 * FONT ROLES (enforced permanently):
 *   Cinzel           → Display / H1 / H2 / Section headings only
 *   Cormorant Garamond → Italic quotes / accent subheadings / pull quotes
 *   Inter            → ALL body text, descriptions, labels, UI copy
 */

export const fontFamily = {
  heading: "var(--font-cinzel), serif",
  accent: "var(--font-cormorant), Georgia, serif",
  body: "var(--font-inter), system-ui, sans-serif",
  sans: "var(--font-inter), system-ui, sans-serif",
} as const;

/** Font size scale — use only these values */
export const fontSize = {
  /** 12px — captions, timestamps, metadata */
  caption: "0.75rem",
  /** 14px — labels, secondary UI, buttons */
  sm: "0.875rem",
  /** 16px — standard body text */
  base: "1rem",
  /** 18px — lead paragraphs, hero descriptions */
  lg: "1.125rem",
  /** 20px — H4, card titles, feature labels */
  xl: "1.25rem",
  /** 24px — H3, subsection titles */
  "2xl": "1.5rem",
  /** 30px — H2 mobile */
  "3xl": "1.875rem",
  /** 36px — H2 desktop / H1 mobile */
  "4xl": "2.25rem",
  /** 48px — H1 desktop */
  "5xl": "3rem",
  /** 60px — Display headings */
  "6xl": "3.75rem",
  /** 72px — Hero display */
  "7xl": "4.5rem",
  /** Fluid hero — clamp(3rem, 8vw, 7rem) */
  display: "clamp(3rem, 8vw, 7rem)",
} as const;

export const lineHeight = {
  none: "1",
  tight: "1.15",
  snug: "1.3",
  normal: "1.5",
  relaxed: "1.65",
  loose: "1.8",
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.05em",
  wider: "0.1em",
  widest: "0.2em",
} as const;

export const fontWeight = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

/**
 * Typography hierarchy reference
 *
 * Display  → Cinzel, clamp(3rem,8vw,7rem), tracking-tighter, once per hero
 * H1       → Cinzel, 48–60px, tracking-tight, once per page
 * H2       → Cinzel, 30–48px, tracking-tight, section titles
 * H3       → Cinzel, 24–30px, card / subsection titles
 * H4       → Inter semibold, 18–24px, feature labels
 * Body Lg  → Inter, 18px, line-height 1.65, lead paragraphs
 * Body     → Inter, 16px, line-height 1.65, standard content
 * Body Sm  → Inter, 14px, line-height 1.5, card secondary text
 * Caption  → Inter, 12px, tracking-wide, metadata / timestamps
 * Button   → Inter semibold, 14px, tracking-wide
 */
