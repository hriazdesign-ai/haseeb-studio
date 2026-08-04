"use client";

import { useLayoutEffect, type ReactNode } from "react";
import type { CaseStudyTheme } from "@/lib/case-studies";
import { pageThemeRootCss, type PageThemeId } from "@/lib/page-theme";

type CaseStudyThemeProviderProps = {
  theme: CaseStudyTheme;
  /**
   * Page body surface theme (white body vs dark body).
   * Project nav / hero colours always come from `theme`.
   */
  chrome?: PageThemeId;
  children: ReactNode;
};

function caseStudyThemeCss(theme: CaseStudyTheme): string {
  return [
    `--case-study-hero-bg:${theme.heroBackground}`,
    `--case-study-hero-fg:${theme.navForeground}`,
    `--nav-background:${theme.navBackground}`,
    `--nav-text:${theme.navForeground}`,
    `--underline-colour:${theme.navUnderline}`,
    `--site-header-bg:${theme.navBackground}`,
    `--site-header-fg:${theme.navForeground}`,
    `--site-nav-underline:${theme.navUnderline}`,
  ].join(";");
}

/**
 * Applies page body tokens plus per-project hero / SiteHeader theme variables.
 */
export function CaseStudyThemeProvider({
  theme,
  chrome = "dark",
  children,
}: CaseStudyThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");
    root.setAttribute("data-theme", chrome);
    root.style.colorScheme = chrome;

    const projectVars: Array<[string, string]> = [
      ["--case-study-hero-bg", theme.heroBackground],
      ["--case-study-hero-fg", theme.navForeground],
      ["--nav-background", theme.navBackground],
      ["--nav-text", theme.navForeground],
      ["--underline-colour", theme.navUnderline],
      ["--site-header-bg", theme.navBackground],
      ["--site-header-fg", theme.navForeground],
      ["--site-nav-underline", theme.navUnderline],
    ];

    for (const [key, value] of projectVars) {
      root.style.setProperty(key, value);
    }

    return () => {
      for (const [key] of projectVars) {
        root.style.removeProperty(key);
      }
      root.style.colorScheme = "";
      if (previousTheme) {
        root.setAttribute("data-theme", previousTheme);
      } else {
        root.removeAttribute("data-theme");
      }
    };
  }, [theme, chrome]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{${pageThemeRootCss(chrome)};${caseStudyThemeCss(theme)};}html{color-scheme:${chrome};}`,
        }}
      />
      {children}
    </>
  );
}
