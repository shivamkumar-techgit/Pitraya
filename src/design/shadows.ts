/**
 * Pitraya Design Tokens — Shadows
 *
 * Five shadow levels only. No arbitrary box-shadow values.
 * Dark and light variants are separate — never inverted.
 */

export const shadowsDark = {
  sm: "0 2px 4px rgba(0,0,0,0.40)",
  md: "0 6px 16px rgba(0,0,0,0.60)",
  lg: "0 16px 32px rgba(0,0,0,0.80)",
  gold: "0 0 25px rgba(212,175,55,0.30)",
  glass: "0 8px 32px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.05)",
} as const;

export const shadowsLight = {
  sm: "0 2px 8px rgba(62,40,15,0.06)",
  md: "0 4px 24px rgba(62,40,15,0.08)",
  lg: "0 12px 40px rgba(62,40,15,0.12)",
  gold: "0 0 20px rgba(212,175,55,0.25)",
  glass: "0 4px 24px rgba(62,40,15,0.10), inset 0 1px 0 rgba(255,255,255,0.80)",
} as const;

/**
 * Shadow usage guide:
 *
 * shadow-sm   → Subtle elevation — inputs, badges, small cards
 * shadow-md   → Medium elevation — cards (default)
 * shadow-lg   → High elevation — modals, dropdowns, drawers
 * shadow-gold → Gold glow — primary button, selected states, featured cards
 * shadow-glass → Glassmorphism panels
 */
