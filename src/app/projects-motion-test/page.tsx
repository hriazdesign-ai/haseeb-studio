import type { Metadata } from "next";
import { ProjectsMotionPage } from "@/components/projects-motion/ProjectsMotionPage";
import { PageTheme } from "@/components/theme/PageTheme";

export const metadata: Metadata = {
  title: "Case Studies — Haseeb Riaz",
  description:
    "A closer look at the thinking behind selected product, design system and digital experience work.",
};

/**
 * Temporary Case Studies test route — does not replace a production page.
 */
export default function ProjectsMotionTestPage() {
  return (
    <PageTheme theme="dark">
      <ProjectsMotionPage />
    </PageTheme>
  );
}
