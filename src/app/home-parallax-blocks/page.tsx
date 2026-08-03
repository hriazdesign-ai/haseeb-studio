import type { Metadata } from "next";
import { BlocksHomePage } from "@/components/home-parallax/BlocksHomePage";

export const metadata: Metadata = {
  title: "Home Parallax Blocks Prototype — Haseeb Riaz Studio",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Temporary comparison route for the approved blocks homepage.
 * Same source component as `/` — do not diverge markup.
 */
export default function HomeParallaxBlocksPage() {
  return <BlocksHomePage />;
}
