"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Label from "@/components/typography/Label";
import { Input } from "@/components/ui";

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
}

const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
];

export default function PhoneInput({
  label = "Phone Number",
  value = "",
  onChange,
  className,
  ...props
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, ""); // keep numbers only
    if (onChange) onChange(`${selectedCountry.code} ${rawVal}`);
  };

  const getDisplayVal = () => {
    return value.replace(selectedCountry.code, "").trim();
  };

  return (
    <div className={cn("relative w-full text-left", className)}>
      {label && <Label className="mb-1.5 block">{label}</Label>}

      <div className="flex items-center gap-2">
        {/* Country Selector Button */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center gap-1.5 h-11 px-3 border border-border-gold/30 bg-surface/30 text-text-primary rounded-xl text-sm hover:border-gold-primary transition-all cursor-pointer"
          >
            <span>{selectedCountry.flag}</span>
            <span className="text-xs font-semibold">{selectedCountry.code}</span>
          </button>

          {/* Flag Options Dropdown */}
          {isOpen && (
            <div className="absolute left-0 mt-2 w-[120px] bg-black border border-border-gold/35 rounded-xl py-1.5 z-50 shadow-xl backdrop-blur-xl">
              {countryCodes.map((cc) => (
                <button
                  key={cc.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(cc);
                    setIsOpen(false);
                    if (onChange) onChange(`${cc.code} ${getDisplayVal()}`);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-text-primary hover:bg-gold-primary/15 transition-all text-left cursor-pointer"
                >
                  <span>{cc.flag}</span>
                  <span>{cc.code}</span>
                  <span className="text-[10px] text-text-muted">({cc.country})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Numeric Number Input */}
        <Input
          type="tel"
          value={getDisplayVal()}
          onChange={handleInputChange}
          placeholder="000 000 0000"
          className="h-11 border-border-gold/30 rounded-xl px-4 flex-1 bg-surface/30"
          {...props}
        />
      </div>
    </div>
  );
}
