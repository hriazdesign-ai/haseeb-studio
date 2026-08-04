import type { Metadata } from "next";
import { WorkMotionPage } from "@/components/work-motion/WorkMotionPage";
import { PageTheme } from "@/components/theme/PageTheme";

export const metadata: Metadata = {
  title: "Work — Haseeb Riaz Studio",
  description:
    "Selected work — digital experiences built around clarity, trust and usability.",
};

/**
 * Production Work page — shared implementation with `/work-motion-test`.
 */
export default function WorkPage() {
  return (
    <PageTheme theme="light">
      <WorkMotionPage />
    </PageTheme>
  );
}
