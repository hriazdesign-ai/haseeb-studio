import type { ReactNode } from "react";

/**
 * Prototype route layout — hides shared SiteHeader / SiteFooter without
 * modifying those components. Restores automatically when leaving the route.
 */
export default function HomeParallaxLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `body:has(.home-parallax-page) .site-header,body:has(.home-parallax-page) .site-header-spacer,body:has(.home-parallax-page) .site-footer{display:none!important}`,
        }}
      />
      {children}
    </>
  );
}
