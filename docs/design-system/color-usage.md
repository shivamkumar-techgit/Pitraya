# Pitraya Color Usage Guide

## Themes

Pitraya operates on a strict **two-theme system**:
1. **Sacred Ivory** (Light Theme) — The default premium experience.
2. **Midnight Sanctuary** (Dark Theme) — An immersive, luxury evening experience.

These themes are *not* inverted versions of each other. They are distinct color palettes designed for maximum spiritual elegance.

## Semantic Colors

**Never use hardcoded hex values in components.** Always use semantic Tailwind classes (`bg-background`, `text-gold-primary`).

### Backgrounds
- `bg-background`: The core page background (Sacred Ivory: `#F8F4EC`, Midnight Sanctuary: `#0f0f13`).
- `bg-surface`: The primary container/card background (Sacred Ivory: `#FFFFFF`, Midnight Sanctuary: `#17171d`).
- `bg-surface-hover`: Subtle hover state for interactive cards.

### Text
- `text-text-primary`: Core reading text (Sacred Ivory: `#2B2015`, Midnight Sanctuary: `#f4f4f6`).
- `text-text-secondary`: Secondary information, timestamps.
- `text-text-muted`: Disabled or extremely low-priority text.

### The Sacred Gold Palette
- `text-gold-primary` / `bg-gold-primary`: The main brand accent. Used for primary CTAs and critical icons.
- `text-gold-secondary` / `bg-gold-secondary`: Used for borders, subtle highlights, and secondary active states.
- `text-gold-accent`: Used for hover glows and deep gradients.

### Rules
1. **No body text in gold.** Gold is for headings, icons, borders, and buttons only.
2. **Maximum two accent colors.** Do not introduce arbitrary colors into the palette.
3. **Contrast is sacred.** Ensure text on gold buttons is perfectly readable (use dark charcoal/black text).
4. **Hero stays cinematic.** The homepage hero (and closing CTA) keep a photographic/video overlay so type remains readable on media. Image overlays may use dark gradients even in Sacred Ivory.
5. **Footer stays luxury dark** in both themes (`shared.footer`).
6. **Content sections follow the active theme.** Between hero and footer, use `bg-background`, `bg-muted`, and `bg-surface` — never hardcoded `bg-black`.
7. **Default is Sacred Ivory** regardless of OS `prefers-color-scheme`. Only a saved `localStorage.theme` of `midnight-sanctuary` loads dark.
