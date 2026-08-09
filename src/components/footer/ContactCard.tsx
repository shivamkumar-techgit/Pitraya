import React from "react";
import { cn } from "@/lib/utils";

export interface ContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  email?: string;
  phone?: string;
}

export default function ContactCard({
  email = "shkshvm@gmail.com",
  phone = "+91 84344 57228",
  className,
  ...props
}: ContactCardProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <h4 className="text-sm font-semibold text-gold-primary uppercase tracking-wider font-cinzel">
        Sanctuary Concierge
      </h4>
      <p className="text-sm text-text-secondary leading-relaxed">
        Have questions regarding private bookings or bespoke group rituals?
      </p>
      <div className="pt-1">
        <span className="text-xs font-semibold text-text-muted block">Direct Inquiry</span>
        <a href={`mailto:${email}`} className="text-sm font-medium text-gold-primary hover:underline">
          {email}
        </a>
      </div>
      <div>
        <span className="text-xs font-semibold text-text-muted block">Direct Call &amp; WhatsApp Support</span>
        <a href={`tel:+918434457228`} className="text-sm font-medium text-text-primary hover:text-gold-primary transition-colors block">
          {phone}
        </a>
        <a
          href="https://wa.me/918434457228?text=Namaste%20Pitraya%20Team"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-1 transition-colors"
        >
          <span>💬 Chat on WhatsApp (+91 84344 57228)</span>
        </a>
      </div>
    </div>
  );
}
