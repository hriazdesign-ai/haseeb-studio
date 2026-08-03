"use client";

import { useLayoutEffect, type ReactNode } from "react";
import type { CaseStudyTheme } from "@/lib/case-studies";
import { pageThemeRootCss } from "@/lib/page-theme";

type CaseStudyThemeProviderProps = {
  theme: CaseStudyTheme;
  children: ReactNode;
};

/**
 * Case-study pages use the shared Dark theme for chrome + body.
 * Project `primary` is applied only to the hero background.
 * Nav colours come from the dark theme tokens — not per-project overrides.
 */
export function CaseStudyThemeProvider({
  theme,
  children,
}: CaseStudyThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");
    root.setAttribute("data-theme", "dark");
    root.style.colorScheme = "dark";
    root.style.setProperty("--case-study-hero-bg", theme.heroBackground);

    return () => {
      root.style.removeProperty("--case-study-hero-bg");
      root.style.colorScheme = "";
      if (previousTheme) {
        root.setAttribute("data-theme", previousTheme);
      } else {
        root.removeAttribute("data-theme");
      }
    };
  }, [theme]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{${pageThemeRootCss("dark")};--case-study-hero-bg:${theme.heroBackground};}html{color-scheme:dark;}`,
        }}
      />
      {children}
    </>
  );
}
