/**
 * Homepage featured project data (`/` / `/home-parallax-blocks`).
 * Travel and object-position are tuned here during the parallax pass.
 *
 * Work / Case Studies pages use their own slot data — do not treat this
 * list as the global portfolio order.
 */

export type HomeParallaxProjectId =
  | "onenav"
  | "mums-united"
  | "verso-design-system";

export type HomeParallaxLayout = "featured" | "secondary" | "primary";

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
  /** Desktop parallax travel in px (image-mode / Test A). */
  travel: number;
  objectPosition: string;
  /** Layout role in the featured grid — motion keys off this slot. */
  layout: HomeParallaxLayout;
};

export const homeParallaxProjects: HomeParallaxProject[] = [
  {
    id: "onenav",
    name: "OneNav",
    href: "/work/onenav",
    caption:
      "A scalable navigation system built across multiple global brands.",
    image: {
      src: "/images/work/onenav/homepage.png",
      alt: "OneNav navigation patterns across Condé Nast mobile brands",
      width: 2880,
      height: 1553,
    },
    // Diagnostic travel — intentionally strong; refine after motion is confirmed.
    travel: 180,
    objectPosition: "50% 50%",
    layout: "featured",
  },
  {
    id: "mums-united",
    name: "Mums United",
    href: "/work/mums-united",
    caption:
      "Helping Mums United communicate its impact, services and community support with greater clarity.",
    image: {
      src: "/images/work/mums-united/homepage.png",
      alt: "Mums United volunteer packing boxes for community support",
      width: 2400,
      height: 1600,
    },
    // Diagnostic travel — intentionally strong; refine after motion is confirmed.
    travel: 140,
    objectPosition: "50% 50%",
    layout: "secondary",
  },
  {
    id: "verso-design-system",
    name: "Verso Design System",
    href: "/work/verso-design-system",
    caption:
      "A shared design system bringing consistency and flexibility across global brands.",
    image: {
      src: "/images/work/verso-design-system/homepage.png",
      alt: "Verso design system UI collage with navigation and content components",
      width: 2400,
      height: 1600,
    },
    // Diagnostic travel — intentionally strong; refine after motion is confirmed.
    travel: 160,
    objectPosition: "50% 50%",
    layout: "primary",
  },
];

/**
 * Whole-block parallax ranges for `/home-parallax` Test A (image mode).
 * Keyed by layout slot so motion stays with the homepage frame, not a project id.
 */
export const homeParallaxBlockMotion: Record<
  HomeParallaxLayout,
  { from: number; to: number }
> = {
  featured: { from: 35, to: -35 },
  secondary: { from: 70, to: -70 },
  primary: { from: -30, to: 50 },
};

export type HomeParallaxMotionMode = "image" | "block";

export const homeParallaxContact = {
  email: "hriaz.design@gmail.com",
  mailto: "mailto:hriaz.design@gmail.com",
  linkedIn: "https://www.linkedin.com/in/haseeb-riaz-31444220",
  /** Kept for easy restore — contact UI hides Instagram while this is false. */
  showInstagram: false,
  instagram: null as string | null,
  cv: "/documents/Haseeb%20Riaz%20CV%202026.pdf",
};
