"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArtDirectedFillImage } from "@/components/case-study/ArtDirectedFillImage";
import { ArtDirectedIntrinsicImage } from "@/components/case-study/ArtDirectedIntrinsicImage";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import { ART_DIRECTION_MOBILE_MAX_PX } from "@/lib/case-studies/breakpoints";
import {
  blocksScrollOffset,
  caseStudyHeroMotion,
  resolveScaleKeyframes,
} from "@/lib/home-parallax-blocks-motion";
import { progressInRange } from "@/lib/motion";
import type { CaseStudyImage } from "@/lib/case-studies";

type CaseStudyHeroMediaProps = {
  image: CaseStudyImage;
};

function useIsArtDirectionMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      `(max-width: ${ART_DIRECTION_MOBILE_MAX_PX}px)`,
    );
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/**
 * Full-bleed case-study hero media — shared across portfolio case studies.
 *
 * Desktop / tablet: fixed frame + scroll-linked y + subtle scale.
 * Mobile: intrinsic picture/img (width 100%, height auto) — no fill frame,
 * object-fit, scale, or overscan, so the wrapper matches the artwork.
 */
export function CaseStudyHeroMedia({ image }: CaseStudyHeroMediaProps) {
  const config = caseStudyHeroMotion;
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { breakpoint, internalTravel, scaleStrength } =
    useBlocksMotionMultipliers();
  const isMobile = useIsArtDirectionMobile();
  const motionDisabled = Boolean(shouldReduceMotion);
  const objectPosition = image.objectPosition ?? "center";
  const mobileObjectPosition =
    image.mobileObjectPosition ?? image.objectPosition ?? "center";

  const overscan =
    breakpoint === "desktop"
      ? config.overscan
      : Math.ceil(
          Math.max(Math.abs(config.imageY.from), Math.abs(config.imageY.to)) *
            internalTravel,
        );

  const { scrollYProgress: frameProgress } = useScroll({
    target: frameRef,
    offset: blocksScrollOffset.mumsFrame as unknown as [
      "start end",
      "end start",
    ],
  });

  const imageY = useTransform(frameProgress, (progress) => {
    if (motionDisabled || isMobile) return 0;
    const from = config.imageY.from * internalTravel;
    const to = config.imageY.to * internalTravel;
    return from + (to - from) * progress;
  });

  const imageScale = useTransform(frameProgress, (progress) => {
    if (motionDisabled || isMobile) return 1;
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

  const shellStyle = {
    "--case-study-hero-object-position": objectPosition,
    "--case-study-hero-mobile-object-position": mobileObjectPosition,
  } as CSSProperties;

  /* Mobile: normal-flow image — height comes from the bitmap only. */
  if (isMobile) {
    return (
      <div
        className="case-study-hero-media case-study-hero-media--intrinsic hp-blocks-mums-full-bleed"
        style={shellStyle}
      >
        <ArtDirectedIntrinsicImage
          image={image}
          mobileSrc={image.mobileSrc}
          sizes="100vw"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className="case-study-hero-media hp-blocks-mums-full-bleed"
      style={shellStyle}
    >
      <div
        ref={frameRef}
        className="homepage-parallax-frame hp-blocks-mums-frame"
      >
        <motion.div
          className="hp-blocks-mums-y"
          style={{
            top: -overscan,
            bottom: -overscan,
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
              <ArtDirectedFillImage
                src={image.src}
                mobileSrc={image.mobileSrc}
                alt={image.alt}
                sizes="100vw"
                priority
                objectFit="cover"
                className="case-study-hero-media__image"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
