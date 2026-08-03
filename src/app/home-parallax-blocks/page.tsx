import type { Metadata } from "next";
import { HomeParallaxPrototype } from "@/components/home-parallax/HomeParallaxPrototype";

export const metadata: Metadata = {
  title: "Home Parallax Blocks Prototype — Haseeb Riaz Studio",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Temporary whole-project-block parallax prototype (Test B).
 * Accessible only via direct URL — does not replace `/` or `/home-parallax`.
 */
export default function HomeParallaxBlocksPage() {
  return <HomeParallaxPrototype motionMode="block" />;
}
