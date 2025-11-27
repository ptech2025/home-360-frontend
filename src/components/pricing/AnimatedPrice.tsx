"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, useMotionValueEvent } from "motion/react";

interface AnimatedPriceProps {
  value: number;
  className?: string;
}

export function AnimatedPrice({ value, className }: AnimatedPriceProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 40,
    stiffness: 80,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplayValue(parseFloat(latest.toFixed(2)));
  });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <span className={className}>${displayValue}</span>;
}
