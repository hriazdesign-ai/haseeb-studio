/**
 * Tunable motion configuration for `/home-parallax-blocks` only.
 * Diagnostic pass — exaggerated so relationships are visually obvious.
 * Shared scale helpers live in `@/lib/motion`.
 */

import type { ImageScaleKeyframes } from "@/lib/motion";

export {
  resolveScaleKeyframes,
  resolveScaleValue,
  type ImageScaleKeyframes,
} from "@/lib/motion";

/**
 * Desktop layout breakpoint for blocks project media / pair grid (px).
 * Keep in sync with `--hp-blocks-desktop-min` usage in `home-parallax.css`.
 */
export const HP_BLOCKS_DESKTOP_MIN_PX = 1024;

/**
 * Large-desktop editorial alignment (statement + contact) breakpoint (px).
 * Keep in sync with the `@media (min-width: 1280px)` editorial rules.
 */
export const HP_BLOCKS_EDITORIAL_MIN_PX = 1280;

export const blocksMotionMultipliers = {
  desktop: {
    blockTravel: 1,
    internalTravel: 1,
    scaleStrength: 1,
    captionY: 1,
  },
  tablet: {
    blockTravel: 0.6,
    internalTravel: 0.7,
    scaleStrength: 0.5,
    captionY: 0.67,
  },
  mobile: {
    blockTravel: 0.2,
    internalTravel: 0.4,
    scaleStrength: 0.25,
    captionY: 0.45,
  },
} as const;

export type BlocksMotionBreakpoint = keyof typeof blocksMotionMultipliers;

export const blocksProjectMotion = {
  /** Large full-bleed homepage slot (first card). */
  featured: {
    /** Inner image y only — never applied to the article or frame. */
    imageY: { from: 90, to: -90 },
    /** Fixed vertical overscan on the y layer (each side). */
    overscan: 140,
    /** Crop raised slightly so the subject centres in the frame. */
    objectPosition: "50% 38%",
    /** Never scales below 1 — prevents black gaps. Softened ~15% from prior peak. */
    imageScale: {
      keyframes: [1.02, 1.15, 1.03],
      stops: [0, 0.5, 1],
    } satisfies ImageScaleKeyframes,
    caption: {
      opacity: [0, 1] as const,
      y: 20,
      range: [0.18, 0.4] as const,
    },
  },
  /** Left card in the homepage pair. */
  secondary: {
    blockY: { from: 90, to: -90 },
    /** Never scales below 1 — prevents inset gaps at progress 0 (matches featured). */
    imageScale: {
      keyframes: [1.02, 1.16, 1.02],
      stops: [0, 0.5, 1],
    } satisfies ImageScaleKeyframes,
    caption: {
      opacity: [0, 1] as const,
      y: 20,
      range: [0.2, 0.44] as const,
    },
  },
  /** Right card in the homepage pair. */
  primary: {
    blockY: { from: -50, to: 70 },
    /** Never scales below 1 — prevents inset gaps at progress 0 (matches featured). */
    imageScale: {
      keyframes: [1.03, 1.18, 1.03],
      stops: [0, 0.5, 1],
    } satisfies ImageScaleKeyframes,
    caption: {
      opacity: [0, 1] as const,
      y: 20,
      range: [0.3, 0.56] as const,
    },
  },
} as const;

/**
 * Shared full-bleed case-study hero motion.
 * Vertical travel only — scale stays at 1. Overscan covers max travel + margin.
 * Kept separate from `blocksProjectMotion.featured` so homepage cards stay unchanged.
 */
export const caseStudyHeroMotion = {
  /** Desktop travel (px). Tablet uses ±14 in CaseStudyHeroMedia. */
  imageY: { from: 24, to: -24 },
  /** Desktop overscan each side (travel + safety). */
  overscan: 28,
  /** Tablet travel / overscan (px). */
  tabletImageY: { from: 14, to: -14 },
  tabletOverscan: 18,
} as const;

/** CTA uses a dedicated local ref in BlocksWorkSection; kept for reference. */
export const blocksCtaMotion = {
  opacity: [0, 1] as const,
  y: 18,
  scale: [0.97, 1] as const,
  offset: ["start 96%", "start 74%"] as [string, string],
};

export const blocksStatementMotion = {
  opacity: [0.2, 1] as const,
  y: 28,
  /**
   * Completes while the statement is still well in view so the resting
   * colour reaches full opacity (never left mid-fade while reading).
   */
  offset: ["start 92%", "start 52%"] as [string, string],
};

export const blocksBiographyMotion = {
  paragraph1: {
    opacity: [0, 1] as const,
    y: 18,
    range: [0.26, 0.52] as const,
  },
  paragraph2: {
    opacity: [0, 1] as const,
    y: 18,
    range: [0.42, 0.68] as const,
  },
  offset: ["start 88%", "end 40%"] as [string, string],
};

export const blocksContactMotion = {
  heading: {
    opacity: [0.35, 1] as const,
    y: 20,
    range: [0.15, 0.45] as const,
  },
  body: {
    opacity: [0, 1] as const,
    y: 12,
    range: [0.28, 0.58] as const,
  },
  offset: ["start 90%", "end 45%"] as [string, string],
};

export const blocksScrollOffset = {
  project: ["start 92%", "end 18%"] as [string, string],
  mumsFrame: ["start end", "end start"] as [string, string],
};
