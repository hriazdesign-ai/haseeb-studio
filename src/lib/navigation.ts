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
 * Nav for `/home-parallax-blocks` only.
 * Projects has no dedicated route yet — points at Work (same as the prior prototype header).
 * Contact is an in-page anchor to the prototype contact section.
 */
export const homeParallaxBlocksNav = [
  { href: "/work", label: "Work" },
  { href: "/work", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const satisfies readonly SiteNavItem[];

export const socialLinks = [
  // TODO: Add Instagram URL when available.
  { label: "Instagram" },
  // TODO: Add LinkedIn URL when available.
  { label: "LinkedIn" },
] as const;
