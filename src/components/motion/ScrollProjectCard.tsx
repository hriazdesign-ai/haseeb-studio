"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScrollProjectCardProps = {
  media: ReactNode;
  caption: ReactNode;
  mediaClassName?: string;
  className?: string;
  /** Peak local scroll-linked image scale. Defaults to 1.2. */
  zoomScale?: number;
  /** Shared focus value between 0 and 1. */
  imageEmphasis: MotionValue<number>;
};

export function ScrollProjectCard({
  media,
  caption,
  mediaClassName,
  className,
  zoomScale = 1.2,
  imageEmphasis,
}: ScrollProjectCardProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "end 12%"],
  });

  const localZoom = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, zoomScale],
    { clamp: true },
  );

  const hoverTarget = useMotionValue(0);

  const hoverEmphasis = useSpring(hoverTarget, {
    stiffness: 170,
    damping: 24,
    mass: 0.55,
  });

  /**
   * Hover always wins.
   * When hovered, the image smoothly returns to full emphasis.
   */
  const combinedEmphasis = useTransform(
    [imageEmphasis, hoverEmphasis],
    ([scrollValue, hoverValue]) =>
      Math.max(scrollValue as number, hoverValue as number),
  );

  const brightness = useTransform(
    combinedEmphasis,
    [0, 1],
    [0.68, 1],
  );
  
  const contrast = useTransform(
    combinedEmphasis,
    [0, 1],
    [0.88, 1],
  );
  
  const opacity = useTransform(
    combinedEmphasis,
    [0, 1],
    [0.94, 1],
  );

  const blur = useTransform(
    combinedEmphasis,
    [0, 1],
    [0.7, 0],
  );

  const focusScale = useTransform(
    combinedEmphasis,
    [0, 1],
    [0.97, 1.02],
  );

  const imageFilter = useMotionTemplate`
    brightness(${brightness})
    contrast(${contrast})
    blur(${blur}px)
  `;

  return (
    <article
      ref={containerRef}
      className={["flex min-w-0 flex-col gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "relative w-full overflow-hidden bg-surface",
          mediaClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseEnter={() => hoverTarget.set(1)}
        onMouseLeave={() => hoverTarget.set(0)}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            scale: shouldReduceMotion ? 1 : focusScale,
            opacity: shouldReduceMotion ? 1 : opacity,
            filter: shouldReduceMotion
              ? "brightness(1) contrast(1) blur(0px)"
              : imageFilter,
            transformOrigin: "center center",
            willChange: shouldReduceMotion
              ? undefined
              : "transform, filter, opacity",
          }}
        >
          <motion.div
            className="relative size-full"
            style={{
              scale: shouldReduceMotion ? 1 : localZoom,
              transformOrigin: "center center",
              willChange: shouldReduceMotion
                ? undefined
                : "transform",
            }}
          >
            {media}
          </motion.div>
        </motion.div>
      </div>

      <div>{caption}</div>
    </article>
  );
}