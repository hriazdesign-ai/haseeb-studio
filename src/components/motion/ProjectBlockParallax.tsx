"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Responsive multipliers for whole-block parallax — tune here.
 * Desktop ≥1024: 100% · Tablet 768–1023: 60% · Mobile <768: 25%
 */
export const BLOCK_PARALLAX_MULTIPLIERS = {
  desktop: 1,
  tablet: 0.6,
  mobile: 0.25,
} as const;

function useBlockParallaxMultiplier() {
  const [multiplier, setMultiplier] = useState<number>(
    BLOCK_PARALLAX_MULTIPLIERS.desktop,
  );

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setMultiplier(BLOCK_PARALLAX_MULTIPLIERS.mobile);
      } else if (width < 1024) {
        setMultiplier(BLOCK_PARALLAX_MULTIPLIERS.tablet);
      } else {
        setMultiplier(BLOCK_PARALLAX_MULTIPLIERS.desktop);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return multiplier;
}

type ProjectBlockParallaxProps = {
  /** Desktop y at scroll progress 0. */
  from: number;
  /** Desktop y at scroll progress 1. */
  to: number;
  className?: string;
  children: ReactNode;
};

/**
 * Moves an entire project unit (image + caption + link) via translateY only.
 * Used by `/home-parallax-blocks` — does not affect image-inside-frame parallax.
 */
export function ProjectBlockParallax({
  from,
  to,
  className,
  children,
}: ProjectBlockParallaxProps) {
  const projectRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const multiplier = useBlockParallaxMultiplier();
  const motionDisabled = Boolean(shouldReduceMotion);

  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end start"],
  });

  // Direct transform — no spring for this first pass.
  const y = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 0;
    const fromY = from * multiplier;
    const toY = to * multiplier;
    return fromY + (toY - fromY) * progress;
  });

  return (
    <motion.article
      ref={projectRef}
      className={["hp-project-block", className].filter(Boolean).join(" ")}
      style={{
        y: motionDisabled ? 0 : y,
        willChange: motionDisabled ? undefined : "transform",
      }}
    >
      {children}
    </motion.article>
  );
}
