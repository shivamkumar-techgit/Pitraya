"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Label from "@/components/typography/Label";
import GlassCard from "@/components/cards/GlassCard";

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  selectedDate?: Date;
  onChange?: (date: Date) => void;
}

export default function DatePicker({
  label = "Select Date",
  selectedDate,
  onChange,
  className,
  ...props
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + (direction === "next" ? 1 : -1),
        1
      )
    );
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (onChange) onChange(newDate);
    setIsOpen(false);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: daysInMonth(currentMonth) }, (_, i) => i + 1);
  const offset = startDayOfMonth(currentMonth);

  return (
    <div className={cn("relative w-full", className)} {...props}>
      {label && <Label className="mb-1.5 block">{label}</Label>}
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between h-11 px-4 rounded-xl border border-border-gold/30 bg-surface/30 text-text-primary text-sm hover:border-gold-primary transition-all text-left cursor-pointer focus:ring-2 focus:ring-gold-primary/30"
      >
        <span className="truncate">
          {selectedDate ? selectedDate.toLocaleDateString("en-US", { dateStyle: "medium" }) : "Choose a date"}
        </span>
        <CalendarIcon className="h-4.5 w-4.5 text-gold-primary shrink-0" />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <GlassCard
          borderGold
          className="absolute left-0 mt-2 p-4 w-[280px] z-50 bg-black/90 shadow-xl backdrop-blur-xl"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => handleMonthChange("prev")}
              className="p-1 rounded-lg hover:bg-surface/50 text-gold-primary cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-text-primary font-cinzel">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => handleMonthChange("next")}
              className="p-1 rounded-lg hover:bg-surface/50 text-gold-primary cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-text-muted">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank offsets */}
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`offset-${i}`} />
            ))}
            
            {/* Month days */}
            {days.map((day) => {
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth.getMonth() &&
                selectedDate.getFullYear() === currentMonth.getFullYear();

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={cn(
                    "h-8 w-8 text-xs font-medium rounded-lg flex items-center justify-center transition-all cursor-pointer",
                    isSelected
                      ? "bg-gold-primary text-black font-bold shadow-md shadow-gold-primary/20"
                      : "hover:bg-gold-primary/10 text-text-primary hover:text-gold-primary"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
