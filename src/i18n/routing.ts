import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Phase 1: English (default) + Hindi only
  // Phase 2 will add: "ta", "te"
  // Phase 3 will add: "kn", "bn", "mr", "gu"
  locales: ["en", "hi"],
  defaultLocale: "en",
  // English at "/" (root) — no /en/ prefix for the default locale
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
