# Pitraya Animation & Motion Rules

## Motion Philosophy

Animation in Pitraya is meant to feel **deliberate, spiritual, and luxurious**. It should never feel bouncy, chaotic, or rushed.

## Standard Durations
- `100ms`: Instant active states (button press).
- `250ms`: Hover transitions (cards, buttons).
- `400ms`: Section reveals (fade up).
- `600ms`: Hero entries.

## Core Interactions

1. **Section Reveal (Fade-Up)**:
   - Elements should fade in and slide up slightly (`y: 16` to `y: 0`) when entering the viewport.
   - Use `variants.fadeUp` from `animations.ts`.
   - **Rule**: Set `viewport={{ once: true }}`. Do not repeat animations on scroll up/down.

2. **Card Hover**:
   - `transition-all duration-300 ease-out`
   - Elevate slightly: `-translate-y-1`
   - Increase shadow: `shadow-md` → `shadow-lg`
   - Border glow: `border-border` → `border-border-gold/50`

3. **Button Interactions**:
   - Hover: Glow effect or slight brightness increase.
   - Tap: `scale(0.96)` for immediate tactile feedback.

4. **Staggering**:
   - When revealing a list of cards or features, stagger them by `80ms` to `100ms`.

## Accessibility
1. **Respect prefers-reduced-motion**. The `globals.css` already disables CSS animations and transitions globally if this OS setting is on.
2. Ensure Framer Motion respects reduced motion (optional via custom hook, though basic entry animations are generally acceptable if they are just fades).
