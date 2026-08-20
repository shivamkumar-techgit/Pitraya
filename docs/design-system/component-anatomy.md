# Pitraya Component Anatomy

## The Premium Card

A card in Pitraya is not just a container; it's a window into the spiritual experience.

**Anatomy:**
1. **Container**: `bg-surface border border-border rounded-2xl md:rounded-3xl`
2. **Elevation**: `shadow-md` (default) or `shadow-lg` (hover).
3. **Image (if present)**: Must span the top full width or fill the background entirely with a gradient overlay.
4. **Padding**: `p-4 md:p-6` (`spacing.ts` standard).
5. **Title**: `Heading` component (`sm` or `md`), `font-cinzel`.
6. **Content**: `Paragraph` component (`sm` or `md`), `font-sans`, `text-text-secondary`.
7. **Action (Optional)**: Secondary button or subtle gold arrow icon.

## The Glassmorphism Panel

Used for floating elements like the AI Assistant, Navigation, or Overlays.

**Anatomy:**
1. **Background**: `glass-panel` (applies `var(--glass-bg)` and backdrop blur).
2. **Border**: `border border-glass-border`.
3. **Elevation**: `shadow-lg` or `shadow-xl`.

## Buttons

1. **Primary Button**: Solid Gold background (`bg-gold-primary`), dark charcoal text. Used for main actions (Book Now). Maximum one per viewport.
2. **Secondary Button**: Transparent background, gold border (`border border-gold-primary`), gold text (`text-gold-primary`). Used for secondary actions (Learn More).
3. **Ghost Button**: Transparent, subtle text color, gold hover text. Used for tertiary actions (Cancel).

## Rules
1. **Never use more than two CTAs in a single section.**
2. **Rounded corners are standard.** Use `rounded-2xl` or `rounded-3xl` for main containers, never square corners unless it's a full-bleed banner.
