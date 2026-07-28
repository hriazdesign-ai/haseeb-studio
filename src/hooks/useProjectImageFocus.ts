"use client";

import {
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Creates a smooth emphasis value between 0 and 1.
 * 0 = inactive project
 * 1 = active project
 */
export function useProjectImageFocus(
  focus: MotionValue<number>,
  projectIndex: number,
) {
  const rawEmphasis = useTransform(focus, (latest) => {
    const distance = Math.min(Math.abs(latest - projectIndex), 1);

    // Smooth transition between projects.
    const easedDistance = distance * distance * (3 - 2 * distance);

    return 1 - easedDistance;
  });

  const emphasis = useSpring(rawEmphasis, {
    stiffness: 55,
    damping: 22,
    mass: 0.6,
  });

  return { emphasis };
}