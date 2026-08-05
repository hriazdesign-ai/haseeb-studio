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
 * Vertical travel (px) of the image inside the frame.
 * Overscan comes only from the slight scale — not negative insets.
 */
const TRAVEL_PX = {
  desktop: 20,
  tablet: 14,
  mobile: 8,
} as const;

/**
 * Scale provides overscan so translateY never reveals empty space.
 * Kept within 104–106%; sized so overscan ≥ travel at each breakpoint.
 */
const SCALE = {
  desktop: 1.06,
  tablet: 1.05,
  mobile: 1.06,
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
 * Large Feature — layout height follows the natural 6∶4 image.
 *
 * Structure:
 *   frame  — overflow hidden; height from the in-flow image only
 *   visual — transform-only (scale/y); does not affect layout height
 *   image  — width 100%, height auto
 *   caption — design-system gap below the frame
 */
export function LargeFeature({ image, label }: LargeFeatureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const breakpoint = useBlocksMotionBreakpoint();
  const travel = TRAVEL_PX[breakpoint];
  const scale = SCALE[breakpoint];
  const motionDisabled = Boolean(shouldReduceMotion);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /**
   * Entering → +travel; mid-viewport → centre (0); leaving → −travel.
   * Spring eases the mapping for a premium, non-linear feel.
   */
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    motionDisabled ? [0, 0, 0] : [travel, 0, -travel],
  );

  const y = useSpring(rawY, IMAGE_SPRING);

  const media = (
    <div className="case-study-large-feature__frame relative w-full overflow-hidden">
      <motion.div
        className="w-full"
        style={{
          y: motionDisabled ? 0 : y,
          scale: motionDisabled ? 1 : scale,
          transformOrigin: "center center",
          willChange: motionDisabled ? undefined : "transform",
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
