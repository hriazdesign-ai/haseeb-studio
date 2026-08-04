"use client";

import { WorkMotionPair } from "@/components/work-motion/WorkMotionPair";
import { WorkMotionProject } from "@/components/work-motion/WorkMotionProject";
import { projectsMotionItems } from "@/lib/projects-motion";

/**
 * Projects body — Figma 709:4223 order and 12-column spans.
 * Reuses WorkMotionProject / WorkMotionPair for approved motion.
 */
export function ProjectsMotionGrid() {
  const { verso, editorial, onenav, mumsUnited, brightPath, meridian } =
    projectsMotionItems;

  return (
    <div className="projects-motion-grid">
      {/* Verso — full 12 columns */}
      <div className="projects-motion-container">
        <div className="projects-desktop-grid">
          <div className="projects-col projects-col--1-13">
            <WorkMotionProject item={verso} priority />
          </div>
        </div>
      </div>

      {/* Editorial + OneNav — left-aligned square pair (cols 1–8) */}
      <div className="projects-motion-container">
        <div className="projects-desktop-grid">
          <div className="projects-col projects-col--1-9">
            <WorkMotionPair
              kind="square"
              left={editorial}
              right={onenav}
              className="projects-square-pair"
            />
          </div>
        </div>
      </div>

      {/* Mums + Bright Path — equal landscape pair */}
      <div className="projects-motion-container">
        <WorkMotionPair
          kind="landscape"
          left={mumsUnited}
          right={brightPath}
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
