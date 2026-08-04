import type { CaseStudyTheme } from "@/lib/case-studies/types";

/**
 * Global studio colours — NOT project-themed.
 * Footer remains dark studio identity on every page.
 * Page chrome uses the light/dark system in `globals.css` / `page-theme.ts`.
 */
export const studioTheme = {
  footerBackground: "#0F0F0F",
  footerForeground: "#FFFFFF",
  /** @deprecated Case-study body now follows the Dark page theme. */
  caseStudyBodyBackground: "#0F0F0F",
  caseStudyBodyForeground: "#FFFFFF",
  navUnderline: "currentColor",
} as const;

/**
 * Per-project theme palette — ONE place to edit each project's main colour.
 *
 * `primary` / `foreground` drive the case-study hero and SiteHeader chrome
 * via `getCaseStudyTheme` → `CaseStudyThemeProvider`.
 *
 * Experience projects without a case study yet are reserved placeholders.
 */
export type ProjectTheme = {
  primary: string;
  foreground: string;
};

export const projectThemes = {
  /* -------------------------------------------------------------------------- */
  /* Active case studies                                                        */
  /* -------------------------------------------------------------------------- */
  "mums-united": {
    primary: "#4f4e4d",
    foreground: "#ffffff",
  },
  "bright-path-learning": {
    primary: "#0d454e",
    foreground: "#ffffff",
  },
  "meridian-and-co": {
    primary: "#203a5f",
    foreground: "#ffffff",
  },
  "verso-design-system": {
    primary: "#00253f",
    foreground: "#ffffff",
  },
  onenav: {
    primary: "#40464f",
    foreground: "#ffffff",
  },
  "editorial-experience": {
    primary: "#3f314b",
    foreground: "#ffffff",
  },
  "digital-editions": {
    primary: "#242425",
    foreground: "#ffffff",
  },
  "editorial-publications": {
    primary: "#b45456",
    foreground: "#ffffff",
  },
  "brand-identity": {
    primary: "#3a1115",
    foreground: "#ffffff",
  },
  "delivery-drop": {
    primary: "#247541",
    foreground: "#ffffff",
  },
} as const satisfies Record<string, ProjectTheme>;

export type ProjectThemeId = keyof typeof projectThemes;

/** Build the case-study theme object consumed by CaseStudyThemeProvider. */
export function getCaseStudyTheme(projectId: ProjectThemeId): CaseStudyTheme {
  const theme = projectThemes[projectId];
  return {
    heroBackground: theme.primary,
    navBackground: theme.primary,
    navForeground: theme.foreground,
    navUnderline: studioTheme.navUnderline,
  };
}
