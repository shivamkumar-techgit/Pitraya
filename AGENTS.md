<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mandatory Component Architecture Rules

Every component created or modified in this codebase MUST follow these 8 principles without exception:

1. ✅ **Dark Mode**: Use semantic CSS theme variables (`bg-background`, `text-text-primary`, `bg-surface`, `border-border`, `glass-panel`) configured in `globals.css` instead of raw hardcoded colors (like `bg-black` or `text-white`).
2. ✅ **Mobile**: Mobile-first responsive layouts with clean mobile spacing (`px-4`, `py-6`, `text-sm`, single-column grids).
3. ✅ **Tablet**: Tablet-optimized layout adapters (`md:px-6`, `md:grid-cols-2`, `md:py-12`, `md:text-base`).
4. ✅ **Desktop**: Wide desktop luxury container constraints and typography (`lg:px-8`, `lg:grid-cols-3` or `lg:grid-cols-4`, `xl:max-w-7xl`, `2xl:max-w-[1440px]`).
5. ✅ **Animation**: Framer Motion entry viewport transitions (`motion.div`, `whileHover`, `whileTap`, `AnimatePresence`) and CSS micro-interactions for active/hover states.
6. ✅ **Accessibility (a11y)**: Semantic HTML tags (`<section>`, `<article>`, `<nav>`, `<button>`, `<label>`), explicit `aria-label`, `aria-expanded`, keyboard focus rings (`focus-visible:ring-2`), and screen reader friendliness.
7. ✅ **TypeScript Props**: Fully typed TypeScript interfaces (`Props`) extending native React HTML attributes (`React.HTMLAttributes<HTMLElement>`).
8. ✅ **Reusability**: Generic parameter-driven architecture with zero page-locked hardcoded content.
