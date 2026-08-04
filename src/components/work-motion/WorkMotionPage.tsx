"use client";

import { BlocksContactSection } from "@/components/home-parallax/BlocksContactSection";
import { PrototypeFooter } from "@/components/home-parallax/PrototypeFooter";
import { WorkMotionGrid } from "@/components/work-motion/WorkMotionGrid";
import { workMotionHero } from "@/lib/work-motion";
import "@/components/home-parallax/home-parallax.css";
import "@/components/work-motion/work-motion.css";

/**
 * Production Work page (also mounted at `/work-motion-test` for comparison).
 * Reuses SiteHeader (via pathname), BlocksContactSection, PrototypeFooter.
 */
export function WorkMotionPage() {
  return (
    <div className="work-motion-page home-parallax-page home-parallax-page--blocks">
      <main>
        {/*
         * Same hero shell as HomeParallaxPrototype (blocks):
         * `.hp-hero` + `.prototype-page-container` — gutters, 1440 max, section-y.
         * Work keeps its eyebrow + title styles only.
         */}
        <section
          className="hp-hero work-motion-hero"
          aria-labelledby="work-motion-hero-heading"
        >
          <div className="prototype-page-container">
            <div className="portfolio-grid portfolio-hero-grid">
              <p className="work-motion-hero__label portfolio-hero-label">
                {workMotionHero.label}
              </p>
              <div className="portfolio-hero-title-wrap">
                <h1
                  id="work-motion-hero-heading"
                  className="work-motion-hero__title"
                >
                  {workMotionHero.title}
                </h1>
              </div>
            </div>
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
