"use client";

import { isPortfolioCaseStudyRoute } from "@/lib/navigation";
import type { SiteHeaderThemeId } from "@/lib/page-theme";

/**
 * Resolves SiteHeader `data-theme`.
 * - Explicit `theme` prop always wins.
 * - Portfolio case studies (Verso, Editorial Experience, …) use solid
 *   project chrome (`--case-study-hero-bg` + white type) at all scroll positions.
 * - Otherwise `undefined` so the header inherits page tokens.
 */
export function useSiteHeaderTheme(
  pathname: string,
  themeProp?: SiteHeaderThemeId,
): SiteHeaderThemeId | undefined {
  if (themeProp) return themeProp;
  if (isPortfolioCaseStudyRoute(pathname)) return "case-study";
  return undefined;
}
