import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers.
 * Use these instead of Next.js's built-in Link/useRouter/usePathname
 * inside the [locale] route segment so that locale prefixes are handled automatically.
 *
 * Usage:
 *   import { Link, useRouter, usePathname } from "@/i18n/navigation";
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
