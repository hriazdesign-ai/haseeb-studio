"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArtDirectedIntrinsicImage } from "@/components/case-study/ArtDirectedIntrinsicImage";
import { ImageLightbox } from "@/components/case-study/ImageLightbox";
import { useBlocksMotionBreakpoint } from "@/components/motion/useBlocksMotionBreakpoint";
import type { CaseStudyImage } from "@/lib/case-studies";
import { cardParallax } from "@/lib/motion";

const FEATURE_SIZES =
  "(max-width: 1299px) calc(100vw - 2 * clamp(1.25rem, 5vw, 4rem)), 1172px";

/**
 * Subtle vertical travel (px). Scale stays exactly 1.
 * Mobile: no vertical parallax (matches Editorial Experience).
 */
const TRAVEL_PX = {
  desktop: 20,
  tablet: 14,
  mobile: 0,
} as const;

const IMAGE_SPRING = {
  stiffness: cardParallax.soloSpring.stiffness,
  damping: 28,
  mass: 0.4,
} as const;

type LargeFeatureProps = {
  image: CaseStudyImage;
  label: string;
};

/**
 * Large Feature / Closing Feature — intrinsic artwork, shared motion.
 *
 * - width 100% / height auto (no absolute fill, no object-fit crop)
 * - scale always 1
 * - desktop/tablet: subtle scroll-linked y
 * - mobile: static (fade/reveal only from page)
 * - frame background matches page so edge travel never shows a foreign band
 */
export function LargeFeature({ image, label }: LargeFeatureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const breakpoint = useBlocksMotionBreakpoint();
  const travel = TRAVEL_PX[breakpoint];
  const motionDisabled = Boolean(shouldReduceMotion);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    motionDisabled || travel === 0 ? [0, 0, 0] : [travel, 0, -travel],
  );

  const y = useSpring(rawY, IMAGE_SPRING);

  const media = (
    <div className="case-study-large-feature__frame relative w-full overflow-hidden">
      <motion.div
        className="case-study-large-feature__parallax w-full"
        style={{
          y: motionDisabled || travel === 0 ? 0 : y,
          willChange:
            motionDisabled || travel === 0 ? undefined : "transform",
        }}
      >
        <ArtDirectedIntrinsicImage
          image={image}
          mobileSrc={image.mobileSrc}
          sizes={FEATURE_SIZES}
        />
      </motion.div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="container case-study-large-feature"
      aria-label={label}
    >
      <figure className="m-0 flex min-w-0 flex-col gap-[18px]">
        {image.zoomable ? (
          <ImageLightbox src={image.src} alt={image.alt}>
            {media}
          </ImageLightbox>
        ) : (
          media
        )}
        {image.caption ? (
          <figcaption className="type-cs-caption">{image.caption}</figcaption>
        ) : null}
      </figure>
    </section>
  );
}
