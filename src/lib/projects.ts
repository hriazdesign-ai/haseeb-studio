export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  name: string;
  title: string;
  /** When omitted, the card renders a surface placeholder (temporary assets). */
  image?: ProjectImage;
  /** Visual size role from the Studio work grids */
  size: "featured" | "secondary" | "primary" | "experience";
  /** Optional case-study route. */
  href?: string;
};

export const homeProjects: Project[] = [
  {
    id: "mums-united",
    name: "Mums United",
    title: "Making community support clearer and easier to access.",
    image: {
      src: "/images/work/mums-united/cover.png",
      alt: "Laptop mockup showing the Mums United website",
      width: 4096,
      height: 3103,
    },
    size: "featured",
    href: "/work/mums-united",
  },
  {
    id: "bright-path-learning",
    name: "Bright Path Learning",
    title: "Building trust between education providers and families.",
    image: {
      src: "/images/work/bright-path-learning/cover.jpg",
      alt: "Screen mockup showing the Bright Path Learners website",
      width: 3000,
      height: 2344,
    },
    size: "secondary",
  },
  {
    id: "meridian-and-co",
    name: "Meridian & Co.",
    title: "Making accounting services clearer and more approachable.",
    image: {
      // Tablet photo from Figma; flat UI export kept as cover-a.png unused.
      src: "/images/work/meridian-and-co/cover.png",
      alt: "Tablet mockup showing the Meridian & Co. website",
      width: 2000,
      height: 2667,
    },
    size: "primary",
  },
];

/** Studio Work projects on the Work page (same three as homepage). */
export const studioWorkProjects = homeProjects;

/**
 * Professional Experience projects.
 * Thumbnails exported from Figma Work page (node 595:18754).
 */
export const experienceProjects: Project[] = [
  {
    id: "verso-design-system",
    name: "Verso Design System",
    title: "A shared design system for Condé Nast's global brands.",
    image: {
      src: "/images/work/verso-design-system/cover.png",
      alt: "Verso design system UI collage with navigation and content components",
      width: 748,
      height: 482,
    },
    size: "experience",
  },
  {
    id: "onenav",
    name: "OneNav",
    title: "A scalable navigation system built across multiple brands.",
    image: {
      src: "/images/work/onenav/cover.png",
      alt: "OneNav mobile navigation system shown beside a WIRED article",
      width: 748,
      height: 482,
    },
    size: "experience",
  },
  {
    id: "editorial-experience",
    name: "Editorial Experience",
    title: "Simplifying publishing tools used across Condé Nast.",
    image: {
      src: "/images/work/editorial-experience/cover.png",
      alt: "Editorial highlight box tooling beside a British Vogue mobile preview",
      width: 748,
      height: 482,
    },
    size: "experience",
  },
  {
    id: "digital-editions",
    name: "Digital Editions",
    title:
      "Bringing distinctive editorial identities to responsive digital experiences.",
    image: {
      src: "/images/work/digital-editions/cover.png",
      alt: "Vogue digital edition layouts across cover and device mockups",
      width: 552,
      height: 356,
    },
    size: "experience",
  },
  {
    id: "editorial-publications",
    name: "Editorial & Publications",
    title: "Typography, layout and storytelling across print.",
    image: {
      src: "/images/work/editorial-publications/cover.png",
      alt: "Geometric editorial print layout with EALA mark",
      width: 552,
      height: 356,
    },
    size: "experience",
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    title:
      "Building distinctive identities across physical and digital touchpoints.",
    image: {
      src: "/images/work/brand-identity/cover.png",
      alt: "Mikado brand identity with power tools on a deep blue field",
      width: 552,
      height: 356,
    },
    size: "experience",
  },
  {
    id: "delivery-drop",
    name: "Delivery Drop",
    title: "A clear, intuitive digital product and brand experience.",
    image: {
      src: "/images/work/delivery-drop/cover.png",
      alt: "Delivery Drop brand collage with food and product elements",
      width: 552,
      height: 356,
    },
    size: "experience",
  },
];
