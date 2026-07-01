export const projects = [
  {
    slug: "bright-path-learning",
    title: "Bright Path Learning",
    category: "Education",
    description:
      "A tutoring website focused on clarity, confidence and helping parents make informed decisions.",
    metadata: "Product Design · UI · Development",
    href: "#",
    image: "/images/Home-Ed-1.png",
    alt: "Bright Path Learning website homepage design for an education tutoring business",
    objectPosition: "object-top",
    frameClassName: "aspect-[976/573] w-full lg:aspect-auto lg:h-[573px]",
    sizes: "(max-width: 1024px) 100vw, 976px",
  },
  {
    slug: "mums-united",
    title: "Mums United",
    category: "Community Impact",
    description:
      "Supporting mothers, young people and families through community programmes, mentoring and practical support.",
    metadata: "Product Design · UI · Development",
    href: "/work/mums-united",
    image: "/images/Home-MU-1.png",
    alt: "Mums United charity website homepage design for community support and mentoring",
    objectPosition: "object-top",
    frameClassName: "aspect-[752/441] w-full lg:aspect-auto lg:h-[441px]",
    sizes: "(max-width: 1024px) 100vw, 752px",
  },
  {
    slug: "meridian-co",
    title: "Meridian & Co.",
    category: "Professional Services",
    description:
      "A modern accounting website designed to build trust, communicate expertise and generate enquiries.",
    metadata: "Product Design · UI · Development",
    href: "#",
    image: "/images/Home-Acc-1.png",
    alt: "Meridian & Co. professional services website homepage design for an accounting firm",
    objectPosition: "object-top",
    frameClassName: "aspect-[480/289] w-full lg:aspect-auto lg:h-[289px]",
    sizes: "(max-width: 1024px) 100vw, 480px",
  },
] as const;

export const credentials = {
  employer: "Condé Nast",
  period: "2009–2026",
  brands: [
    "Vogue",
    "GQ",
    "Wired",
    "Vanity Fair",
    "Architectural Digest",
    "Bon Appétit",
    "Condé Nast Traveller",
  ],
};

export const heroNavLinks = [
  { label: "Work", href: "/#work", hash: "#work" },
  { label: "About", href: "/#about", hash: "#about" },
  { label: "Services", href: "/#services", hash: "#services" },
  {
    label: "Get in touch",
    href: "mailto:hello@haseebriaz.com",
    external: true,
  },
] as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
] as const;

export const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;
