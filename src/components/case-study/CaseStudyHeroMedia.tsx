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
import { useBlocksMotionBreakpoint } from "@/components/motion/useBlocksMotionBreakpoint";
import { ART_DIRECTION_MOBILE_MAX_PX } from "@/lib/case-studies/breakpoints";
import {
  blocksScrollOffset,
  caseStudyHeroMotion,
} from "@/lib/home-parallax-blocks-motion";
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
 * Desktop / tablet: fixed frame + scroll-linked y only (scale = 1).
 * Mobile: intrinsic picture/img — no fill frame, scale, or vertical parallax.
 */
export function CaseStudyHeroMedia({ image }: CaseStudyHeroMediaProps) {
  const config = caseStudyHeroMotion;
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const breakpoint = useBlocksMotionBreakpoint();
  const isMobile = useIsArtDirectionMobile();
  const motionDisabled = Boolean(shouldReduceMotion);
  const objectPosition = image.objectPosition ?? "center";
  const mobileObjectPosition =
    image.mobileObjectPosition ?? image.objectPosition ?? "center";

  /*
   * Explicit travel — scale stays 1.
   * Desktop ±24px, tablet ±14px, mobile / reduced-motion: 0.
   */
  const yFrom =
    motionDisabled || isMobile
      ? 0
      : breakpoint === "tablet"
        ? config.tabletImageY.from
        : config.imageY.from;
  const yTo =
    motionDisabled || isMobile
      ? 0
      : breakpoint === "tablet"
        ? config.tabletImageY.to
        : config.imageY.to;

  const overscan =
    motionDisabled || isMobile
      ? 0
      : breakpoint === "tablet"
        ? config.tabletOverscan
        : config.overscan;

  const { scrollYProgress: frameProgress } = useScroll({
    target: frameRef,
    offset: blocksScrollOffset.mumsFrame as unknown as [
      "start end",
      "end start",
    ],
  });

  /* Array form keeps the MotionValue live; avoid forcing `y: 0` in style. */
  const imageY = useTransform(frameProgress, [0, 1], [yFrom, yTo]);

  const shellStyle = {
    "--case-study-hero-object-position": objectPosition,
    "--case-study-hero-mobile-object-position": mobileObjectPosition,
  } as CSSProperties;

  /* Mobile: normal-flow image — height from the bitmap; no parallax / scale. */
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
        {/* Static overscan shell — extends the image area past the clip. */}
        <div
          className="hp-blocks-mums-y"
          style={{
            top: -overscan,
            bottom: -overscan,
          }}
        >
          {/*
            Scroll-linked y lives here on the image fill layer.
            Scale stays 1 — no nested scale transforms.
          */}
          <motion.div
            className="case-study-hero-media__parallax"
            style={{ y: imageY }}
          >
            <ArtDirectedFillImage
              src={image.src}
              mobileSrc={image.mobileSrc}
              alt={image.alt}
              sizes="100vw"
              priority
              objectFit="cover"
              className="case-study-hero-media__image"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
