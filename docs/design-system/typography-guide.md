# Pitraya Typography Guide

## Font Families

We combine traditional elegance with modern readability:
1. **Cinzel** (`font-cinzel`): Used exclusively for Display, H1, H2, and H3 headings. It conveys heritage and sacredness.
2. **Inter** (`font-sans`): Used for all body text, paragraphs, buttons, and captions. Provides maximum legibility.
3. **Cormorant Garamond** (`font-cormorant`): Used sparingly for blockquotes or spiritual verses.

## Font Scale

We use standard Tailwind classes mapped to specific hierarchical roles.

- **Display**: `text-[clamp(3rem,8vw,7rem)] font-black` — Used *once* per page (Hero headline).
- **Heading 2XL**: `text-5xl md:text-7xl font-black` — Used for major section titles.
- **Heading XL**: `text-4xl md:text-6xl font-extrabold` — Standard page titles.
- **Heading LG**: `text-3xl md:text-4xl font-bold` — Inner section titles.
- **Heading MD**: `text-xl md:text-3xl font-bold` — Standard card titles.
- **Heading SM**: `text-base md:text-xl font-semibold` — Small card titles or feature labels.

- **Paragraph XL**: `text-xl` — Lead paragraphs.
- **Paragraph LG**: `text-lg` — Featured body text.
- **Paragraph MD**: `text-base` — Standard body text.
- **Paragraph SM**: `text-sm` — Secondary body text (cards).
- **Paragraph XS**: `text-xs tracking-wide` — Legal, timestamps.

## Rules
1. **Never mix typefaces within a single paragraph.**
2. **Cinzel is never used below 16px.** It becomes illegible.
3. **Always use standard Tailwind classes.** Never use arbitrary values like `text-[22px]`.
