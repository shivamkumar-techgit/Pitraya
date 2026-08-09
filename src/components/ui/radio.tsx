import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  description?: string
}

function Radio({
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  label,
  description,
  id,
  ...props
}: RadioProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false)
  const autoId = React.useId()
  const isChecked = checked !== undefined ? checked : internalChecked
  const radioId = id || autoId

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
          type="radio"
          id={radioId}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="peer sr-only"
          {...props}
        />
        <div
          role="radio"
          aria-checked={isChecked}
          aria-disabled={disabled}
          onClick={() => {
            if (disabled) return
            const inputEl = document.getElementById(radioId) as HTMLInputElement | null
            if (inputEl) {
              inputEl.click()
            }
          }}
          className={cn(
            "flex h-5.5 w-5.5 items-center justify-center rounded-full border border-input bg-transparent transition-[color,box-shadow,border-color] outline-none cursor-pointer peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 peer-focus-visible:border-ring",
            isChecked && "border-gold-primary text-gold-primary shadow-gold-glow/10",
            disabled && "cursor-not-allowed opacity-50 border-muted-foreground/30 bg-muted/10",
            !isChecked && !disabled && "hover:border-gold-primary/50"
          )}
        >
          {isChecked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="h-2.5 w-2.5 rounded-full bg-gold-primary shadow-gold-glow"
            />
          )}
        </div>
      </div>
      {(label || description) && (
        <label
          htmlFor={radioId}
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

export { Radio }
