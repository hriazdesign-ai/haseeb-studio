import type { ReactNode } from "react";

/**
 * Comparison route layout for the blocks homepage.
 * Critical chrome CSS lives in `home-parallax.css` / `globals.css` so `/`
 * and this route stay in sync without duplicated style injection.
 */
export default function HomeParallaxBlocksLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
