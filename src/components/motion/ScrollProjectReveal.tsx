"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import {
  blocksScrollOffset,
  resolveScaleKeyframes,
  type ImageScaleKeyframes,
} from "@/lib/home-parallax-blocks-motion";
import { progressInRange } from "@/lib/motion";

export type ScrollProjectRevealConfig = {
  blockY: { from: number; to: number };
  imageScale: ImageScaleKeyframes;
  caption: {
    opacity: readonly [number, number];
    y: number;
    range: readonly [number, number];
  };
};

type ScrollProjectRevealRenderProps = {
  /** Apply ONLY to the inner oversized image layer — never the clipping frame. */
  imageStyle: {
    scale: MotionValue<number> | number;
  };
};

type ScrollProjectRevealProps = {
  config: ScrollProjectRevealConfig;
  className?: string;
  /**
   * Optional static layout wrapper inside the motion article.
   * Use for margin offsets that must not share a transform with parallax `y`.
   */
  layoutOffsetClassName?: string;
  children: (props: ScrollProjectRevealRenderProps) => ReactNode;
};

/**
 * Bright Path / Meridian only:
 * motion.article → translateY
 *   fixed frame (no transform)
 *     oversized image layer → scale
 * Caption reveal is handled by caption-local scroll targets.
 */
export function ScrollProjectReveal({
  config,
  className,
  layoutOffsetClassName,
  children,
}: ScrollProjectRevealProps) {
  const projectRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { breakpoint, blockTravel, scaleStrength } =
    useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);

  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: blocksScrollOffset.project as unknown as [
      "start end",
      "end start",
    ],
  });

  const blockY = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 0;

    if (breakpoint === "mobile") {
      const travel =
        ((Math.abs(config.blockY.from) + Math.abs(config.blockY.to)) / 2) *
        blockTravel;
      return (0.5 - progress) * travel;
    }

    const from = config.blockY.from * blockTravel;
    const to = config.blockY.to * blockTravel;
    return from + (to - from) * progress;
  });

  const imageScale = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 1;
    const [a, b, c] = resolveScaleKeyframes(
      config.imageScale.keyframes,
      scaleStrength,
    );
    const [s0, s1, s2] = config.imageScale.stops;

    if (progress <= s0) return a;
    if (progress >= s2) return c;
    if (progress <= s1) {
      const t = progressInRange(progress, s0, s1);
      return a + (b - a) * t;
    }
    const t = progressInRange(progress, s1, s2);
    return b + (c - b) * t;
  });

  const content = children({
    imageStyle: {
      scale: motionDisabled ? 1 : imageScale,
    },
  });

  return (
    <motion.article
      ref={projectRef}
      className={["hp-project-block", className].filter(Boolean).join(" ")}
      style={{
        y: motionDisabled ? 0 : blockY,
        willChange: motionDisabled ? undefined : "transform",
      }}
    >
      {layoutOffsetClassName ? (
        <div className={layoutOffsetClassName}>{content}</div>
      ) : (
        content
      )}
    </motion.article>
  );
}
