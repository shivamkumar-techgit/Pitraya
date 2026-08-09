"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import Label from "@/components/typography/Label";

export interface GuestCounterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  onChange?: (val: number) => void;
}

export default function GuestCounter({
  label = "Guests",
  value = 1,
  min = 1,
  max = 10,
  onChange,
  className,
  ...props
}: GuestCounterProps) {
  const handleDecrement = () => {
    if (value > min && onChange) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && onChange) {
      onChange(value + 1);
    }
  };

  return (
    <div className={cn("w-full flex items-center justify-between", className)} {...props}>
      <div>
        {label && <Label className="block">{label}</Label>}
        <span className="text-xs text-text-muted">Min: {min}, Max: {max}</span>
      </div>

      {/* Control Buttons Container */}
      <div className="flex items-center gap-3 border border-border-gold/30 bg-surface/30 px-3 py-1.5 rounded-xl">
        <button
          type="button"
          disabled={value <= min}
          onClick={handleDecrement}
          className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-gold-primary/10 text-gold-primary disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all active:scale-95"
          aria-label="Decrease guest count"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="w-6 text-center text-sm font-bold text-text-primary font-cinzel">
          {value}
        </span>

        <button
          type="button"
          disabled={value >= max}
          onClick={handleIncrement}
          className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-gold-primary/10 text-gold-primary disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all active:scale-95"
          aria-label="Increase guest count"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
