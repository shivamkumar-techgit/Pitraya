"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
}

export default function Counter({
  end,
  start = 0,
  duration = 2.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  className,
  ...props
}: CounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <span ref={ref} className={cn("inline-block font-bold", className)} {...props}>
      {prefix}
      {inView ? (
        <CountUp
          start={start}
          end={end}
          duration={duration}
          decimals={decimals}
          separator={separator}
        />
      ) : (
        start
      )}
      {suffix}
    </span>
  );
}
