/**
 * Pitraya Design Tokens — Breakpoints
 *
 * Defines the responsive breakpoints for the application.
 * Corresponds to standard Tailwind breakpoints.
 */

export const breakpoints = {
  /** 640px — Large smartphones, small tablets */
  sm: "640px",
  /** 768px — Tablets (iPad portrait) */
  md: "768px",
  /** 1024px — Laptops, iPad landscape */
  lg: "1024px",
  /** 1280px — Desktops */
  xl: "1280px",
  /** 1536px — Large wide screens */
  "2xl": "1536px",
} as const;

/**
 * Media query helper strings for use in CSS-in-JS or custom hooks if needed.
 * Example usage: `@media ${media.md} { ... }`
 */
export const media = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
} as const;
