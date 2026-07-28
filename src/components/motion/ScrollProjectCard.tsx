"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/** Shared scroll-linked peak scale for every project card. */
const SCROLL_ZOOM = 1.12;

/** Extra scale added on hover (same for every card). */
const HOVER_ZOOM_EXTRA = 0.05;

type ScrollProjectCardProps = {
  media: ReactNode;
  caption: ReactNode;
  mediaClassName?: string;
  className?: string;
};

/**
 * Project card with one controlled image scale:
 * scroll zoom + the same hover boost on every card.
 */
export function ScrollProjectCard({
  media,
  caption,
  mediaClassName,
  className,
}: ScrollProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "end 12%"],
  });

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, SCROLL_ZOOM],
    { clamp: true },
  );

  const hoverTarget = useMotionValue(0);
  const hoverProgress = useSpring(hoverTarget, {
    stiffness: 170,
    damping: 24,
    mass: 0.55,
  });

  // Additive: scroll and hover never multiply into divergent totals.
  const scale = useTransform(
    [scrollScale, hoverProgress],
    (latest: number[]) => {
      if (shouldReduceMotion) return 1;
      const scroll = latest[0] ?? 1;
      const hover = latest[1] ?? 0;
      return scroll + hover * HOVER_ZOOM_EXTRA;
    },
  );

  return (
    <div
      ref={containerRef}
      className={["work-card flex min-w-0 cursor-pointer flex-col gap-4", className]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => hoverTarget.set(1)}
      onMouseLeave={() => hoverTarget.set(0)}
    >
      <div
        className={[
          "relative w-full overflow-hidden bg-surface",
          mediaClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            scale: shouldReduceMotion ? 1 : scale,
            transformOrigin: "center center",
            willChange: shouldReduceMotion ? undefined : "transform",
          }}
        >
          <div className="relative size-full">{media}</div>
        </motion.div>
      </div>

      <div>{caption}</div>
    </div>
  );
}
