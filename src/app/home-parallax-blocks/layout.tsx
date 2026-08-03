import type { ReactNode } from "react";

/**
 * Prototype route layout for Test B.
 * Keeps the shared SiteHeader (scroll-hide, mobile menu, underlines).
 * Hides only the shared SiteFooter — the page renders PrototypeFooter.
 * Page content uses `.prototype-page-container` (1440px); nav does not.
 */
export default function HomeParallaxBlocksLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            "body:has(.home-parallax-page) .site-footer{display:none!important}",
            ".prototype-page-container{width:100%;max-width:1440px;margin-inline:auto;padding-inline:var(--gutter)}",
            ".site-header--blocks .site-header__inner{display:flex;align-items:center;justify-content:space-between}",
            ".site-header--blocks,.home-parallax-page--blocks{--site-chrome-inline:var(--gutter)}",
            "@media (min-width:1024px){.site-header--blocks,.home-parallax-page--blocks{--site-chrome-inline:30px}.site-header__nav-list{gap:28px}.site-header__desktop-nav .site-nav-link{width:90px;font-size:20px;text-align:left}}",
            ".site-chrome-inner{width:100%;box-sizing:border-box;padding-inline:var(--site-chrome-inline,var(--gutter))}",
          ].join(""),
        }}
      />
      {children}
    </>
  );
}
