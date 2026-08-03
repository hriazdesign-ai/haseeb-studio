import { HomeParallaxPrototype } from "@/components/home-parallax/HomeParallaxPrototype";

/**
 * Approved homepage surface (promoted from `/home-parallax-blocks`).
 * Shared by `/` and the temporary comparison route `/home-parallax-blocks`.
 *
 * SiteFooter is hidden via `home-parallax.css` when `.home-parallax-page` is present;
 * PrototypeFooter is rendered inside HomeParallaxPrototype.
 */
export function BlocksHomePage() {
  return <HomeParallaxPrototype motionMode="block" />;
}
