import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterLinksColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: FooterLinksColumn[];
}

const defaultColumns: FooterLinksColumn[] = [
  {
    title: "Sacred Experiences",
    links: [
      { label: "Pinda Daan Oblation", href: "/#services" },
      { label: "Packages & Tiers", href: "/packages" },
      { label: "Pilgrimage from Your City", href: "/pind-daan-from" },
      { label: "AI Travel Planner", href: "/planner" },
      { label: "Lineage Portal Search", href: "/lineage-portal" },
    ],
  },
  {
    title: "Sacred Sanctuaries",
    links: [
      { label: "Vishnupad Sanctuary", href: "/#destinations" },
      { label: "Phalgu River Bed", href: "/#destinations" },
      { label: "Akshayavat Banyan Tree", href: "/#destinations" },
      { label: "Partner Luxury Hotels", href: "/#destinations" },
    ],
  },
  {
    title: "Quick Access",
    links: [
      { label: "Lineage Record Search", href: "/lineage-portal" },
      { label: "AI Itinerary Planner", href: "/planner" },
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Contact Concierge", href: "/contact" },
    ],
  },
];

export default function FooterLinks({
  columns = defaultColumns,
  className,
  ...props
}: FooterLinksProps) {
  return (
    <div
      className={cn("grid w-full grid-cols-1 gap-8 sm:grid-cols-3", className)}
      {...props}
    >
      {columns.map((column, idx) => (
        <div key={idx} className="space-y-4">
          <h4 className="text-gold-primary font-cinzel text-sm font-semibold tracking-wider uppercase">
            {column.title}
          </h4>
          <ul className="text-text-secondary space-y-2.5 text-sm">
            {column.links.map((link, linkIdx) => (
              <li key={linkIdx}>
                <Link
                  href={link.href}
                  className="hover:text-gold-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
