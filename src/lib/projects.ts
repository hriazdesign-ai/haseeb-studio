export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Optional dedicated 6∶4 landscape asset for small Work / Case Studies cards.
   * Naming: `cover-2.png` → `cover-2-small.png`.
   * Large / featured cards continue to use `src`.
   */
  smallSrc?: string;
  smallWidth?: number;
  smallHeight?: number;
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

/** `cover-2.png` → `cover-2-small.png` */
export function expectedSmallCoverFilename(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot <= 0) return `${filename}-small`;
  return `${filename.slice(0, lastDot)}-small${filename.slice(lastDot)}`;
}

/** Derive expected small cover public URL from a desktop `src`. */
export function expectedSmallCoverSrc(src: string): string {
  const filename = src.split("/").pop() ?? src;
  const smallName = expectedSmallCoverFilename(filename);
  const dir = src.includes("/") ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  return `${dir}${smallName}`;
}

/**
 * Resolve which file a Work / Case Studies card should render.
 * Small cards prefer `smallSrc` when the file exists; otherwise fall back to `src`.
 * Large / featured cards always use `src`.
 *
 * Pass `smallFileExists: false` (or omit) when the PNG is not on disk yet so the
 * live site never requests a missing asset. Client cards also use onError fallback.
 */
export function resolveProjectCardImage(
  image: ProjectImage,
  options: { preferSmall: boolean; smallFileExists?: boolean },
): Pick<ProjectImage, "src" | "alt" | "width" | "height"> {
  const useSmall =
    options.preferSmall &&
    Boolean(image.smallSrc) &&
    options.smallFileExists === true;

  if (useSmall && image.smallSrc) {
    return {
      src: image.smallSrc,
      alt: image.alt,
      width: image.smallWidth ?? image.width,
      height: image.smallHeight ?? image.height,
    };
  }
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}

/** Attach convention-based smallSrc (2400×1600) derived from `src`. */
export function withSmallCoverFields(
  image: Omit<ProjectImage, "smallSrc" | "smallWidth" | "smallHeight">,
): ProjectImage {
  return {
    ...image,
    smallSrc: expectedSmallCoverSrc(image.src),
    smallWidth: 2400,
    smallHeight: 1600,
  };
}

export const homeProjects: Project[] = [
  {
    id: "mums-united",
    name: "Mums United",
    title: "Making community support clearer and easier to access.",
    image: withSmallCoverFields({
      src: "/images/work/mums-united/cover-2.png",
      alt: "Laptop mockup showing the Mums United website",
      width: 4096,
      height: 3103,
    }),
    size: "featured",
    href: "/work/mums-united",
  },
  {
    id: "bright-path-learning",
    name: "Bright Path Learning",
    title: "Building trust between education providers and families.",
    image: withSmallCoverFields({
      src: "/images/work/bright-path-learning/cover-1.png",
      alt: "Screen mockup showing the Bright Path Learners website",
      width: 3000,
      height: 2344,
    }),
    size: "secondary",
    href: "/work/bright-path-learning",
  },
  {
    id: "meridian-and-co",
    name: "Meridian & Co.",
    title: "Making accounting services clearer and more approachable.",
    image: withSmallCoverFields({
      // Tablet photo from Figma; flat UI export kept as cover-a.png unused.
      src: "/images/work/meridian-and-co/cover-d.png",
      alt: "Tablet mockup showing the Meridian & Co. website",
      width: 2400,
      height: 1600,
    }),
    size: "primary",
    href: "/work/meridian-and-co",
  },
];

/** Studio Work projects on the Work page (same three as homepage). */
export const studioWorkProjects = homeProjects;

/**
 * Canonical portfolio order (studio + enterprise).
 * Used by the case-study “What’s next” carousel and Image Manager;
 * unknown/new project ids are appended after this list automatically.
 */
export const portfolioProjectOrder = [
  "mums-united",
  "bright-path-learning",
  "meridian-and-co",
  "editorial-experience",
  "editorial-publications",
  "digital-editions",
  "verso-design-system",
  "onenav",
  "delivery-drop",
  "brand-identity",
] as const;

/**
 * Professional Experience projects.
 * Thumbnails exported from Figma Work page (node 595:18754).
 */
export const experienceProjects: Project[] = [
  {
    id: "verso-design-system",
    name: "Verso Design System",
    title: "A shared design system for Condé Nast's global brands.",
    image: withSmallCoverFields({
      src: "/images/work/verso-design-system/cover-4.png",
      alt: "Verso design system UI collage with navigation and content components",
      width: 2880,
      height: 1553,
    }),
    size: "experience",
    href: "/work/verso-design-system",
  },
  {
    id: "onenav",
    name: "OneNav",
    title: "A scalable navigation system built across multiple brands.",
    image: {
      src: "/images/work/onenav/cover-5.png",
      alt: "OneNav mobile navigation system shown beside a WIRED article",
      width: 1872,
      height: 1872,
    },
    size: "experience",
    href: "/work/onenav",
  },
  {
    id: "editorial-experience",
    name: "Editorial Experience",
    title: "Simplifying publishing tools used across Condé Nast.",
    image: withSmallCoverFields({
      src: "/images/work/editorial-experience/cover-4.png",
      alt: "Editorial highlight box tooling beside a British Vogue mobile preview",
      width: 3000,
      height: 3000,
    }),
    size: "experience",
    href: "/work/editorial-experience",
  },
  {
    id: "digital-editions",
    name: "Digital Editions",
    title:
      "Bringing distinctive editorial identities to responsive digital experiences.",
    image: {
      src: "/images/work/digital-editions/cover-new-3.png",
      alt: "Vogue digital edition layouts across cover and device mockups",
      width: 3000,
      height: 3000,
    },
    size: "experience",
    href: "/work/digital-editions",
  },
  {
    id: "editorial-publications",
    name: "Editorial & Publications",
    title: "Typography, layout and storytelling across print.",
    image: withSmallCoverFields({
      src: "/images/work/editorial-publications/cover-2.png",
      alt: "Geometric editorial print layout with EALA mark",
      width: 3000,
      height: 3000,
    }),
    size: "experience",
    href: "/work/editorial-publications",
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    title:
      "Building distinctive identities across physical and digital touchpoints.",
    image: {
      src: "/images/work/brand-identity/cover-1.png",
      alt: "Mikado brand identity with power tools on a deep blue field",
      width: 3000,
      height: 3000,
    },
    size: "experience",
    href: "/work/brand-identity",
  },
  {
    id: "delivery-drop",
    name: "Delivery Drop",
    title: "A clear, intuitive digital product and brand experience.",
    image: {
      src: "/images/work/delivery-drop/cover-1.png",
      alt: "Delivery Drop brand collage with food and product elements",
      width: 3000,
      height: 3000,
    },
    size: "experience",
    href: "/work/delivery-drop",
  },
];

/**
 * Every portfolio project in canonical order (studio + experience).
 * Prefer this over maintaining a separate Image Manager project list.
 */
export function getPortfolioProjects(): Project[] {
  const byId = new Map(
    [...studioWorkProjects, ...experienceProjects].map((project) => [
      project.id,
      project,
    ]),
  );
  const ordered: Project[] = [];

  for (const id of portfolioProjectOrder) {
    const project = byId.get(id);
    if (!project) continue;
    ordered.push(project);
    byId.delete(id);
  }

  for (const project of byId.values()) {
    ordered.push(project);
  }

  return ordered;
}
