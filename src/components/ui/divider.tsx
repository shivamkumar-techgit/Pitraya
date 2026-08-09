import * as React from "react"
import { cn } from "@/lib/utils"

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  variant?: "solid" | "dashed" | "dotted"
  thickness?: "sm" | "md" | "lg"
}

function Divider({
  orientation = "horizontal",
  variant = "solid",
  thickness = "sm",
  className,
  children,
  ...props
}: DividerProps) {
  const lineClasses = cn(
    "bg-border-gold/20 dark:bg-border-gold/25",
    orientation === "horizontal"
      ? {
          "w-full": true,
          "h-[1px]": thickness === "sm",
          "h-[2px]": thickness === "md",
          "h-[4px]": thickness === "lg",
        }
      : {
          "h-full min-h-[1em]": true,
          "w-[1px]": thickness === "sm",
          "w-[2px]": thickness === "md",
          "w-[4px]": thickness === "lg",
        },
    variant === "dashed" && (orientation === "horizontal" ? "bg-transparent border-t border-dashed border-border-gold/20" : "bg-transparent border-l border-dashed border-border-gold/20"),
    variant === "dotted" && (orientation === "horizontal" ? "bg-transparent border-t border-dotted border-border-gold/20" : "bg-transparent border-l border-dotted border-border-gold/20")
  )

  if (children && orientation === "horizontal") {
    return (
      <div
        className={cn("flex w-full items-center gap-4 text-xs font-medium text-text-muted uppercase tracking-widest my-4", className)}
        {...props}
      >
        <div className={lineClasses} />
        <span className="shrink-0 px-2 py-0.5 bg-background border border-border-gold/10 rounded-md select-none font-cinzel text-[10px] text-gold-primary">
          {children}
        </span>
        <div className={lineClasses} />
      </div>
    )
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(lineClasses, className)}
      {...props}
    />
  )
}

export { Divider }
