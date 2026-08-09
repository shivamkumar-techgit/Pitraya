import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export default function AnimatedText({ text, className, ...props }: AnimatedTextProps) {
  return (
    <div className={cn("animate-fade-in transition-all duration-500 font-sans", className)} {...props}>
      {text}
    </div>
  );
}
