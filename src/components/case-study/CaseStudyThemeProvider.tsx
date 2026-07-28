"use client";

import { useLayoutEffect, type ReactNode } from "react";
import type { CaseStudyTheme } from "@/lib/case-studies";

const THEME_VARS = [
  "--site-header-bg",
  "--site-header-fg",
  "--site-nav-underline",
  "--case-study-hero-bg",
] as const;

type CaseStudyThemeProviderProps = {
  theme: CaseStudyTheme;
  children: ReactNode;
};

/**
 * Applies per-case-study colours to the shared SiteHeader via CSS variables.
 * Clears them on unmount so Home / Work keep the global theme.
 */
export function CaseStudyThemeProvider({
  theme,
  children,
}: CaseStudyThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--site-header-bg", theme.navBackground);
    root.style.setProperty("--site-header-fg", theme.navForeground);
    root.style.setProperty("--site-nav-underline", theme.navUnderline);
    root.style.setProperty("--case-study-hero-bg", theme.heroBackground);

    return () => {
      for (const name of THEME_VARS) {
        root.style.removeProperty(name);
      }
    };
  }, [theme]);

  return (
    <>
      {/* SSR-friendly first paint for themed header / hero */}
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{--site-header-bg:${theme.navBackground};--site-header-fg:${theme.navForeground};--site-nav-underline:${theme.navUnderline};--case-study-hero-bg:${theme.heroBackground};}`,
        }}
      />
      {children}
    </>
  );
}
