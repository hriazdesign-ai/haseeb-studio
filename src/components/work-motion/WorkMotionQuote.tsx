"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import { sectionReveal } from "@/lib/motion";
import { workMotionQuote } from "@/lib/work-motion";

/**
 * Mid-page statement — fade-and-rise only (no image-style parallax).
 */
export function WorkMotionQuote() {
  const quoteRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { captionY } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);
  const { quote } = sectionReveal;

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: [...quote.offset],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [...quote.opacity]);
  const y = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 0;
    const from = quote.y * captionY;
    return from + (0 - from) * progress;
  });

  return (
    <section
      ref={quoteRef}
      className="work-quote"
      aria-label="Studio statement"
    >
      <motion.p
        className="work-quote__text"
        style={{
          opacity: motionDisabled ? 1 : opacity,
          y: motionDisabled ? 0 : y,
        }}
      >
        {workMotionQuote}
      </motion.p>
    </section>
  );
}
