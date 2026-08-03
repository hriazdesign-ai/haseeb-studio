"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import {
  blocksBiographyMotion,
  blocksStatementMotion,
} from "@/lib/home-parallax-blocks-motion";
import { progressInRange } from "@/lib/motion";

/**
 * Statement + biography with reversible cascade for `/home-parallax-blocks`.
 */
export function BlocksIntroSection() {
  const statementRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { captionY } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);

  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: blocksStatementMotion.offset as unknown as [
      "start end",
      "end start",
    ],
  });

  const statementOpacity = useTransform(statementProgress, (progress) => {
    if (motionDisabled) return 1;
    const [from, to] = blocksStatementMotion.opacity;
    const t = Math.min(1, Math.max(0, progress));
    return from + (to - from) * t;
  });

  const statementY = useTransform(statementProgress, (progress) => {
    if (motionDisabled) return 0;
    const t = Math.min(1, Math.max(0, progress));
    const from = blocksStatementMotion.y * captionY;
    return from + (0 - from) * t;
  });

  const { scrollYProgress: bioProgress } = useScroll({
    target: bioRef,
    offset: blocksBiographyMotion.offset as unknown as [
      "start end",
      "end start",
    ],
  });

  const p1Opacity = useTransform(bioProgress, (progress) => {
    if (motionDisabled) return 1;
    const t = progressInRange(
      progress,
      blocksBiographyMotion.paragraph1.range[0],
      blocksBiographyMotion.paragraph1.range[1],
    );
    const [from, to] = blocksBiographyMotion.paragraph1.opacity;
    return from + (to - from) * t;
  });

  const p1Y = useTransform(bioProgress, (progress) => {
    if (motionDisabled) return 0;
    const t = progressInRange(
      progress,
      blocksBiographyMotion.paragraph1.range[0],
      blocksBiographyMotion.paragraph1.range[1],
    );
    const from = blocksBiographyMotion.paragraph1.y * captionY;
    return from + (0 - from) * t;
  });

  const p2Opacity = useTransform(bioProgress, (progress) => {
    if (motionDisabled) return 1;
    const t = progressInRange(
      progress,
      blocksBiographyMotion.paragraph2.range[0],
      blocksBiographyMotion.paragraph2.range[1],
    );
    const [from, to] = blocksBiographyMotion.paragraph2.opacity;
    return from + (to - from) * t;
  });

  const p2Y = useTransform(bioProgress, (progress) => {
    if (motionDisabled) return 0;
    const t = progressInRange(
      progress,
      blocksBiographyMotion.paragraph2.range[0],
      blocksBiographyMotion.paragraph2.range[1],
    );
    const from = blocksBiographyMotion.paragraph2.y * captionY;
    return from + (0 - from) * t;
  });

  return (
    <section className="hp-intro" aria-labelledby="hp-intro-heading">
      <div className="prototype-page-container hp-intro__inner hp-blocks-editorial">
        <motion.h2
          ref={statementRef}
          id="hp-intro-heading"
          className="hp-intro__quote hp-blocks-editorial__heading"
          style={{
            opacity: motionDisabled ? 1 : statementOpacity,
            y: motionDisabled ? 0 : statementY,
          }}
        >
          Turning complexity into something that feels simple.
        </motion.h2>

        <div
          ref={bioRef}
          className="hp-intro__copy hp-blocks-editorial__body"
        >
          <motion.p
            style={{
              opacity: motionDisabled ? 1 : p1Opacity,
              y: motionDisabled ? 0 : p1Y,
            }}
          >
            I’m a Senior Product Designer with more than twenty years of
            experience designing products, design systems and editorial
            platforms.
          </motion.p>
          <motion.p
            style={{
              opacity: motionDisabled ? 1 : p2Opacity,
              y: motionDisabled ? 0 : p2Y,
            }}
          >
            After sixteen years at Condé Nast, I now work independently, helping
            organisations simplify complex products through thoughtful design.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
