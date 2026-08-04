"use client";

import { isVersoCaseStudyRoute } from "@/lib/navigation";
import type { SiteHeaderThemeId } from "@/lib/page-theme";

/**
 * Resolves SiteHeader `data-theme`.
 * - Explicit `theme` prop always wins.
 * - Verso uses solid case-study chrome (`--case-study-hero-bg` + white type).
 * - Otherwise `undefined` so the header inherits page tokens.
 */
export function useSiteHeaderTheme(
  pathname: string,
  themeProp?: SiteHeaderThemeId,
): SiteHeaderThemeId | undefined {
  if (themeProp) return themeProp;
  if (isVersoCaseStudyRoute(pathname)) return "case-study";
  return undefined;
}
