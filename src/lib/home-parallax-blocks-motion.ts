/**
 * Tunable motion configuration for `/home-parallax-blocks` only.
 * Diagnostic pass — exaggerated so relationships are visually obvious.
 */

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

export type ImageScaleKeyframes = {
  keyframes: readonly [number, number, number];
  /** Local scroll-progress stops for the three keyframes. */
  stops: readonly [number, number, number];
};

export const blocksProjectMotion = {
  mumsUnited: {
    /** Inner image y only — never applied to the article or frame. */
    imageY: { from: 90, to: -90 },
    /** Fixed vertical overscan on the y layer (each side). */
    overscan: 140,
    objectPosition: "50% 50%",
    /** Never scales below 1 — prevents black gaps. */
    imageScale: {
      keyframes: [1.02, 1.18, 1.04],
      stops: [0, 0.5, 1],
    } satisfies ImageScaleKeyframes,
    caption: {
      opacity: [0, 1] as const,
      y: 20,
      range: [0.18, 0.4] as const,
    },
  },
  brightPath: {
    blockY: { from: 90, to: -90 },
    imageScale: {
      keyframes: [0.92, 1.16, 1.02],
      stops: [0, 0.5, 1],
    } satisfies ImageScaleKeyframes,
    caption: {
      opacity: [0, 1] as const,
      y: 20,
      range: [0.2, 0.44] as const,
    },
  },
  meridian: {
    blockY: { from: -50, to: 70 },
    imageScale: {
      keyframes: [0.93, 1.18, 1.03],
      stops: [0, 0.5, 1],
    } satisfies ImageScaleKeyframes,
    caption: {
      opacity: [0, 1] as const,
      y: 20,
      range: [0.3, 0.56] as const,
    },
  },
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
  offset: ["start 88%", "end 48%"] as [string, string],
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

/**
 * Compress a scale keyframe toward 1 by strength.
 * `1 + (value - 1) * strength` — peak zoom and under-scale both dampen.
 */
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
