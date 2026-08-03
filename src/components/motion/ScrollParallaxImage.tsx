"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/** Total vertical travel in px (gentle depth, not obvious motion). */
const PARALLAX_TRAVEL = 72;

type ScrollParallaxImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fills a positioned parent (`relative` + sized). The frame stays fixed;
 * the image drifts vertically inside overflow:hidden as you scroll.
 */
export function ScrollParallaxImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className,
}: ScrollParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [PARALLAX_TRAVEL / 2, -PARALLAX_TRAVEL / 2],
  );

  const inset = PARALLAX_TRAVEL / 2;

  return (
    <div ref={containerRef} className={["absolute inset-0", className].filter(Boolean).join(" ")}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: -inset,
          bottom: -inset,
          y: shouldReduceMotion ? 0 : y,
          willChange: shouldReduceMotion ? undefined : "transform",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
      </motion.div>
    </div>
  );
}
