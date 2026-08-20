# Pitraya Photography System

Imagery in Pitraya serves as a window into the spiritual realm. Our photography must always feel premium, atmospheric, and highly intentional.

## Design Treatment
1. **Borders**: Images are never raw squares. They must be placed inside containers with `rounded-2xl` or `rounded-3xl`, matching the adjacent UI elements.
2. **Shadows**: Large feature images should utilize `shadow-lg` or `shadow-xl`. Small thumbnails can use `shadow-sm` or `shadow-md`.
3. **Overlays**: Text placed directly over images must ALWAYS have an explicit gradient overlay (e.g., `bg-gradient-to-t from-black/80 via-black/20 to-transparent`) to ensure AA accessibility contrast ratios.
4. **Borders**: Add subtle gold borders around feature photography to frame it as art (`border border-border-gold/30`).

## Next.js `<Image>` Best Practices
To ensure maximum performance (Core Web Vitals) and a premium loading experience:

1. **`alt` Text**: Every image MUST have descriptive `alt` text. "Pitraya image" is unacceptable.
2. **`sizes` Prop**: Every responsive image must define a `sizes` prop.
   - Example: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
3. **`priority` Prop**: Images "above the fold" (Hero images, top of page headers) must include `priority={true}`.
4. **`fill` Layout**: When using `fill`, the parent container must be `relative` and `overflow-hidden`.

## Animation
- **Hover**: Feature images in cards should scale up slightly on hover. Use `transition-transform duration-500 group-hover:scale-105`.
- **Loading**: For images outside the initial viewport, let Next.js native lazy loading handle it, but use our `fadeUp` motion variants on the parent wrapper to ensure they reveal smoothly once loaded.
