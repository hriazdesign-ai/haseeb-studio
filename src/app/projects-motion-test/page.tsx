import type { Metadata } from "next";
import { ProjectsMotionPage } from "@/components/projects-motion/ProjectsMotionPage";
import { PageTheme } from "@/components/theme/PageTheme";

export const metadata: Metadata = {
  title: "Projects (motion test) — Haseeb Riaz Studio",
  description:
    "Test route for the Studio Projects editorial grid and scroll-linked motion.",
};

/**
 * Temporary Projects test route — does not replace a production Projects page.
 */
export default function ProjectsMotionTestPage() {
  return (
    <PageTheme theme="dark">
      <ProjectsMotionPage />
    </PageTheme>
  );
}
