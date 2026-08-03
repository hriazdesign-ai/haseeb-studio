"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { arrowReveal } from "@/lib/motion";

export type AnimatedArrowKind = "cta" | "caption" | "inline";

type AnimatedArrowProps = {
  className?: string;
  /**
   * `cta` / `caption` — spring reveal on parent hover/focus variants.
   * `inline` — always visible (contact links); no hide/show motion.
   */
  kind?: AnimatedArrowKind;
  children?: string;
};

/**
 * Global arrow for captions, CTAs, and inline editorial links.
 * Parent motion links using `animatedArrowLinkProps` drive `cta` / `caption`.
 */
export function AnimatedArrow({
  className,
  kind = "caption",
  children = "↗",
}: AnimatedArrowProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);

  if (kind === "inline") {
    return (
      <span className={className} aria-hidden="true">
        {children}
      </span>
    );
  }

  const variants: Variants =
    kind === "cta"
      ? {
          rest: {
            ...arrowReveal.cta.rest,
            x: reduced ? 0 : arrowReveal.cta.rest.x,
            transition: arrowReveal.exit,
          },
          hover: {
            ...arrowReveal.cta.hover,
            transition: reduced ? arrowReveal.reduced : arrowReveal.cta.spring,
          },
        }
      : {
          rest: {
            ...arrowReveal.caption.rest,
            x: reduced ? 0 : arrowReveal.caption.rest.x,
            y: reduced ? 2 : arrowReveal.caption.rest.y,
            transition: arrowReveal.exit,
          },
          hover: {
            ...arrowReveal.caption.hover,
            transition: reduced
              ? arrowReveal.reduced
              : arrowReveal.caption.spring,
          },
        };

  return (
    <motion.span
      className={className}
      aria-hidden="true"
      variants={variants}
    >
      {children}
    </motion.span>
  );
}

/** Parent link props so `cta` / `caption` arrows inherit rest/hover variants. */
export const animatedArrowLinkProps = {
  initial: "rest" as const,
  animate: "rest" as const,
  whileHover: "hover" as const,
  whileFocus: "hover" as const,
};

/** @deprecated Use `AnimatedArrow` / `animatedArrowLinkProps`. */
export const HoverArrow = AnimatedArrow;
/** @deprecated Use `animatedArrowLinkProps`. */
export const hoverArrowLinkProps = animatedArrowLinkProps;
