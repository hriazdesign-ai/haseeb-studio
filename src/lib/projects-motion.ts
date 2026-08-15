import { homeParallaxProjects } from "@/lib/home-parallax";
import {
  experienceProjects,
  studioWorkProjects,
  type Project,
} from "@/lib/projects";
import type { WorkMotionItem, WorkMotionPresetId } from "@/lib/work-motion";

/**
 * Projects page layout (Figma Studio Projects 709:4223).
 * Reuses project images/hrefs from `experienceProjects` + `studioWorkProjects`.
 */

export const projectsMotionHero = {
  label: "Featured Case Studies",
  title: "A closer look at the thinking behind the work.",
} as const;

function experienceById(id: string): Project {
  const project = experienceProjects.find((item) => item.id === id);
  if (!project?.image || !project.href) {
    throw new Error(`Missing experience project data for "${id}"`);
  }
  return project;
}

function studioById(id: string): Project {
  const project = studioWorkProjects.find((item) => item.id === id);
  if (!project?.image || !project.href) {
    throw new Error(`Missing studio project data for "${id}"`);
  }
  return project;
}

function homeImage(id: string) {
  const project = homeParallaxProjects.find((item) => item.id === id);
  if (!project) {
    throw new Error(`Missing home-parallax image for "${id}"`);
  }
  return project.image;
}

function item(
  project: Project,
  caption: string,
  role: WorkMotionItem["role"],
  preset: WorkMotionPresetId,
  image = project.image!,
  positions?: { objectPosition?: string; mobileObjectPosition?: string },
): WorkMotionItem {
  return {
    id: project.id,
    caption,
    href: project.href!,
    /**
     * Preserve shared `smallSrc` from portfolio project data even when Case
     * Studies overrides the large/homepage `src` (e.g. home-parallax art).
     */
    image: {
      ...image,
      smallSrc: image.smallSrc ?? project.image?.smallSrc,
      smallWidth: image.smallWidth ?? project.image?.smallWidth,
      smallHeight: image.smallHeight ?? project.image?.smallHeight,
    },
    role,
    preset,
    objectPosition: positions?.objectPosition ?? "50% 50%",
    mobileObjectPosition: positions?.mobileObjectPosition ?? "50% 50%",
  };
}

/**
 * Case Studies page display order and slot roles (Figma 709:4223).
 * Independent from Work-page `workMotionItems` — same project IDs/routes,
 * different featured/slot presentation.
 */
export const projectsMotionItems = {
  onenav: item(
    experienceById("onenav"),
    "OneNav",
    "feature-landscape",
    "A",
    {
      src: "/images/work/onenav/cover-featured.png",
      alt: "OneNav navigation patterns across Condé Nast mobile brands",
      width: 2880,
      height: 1553,
    },
    { objectPosition: "50% 40%", mobileObjectPosition: "50% 35%" },
  ),
  editorial: item(
    experienceById("editorial-experience"),
    "Editorial Platform",
    "square-pair",
    "B",
    undefined,
    { objectPosition: "50% 45%", mobileObjectPosition: "50% 40%" },
  ),
  /** Case Studies only — occupies the square-pair slot (with Editorial). */
  brightPath: item(
    studioById("bright-path-learning"),
    "Bright Path Learning",
    "square-pair",
    "B",
    {
      src: "/images/work/bright-path-learning/bright-path-5.png",
      alt: "Bright Path Learning",
      width: 2400,
      height: 1600,
    },
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 50%" },
  ),
  mumsUnited: item(
    studioById("mums-united"),
    "Transforming Mums United online",
    "pair-landscape",
    "A",
    homeImage("mums-united"),
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 45%" },
  ),
  /** Case Studies only — landscape-pair slot (with Mums United); 6∶4 cover. */
  verso: item(
    experienceById("verso-design-system"),
    "Verso Design System",
    "pair-landscape",
    "A",
    {
      src: "/images/work/verso-design-system/cover-1.png",
      alt: "Verso design system UI collage with navigation and content components",
      width: 3000,
      height: 2000,
    },
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 50%" },
  ),
  meridian: item(
    studioById("meridian-and-co"),
    "Meridian & Co.",
    "offset-landscape",
    "B",
    undefined,
    { objectPosition: "50% 50%", mobileObjectPosition: "50% 45%" },
  ),
} as const;
