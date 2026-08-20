/**
 * Pitraya Design Tokens — Z-Index
 *
 * Defines the stacking context layers for the application.
 * Only these standard layers should be used.
 */

export const zIndex = {
  /** -1 — Behind the main content (e.g. background effects) */
  hide: "-1",
  /** 0 — Base level content */
  base: "0",
  /** 10 — Elevated cards, sticky headers (non-overlay) */
  card: "10",
  /** 20 — Dropdowns, popovers, tooltips */
  dropdown: "20",
  /** 30 — Sticky navigation, floating buttons */
  sticky: "30",
  /** 40 — Mobile navigation drawer overlay */
  drawerOverlay: "40",
  /** 50 — Mobile navigation drawer */
  drawer: "50",
  /** 60 — Modal overlay (backdrop) */
  modalOverlay: "60",
  /** 70 — Modal content */
  modal: "70",
  /** 80 — Toast notifications, high-priority alerts */
  toast: "80",
  /** 90 — Page transition overlays, loading screens */
  max: "90",
} as const;
