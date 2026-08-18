"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  AnimatedArrow,
  animatedArrowLinkProps,
} from "@/components/motion/AnimatedArrow";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import { resolveScaleKeyframes } from "@/lib/home-parallax-blocks-motion";
import { progressInRange, sectionReveal } from "@/lib/motion";
import {
  featureLandscapeImageParallax,
  isSmallWorkMotionRole,
  workMotionPresets,
  workProjectParallaxSpring,
  workProjectScrollOffset,
  type WorkMotionItem,
} from "@/lib/work-motion";

const MotionLink = motion.create(Link);

/**
 * Small cards prefer `smallSrc` when the PNG exists; otherwise keep `src`.
 * Starts on `src` (never broken), upgrades after a successful probe.
 * Remount via `key` when the project image identity changes.
 */
function WorkCardMediaImage({
  image,
  preferSmall,
  priority,
  sizes,
}: {
  image: WorkMotionItem["image"];
  preferSmall: boolean;
  priority: boolean;
  sizes: string;
}) {
  const fallbackSrc = image.src;
  const smallSrc = preferSmall ? image.smallSrc : undefined;
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
    if (!smallSrc || smallSrc === fallbackSrc) return;

    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setSrc(smallSrc);
    };
    probe.onerror = () => {
      /* keep fallback — configured path not exported yet */
    };
    probe.src = smallSrc;

    return () => {
      cancelled = true;
    };
  }, [smallSrc, fallbackSrc]);

  return (
    <Image
      src={src}
      alt={image.alt}
      fill
      priority={priority}
      sizes={sizes}
      onError={() => {
        if (src !== fallbackSrc) setSrc(fallbackSrc);
      }}
    />
  );
}

function ProjectCaption({
  children,
  staticArrow,
}: {
  children: string;
  staticArrow: boolean;
}) {
  const captionRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);

  const { scrollYProgress: captionProgress } = useScroll({
    target: captionRef,
    offset: [...sectionReveal.captionOffset],
  });

  const captionOpacity = useTransform(
    captionProgress,
    [0, 1],
    [...sectionReveal.captionOpacity],
  );
  const captionY = useTransform(
    captionProgress,
    [0, 1],
    [sectionReveal.workCaptionY, 0],
  );

  return (
    <motion.p
      ref={captionRef}
      className="work-project__caption"
      style={{
        opacity: reducedMotion ? 1 : captionOpacity,
        y: reducedMotion ? 0 : captionY,
      }}
    >
      <span className="work-project__caption-text">{children}</span>
      <AnimatedArrow
        className="work-project__caption-arrow"
        kind={staticArrow ? "inline" : "caption"}
      >
        ↗
      </AnimatedArrow>
    </motion.p>
  );
}

function mediaRoleClass(role: WorkMotionItem["role"]): string {
  switch (role) {
    case "feature-landscape":
      return "work-media--feature-landscape";
    case "offset-landscape":
      return "work-media--offset-landscape";
    case "offset-square":
      return "work-media--offset-square";
    case "square-pair":
      return "work-media--square-pair";
    case "pair-landscape":
      return "work-media--pair-landscape";
    default:
      return "work-media--feature-landscape";
  }
}

function sizesForRole(role: WorkMotionItem["role"]): string {
  switch (role) {
    case "feature-landscape":
      return "(max-width: 1023px) 100vw, min(1440px, 100vw)";
    case "offset-landscape":
      return "(max-width: 1023px) 100vw, 50vw";
    case "offset-square":
      return "(max-width: 1023px) 100vw, 65vw";
    case "square-pair":
      return "(max-width: 1023px) 50vw, 28vw";
    case "pair-landscape":
      return "(max-width: 1023px) 100vw, 50vw";
    default:
      return "100vw";
  }
}

type WorkMotionProjectProps = {
  item: WorkMotionItem;
  priority?: boolean;
  /**
   * Shared pair whole-card y from WorkMotionPair.
   * When set, this project does not create its own card-level useScroll.
   */
  cardY?: MotionValue<number>;
};

export function WorkMotionProject({
  item,
  priority = false,
  cardY,
}: WorkMotionProjectProps) {
  const isPaired = cardY !== undefined;
  /** Featured slot: image pans inside a fixed frame; card/frame never translate. */
  const isFeatureLandscapeParallax = item.role === "feature-landscape";
  const projectRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { breakpoint, scaleStrength } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);
  const staticArrow = breakpoint === "mobile";
  const preset = workMotionPresets[item.preset];
  const blockRange = preset.blockY;

  /** Solo projects only — pairs use shared pair scroll for card y. */
  const { scrollYProgress: soloProgress } = useScroll({
    target: projectRef,
    offset: workProjectScrollOffset as unknown as ["start 95%", "end 10%"],
  });

  /** Frame-linked scroll for image scale (other cards) / featured image y. */
  const { scrollYProgress: frameProgress } = useScroll({
    target: frameRef,
    offset: ["start 95%", "end 10%"],
  });

  const fromY =
    breakpoint === "mobile"
      ? 20
      : breakpoint === "tablet"
        ? blockRange.from * 0.6
        : blockRange.from;
  const toY =
    breakpoint === "mobile"
      ? -20
      : breakpoint === "tablet"
        ? blockRange.to * 0.6
        : blockRange.to;

  const travelRef = useRef({
    fromY,
    toY,
    motionDisabled,
    isPaired,
    isFeatureLandscapeParallax,
  });

  const featureRange =
    breakpoint === "mobile"
      ? featureLandscapeImageParallax.mobile
      : breakpoint === "tablet"
        ? featureLandscapeImageParallax.tablet
        : featureLandscapeImageParallax.desktop;

  const featureTravelRef = useRef({
    from: featureRange.from,
    to: featureRange.to,
    motionDisabled,
    active: isFeatureLandscapeParallax,
  });

  useEffect(() => {
    travelRef.current = {
      fromY,
      toY,
      motionDisabled,
      isPaired,
      isFeatureLandscapeParallax,
    };
    featureTravelRef.current = {
      from: featureRange.from,
      to: featureRange.to,
      motionDisabled,
      active: isFeatureLandscapeParallax,
    };
  }, [
    fromY,
    toY,
    motionDisabled,
    isPaired,
    isFeatureLandscapeParallax,
    featureRange.from,
    featureRange.to,
  ]);

  const soloRawY = useTransform(soloProgress, (progress) => {
    const travel = travelRef.current;
    if (
      travel.motionDisabled ||
      travel.isPaired ||
      travel.isFeatureLandscapeParallax
    ) {
      return 0;
    }
    return travel.fromY + (travel.toY - travel.fromY) * progress;
  });

  const soloY = useSpring(soloRawY, workProjectParallaxSpring);
  const wholeCardY = isPaired ? cardY : soloY;

  const featureImageRawY = useTransform(frameProgress, (progress) => {
    const travel = featureTravelRef.current;
    if (travel.motionDisabled || !travel.active) return 0;
    return travel.from + (travel.to - travel.from) * progress;
  });
  const featureImageY = useSpring(featureImageRawY, workProjectParallaxSpring);

  const imageScale = useTransform(frameProgress, (progress) => {
    if (motionDisabled || isFeatureLandscapeParallax) return 1;
    const [a, b, c] = resolveScaleKeyframes(
      preset.imageScale.keyframes,
      scaleStrength,
    );
    const [s0, s1, s2] = preset.imageScale.stops;

    if (progress <= s0) return a;
    if (progress >= s2) return c;
    if (progress <= s1) {
      const t = progressInRange(progress, s0, s1);
      return a + (b - a) * t;
    }
    const t = progressInRange(progress, s1, s2);
    return b + (c - b) * t;
  });

  const frameClass = ["work-media-frame", mediaRoleClass(item.role)].join(" ");
  const preferSmall = isSmallWorkMotionRole(item.role);

  return (
    <article className="work-project-grid-item work-motion-pair__item">
      <motion.div
        ref={projectRef}
        className="work-project-parallax"
        style={{
          // Featured: card stays put. Other solo cards keep whole-card y.
          y:
            motionDisabled || isFeatureLandscapeParallax
              ? 0
              : wholeCardY,
          willChange:
            motionDisabled || isFeatureLandscapeParallax
              ? undefined
              : "transform",
        }}
      >
        <MotionLink
          href={item.href}
          className="work-project"
          aria-label={item.caption}
          style={
            {
              "--work-object-position": item.objectPosition,
              "--work-mobile-object-position": item.mobileObjectPosition,
            } as CSSProperties
          }
          {...(staticArrow ? {} : animatedArrowLinkProps)}
        >
          <div ref={frameRef} className={frameClass}>
            <motion.div
              className="work-media-scale"
              style={
                isFeatureLandscapeParallax
                  ? {
                      // Same frame box as CSS `inset: 0` — no taller overscan.
                      y: motionDisabled ? 0 : featureImageY,
                      scale: 1,
                      transformOrigin: "center center",
                    }
                  : {
                      scale: (motionDisabled ? 1 : imageScale) as
                        | number
                        | MotionValue<number>,
                      transformOrigin: "center center",
                    }
              }
            >
              <div className="work-media-hover">
                <WorkCardMediaImage
                  key={`${item.id}:${item.image.src}:${item.image.smallSrc ?? ""}:${preferSmall}`}
                  image={item.image}
                  preferSmall={preferSmall}
                  priority={priority}
                  sizes={sizesForRole(item.role)}
                />
              </div>
            </motion.div>
          </div>

          <ProjectCaption staticArrow={staticArrow}>{item.caption}</ProjectCaption>
        </MotionLink>
      </motion.div>
    </article>
  );
}
