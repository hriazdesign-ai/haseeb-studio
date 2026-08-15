/**
 * Prototype-only homepage project data for `/home-parallax`.
 * Travel and object-position are tuned here during the parallax pass.
 */

export type HomeParallaxProjectId =
  | "mums-united"
  | "bright-path-learning"
  | "meridian-and-co";

export type HomeParallaxProject = {
  id: HomeParallaxProjectId;
  name: string;
  href: string;
  caption: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Desktop parallax travel in px. */
  travel: number;
  objectPosition: string;
  /** Layout role in the featured grid. */
  layout: "featured" | "secondary" | "primary";
};

export const homeParallaxProjects: HomeParallaxProject[] = [
  {
    id: "mums-united",
    name: "Mums United",
    href: "/work/mums-united",
    caption:
      "Helping Mums United communicate its impact, services and community support with greater clarity.",
    image: {
      src: "/images/work/mums-united/mu-cover-2.png",
      alt: "Mums United volunteer packing boxes for community support",
      width: 3000,
      height: 1800,
    },
    // Diagnostic travel — intentionally strong; refine after motion is confirmed.
    travel: 180,
    objectPosition: "50% 50%",
    layout: "featured",
  },
  {
    id: "bright-path-learning",
    name: "Bright Path Learning",
    href: "/work/bright-path-learning",
    caption:
      "Making Bright Path Learning's educational support clearer, easier to navigate and more accessible.",
    image: {
      src: "/images/work/bright-path-learning/bright-path-4.png",
      alt: "Bright Path Learning mobile app on a teal field",
      width: 566,
      height: 566,
    },
    // Diagnostic travel — intentionally strong; refine after motion is confirmed.
    travel: 140,
    objectPosition: "50% 50%",
    layout: "secondary",
  },
  {
    id: "meridian-and-co",
    name: "Meridian & Co.",
    href: "/work/meridian-and-co",
    caption:
      "Creating a clearer, more considered digital experience for Meridian & Co. and its clients.",
    image: {
      src: "/images/work/meridian-and-co/meridian-2.png",
      alt: "Meridian & Co. tablet interface held by a person",
      width: 2400,
      height: 3000,
    },
    // Diagnostic travel — intentionally strong; refine after motion is confirmed.
    travel: 160,
    objectPosition: "50% 50%",
    layout: "primary",
  },
];

/**
 * Whole-block parallax ranges for `/home-parallax-blocks` only.
 * `from` = y at scroll progress 0 · `to` = y at scroll progress 1.
 */
export const homeParallaxBlockMotion: Record<
  HomeParallaxProjectId,
  { from: number; to: number }
> = {
  "mums-united": { from: 35, to: -35 },
  "bright-path-learning": { from: 70, to: -70 },
  "meridian-and-co": { from: -30, to: 50 },
};

export type HomeParallaxMotionMode = "image" | "block";

export const homeParallaxContact = {
  email: "hriaz.design@gmail.com",
  mailto: "mailto:hriaz.design@gmail.com",
  /**
   * Social / CV destinations are not yet confirmed in the repo.
   * LinkedIn, Instagram and Download CV render as disabled until URLs exist.
   */
  linkedIn: null as string | null,
  instagram: null as string | null,
  cv: null as string | null,
};
