# Pitraya Component Acceptance Criteria

Before any UI component can be considered "done" and ready for production, it must pass the following strict checklist.

## 1. Token Compliance
- [ ] **No Hardcoded Colors**: The component must not contain *any* hex codes, RGB values, or raw color strings (e.g., `#ffffff`, `black`, `red-500`).
- [ ] **Uses Semantic Tokens**: The component must solely rely on the semantic design tokens from `src/design/colors.ts` and `globals.css` (e.g., `bg-surface`, `text-gold-primary`, `border-border`).
- [ ] **Spacing & Radius**: Padding, margins, and border-radii must use standard Tailwind scales (which align with our tokens) or explicit radius variables (`rounded-2xl`, `rounded-3xl`).
- [ ] **Shadows**: Must use `shadow-sm`, `shadow-md`, `shadow-lg`, or `shadow-gold-glow`. No arbitrary box-shadows.

## 2. API & Reusability
- [ ] **`className` Prop**: Every component MUST accept a `className?: string` prop and merge it onto its root element using `cn()` from `@/lib/utils`.
- [ ] **Prop Flexibility**: Content must not be deeply hardcoded if the component is designed for reuse (e.g., Cards should accept `title`, `description`, `children`).

## 3. Typography
- [ ] **Semantic Type**: Must use `<Heading>`, `<Paragraph>`, `<Body>`, `<Caption>`, or `<Display>` components for all text instead of raw HTML tags like `<h1>` or `<p>` with utility classes.
- [ ] **Hierarchy**: Ensure there is only ONE `<Heading level={1}>` or `<Heading as="h1">` per page.

## 4. Dark & Light Themes
- [ ] **Adaptive**: The component must adapt flawlessly to both Sacred Ivory (Light) and Midnight Sanctuary (Dark) themes without requiring conditional logic (CSS variables should do the heavy lifting).
- [ ] **Verification**: The component has been visually tested by toggling the theme.

## 5. Animation & Interactions
- [ ] **Hover States**: All interactive elements (buttons, cards, links) must have a clearly defined hover state (`duration-300` or `duration-150` depending on the element).
- [ ] **Entrance**: Large sections must use `variants.fadeUp` from `src/design/animations.ts` with `viewport={{ once: true }}`.
- [ ] **Focus Rings**: Buttons and inputs must have visible focus rings (`focus-visible:ring-2 focus-visible:ring-gold-primary`).

## 6. TypeScript & Linting
- [ ] **Strict Typing**: No `any` types. All props must be explicitly defined in an interface.
- [ ] **Zero Warnings**: The component must pass `npm run lint` and `npx tsc --noEmit` without any errors or warnings.
