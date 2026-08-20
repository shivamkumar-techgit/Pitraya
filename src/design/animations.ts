/**
 * Pitraya Design Tokens — Animations & Motion
 *
 * Defines HOW interactions feel, not just how long they take.
 * All durations in milliseconds.
 */

export const duration = {
  /** 100ms — button press/active */
  instant: 100,
  /** 150ms — hover state transitions */
  hover: 150,
  /** 200ms — mega menu open/close */
  fast: 200,
  /** 250ms — card hover, tooltip */
  card: 250,
  /** 300ms — theme switch, section transitions */
  normal: 300,
  /** 350ms — mobile drawer, modals open */
  modal: 350,
  /** 400ms — drawer slide, page sections */
  slow: 400,
  /** 600ms — hero entry, staggered reveals */
  hero: 600,
} as const;

export const easing = {
  /** Standard easing for most transitions */
  out: [0.0, 0.0, 0.2, 1] as const,
  /** For elements entering (snappier exit) */
  in: [0.4, 0.0, 1, 1] as const,
  /** Natural spring feeling */
  spring: { type: "spring", stiffness: 300, damping: 30 } as const,
  /** Subtle spring for cards */
  cardSpring: { type: "spring", stiffness: 200, damping: 25 } as const,
} as const;

/**
 * Motion vocabulary — HOW each element moves:
 *
 * Card hover:      translateY(-4px) + shadow-gold grow    → 250ms easeOut
 * Button hover:    gold glow pulse                         → 150ms easeOut
 * Button press:    scale(0.96)                            → 100ms easeIn
 * Hero entry:      fade-up stagger (each child +80ms)     → 600ms easeOut
 * Section reveal:  fade-up on viewport enter              → 400ms easeOut
 * Timeline reveal: sequential left-to-right               → 300ms each easeOut
 * Image zoom:      scale 1.0→1.05 on card hover           → 500ms easeOut
 * Accordion open:  height animate + opacity                → 300ms spring
 * Drawer slide:    translateX(100%→0%) from right         → 350ms spring
 * Sticky CTA:      fadeIn on scroll > 200px               → 250ms easeOut
 * Theme switch:    CSS variable transition on :root        → 300ms easeInOut
 * MegaMenu:        fade + translateY(-8px→0) on open      → 200ms easeOut
 *
 * Rules:
 * - Max ONE active animation per viewport at any moment
 * - All animations pause with prefers-reduced-motion
 * - Entrance animations fire ONCE (viewport.once = true)
 * - No looping animations (except chakra-spin, fog-move backgrounds)
 */

export const stagger = {
  /** Delay between staggered children in hero */
  hero: 0.08,
  /** Delay between staggered card items */
  cards: 0.06,
  /** Delay between staggered list items */
  list: 0.04,
} as const;

export const variants = {
  /** Standard fade-up for sections and cards */
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  /** Scale in for modals and badges */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  /** Slide in from right for drawers */
  slideRight: {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
  },
  /** Fade only for overlays */
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
} as const;
