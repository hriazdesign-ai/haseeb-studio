import type { Metadata } from "next";
import { HomeParallaxPrototype } from "@/components/home-parallax/HomeParallaxPrototype";

export const metadata: Metadata = {
  title: "Home Parallax Prototype — Haseeb Riaz Studio",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Temporary redesigned-homepage prototype.
 * Accessible only via direct URL — not linked from site navigation.
 */
export default function HomeParallaxPage() {
  return <HomeParallaxPrototype />;
}
