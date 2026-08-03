"use client";

import { WorkMotionPair } from "@/components/work-motion/WorkMotionPair";
import { WorkMotionProject } from "@/components/work-motion/WorkMotionProject";
import { WorkMotionQuote } from "@/components/work-motion/WorkMotionQuote";
import { workMotionItems } from "@/lib/work-motion";

/**
 * Editorial Work body — Figma order, spans, and paired groups.
 * Motion lives on project articles; grid tracks stay static.
 * Desktop placement uses a shared 12-column grid (column-gap 24px).
 */
export function WorkMotionGrid() {
  const {
    verso,
    editorial,
    onenav,
    digitalEditions,
    editorialPublications,
    brandIdentity,
    deliveryDrop,
  } = workMotionItems;

  return (
    <div className="work-motion-grid">
      {/* Verso — full 12-col span inside Homepage 1440 container */}
      <div className="prototype-page-container">
        <div className="work-desktop-grid">
          <div className="work-col work-col--1-13">
            <WorkMotionProject item={verso} priority />
          </div>
        </div>
      </div>

      {/* Editorial Platform — columns 7–12 (~half width, right) */}
      <div className="prototype-page-container">
        <div className="work-desktop-grid">
          <div className="work-col work-col--7-13">
            <WorkMotionProject item={editorial} />
          </div>
        </div>
      </div>

      <div className="work-motion-container">
        <div className="work-row work-row--offset-start">
          <WorkMotionProject item={onenav} />
        </div>
      </div>

      <div className="work-motion-container">
        <div className="work-row work-row--square-pair">
          <WorkMotionPair
            kind="square"
            left={digitalEditions}
            right={editorialPublications}
          />
        </div>
      </div>

      <div className="work-motion-container">
        <WorkMotionQuote />
      </div>

      <div className="work-motion-container">
        <WorkMotionPair
          kind="landscape"
          left={brandIdentity}
          right={deliveryDrop}
        />
      </div>
    </div>
  );
}
