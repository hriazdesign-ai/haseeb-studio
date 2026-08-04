"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { AnimatedArrow } from "@/components/motion/AnimatedArrow";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import { blocksContactMotion } from "@/lib/home-parallax-blocks-motion";
import { homeParallaxContact } from "@/lib/home-parallax";
import { progressInRange } from "@/lib/motion";

type ContactItem = {
  label: string;
  href: string | null;
};

const items: ContactItem[] = [
  {
    label: "hriaz.design@gmail.com",
    href: homeParallaxContact.mailto,
  },
  {
    label: "LinkedIn",
    href: homeParallaxContact.linkedIn,
  },
  {
    label: "Instagram",
    href: homeParallaxContact.instagram,
  },
  {
    label: "Download CV",
    href: homeParallaxContact.cv,
  },
];

/**
 * Contact section with minimal reversible reveal for `/home-parallax-blocks`.
 * Does not replace the static PrototypeContactSection used by `/home-parallax`.
 */
export function BlocksContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { captionY } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: blocksContactMotion.offset as unknown as [
      "start end",
      "end start",
    ],
  });

  const headingOpacity = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 1;
    const t = progressInRange(
      progress,
      blocksContactMotion.heading.range[0],
      blocksContactMotion.heading.range[1],
    );
    const [from, to] = blocksContactMotion.heading.opacity;
    return from + (to - from) * t;
  });

  const headingY = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 0;
    const t = progressInRange(
      progress,
      blocksContactMotion.heading.range[0],
      blocksContactMotion.heading.range[1],
    );
    const from = blocksContactMotion.heading.y * captionY;
    return from + (0 - from) * t;
  });

  const bodyOpacity = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 1;
    const t = progressInRange(
      progress,
      blocksContactMotion.body.range[0],
      blocksContactMotion.body.range[1],
    );
    const [from, to] = blocksContactMotion.body.opacity;
    return from + (to - from) * t;
  });

  const bodyY = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 0;
    const t = progressInRange(
      progress,
      blocksContactMotion.body.range[0],
      blocksContactMotion.body.range[1],
    );
    const from = blocksContactMotion.body.y * captionY;
    return from + (0 - from) * t;
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="hp-contact"
      aria-labelledby="hp-contact-heading"
    >
      {/* Same rail as Homepage hero: container → portfolio-grid */}
      <div className="prototype-page-container">
        <div className="portfolio-grid portfolio-contact-grid">
          <motion.h2
            id="hp-contact-heading"
            className="hp-contact__title portfolio-contact-heading"
            style={{
              opacity: motionDisabled ? 1 : headingOpacity,
              y: motionDisabled ? 0 : headingY,
            }}
          >
            Let’s build something thoughtful.
          </motion.h2>

          <motion.div
            className="hp-contact__body portfolio-contact-copy"
            style={{
              opacity: motionDisabled ? 1 : bodyOpacity,
              y: motionDisabled ? 0 : bodyY,
            }}
          >
            <p className="hp-contact__copy">
              Whether you’re building a product, evolving a design system or
              creating a new digital experience, I’d love to hear about it.
            </p>
            <p className="hp-contact__label">Start a conversation:</p>

            <ul className="hp-contact__links">
              {items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}{" "}
                      <AnimatedArrow kind="inline" />
                    </a>
                  ) : (
                    <span aria-disabled="true" title="Link not available yet">
                      {item.label}{" "}
                      <AnimatedArrow kind="inline" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
