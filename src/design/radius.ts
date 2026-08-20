/**
 * Pitraya Design Tokens — Border Radius
 *
 * Only these 6 values are allowed. Nothing else.
 */

export const radius = {
  /** 8px — inputs, small badges */
  sm: "0.5rem",
  /** 12px — buttons, chips */
  md: "0.75rem",
  /** 16px — cards (default) */
  lg: "1rem",
  /** 20px — modals, large cards */
  xl: "1.25rem",
  /** 24px — feature panels, drawers */
  "2xl": "1.5rem",
  /** 32px — hero overlays, large panels */
  "3xl": "2rem",
  /** 9999px — pills, avatars */
  full: "9999px",
} as const;
