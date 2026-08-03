"use client";

import { useRef, type CSSProperties } from "react";
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
  workMotionPresets,
  workProjectParallaxSpring,
  workProjectScrollOffset,
  type WorkMotionItem,
} from "@/lib/work-motion";

const MotionLink = motion.create(Link);

function ProjectCaption({ children }: { children: string }) {
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
      <AnimatedArrow className="work-project__caption-arrow" kind="caption">
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
  const projectRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { breakpoint, scaleStrength } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);
  const preset = workMotionPresets[item.preset];
  const blockRange = preset.blockY;

  /** Solo projects only — pairs use shared pair scroll for card y. */
  const { scrollYProgress: soloProgress } = useScroll({
    target: projectRef,
    offset: workProjectScrollOffset as unknown as ["start 95%", "end 10%"],
  });

  /** Image scale tracks the fixed frame (independent of whole-card y). */
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

  const travelRef = useRef({ fromY, toY, motionDisabled, isPaired });
  travelRef.current = { fromY, toY, motionDisabled, isPaired };

  const soloRawY = useTransform(soloProgress, (progress) => {
    const travel = travelRef.current;
    if (travel.motionDisabled || travel.isPaired) return 0;
    return travel.fromY + (travel.toY - travel.fromY) * progress;
  });

  const soloY = useSpring(soloRawY, workProjectParallaxSpring);
  const wholeCardY = isPaired ? cardY : soloY;

  const imageScale = useTransform(frameProgress, (progress) => {
    if (motionDisabled) return 1;
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

  return (
    <article className="work-project-grid-item work-motion-pair__item">
      <motion.div
        ref={projectRef}
        className="work-project-parallax"
        style={{
          y: motionDisabled ? 0 : wholeCardY,
          willChange: motionDisabled ? undefined : "transform",
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
          {...animatedArrowLinkProps}
        >
          <div ref={frameRef} className={frameClass}>
            <motion.div
              className="work-media-scale"
              style={{
                scale: (motionDisabled ? 1 : imageScale) as
                  | number
                  | MotionValue<number>,
                transformOrigin: "center center",
              }}
            >
              <div className="work-media-hover">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  priority={priority}
                  sizes={sizesForRole(item.role)}
                />
              </div>
            </motion.div>
          </div>

          <ProjectCaption>{item.caption}</ProjectCaption>
        </MotionLink>
      </motion.div>
    </article>
  );
}
