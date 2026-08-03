"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import { progressInRange } from "@/lib/motion";

type ScrollRevealProps = {
  as?: "div" | "section" | "p" | "h2" | "span";
  className?: string;
  children: ReactNode;
  offset?: readonly [string, string];
  /** Local progress range within the target's scroll progress. */
  range?: readonly [number, number];
  opacity?: readonly [number, number];
  y?: number;
  scale?: readonly [number, number];
  /** Apply captionY / generic y multiplier from blocks config. */
  applyCaptionMultiplier?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "style" | "ref">;

/**
 * Generic reversible scroll-linked fade / rise / settle.
 * Used for captions, CTA, statement, biography and contact on Test B.
 */
export function ScrollReveal({
  as = "div",
  className,
  children,
  offset = ["start 90%", "end 40%"],
  range = [0, 1],
  opacity = [0, 1],
  y = 0,
  scale,
  applyCaptionMultiplier = false,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { captionY } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);
  const MotionTag = motion[as];

  const { scrollYProgress } = useScroll({
    target: ref,
    // Framer accepts these edge strings; cast keeps the config typed loosely.
    offset: offset as unknown as ["start end", "end start"],
  });

  const opacityMv = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 1;
    const t = progressInRange(progress, range[0], range[1]);
    return opacity[0] + (opacity[1] - opacity[0]) * t;
  });

  const yMv = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled || y === 0) return 0;
    const t = progressInRange(progress, range[0], range[1]);
    const from = applyCaptionMultiplier ? y * captionY : y;
    return from + (0 - from) * t;
  });

  const scaleMv = useTransform(scrollYProgress, (progress) => {
    if (!scale || motionDisabled) return 1;
    const t = progressInRange(progress, range[0], range[1]);
    return scale[0] + (scale[1] - scale[0]) * t;
  });

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={{
        opacity: motionDisabled ? 1 : opacityMv,
        y: motionDisabled ? 0 : yMv,
        ...(scale
          ? {
              scale: motionDisabled ? 1 : scaleMv,
              transformOrigin: "center center",
            }
          : {}),
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
