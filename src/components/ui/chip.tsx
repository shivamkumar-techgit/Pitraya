import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "outline" | "glass"
  color?: "default" | "gold" | "success" | "error" | "muted"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

function Chip({
  variant = "glass",
  color = "default",
  size = "md",
  icon,
  onClose,
  disabled = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all select-none border tracking-wider",
        // Sizes
        {
          "px-2.5 py-0.5 text-[10px]": size === "sm",
          "px-3 py-1 text-xs": size === "md",
          "px-4 py-1.5 text-sm": size === "lg",
        },
        // Variants and Colors
        variant === "solid" && {
          "bg-gold-primary text-black border-gold-primary shadow-gold-glow/20": color === "gold",
          "bg-text-primary text-background border-text-primary": color === "default",
          "bg-emerald-600 text-white border-emerald-600": color === "success",
          "bg-rose-600 text-white border-rose-600": color === "error",
          "bg-surface text-text-muted border-border/40": color === "muted",
        },
        variant === "outline" && {
          "bg-transparent border-gold-primary/40 text-gold-primary hover:border-gold-primary": color === "gold",
          "bg-transparent border-text-primary/40 text-text-primary hover:border-text-primary": color === "default",
          "bg-transparent border-emerald-500/40 text-emerald-400 hover:border-emerald-500": color === "success",
          "bg-transparent border-rose-500/40 text-rose-400 hover:border-rose-500": color === "error",
          "bg-transparent border-border/40 text-text-muted hover:border-border": color === "muted",
        },
        variant === "glass" && {
          "bg-gold-primary/10 border-gold-primary/30 text-gold-primary hover:bg-gold-primary/15 shadow-gold-glow/5": color === "gold",
          "bg-surface/30 border-border-gold/20 text-text-primary hover:bg-surface/40": color === "default",
          "bg-emerald-500/10 border-emerald-500/35 text-emerald-400 hover:bg-emerald-500/15": color === "success",
          "bg-rose-500/10 border-rose-500/35 text-rose-400 hover:bg-rose-500/15": color === "error",
          "bg-surface/20 border-border/20 text-text-muted hover:bg-surface/30": color === "muted",
        },
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {onClose && !disabled && (
        <button
          type="button"
          onClick={onClose}
          className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-black/20 dark:hover:bg-white/10 text-current transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
          aria-label="Remove element"
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </span>
  )
}

export { Chip }
