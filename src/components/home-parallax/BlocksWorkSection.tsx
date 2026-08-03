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
import { ScrollProjectReveal } from "@/components/motion/ScrollProjectReveal";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import {
  blocksProjectMotion,
  blocksScrollOffset,
  resolveScaleKeyframes,
} from "@/lib/home-parallax-blocks-motion";
import type { HomeParallaxProject } from "@/lib/home-parallax";

type BlocksWorkSectionProps = {
  mumsUnited: HomeParallaxProject;
  brightPath: HomeParallaxProject;
  meridian: HomeParallaxProject;
};

/** Strip trailing Unicode arrows so we render a single shared contact-style arrow. */
function plainCaption(caption: string) {
  return caption.replace(/\s*↗\s*$/u, "").trimEnd();
}

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
 * Caption-local fade-and-rise with the same Unicode ↗ used in the contact links.
 * Hover opacity is CSS-only and separate from this scroll MotionValue.
 */
function ProjectCaption({ children }: { children: string }) {
  const captionRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);

  const { scrollYProgress: captionProgress } = useScroll({
    target: captionRef,
    offset: ["start 94%", "start 68%"],
  });

  const captionOpacity = useTransform(captionProgress, [0, 1], [0, 1]);
  const captionY = useTransform(captionProgress, [0, 1], [28, 0]);

  return (
    <motion.p
      ref={captionRef}
      className="hp-project__caption"
      style={{
        opacity: reducedMotion ? 1 : captionOpacity,
        y: reducedMotion ? 0 : captionY,
      }}
    >
      <span className="hp-project__caption-text">{children}</span>
      <span className="hp-project__caption-arrow" aria-hidden="true">
        ↗
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

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start 96%", "start 74%"],
  });

  const ctaOpacity = useTransform(ctaProgress, [0, 1], [0, 1]);
  const ctaY = useTransform(ctaProgress, [0, 1], [18, 0]);
  const ctaScale = useTransform(ctaProgress, [0, 1], [0.97, 1]);

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
        <Link href="/work" className="hp-work__cta">
          <span className="hp-work__cta-label">Browse all work</span>
          <span className="hp-work__cta-arrow-wrap">
            <span className="hp-work__cta-arrow" aria-hidden="true">
              →
            </span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

/**
 * Mums United — layout-static article.
 * Frame clips; y + scale live on separate inner layers only.
 */
function MumsUnitedProject({ project }: { project: HomeParallaxProject }) {
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
    <article className="hp-project-block">
      <Link
        href={project.href}
        className={`hp-project hp-project--${project.layout}`}
        aria-label={project.name}
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
      </Link>
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
    <Link
      href={project.href}
      className={`hp-project hp-project--${project.layout}`}
      aria-label={project.name}
    >
      <BlockProjectMedia project={project} imageScale={imageStyle.scale} />
      <ProjectCaption>{plainCaption(project.caption)}</ProjectCaption>
    </Link>
  );
}

/**
 * Hybrid work section for `/home-parallax-blocks`:
 * - Mums: static article + overscanned inner y + inner scale
 * - Bright Path / Meridian: article translateY + fixed frame + oversized scale layer
 */
export function BlocksWorkSection({
  mumsUnited,
  brightPath,
  meridian,
}: BlocksWorkSectionProps) {
  const bright = blocksProjectMotion.brightPath;
  const merid = blocksProjectMotion.meridian;

  return (
    <section className="hp-work hp-work--blocks" aria-label="Selected work">
      <MumsUnitedProject project={mumsUnited} />

      <div className="prototype-page-container hp-work__constrained">
        <div className="hp-work__pair">
          <ScrollProjectReveal
            config={bright}
            layoutOffsetClassName="hp-project-block__layout-offset hp-project-block__layout-offset--bright-path"
          >
            {({ imageStyle }) => (
              <BlockProjectLink project={brightPath} imageStyle={imageStyle} />
            )}
          </ScrollProjectReveal>

          <ScrollProjectReveal config={merid}>
            {({ imageStyle }) => (
              <BlockProjectLink project={meridian} imageStyle={imageStyle} />
            )}
          </ScrollProjectReveal>
        </div>

        <BlocksWorkCta />
      </div>
    </section>
  );
}
