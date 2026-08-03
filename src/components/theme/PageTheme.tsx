"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { pageThemeRootCss, type PageThemeId } from "@/lib/page-theme";

type PageThemeProps = {
  theme: PageThemeId;
  children: ReactNode;
};

/**
 * Applies the studio light/dark theme to the document for the active page.
 * Sets `data-theme` on `<html>` and injects matching `:root` tokens for SSR.
 */
export function PageTheme({ theme, children }: PageThemeProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("data-theme");
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;

    return () => {
      if (previous) {
        root.setAttribute("data-theme", previous);
      } else {
        root.removeAttribute("data-theme");
      }
      root.style.colorScheme = "";
    };
  }, [theme]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{${pageThemeRootCss(theme)}}html{color-scheme:${theme};}`,
        }}
      />
      {children}
    </>
  );
}
