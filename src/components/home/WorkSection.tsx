"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
} from "framer-motion";
import { WorkCard } from "@/components/home/WorkCard";
import { useProjectImageFocus } from "@/hooks/useProjectImageFocus";
import type { Project } from "@/lib/projects";

type WorkSectionProps = {
  mumsUnited: Project;
  brightPath: Project;
  meridian: Project;
};

/**
 * Selected Work section with one continuous focus value guiding imagery
 * emphasis from project 1 → 2 → 3. Captions stay fully readable.
 */
export function WorkSection({
  mumsUnited,
  brightPath,
  meridian,
}: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 25%"],
  });

  // Continuous focus: 0 = Mums United, 1 = Bright Path, 2 = Meridian.
  const focus = useTransform(
    scrollYProgress,
    [0, 0.42, 0.86],
    [0, 1, 2],
    { clamp: true },
  );

  const mumsFocus = useProjectImageFocus(focus, 0);
  const brightPathFocus = useProjectImageFocus(focus, 1);
  const meridianFocus = useProjectImageFocus(focus, 2);

  return (
    <section
      ref={sectionRef}
      aria-label="Selected work"
      className="flex flex-col"
      style={{ gap: "var(--work-row-gap)" }}
    >
      <div className="container">
        <WorkCard
          project={mumsUnited}
          priority
          zoomScale={1.24}
          imageEmphasis={mumsFocus.emphasis}
          imageClassName="aspect-[1152/744] min-h-[12rem]"
        />
      </div>

      <div
        className="container grid grid-cols-1 lg:grid-cols-[minmax(0,372px)_minmax(0,1fr)] lg:items-start"
        style={{ gap: "var(--work-col-gap)" }}
      >
        <WorkCard
          project={brightPath}
          zoomScale={1.2}
          imageEmphasis={brightPathFocus.emphasis}
          imageClassName="aspect-[372/240] w-full lg:max-w-[372px]"
        />

        <WorkCard
          project={meridian}
          zoomScale={1.22}
          imageEmphasis={meridianFocus.emphasis}
          imageClassName="aspect-[788/491] w-full"
        />
      </div>
    </section>
  );
}