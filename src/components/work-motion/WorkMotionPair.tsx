"use client";

import { useEffect, useRef, useState } from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { WorkMotionProject } from "@/components/work-motion/WorkMotionProject";
import {
  workPairAlignMotion,
  type WorkMotionItem,
  type WorkPairKind,
  type WorkPairYStages,
} from "@/lib/work-motion";

const DESKTOP_MIN = 1024;
const TABLET_MIN = 768;

type PairBreakpoint = "desktop" | "tablet" | "mobileSideBySide" | "stacked";

function usePairBreakpoint(kind: WorkPairKind): PairBreakpoint {
  const [bp, setBp] = useState<PairBreakpoint>("desktop");

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (
        kind === "landscape" &&
        width <= workPairAlignMotion.landscapeStackMaxPx
      ) {
        setBp("stacked");
        return;
      }
      if (width >= DESKTOP_MIN) {
        setBp("desktop");
        return;
      }
      if (width >= TABLET_MIN) {
        setBp("tablet");
        return;
      }
      setBp("mobileSideBySide");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [kind]);

  return bp;
}

function resolveStages(
  kind: WorkPairKind,
  bp: PairBreakpoint,
): { left: WorkPairYStages; right: WorkPairYStages; progress: readonly number[] } | null {
  if (bp === "stacked") return null;
  const pair = workPairAlignMotion.pairs[kind];
  return {
    left: pair[bp].left,
    right: pair[bp].right,
    progress: pair.progress,
  };
}

/** Piecewise-linear interpolate across N progress stops / y keyframes. */
function sampleStages(
  progress: number,
  stops: readonly number[],
  values: WorkPairYStages,
): number {
  if (progress <= stops[0]) return values[0];
  const last = stops.length - 1;
  if (progress >= stops[last]) return values[last];

  for (let i = 0; i < last; i += 1) {
    const p0 = stops[i];
    const p1 = stops[i + 1];
    if (progress <= p1) {
      const t = (progress - p0) / (p1 - p0);
      return values[i] + (values[i + 1] - values[i]) * t;
    }
  }

  return values[last];
}

type WorkMotionPairProps = {
  kind: WorkPairKind;
  left: WorkMotionItem;
  right: WorkMotionItem;
  className?: string;
};

/**
 * One shared scroll progress drives both cards.
 * Square: 3-stage. Landscape (Brand/Delivery): 4-stage with aligned hold.
 */
export function WorkMotionPair({
  kind,
  left,
  right,
  className,
}: WorkMotionPairProps) {
  const pairRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const motionDisabled = Boolean(shouldReduceMotion);
  const breakpoint = usePairBreakpoint(kind);
  const stages = resolveStages(kind, breakpoint);

  const { scrollYProgress } = useScroll({
    target: pairRef,
    offset: workPairAlignMotion.offset as unknown as [
      "start 95%",
      "end 20%",
    ],
  });

  const stagesRef = useRef({ stages, motionDisabled });
  stagesRef.current = { stages, motionDisabled };

  const leftRawY = useTransform(scrollYProgress, (progress) => {
    const current = stagesRef.current;
    if (current.motionDisabled || !current.stages) return 0;
    return sampleStages(
      progress,
      current.stages.progress,
      current.stages.left,
    );
  });

  const rightRawY = useTransform(scrollYProgress, (progress) => {
    const current = stagesRef.current;
    if (current.motionDisabled || !current.stages) return 0;
    return sampleStages(
      progress,
      current.stages.progress,
      current.stages.right,
    );
  });

  const leftY = useSpring(leftRawY, workPairAlignMotion.spring);
  const rightY = useSpring(rightRawY, workPairAlignMotion.spring);

  const layoutClass =
    kind === "square"
      ? "work-motion-pair work-square-pair"
      : "work-motion-pair work-row work-row--landscape-pair";

  return (
    <section
      ref={pairRef}
      className={[layoutClass, className].filter(Boolean).join(" ")}
    >
      <WorkMotionProject item={left} cardY={leftY} />
      <WorkMotionProject item={right} cardY={rightY} />
    </section>
  );
}
