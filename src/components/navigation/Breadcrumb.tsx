import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-1.5 text-xs text-text-muted font-sans py-2", className)}
      {...props}
    >
      {/* Home link always default at the start */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-gold-primary transition-colors text-text-muted/80"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={idx}>
            <ChevronRight className="h-3 w-3 text-text-muted/50 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-gold-primary select-none" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <Link href={item.href} className="hover:text-gold-primary transition-colors text-text-muted/80">
                {item.label}
              </Link>
            ) : (
              <span className="select-none">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
