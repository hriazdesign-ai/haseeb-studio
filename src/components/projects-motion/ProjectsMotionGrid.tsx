"use client";

import { WorkMotionPair } from "@/components/work-motion/WorkMotionPair";
import { WorkMotionProject } from "@/components/work-motion/WorkMotionProject";
import { projectsMotionItems } from "@/lib/projects-motion";

/**
 * Projects body — Figma 709:4223 order and 12-column spans.
 * Reuses WorkMotionProject / WorkMotionPair for approved motion.
 */
export function ProjectsMotionGrid() {
  const { onenav, editorial, brightPath, mumsUnited, verso, meridian } =
    projectsMotionItems;

  return (
    <div className="projects-motion-grid">
      {/* OneNav — full 12 columns */}
      <div className="projects-motion-container">
        <div className="projects-desktop-grid">
          <div className="projects-col projects-col--1-13">
            <WorkMotionProject item={onenav} priority />
          </div>
        </div>
      </div>

      {/* Editorial + Bright Path — left-aligned square pair (cols 1–8) */}
      <div className="projects-motion-container">
        <div className="projects-desktop-grid">
          <div className="projects-col projects-col--1-9">
            <WorkMotionPair
              kind="square"
              left={editorial}
              right={brightPath}
              className="projects-square-pair"
            />
          </div>
        </div>
      </div>

      {/* Mums + Verso — equal landscape pair */}
      <div className="projects-motion-container">
        <WorkMotionPair
          kind="landscape"
          left={mumsUnited}
          right={verso}
          className="projects-landscape-pair"
        />
      </div>

      {/* Meridian — offset right (cols 5–12) */}
      <div className="projects-motion-container">
        <div className="projects-desktop-grid">
          <div className="projects-col projects-col--5-13">
            <WorkMotionProject item={meridian} />
          </div>
        </div>
      </div>
    </div>
  );
}
