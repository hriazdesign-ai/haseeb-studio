"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  AnimatedArrow,
  animatedArrowLinkProps,
} from "@/components/motion/AnimatedArrow";
import { ScrollProjectReveal } from "@/components/motion/ScrollProjectReveal";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import {
  blocksProjectMotion,
  blocksScrollOffset,
  resolveScaleKeyframes,
} from "@/lib/home-parallax-blocks-motion";
import type { HomeParallaxProject } from "@/lib/home-parallax";
import { progressInRange, sectionReveal } from "@/lib/motion";

const MotionLink = motion.create(Link);

type BlocksWorkSectionProps = {
  featured: HomeParallaxProject;
  secondary: HomeParallaxProject;
  primary: HomeParallaxProject;
};

/** Strip trailing Unicode arrows so we render a single shared contact-style arrow. */
function plainCaption(caption: string) {
  return caption.replace(/\s*↗\s*$/u, "").trimEnd();
}

/**
 * Caption-local fade-and-rise with the same Unicode ↗ used in the contact links.
 * Hover opacity is CSS-only and separate from this scroll MotionValue.
 * Last word + arrow share a nowrap glue so the arrow never wraps alone.
 */
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
    [sectionReveal.homeCaptionY, 0],
  );

  const text = children.trimEnd();
  const lastSpace = text.lastIndexOf(" ");
  const head = lastSpace === -1 ? "" : text.slice(0, lastSpace + 1);
  const lastWord = lastSpace === -1 ? text : text.slice(lastSpace + 1);

  return (
    <motion.p
      ref={captionRef}
      className="hp-project__caption"
      style={{
        opacity: reducedMotion ? 1 : captionOpacity,
        y: reducedMotion ? 0 : captionY,
      }}
    >
      {head}
      <span className="hp-project__caption-end">
        {lastWord}
        <AnimatedArrow className="hp-project__caption-arrow" kind="caption">
          ↗
        </AnimatedArrow>
      </span>
    </motion.p>
  );
}

/**
 * CTA with its own scroll target so it completes while still low in the viewport.
 */
function BlocksWorkCta() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);
  const { cta } = sectionReveal;

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: [...cta.offset],
  });

  const ctaOpacity = useTransform(ctaProgress, [0, 1], [...cta.opacity]);
  const ctaY = useTransform(ctaProgress, [0, 1], [cta.y, 0]);
  const ctaScale = useTransform(ctaProgress, [0, 1], [...cta.scale]);

  return (
    <div className="hp-work__cta-wrap">
      <motion.div
        ref={ctaRef}
        style={{
          opacity: reducedMotion ? 1 : ctaOpacity,
          y: reducedMotion ? 0 : ctaY,
          scale: reducedMotion ? 1 : ctaScale,
          transformOrigin: "center center",
        }}
      >
        <MotionLink
          href="/work"
          className="hp-work__cta"
          {...animatedArrowLinkProps}
        >
          <span className="hp-work__cta-label">Browse all work</span>
          <span className="hp-work__cta-arrow-wrap">
            <AnimatedArrow className="hp-work__cta-arrow" kind="cta">
              →
            </AnimatedArrow>
          </span>
        </MotionLink>
      </motion.div>
    </div>
  );
}

/**
 * Large featured homepage slot — layout-static article.
 * Frame clips; y + scale live on separate inner layers only.
 */
function FeaturedHomepageProject({
  project,
}: {
  project: HomeParallaxProject;
}) {
  const config = blocksProjectMotion.featured;
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
    <article className="hp-project-block">
      <MotionLink
        href={project.href}
        className={`hp-project hp-project--${project.layout}`}
        aria-label={project.name}
        {...animatedArrowLinkProps}
      >
        {/* Full-bleed media — outside the 1440px content container */}
        <div className="hp-blocks-mums-full-bleed">
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
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: config.objectPosition }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="prototype-page-container">
          <ProjectCaption>{plainCaption(project.caption)}</ProjectCaption>
        </div>
      </MotionLink>
    </article>
  );
}

function BlockProjectMedia({
  project,
  imageScale,
}: {
  project: HomeParallaxProject;
  imageScale: MotionValue<number> | number;
}) {
  return (
    <div className="homepage-parallax-frame hp-blocks-media-frame">
      <motion.div
        className="hp-blocks-media-scale"
        style={{
          scale: imageScale,
          transformOrigin: "center center",
        }}
      >
        <div className="hp-blocks-hover-scale">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: project.objectPosition }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function BlockProjectLink({
  project,
  imageStyle,
}: {
  project: HomeParallaxProject;
  imageStyle: { scale: MotionValue<number> | number };
}) {
  return (
    <MotionLink
      href={project.href}
      className={`hp-project hp-project--${project.layout}`}
      aria-label={project.name}
      {...animatedArrowLinkProps}
    >
      <BlockProjectMedia project={project} imageScale={imageStyle.scale} />
      <ProjectCaption>{plainCaption(project.caption)}</ProjectCaption>
    </MotionLink>
  );
}

/**
 * Hybrid work section for `/home-parallax-blocks`:
 * - Featured: static article + overscanned inner y + inner scale
 * - Secondary / primary pair: article translateY + fixed frame + oversized scale layer
 *
 * Motion configs are slot-scoped (`featured` / `secondary` / `primary`).
 */
export function BlocksWorkSection({
  featured,
  secondary,
  primary,
}: BlocksWorkSectionProps) {
  const secondaryMotion = blocksProjectMotion.secondary;
  const primaryMotion = blocksProjectMotion.primary;

  return (
    <section className="hp-work hp-work--blocks" aria-label="Selected work">
      <FeaturedHomepageProject project={featured} />

      <div className="prototype-page-container hp-work__constrained">
        <div className="hp-work__pair">
          <ScrollProjectReveal
            config={secondaryMotion}
            layoutOffsetClassName="hp-project-block__layout-offset hp-project-block__layout-offset--secondary"
          >
            {({ imageStyle }) => (
              <BlockProjectLink project={secondary} imageStyle={imageStyle} />
            )}
          </ScrollProjectReveal>

          <ScrollProjectReveal config={primaryMotion}>
            {({ imageStyle }) => (
              <BlockProjectLink project={primary} imageStyle={imageStyle} />
            )}
          </ScrollProjectReveal>
        </div>

        <BlocksWorkCta />
      </div>
    </section>
  );
}
