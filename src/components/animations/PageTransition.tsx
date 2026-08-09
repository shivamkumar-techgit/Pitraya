import React from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function PageTransition({ children, className, ...props }: PageTransitionProps) {
  return (
    <div className={cn("animate-in fade-in duration-500", className)} {...props}>
      {children}
    </div>
  );
}
