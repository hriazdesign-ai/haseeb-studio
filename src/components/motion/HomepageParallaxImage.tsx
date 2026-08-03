"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  resolveScaleKeyframes,
  type ImageScaleKeyframes,
} from "@/lib/home-parallax-blocks-motion";

export type HomepageParallaxImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Total vertical travel in px (entry +travel/2 → exit −travel/2). */
  travel?: number;
  /**
   * Multiplier applied to travel (default 1).
   * `/home-parallax` leaves this unset; `/home-parallax-blocks` may pass a
   * responsive internal-travel multiplier.
   */
  travelScale?: number;
  /**
   * Optional inner-image scale keyframes (start → peak → settle).
   * Applied to a layer INSIDE the Y layer — never to the clipping frame.
   * Omit on `/home-parallax` to keep image-only pan behaviour.
   */
  imageScale?: ImageScaleKeyframes;
  /** Multiplier compressing scale keyframes toward 1. Default 1. */
  imageScaleStrength?: number;
  objectPosition?: string;
  frameClassName?: string;
  imageClassName?: string;
  /** Force a static centred image. */
  disabled?: boolean;
  /** Project label for debug overlay. */
  debugLabel?: string;
  /** Temporary red/lime outlines + height readout. */
  debug?: boolean;
};

type FrameMetrics = {
  frameHeight: number;
  movingHeight: number;
};

function progressInRange(
  progress: number,
  start: number,
  end: number,
): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

/**
 * Fixed-dimension clipped frame with optional inner image pan + scale.
 *
 * Structure:
 *   frame (relative, overflow hidden, NEVER scales or translates)
 *   └── Y layer (overscanned, translateY only)
 *       └── Scale layer (scale only)
 *           └── Next/Image
 */
export function HomepageParallaxImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  travel = 180,
  travelScale = 1,
  imageScale,
  imageScaleStrength = 1,
  objectPosition = "50% 50%",
  frameClassName,
  imageClassName,
  disabled = false,
  debugLabel,
  debug = false,
}: HomepageParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const motionDisabled = disabled || Boolean(shouldReduceMotion);
  const effectiveTravel = travel * travelScale;

  // Full travel used as vertical overscan so pan stays visible.
  const overscan = effectiveTravel;
  const halfOverscan = overscan / 2;

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled || effectiveTravel === 0) return 0;
    return (0.5 - progress) * effectiveTravel;
  });

  const rawScale = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled || !imageScale) return 1;
    const [a, b, c] = resolveScaleKeyframes(
      imageScale.keyframes,
      imageScaleStrength,
    );
    const [s0, s1, s2] = imageScale.stops;

    if (progress <= s0) return a;
    if (progress >= s2) return c;
    if (progress <= s1) {
      const t = progressInRange(progress, s0, s1);
      return a + (b - a) * t;
    }
    const t = progressInRange(progress, s1, s2);
    return b + (c - b) * t;
  });

  const [metrics, setMetrics] = useState<FrameMetrics>({
    frameHeight: 0,
    movingHeight: 0,
  });

  useEffect(() => {
    if (!debug) return;

    const frame = frameRef.current;
    const moving = movingRef.current;
    if (!frame || !moving) return;

    const measure = () => {
      setMetrics({
        frameHeight: Math.round(frame.getBoundingClientRect().height),
        movingHeight: Math.round(moving.getBoundingClientRect().height),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(moving);
    return () => observer.disconnect();
  }, [debug, effectiveTravel]);

  return (
    <div
      ref={frameRef}
      className={["homepage-parallax-frame", frameClassName]
        .filter(Boolean)
        .join(" ")}
      style={
        debug
          ? { outline: "2px solid red", outlineOffset: "-2px" }
          : undefined
      }
    >
      {/* Layer 2→3: Y pan only. Frame above never receives this transform. */}
      <motion.div
        ref={movingRef}
        className="homepage-parallax-frame__motion"
        style={{
          top: -halfOverscan,
          bottom: -halfOverscan,
          y: motionDisabled ? 0 : rawY,
          willChange: motionDisabled ? undefined : "transform",
          ...(debug
            ? { outline: "2px solid lime", outlineOffset: "-2px" }
            : {}),
        }}
      >
        {/* Layer 3: scale only — clipped by the fixed frame. */}
        <motion.div
          className="homepage-parallax-frame__scale"
          style={{
            scale: motionDisabled || !imageScale ? 1 : rawScale,
            transformOrigin: "center center",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={["object-cover", imageClassName]
              .filter(Boolean)
              .join(" ")}
            style={{ objectPosition }}
          />
        </motion.div>
      </motion.div>

      {debug ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 5,
            padding: "6px 8px",
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
            fontSize: 11,
            lineHeight: 1.35,
            fontFamily: "ui-monospace, monospace",
            pointerEvents: "none",
            whiteSpace: "pre",
          }}
        >
          {[
            debugLabel ?? "project",
            `travel: ${effectiveTravel}px`,
            `y: +${effectiveTravel / 2} → -${effectiveTravel / 2}`,
            `frameH: ${metrics.frameHeight}px`,
            `movingH: ${metrics.movingHeight}px`,
            `overscan: ${overscan}px`,
          ].join("\n")}
        </div>
      ) : null}
    </div>
  );
}
