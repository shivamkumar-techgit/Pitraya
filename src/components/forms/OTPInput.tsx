"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Label from "@/components/typography/Label";

export interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
}

export default function OTPInput({
  label = "Verification Code",
  length = 4,
  value = "",
  onChange,
  className,
  ...props
}: OTPInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleTextChange = (text: string, index: number) => {
    const numericChar = text.replace(/\D/g, "").slice(-1); // keep last single numeric digit only
    const newCode = [...code];
    newCode[index] = numericChar;
    setCode(newCode);

    if (onChange) onChange(newCode.join(""));

    // Advance focus if character entered
    if (numericChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // Move focus backward if box empty
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        if (onChange) onChange(newCode.join(""));
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear active box
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        if (onChange) onChange(newCode.join(""));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newCode = Array(length).fill("");
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);
    if (onChange) onChange(newCode.join(""));
    
    // Focus last or next unfilled box
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className={cn("w-full text-center space-y-2", className)} {...props}>
      {label && <Label className="block mb-1.5">{label}</Label>}

      <div className="flex justify-center gap-3">
        {code.map((char, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={char}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleTextChange(e.target.value, index)}
            className="w-12 h-12 text-center text-lg font-bold border border-border-gold/30 bg-surface/30 rounded-xl focus:border-gold-primary focus:ring-2 focus:ring-gold-primary/30 outline-none text-text-primary transition-all font-cinzel"
          />
        ))}
      </div>
    </div>
  );
}
