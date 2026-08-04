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
 * Case Studies points at the review test route until production `/projects` ships.
 * Contact is an in-page anchor to the page contact section.
 */
export const homeParallaxBlocksNav = [
  { href: "/work", label: "Work" },
  { href: "/projects-motion-test", label: "Case Studies" },
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

/** Verso case study — kept for call sites that still name Verso explicitly. */
export const VERSO_CASE_STUDY_PATH = "/work/verso-design-system";

/** Editorial Platform case study. */
export const EDITORIAL_EXPERIENCE_CASE_STUDY_PATH =
  "/work/editorial-experience";

/** OneNav case study. */
export const ONENAV_CASE_STUDY_PATH = "/work/onenav";

/** Digital Editions case study. */
export const DIGITAL_EDITIONS_CASE_STUDY_PATH = "/work/digital-editions";

/** Editorial Publications case study. */
export const EDITORIAL_PUBLICATIONS_CASE_STUDY_PATH =
  "/work/editorial-publications";

/** Brand Identity case study. */
export const BRAND_IDENTITY_CASE_STUDY_PATH = "/work/brand-identity";

/** Delivery Drop case study. */
export const DELIVERY_DROP_CASE_STUDY_PATH = "/work/delivery-drop";

/** Mums United case study. */
export const MUMS_UNITED_CASE_STUDY_PATH = "/work/mums-united";

/** Bright Path Learning case study. */
export const BRIGHT_PATH_LEARNING_CASE_STUDY_PATH =
  "/work/bright-path-learning";

/** Meridian & Co. case study. */
export const MERIDIAN_AND_CO_CASE_STUDY_PATH = "/work/meridian-and-co";

/**
 * Portfolio case studies with solid project-themed SiteHeader
 * (`data-theme="case-study"` → `--case-study-hero-bg` + white type).
 */
export const PORTFOLIO_CASE_STUDY_PATHS = [
  VERSO_CASE_STUDY_PATH,
  EDITORIAL_EXPERIENCE_CASE_STUDY_PATH,
  ONENAV_CASE_STUDY_PATH,
  DIGITAL_EDITIONS_CASE_STUDY_PATH,
  EDITORIAL_PUBLICATIONS_CASE_STUDY_PATH,
  BRAND_IDENTITY_CASE_STUDY_PATH,
  DELIVERY_DROP_CASE_STUDY_PATH,
  MUMS_UNITED_CASE_STUDY_PATH,
  BRIGHT_PATH_LEARNING_CASE_STUDY_PATH,
  MERIDIAN_AND_CO_CASE_STUDY_PATH,
] as const;

export function isVersoCaseStudyRoute(pathname: string): boolean {
  const path = pathname.split(/[?#]/)[0] || pathname;
  return path === VERSO_CASE_STUDY_PATH;
}

export function isPortfolioCaseStudyRoute(pathname: string): boolean {
  const path = pathname.split(/[?#]/)[0] || pathname;
  return (PORTFOLIO_CASE_STUDY_PATHS as readonly string[]).includes(path);
}

/**
 * Routes that use the approved portfolio SiteHeader chrome
 * (blocks layout + Work / Case Studies / Contact nav).
 */
export function isBlocksChromeRoute(pathname: string): boolean {
  const path = pathname.split(/[?#]/)[0] || pathname;
  return (
    path === "/" ||
    path === "/home-parallax-blocks" ||
    path === "/work" ||
    path === "/work-motion-test" ||
    path === "/projects-motion-test" ||
    /* Case studies under /work/[slug] — same shared portfolio nav. */
    (path.startsWith("/work/") && path !== "/work")
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
 * Uses label-based route groups so Work vs Case Studies can share an href
 * without both becoming active. Hash links (e.g. Contact) are never active.
 */
export function isNavItemActive(item: SiteNavItem, pathname: string): boolean {
  const path = pathname.split(/[?#]/)[0] || pathname;

  if (item.href.startsWith("#")) return false;

  const label = item.label.trim().toLowerCase();

  if (label === "work") {
    return isWorkRoute(path);
  }

  if (label === "case studies" || label === "projects") {
    return isProjectsRoute(path);
  }

  if (label === "contact" || label === "get in touch") {
    return path === "/contact" || path.startsWith("/contact/");
  }

  if (path === item.href) return true;
  if (item.href !== "/" && path.startsWith(`${item.href}/`)) return true;
  return false;
}
