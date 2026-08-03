import type { Transition } from "framer-motion";

/**
 * Global motion system — approved values only.
 * Do not invent new timings here; page-specific ranges stay in
 * `home-parallax-blocks-motion.ts` and `work-motion.ts`.
 */

/** Cubic-bezier tuples for Framer Motion `ease`. */
export const motionEasings = {
  /** Matches CSS `--ease-standard` / image hover */
  standard: [0.22, 1, 0.36, 1] as const,
  /** Arrow exit + CTA pill expand */
  premium: [0.19, 1, 0.22, 1] as const,
} as const;

/** CSS-facing easing strings (keep in sync with `motionEasings`). */
export const motionEasingCss = {
  standard: "cubic-bezier(0.22, 1, 0.36, 1)",
  premium: "cubic-bezier(0.19, 1, 0.22, 1)",
} as const;

export const motionDurations = {
  arrowExit: 0.24,
  arrowReduced: 0.18,
  imageHoverMs: 800,
  ctaPillMs: 560,
} as const;

/* -------------------------------------------------------------------------- */
/* Arrow reveal (CTA + captions)                                              */
/* -------------------------------------------------------------------------- */

export const arrowReveal = {
  cta: {
    spring: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.8,
    } satisfies Transition,
    rest: { opacity: 0, x: -4 },
    hover: { opacity: 1, x: 0 },
  },
  caption: {
    spring: {
      type: "spring",
      stiffness: 280,
      damping: 26,
      mass: 0.7,
    } satisfies Transition,
    rest: { opacity: 0, x: -3, y: 4 },
    hover: { opacity: 1, x: 0, y: 2 },
  },
  exit: {
    duration: motionDurations.arrowExit,
    ease: motionEasings.premium,
  } satisfies Transition,
  reduced: {
    duration: motionDurations.arrowReduced,
  } satisfies Transition,
} as const;

/* -------------------------------------------------------------------------- */
/* Image hover zoom (homepage blocks + work-motion CSS)                       */
/* -------------------------------------------------------------------------- */

export const imageHover = {
  scale: 1.025,
  durationMs: motionDurations.imageHoverMs,
  easeCss: motionEasingCss.standard,
} as const;

/** Alias — same approved CSS hover zoom. */
export const imageScale = imageHover;

/* -------------------------------------------------------------------------- */
/* CTA pill expand (CSS)                                                      */
/* -------------------------------------------------------------------------- */

export const buttonHover = {
  pillExpandMs: motionDurations.ctaPillMs,
  easeCss: motionEasingCss.premium,
} as const;

/* -------------------------------------------------------------------------- */
/* Legacy `/work` ScrollProjectCard hover lift / zoom                         */
/* -------------------------------------------------------------------------- */

export const hoverLift = {
  scrollZoom: 1.12,
  hoverZoomExtra: 0.05,
  spring: {
    stiffness: 170,
    damping: 24,
    mass: 0.55,
  },
  scrollOffset: ["start 92%", "end 12%"] as const,
  scrollInput: [0, 0.75] as const,
} as const;

/* -------------------------------------------------------------------------- */
/* Card / pair parallax springs (approved Work + ScrollProjectCard)           */
/* -------------------------------------------------------------------------- */

export const cardParallax = {
  /** Solo Work project whole-card y spring */
  soloSpring: {
    stiffness: 110,
    damping: 24,
    mass: 0.3,
  },
  /** Shared pair alignment spring */
  pairSpring: {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  },
  /** Legacy `/work` ScrollProjectCard hover spring */
  scrollCardHoverSpring: hoverLift.spring,
} as const;

/* -------------------------------------------------------------------------- */
/* Section / caption / CTA scroll reveals (exact approved values)             */
/* -------------------------------------------------------------------------- */

export const sectionReveal = {
  /** Shared caption scroll window (homepage + work-motion) */
  captionOffset: ["start 94%", "start 68%"] as const,
  captionOpacity: [0, 1] as const,
  /** Homepage blocks caption rise */
  homeCaptionY: 28,
  /** Work-motion caption rise */
  workCaptionY: 24,
  /** Homepage “Browse all work” CTA */
  cta: {
    offset: ["start 96%", "start 74%"] as const,
    opacity: [0, 1] as const,
    y: 18,
    scale: [0.97, 1] as const,
  },
  /** Work-motion mid-page quote */
  quote: {
    offset: ["start 92%", "start 52%"] as const,
    opacity: [0.2, 1] as const,
    y: 28,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Shared image scale helper (homepage blocks + work)                         */
/* -------------------------------------------------------------------------- */

export type ImageScaleKeyframes = {
  keyframes: readonly [number, number, number];
  stops: readonly [number, number, number];
};

export function resolveScaleValue(value: number, strength: number): number {
  return 1 + (value - 1) * strength;
}

export function resolveScaleKeyframes(
  keyframes: readonly [number, number, number],
  strength: number,
): [number, number, number] {
  return [
    resolveScaleValue(keyframes[0], strength),
    resolveScaleValue(keyframes[1], strength),
    resolveScaleValue(keyframes[2], strength),
  ];
}

/* -------------------------------------------------------------------------- */
/* Scroll progress utility                                                    */
/* -------------------------------------------------------------------------- */

export function progressInRange(
  progress: number,
  start: number,
  end: number,
): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}
