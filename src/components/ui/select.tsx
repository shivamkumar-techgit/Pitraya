import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.ComponentProps<"select"> {
  placeholder?: string
}

function Select({ className, children, placeholder, ...props }: SelectProps) {
  return (
    <div className="relative w-full" data-slot="select-wrapper">
      <select
        data-slot="select"
        className={cn(
          "h-9 w-full rounded-md border border-input bg-transparent pl-3 pr-8 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30 dark:border-border-gold/30 text-text-primary",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden className="bg-background text-text-muted">
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none select-none" />
    </div>
  )
}

export { Select }
