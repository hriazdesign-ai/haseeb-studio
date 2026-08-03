"use client";

import { BlocksContactSection } from "@/components/home-parallax/BlocksContactSection";
import { PrototypeFooter } from "@/components/home-parallax/PrototypeFooter";
import { WorkMotionGrid } from "@/components/work-motion/WorkMotionGrid";
import { workMotionHero } from "@/lib/work-motion";
import "@/components/home-parallax/home-parallax.css";
import "@/components/work-motion/work-motion.css";

/**
 * Test route page for Figma Studio Work (684:13983).
 * Reuses SiteHeader (via pathname), BlocksContactSection, PrototypeFooter.
 * Does not replace `/work`.
 */
export function WorkMotionPage() {
  return (
    <div className="work-motion-page home-parallax-page home-parallax-page--blocks">
      <main>
        {/*
         * Same hero shell as HomeParallaxPrototype (blocks):
         * `.hp-hero` + `.prototype-page-container` — gutters, 1440 max, section-y.
         * Work keeps its eyebrow + coral title styles only.
         */}
        <section className="hp-hero" aria-labelledby="work-motion-hero-heading">
          <div className="prototype-page-container">
            <p className="work-motion-hero__label">{workMotionHero.label}</p>
            <h1
              id="work-motion-hero-heading"
              className="work-motion-hero__title"
            >
              {workMotionHero.title}
            </h1>
          </div>
        </section>

        <section aria-label="Selected work">
          <WorkMotionGrid />
        </section>
      </main>

      <BlocksContactSection />
      <PrototypeFooter alignWithChrome />
    </div>
  );
}
