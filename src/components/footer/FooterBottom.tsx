import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterBottomProps extends React.HTMLAttributes<HTMLDivElement> {
  companyName?: string;
}

export default function FooterBottom({ companyName = "Pitraya Sanctuary Inc.", className, ...props }: FooterBottomProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/20 text-xs text-text-muted",
        className
      )}
      {...props}
    >
      <span>&copy; {new Date().getFullYear()} {companyName}. All Rights Reserved.</span>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <Link href="/privacy-policy" className="hover:text-gold-primary transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-gold-primary transition-colors">Terms of Service</Link>
        <Link href="/about" className="hover:text-gold-primary transition-colors">Sanctuary Charter</Link>
        <Link href="/contact" className="hover:text-gold-primary transition-colors">Cookie Preferences</Link>
      </div>
    </div>
  );
}
