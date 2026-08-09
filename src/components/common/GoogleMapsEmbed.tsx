import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";

export interface GoogleMapsEmbedProps {
  address?: string;
  phone?: string;
  openingHours?: string;
}

export default function GoogleMapsEmbed({
  address = "Vishnupad Temple Dhaam Road, Gaya, Bihar 823001",
  phone = "+91-98000-00000",
  openingHours = "05:00 AM - 09:00 PM (Daily)",
}: GoogleMapsEmbedProps) {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.518!2d85.0002!3d24.7955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ3JzNDMy44Ik4gODVsMDAnMDAuNyJFOg!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin";

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
      <div className="mb-4 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-amber-400 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-amber-400" />
          Pitraya Rituals — Gaya Vishnupad Office
        </h3>
        <p className="text-slate-300 text-sm flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-slate-400" />
          {address}
        </p>
        <p className="text-slate-300 text-sm flex items-center">
          <Phone className="mr-2 h-4 w-4 text-slate-400" />
          {phone}
        </p>
        <p className="text-slate-300 text-sm flex items-center">
          <Clock className="mr-2 h-4 w-4 text-slate-400" />
          {openingHours}
        </p>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden border border-slate-800">
        <iframe
          title="Pitraya Rituals Gaya Vishnupad Dhaam Office Location Map"
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
        />
      </div>
    </div>
  );
}
