import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd, generateBreadcrumbSchema } from "@/components/seo/JsonLd";

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", item: "/" }, ...items];

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm text-gray-400">
        <ol className="flex items-center space-x-2">
          {allItems.map((it, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={it.item} className="flex items-center space-x-2">
                {idx > 0 && <ChevronRight className="h-4 w-4 text-gray-500" />}
                {isLast ? (
                  <span className="font-medium text-amber-400" aria-current="page">
                    {it.name}
                  </span>
                ) : (
                  <Link
                    href={it.item}
                    className="flex items-center hover:text-amber-300 transition-colors"
                  >
                    {idx === 0 && <Home className="mr-1 h-3.5 w-3.5" />}
                    {it.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
