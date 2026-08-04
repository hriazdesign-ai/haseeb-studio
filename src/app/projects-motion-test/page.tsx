import type { Metadata } from "next";
import { ProjectsMotionPage } from "@/components/projects-motion/ProjectsMotionPage";
import { PageTheme } from "@/components/theme/PageTheme";

export const metadata: Metadata = {
  title: "Case Studies (motion test) — Haseeb Riaz Studio",
  description:
    "Test route for the Studio Case Studies editorial grid and scroll-linked motion.",
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
