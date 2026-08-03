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
import { hoverLift } from "@/lib/motion";

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
    offset: [...hoverLift.scrollOffset],
  });

  const scrollScale = useTransform(
    scrollYProgress,
    [...hoverLift.scrollInput],
    [1, hoverLift.scrollZoom],
    { clamp: true },
  );

  const hoverTarget = useMotionValue(0);
  const hoverProgress = useSpring(hoverTarget, hoverLift.spring);

  // Additive: scroll and hover never multiply into divergent totals.
  const scale = useTransform(
    [scrollScale, hoverProgress],
    (latest: number[]) => {
      if (shouldReduceMotion) return 1;
      const scroll = latest[0] ?? 1;
      const hover = latest[1] ?? 0;
      return scroll + hover * hoverLift.hoverZoomExtra;
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
