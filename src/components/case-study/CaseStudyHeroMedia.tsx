"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import {
  blocksProjectMotion,
  blocksScrollOffset,
  resolveScaleKeyframes,
} from "@/lib/home-parallax-blocks-motion";
import { progressInRange } from "@/lib/motion";
import type { CaseStudyImage } from "@/lib/case-studies";

type CaseStudyHeroMediaProps = {
  image: CaseStudyImage;
};

/**
 * Full-bleed case-study hero media — same architecture as Homepage
 * Mums United (`hp-blocks-mums-*` + `blocksProjectMotion.mumsUnited`).
 *
 * Structure:
 *   full-bleed wrapper
 *   └── frame (clip only)
 *       └── y layer
 *           └── scale layer
 *               └── hover scale
 *                   └── Image
 */
export function CaseStudyHeroMedia({ image }: CaseStudyHeroMediaProps) {
  const config = blocksProjectMotion.mumsUnited;
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { internalTravel, scaleStrength } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);

  const { scrollYProgress: frameProgress } = useScroll({
    target: frameRef,
    offset: blocksScrollOffset.mumsFrame as unknown as [
      "start end",
      "end start",
    ],
  });

  const imageY = useTransform(frameProgress, (progress) => {
    if (motionDisabled) return 0;
    const from = config.imageY.from * internalTravel;
    const to = config.imageY.to * internalTravel;
    return from + (to - from) * progress;
  });

  const imageScale = useTransform(frameProgress, (progress) => {
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

  return (
    <div className="case-study-hero-media hp-blocks-mums-full-bleed">
      <div
        ref={frameRef}
        className="homepage-parallax-frame hp-blocks-mums-frame"
      >
        <motion.div
          className="hp-blocks-mums-y"
          style={{
            top: -config.overscan,
            bottom: -config.overscan,
            y: motionDisabled ? 0 : imageY,
            willChange: motionDisabled ? undefined : "transform",
          }}
        >
          <motion.div
            className="hp-blocks-mums-scale"
            style={{
              scale: motionDisabled ? 1 : imageScale,
              transformOrigin: "center center",
            }}
          >
            <div className="hp-blocks-hover-scale">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "50% 50%" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
