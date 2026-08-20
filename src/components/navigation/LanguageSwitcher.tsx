"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface LanguageSwitcherProps {
  className?: string;
  variant?: "compact" | "full";
}

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧", nativeName: "English" },
  { code: "hi", name: "Hindi",   flag: "🇮🇳", nativeName: "हिन्दी" },
] as const;

export default function LanguageSwitcher({
  className,
  variant = "compact",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rawPathname = usePathname() || "/";
  const router = useRouter();

  // Determine current language from URL prefix
  const isHindi = rawPathname.startsWith("/hi") || rawPathname === "/hi";
  const currentLang = isHindi ? "hi" : "en";

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (targetLang: "en" | "hi") => {
    setIsOpen(false);
    if (targetLang === currentLang) return;

    if (targetLang === "hi") {
      // Prepend /hi if not already present
      const newPath = rawPathname === "/" ? "/hi" : `/hi${rawPathname}`;
      router.push(newPath);
    } else {
      // Remove /hi prefix for English
      const newPath = rawPathname.replace(/^\/hi/, "") || "/";
      router.push(newPath);
    }
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Language"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border select-none",
          "bg-surface/80 hover:bg-surface-hover border-border-gold/30 hover:border-gold-primary/60 text-text-primary hover:text-gold-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
        )}
      >
        <Globe className="h-3.5 w-3.5 text-gold-primary shrink-0" />
        <span>{variant === "full" ? activeLangObj.nativeName : activeLangObj.code.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-text-muted transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-gold-primary"
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 mt-2 w-36 rounded-xl border border-border-gold/30 bg-surface p-1.5 shadow-lg z-50 animate-in fade-in-50 zoom-in-95 duration-150"
          )}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleLanguageSelect(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer text-left",
                  isSelected
                    ? "bg-gold-primary/15 text-gold-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover/60"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-gold-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
