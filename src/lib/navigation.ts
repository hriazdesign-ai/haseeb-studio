export type SiteNavItem = {
  href: string;
  label: string;
};

export const siteNav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Get in touch" },
] as const satisfies readonly SiteNavItem[];

/**
 * Nav for blocks chrome routes (`/`, `/home-parallax-blocks`, `/work`,
 * `/work-motion-test`, `/projects-motion-test`).
 * Projects points at the review test route until production `/projects` ships.
 * Contact is an in-page anchor to the page contact section.
 */
export const homeParallaxBlocksNav = [
  { href: "/work", label: "Work" },
  { href: "/projects-motion-test", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const satisfies readonly SiteNavItem[];

export const socialLinks = [
  // TODO: Add Instagram URL when available.
  { label: "Instagram" },
  // TODO: Add LinkedIn URL when available.
  { label: "LinkedIn" },
] as const;

/**
 * Work routes: listing, motion test, and nested `/work/*`
 * (including current case studies at `/work/[slug]`).
 */
export function isWorkRoute(pathname: string): boolean {
  return (
    pathname === "/work" ||
    pathname === "/work-motion-test" ||
    pathname.startsWith("/work/")
  );
}

/**
 * Projects section routes (test + future production).
 * Case studies currently ship under `/work/[slug]` and activate Work.
 */
export function isProjectsRoute(pathname: string): boolean {
  return (
    pathname === "/projects" ||
    pathname.startsWith("/projects/") ||
    pathname === "/projects-motion-test" ||
    pathname === "/case-studies" ||
    pathname.startsWith("/case-studies/")
  );
}

/**
 * Whether a header nav item is the active page for `pathname`.
 * Uses label-based route groups so Work vs Projects can share an href
 * without both becoming active. Hash links (e.g. Contact) are never active.
 */
export function isNavItemActive(item: SiteNavItem, pathname: string): boolean {
  const path = pathname.split(/[?#]/)[0] || pathname;

  if (item.href.startsWith("#")) return false;

  const label = item.label.trim().toLowerCase();

  if (label === "work") {
    return isWorkRoute(path);
  }

  if (label === "projects") {
    return isProjectsRoute(path);
  }

  if (label === "contact" || label === "get in touch") {
    return path === "/contact" || path.startsWith("/contact/");
  }

  if (path === item.href) return true;
  if (item.href !== "/" && path.startsWith(`${item.href}/`)) return true;
  return false;
}
