import { cardParallax } from "@/lib/motion";
import { experienceProjects } from "@/lib/projects";

/**
 * Work page layout + motion config (Figma Studio Work 684:13983).
 * Shares project images/hrefs from `experienceProjects`.
 * Springs come from the global motion system (`src/lib/motion.ts`).
 */

export const WORK_MOTION_DESKTOP_MIN_PX = 1024;
export const WORK_MOTION_EDITORIAL_MIN_PX = 1280;

export type WorkMotionMediaRole =
  | "feature-landscape"
  | "offset-landscape"
  | "offset-square"
  | "square-pair"
  | "pair-landscape";

export type WorkMotionPresetId = "A" | "B" | "C";

export type WorkMotionItem = {
  id: string;
  caption: string;
  href: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  role: WorkMotionMediaRole;
  preset: WorkMotionPresetId;
  /** Desktop object-position */
  objectPosition?: string;
  /** Focal point when cropped to 6:4 below desktop */
  mobileObjectPosition?: string;
};

function projectById(id: string) {
  const project = experienceProjects.find((item) => item.id === id);
  if (!project?.image || !project.href) {
    throw new Error(`Missing experience project data for "${id}"`);
  }
  return project;
}

function item(
  id: string,
  caption: string,
  role: WorkMotionMediaRole,
  preset: WorkMotionPresetId,
  positions?: { objectPosition?: string; mobileObjectPosition?: string },
): WorkMotionItem {
  const project = projectById(id);
  return {
    id,
    caption,
    href: project.href!,
    image: project.image!,
    role,
    preset,
    objectPosition: positions?.objectPosition ?? "50% 50%",
    mobileObjectPosition: positions?.mobileObjectPosition ?? "50% 50%",
  };
}

/** Visible Figma project order (spacers omitted). */
export const workMotionItems = {
  verso: item(
    "verso-design-system",
    "Building the Verso Design System",
    "feature-landscape",
    "A",
    { objectPosition: "50% 40%", mobileObjectPosition: "50% 35%" },
  ),
  editorial: item(
    "editorial-experience",
    "Designing the Editorial Platform",
    "offset-landscape",
    "B",
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 45%" },
  ),
  onenav: item(
    "onenav",
    "Creating OneNav for Condé Nast",
    "offset-square",
    "C",
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 50%" },
  ),
  digitalEditions: item(
    "digital-editions",
    "Digital Editions",
    "square-pair",
    "B",
    { objectPosition: "50% 40%", mobileObjectPosition: "50% 40%" },
  ),
  editorialPublications: item(
    "editorial-publications",
    "Editorial Publications",
    "square-pair",
    "B",
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 50%" },
  ),
  brandIdentity: item(
    "brand-identity",
    "Brand Identity",
    "pair-landscape",
    "A",
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 45%" },
  ),
  deliveryDrop: item(
    "delivery-drop",
    "Delivery Drop",
    "pair-landscape",
    "A",
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 50%" },
  ),
} as const;

export const workMotionQuote =
  "Ideas become more valuable when people understand them.";

export const workMotionHero = {
  label: "Selected work",
  title: "Helping organisations simplify complex digital products.",
} as const;

/** Shared internal image scale (homepage-style, clipped to fixed frame). */
export const workImageScale = {
  keyframes: [1, 1.07, 1.02] as const,
  stops: [0, 0.5, 1] as const,
};

/** Local scroll window for solo (non-pair) whole-card parallax. */
export const workProjectScrollOffset = ["start 95%", "end 10%"] as const;

/** Spring for solo whole-card y — global `cardParallax.soloSpring`. */
export const workProjectParallaxSpring = cardParallax.soloSpring;

/**
 * Whole-card y travel (px) — single projects only.
 * Paired projects use `workPairAlignMotion` instead.
 */
export const workMotionPresets = {
  A: {
    blockY: { from: 48, to: -48 },
    imageScale: workImageScale,
  },
  B: {
    blockY: { from: 32, to: -56 },
    imageScale: workImageScale,
  },
  C: {
    blockY: { from: -24, to: 40 },
    imageScale: workImageScale,
  },
} as const;

export type WorkPairKind = "square" | "landscape";

/** Square pair — three keyframes. Landscape — four (with hold while aligned). */
export type WorkPairYStages =
  | readonly [number, number, number]
  | readonly [number, number, number, number];

/**
 * Shared-pair alignment.
 * Square: stagger → align → travel together.
 * Landscape (Brand / Delivery): reversed stagger + brief aligned hold.
 */
export const workPairAlignMotion = {
  offset: ["start 95%", "end 20%"] as const,
  spring: cardParallax.pairSpring,
  /** Matches landscape pair stack breakpoint in CSS */
  landscapeStackMaxPx: 639,
  pairs: {
    /** Digital Editions (left) + Editorial Publications (right) — unchanged */
    square: {
      progress: [0, 0.58, 1] as const,
      desktop: {
        left: [56, 0, -40] as const,
        right: [-8, 0, -40] as const,
      },
      tablet: {
        left: [32, 0, -24] as const,
        right: [-4, 0, -24] as const,
      },
      mobileSideBySide: {
        left: [16, 0, -12] as const,
        right: [0, 0, -12] as const,
      },
    },
    /**
     * Brand Identity (left) + Delivery Drop (right).
     * Right begins lower; both hold at 0 between 0.45–0.7, then rise together.
     */
    landscape: {
      progress: [0, 0.45, 0.7, 1] as const,
      desktop: {
        left: [-16, 0, 0, -40] as const,
        right: [64, 0, 0, -40] as const,
      },
      tablet: {
        left: [-8, 0, 0, -24] as const,
        right: [36, 0, 0, -24] as const,
      },
      mobileSideBySide: {
        left: [-4, 0, 0, -12] as const,
        right: [18, 0, 0, -12] as const,
      },
    },
  },
} as const;
