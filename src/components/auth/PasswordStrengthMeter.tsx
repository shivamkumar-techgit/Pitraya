"use client";

import React from "react";
import { calculatePasswordStrength, validatePasswordPolicy } from "@/lib/auth/password";
import { ShieldCheck, Check, X } from "lucide-react";

export interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const strength = calculatePasswordStrength(password);
  const policy = validatePasswordPolicy(password);

  if (!password) return null;

  return (
    <div className="space-y-2.5 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between font-medium">
          <span className="text-neutral-400">Password Strength:</span>
          <span
            className={`font-bold font-mono ${
              strength.level === "Weak"
                ? "text-red-400"
                : strength.level === "Medium"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {strength.level}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1 h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ${strength.score >= 1 ? strength.color : "bg-transparent"}`} />
          <div className={`h-full transition-all duration-300 ${strength.score >= 2 ? strength.color : "bg-transparent"}`} />
          <div className={`h-full transition-all duration-300 ${strength.score >= 3 ? strength.color : "bg-transparent"}`} />
          <div className={`h-full transition-all duration-300 ${strength.score >= 4 ? strength.color : "bg-transparent"}`} />
        </div>
        <p className="text-[10px] text-neutral-400">{strength.feedback}</p>
      </div>

      {/* Policy Checklist */}
      <div className="pt-2 border-t border-neutral-800/80 space-y-1">
        <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Requirements:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
          <span className={`flex items-center gap-1 ${password.length >= 8 ? "text-emerald-400 font-medium" : "text-neutral-500"}`}>
            {password.length >= 8 ? <Check className="w-3 h-3 shrink-0" /> : <X className="w-3 h-3 shrink-0 opacity-50" />}
            At least 8 characters
          </span>
          <span className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? "text-emerald-400 font-medium" : "text-neutral-500"}`}>
            {/[A-Z]/.test(password) ? <Check className="w-3 h-3 shrink-0" /> : <X className="w-3 h-3 shrink-0 opacity-50" />}
            One uppercase letter
          </span>
          <span className={`flex items-center gap-1 ${/[a-z]/.test(password) ? "text-emerald-400 font-medium" : "text-neutral-500"}`}>
            {/[a-z]/.test(password) ? <Check className="w-3 h-3 shrink-0" /> : <X className="w-3 h-3 shrink-0 opacity-50" />}
            One lowercase letter
          </span>
          <span className={`flex items-center gap-1 ${/[0-9]/.test(password) ? "text-emerald-400 font-medium" : "text-neutral-500"}`}>
            {/[0-9]/.test(password) ? <Check className="w-3 h-3 shrink-0" /> : <X className="w-3 h-3 shrink-0 opacity-50" />}
            One number
          </span>
          <span className={`flex items-center gap-1 col-span-1 sm:col-span-2 ${/[@$!%*?&#^()_\-+=\[\]{}|;:,.<>]/.test(password) ? "text-emerald-400 font-medium" : "text-neutral-500"}`}>
            {/[@$!%*?&#^()_\-+=\[\]{}|;:,.<>]/.test(password) ? <Check className="w-3 h-3 shrink-0" /> : <X className="w-3 h-3 shrink-0 opacity-50" />}
            One special character (@$!%*?&#^...)
          </span>
        </div>
      </div>
    </div>
  );
}
