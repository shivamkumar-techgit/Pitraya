/**
 * Pitraya Design Tokens — Colors
 *
 * Sacred Ivory (light) + Midnight Sanctuary (dark)
 * These are the ONLY hex values allowed in the codebase.
 * All components must reference CSS custom properties, not these values directly.
 * These constants are used ONLY to generate globals.css CSS variables.
 */

export const sacredIvory = {
  // Backgrounds
  background: "#F8F4EC", // Warm ivory — never plain white
  backgroundHero: "#FFFDF8", // Hero section (still light version)
  surface: "#FFFFFF", // Card surface
  surfaceAlt: "#F5EFE1", // Alternate section bg
  surfaceHover: "#FFF7E5", // Hover state surface

  // Gold Accents
  goldPrimary: "#B8860B", // Primary gold (light — higher contrast on ivory)
  goldPrimaryHover: "#9A720A", // Darker on hover for a11y
  goldSecondary: "#D4AF37", // Secondary gold — decorative
  goldAccent: "#F0D97A", // Light gold tint for backgrounds

  // Typography
  textPrimary: "#2B2015", // Temple Brown — headings
  textSecondary: "#5B4C3E", // Body text
  textMuted: "#887B70", // Captions, metadata

  // Borders
  border: "#E8DDC5", // Default border
  borderSubtle: "#F0E8D6", // Very subtle dividers
  borderGold: "rgba(184,134,11,0.30)", // Gold accent border

  // Semantic
  success: "#15803D",
  warning: "#B45309",
  error: "#B91C1C",

  // Glassmorphism (adapted for light)
  glassBg: "rgba(255,253,248,0.88)",
  glassBorder: "rgba(184,134,11,0.20)",
  glassBlur: "blur(14px)",

  // Shadows
  shadowSm: "0 2px 8px rgba(62,40,15,0.06)",
  shadowMd: "0 4px 24px rgba(62,40,15,0.08)",
  shadowLg: "0 12px 40px rgba(62,40,15,0.12)",
  shadowGold: "0 0 20px rgba(212,175,55,0.25)",

  // Gradients
  gradientGold:
    "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
  gradientHero: "linear-gradient(180deg, #F5EFE1 0%, #F8F4EC 100%)",
} as const;

export const midnightSanctuary = {
  // Backgrounds
  background: "#0f0f13", // Warm obsidian
  backgroundHero: "#0f0f13", // Hero — same dark
  surface: "#17171d", // Elevated surface
  surfaceAlt: "#1a1a22", // Slightly lighter sections
  surfaceHover: "#22222b", // Hover surface

  // Gold Accents
  goldPrimary: "#d4af37", // Classic gold
  goldPrimaryHover: "#e5c158", // Lighter on hover
  goldSecondary: "#c5a059", // Warm secondary gold
  goldAccent: "#f3e5ab", // Very light gold tint

  // Typography
  textPrimary: "#f4f4f6", // Near-white
  textSecondary: "#a0a0aa", // Muted
  textMuted: "#62626c", // Very muted

  // Borders
  border: "#24242e", // Default dark border
  borderSubtle: "#1c1c24", // Very subtle
  borderGold: "rgba(212,175,55,0.25)", // Gold border

  // Semantic
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",

  // Glassmorphism
  glassBg: "rgba(23,23,29,0.85)",
  glassBorder: "rgba(212,175,55,0.20)",
  glassBlur: "blur(14px)",

  // Shadows
  shadowSm: "0 2px 4px rgba(0,0,0,0.40)",
  shadowMd: "0 6px 16px rgba(0,0,0,0.60)",
  shadowLg: "0 16px 32px rgba(0,0,0,0.80)",
  shadowGold: "0 0 25px rgba(212,175,55,0.30)",

  // Gradients
  gradientGold:
    "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
  gradientDark: "linear-gradient(180deg, #1f1f24 0%, #121215 100%)",
} as const;

/**
 * Shared values — same in both themes
 * Footer is ALWAYS luxury dark regardless of theme
 */
export const shared = {
  footer: "#151515", // Luxury dark footer — both themes
  footerBorder: "rgba(212,175,55,0.20)",
  footerText: "#a0a0aa",
  footerHeading: "#d4af37",
} as const;

export type ThemeName = "sacred-ivory" | "midnight-sanctuary";
