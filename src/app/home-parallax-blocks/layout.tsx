import type { ReactNode } from "react";

/**
 * Prototype route layout for Test B.
 * Keeps the shared SiteHeader (scroll-hide, mobile menu, underlines).
 * Hides only the shared SiteFooter — the page renders PrototypeFooter.
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
          __html: `body:has(.home-parallax-page) .site-footer{display:none!important}`,
        }}
      />
      {children}
    </>
  );
}
