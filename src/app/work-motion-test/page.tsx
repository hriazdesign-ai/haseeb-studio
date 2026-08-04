import type { Metadata } from "next";
import { WorkMotionPage } from "@/components/work-motion/WorkMotionPage";
import { PageTheme } from "@/components/theme/PageTheme";

export const metadata: Metadata = {
  title: "Work (motion test) — Haseeb Riaz Studio",
  description:
    "Temporary comparison route — identical to production `/work`. Safe to remove after verification.",
};

/**
 * Temporary comparison mount of the production Work page.
 * Renders the same `WorkMotionPage` as `/work`.
 */
export default function WorkMotionTestPage() {
  return (
    <PageTheme theme="light">
      <WorkMotionPage />
    </PageTheme>
  );
}
