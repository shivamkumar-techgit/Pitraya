"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface MenuItem {
  label: string;
  href: string;
  isMega?: boolean;
}

export interface DesktopMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  activeHref?: string;
  /** Called when hovering any nav item — passes the item label so parent can decide which mega to open */
  onHoverMegaItem?: (itemLabel: string) => void;
  /** Called when cursor leaves the entire nav bar area */
  onHoverLeaveNav?: () => void;
}

export default function DesktopMenu({
  items,
  activeHref,
  onHoverMegaItem,
  onHoverLeaveNav,
  className,
  ...props
}: DesktopMenuProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main Navigation"
      className={cn("flex items-center gap-3 lg:gap-4 xl:gap-4 2xl:gap-6 flex-nowrap", className)}
      onMouseLeave={onHoverLeaveNav}
      {...props}
    >
      {items.map((item, idx) => {
        const isHash = item.href.includes("#");
        let isActive = false;

        if (isHash) {
          const hash = `#${item.href.split("#")[1]}`;
          isActive = pathname === "/" && activeHref === hash;
        } else {
          isActive = pathname === item.href;
        }

        return (
          <div
            key={idx}
            className="relative py-2 group shrink-0"
            onMouseEnter={() => onHoverMegaItem?.(item.label)}
          >
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              aria-haspopup={item.isMega ? "true" : undefined}
              className={cn(
                "inline-flex items-center gap-1 text-[11px] xl:text-[12px] 2xl:text-xs font-semibold tracking-wider uppercase transition-colors duration-200 select-none whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary",
                isActive
                  ? "text-gold-primary font-bold"
                  : "text-text-secondary hover:text-gold-primary"
              )}
            >
              <span>{item.label}</span>
              {item.isMega && (
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200 opacity-60 text-gold-primary/80",
                    "group-hover:rotate-180 group-hover:opacity-100"
                  )}
                />
              )}
            </Link>

            {/* Animated gold underline — active state */}
            {isActive && (
              <motion.span
                layoutId="nav-active-underline"
                className="absolute bottom-1.5 left-0 right-0 h-[1.5px] bg-gold-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Hover underline — appears on hover for non-active items */}
            {!isActive && (
              <span className="absolute bottom-1.5 left-0 right-0 h-[1.5px] bg-gold-primary/60 rounded-full scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
