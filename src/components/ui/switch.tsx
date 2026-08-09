import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  description?: string
}

function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  label,
  description,
  id,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false)
  const autoId = React.useId()
  const isChecked = checked !== undefined ? checked : internalChecked
  const switchId = id || autoId

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    if (checked === undefined) {
      setInternalChecked(e.target.checked)
    }
    onChange?.(e)
  }

  return (
    <div className={cn("flex items-start gap-3 select-none", className)}>
      <div className="relative flex h-5 items-center">
        <input
          type="checkbox"
          id={switchId}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="peer sr-only"
          {...props}
        />
        <div
          role="switch"
          aria-checked={isChecked}
          aria-disabled={disabled}
          onClick={() => {
            if (disabled) return
            const inputEl = document.getElementById(switchId) as HTMLInputElement | null
            if (inputEl) {
              inputEl.click()
            }
          }}
          className={cn(
            "flex h-5.5 w-10.5 items-center rounded-full border border-input bg-transparent transition-[color,box-shadow,border-color,background-color] outline-none cursor-pointer peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 peer-focus-visible:border-ring p-[2px]",
            isChecked && "border-gold-primary bg-gold-primary/10 shadow-gold-glow/5",
            disabled && "cursor-not-allowed opacity-50 border-muted-foreground/30 bg-muted/10",
            !isChecked && !disabled && "hover:border-gold-primary/50"
          )}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            animate={{
              x: isChecked ? 20 : 0,
            }}
            className={cn(
              "h-4 w-4 rounded-full transition-colors",
              isChecked ? "bg-gold-primary shadow-gold-glow" : "bg-text-muted dark:bg-border-gold/60"
            )}
          />
        </div>
      </div>
      {(label || description) && (
        <label
          htmlFor={switchId}
          className={cn(
            "flex flex-col cursor-pointer text-sm leading-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label && <span className="font-medium text-text-primary">{label}</span>}
          {description && <span className="text-xs text-text-muted mt-1 leading-normal">{description}</span>}
        </label>
      )}
    </div>
  )
}

export { Switch }
