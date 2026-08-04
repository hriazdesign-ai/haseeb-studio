"use client";

import { BlocksContactSection } from "@/components/home-parallax/BlocksContactSection";
import { PrototypeFooter } from "@/components/home-parallax/PrototypeFooter";
import { ProjectsMotionGrid } from "@/components/projects-motion/ProjectsMotionGrid";
import { projectsMotionHero } from "@/lib/projects-motion";
import "@/components/home-parallax/home-parallax.css";
import "@/components/work-motion/work-motion.css";
import "@/components/projects-motion/projects-motion.css";

/**
 * Projects page (test mount at `/projects-motion-test`).
 * Dark editorial body + shared contact / footer from Homepage / Work.
 */
export function ProjectsMotionPage() {
  return (
    <div className="projects-motion-page home-parallax-page home-parallax-page--blocks">
      <main>
        <section
          className="hp-hero"
          aria-labelledby="projects-motion-hero-heading"
        >
          <div className="prototype-page-container">
            <p className="projects-motion-hero__label">
              {projectsMotionHero.label}
            </p>
            <h1
              id="projects-motion-hero-heading"
              className="projects-motion-hero__title"
            >
              {projectsMotionHero.title}
            </h1>
          </div>
        </section>

        <section aria-label="Featured projects">
          <ProjectsMotionGrid />
        </section>
      </main>

      <BlocksContactSection />
      <PrototypeFooter alignWithChrome />
    </div>
  );
}
