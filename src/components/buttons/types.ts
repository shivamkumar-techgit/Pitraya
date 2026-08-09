import React from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
  children?: React.ReactNode;
}

export const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-8 px-3 text-xs gap-1.5 rounded-md",
  sm: "h-9 px-4 text-sm gap-2 rounded-lg",
  md: "h-11 px-5 text-base gap-2.5 rounded-xl",
  lg: "h-13 px-7 text-lg gap-3 rounded-2xl",
  xl: "h-15 px-9 text-xl gap-3.5 rounded-2xl font-bold",
};

export const iconSizeClasses: Record<ButtonSize, string> = {
  xs: "w-3.5 h-3.5",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};
