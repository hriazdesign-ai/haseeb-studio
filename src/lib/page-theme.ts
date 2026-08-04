export type PageThemeId = "light" | "dark";

/**
 * Header-only chrome. Extends page themes with `case-study` for solid
 * project-coloured nav (portfolio case studies via `--case-study-hero-bg`).
 */
export type SiteHeaderThemeId = PageThemeId | "case-study";

/**
 * Semantic colour tokens for the two studio themes.
 * Kept in sync with `globals.css` `[data-theme]` rules.
 */
export const pageThemes = {
  light: {
    surfacePrimary: "#FFFFFF",
    textPrimary: "#0F0F0F",
    navBackground: "#FFFFFF",
    navText: "#0F0F0F",
    linkColour: "#0F0F0F",
    underlineColour: "currentColor",
    borderSubtle: "rgba(15, 15, 15, 0.06)",
  },
  dark: {
    surfacePrimary: "#0F0F0F",
    textPrimary: "#FFFFFF",
    navBackground: "#0F0F0F",
    navText: "#FFFFFF",
    linkColour: "#FFFFFF",
    underlineColour: "currentColor",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
  },
} as const;

/** Inline `:root` declarations for SSR first paint (matches CSS theme blocks). */
export function pageThemeRootCss(theme: PageThemeId): string {
  const t = pageThemes[theme];
  return [
    `--surface-primary:${t.surfacePrimary}`,
    `--text-primary:${t.textPrimary}`,
    `--nav-background:${t.navBackground}`,
    `--nav-text:${t.navText}`,
    `--link-colour:${t.linkColour}`,
    `--underline-colour:${t.underlineColour}`,
    `--border-subtle:${t.borderSubtle}`,
    `--background:${t.surfacePrimary}`,
    `--foreground:${t.textPrimary}`,
    `--surface:${t.surfacePrimary}`,
    `--border:${t.borderSubtle}`,
    `--site-header-bg:${t.navBackground}`,
    `--site-header-fg:${t.navText}`,
    `--site-nav-underline:${t.underlineColour}`,
  ].join(";");
}
