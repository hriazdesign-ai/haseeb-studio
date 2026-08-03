import type { Metadata } from "next";
import { WorkMotionPage } from "@/components/work-motion/WorkMotionPage";
import { PageTheme } from "@/components/theme/PageTheme";

export const metadata: Metadata = {
  title: "Work (motion test) — Haseeb Riaz Studio",
  description:
    "Test route for the Studio Work editorial grid and scroll-linked motion.",
};

export default function WorkMotionTestPage() {
  return (
    <PageTheme theme="light">
      <WorkMotionPage />
    </PageTheme>
  );
}
