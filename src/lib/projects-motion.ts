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
  label: "Featured projects",
  title: "Helping organisations simplify complex digital products.",
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
    image,
    role,
    preset,
    objectPosition: positions?.objectPosition ?? "50% 50%",
    mobileObjectPosition: positions?.mobileObjectPosition ?? "50% 50%",
  };
}

/** Visible Figma project order (709:4223). */
export const projectsMotionItems = {
  verso: item(
    experienceById("verso-design-system"),
    "Verso Design System",
    "feature-landscape",
    "A",
    undefined,
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
  onenav: item(
    experienceById("onenav"),
    "OneNav",
    "square-pair",
    "B",
    undefined,
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
  brightPath: item(
    studioById("bright-path-learning"),
    "Bright Path Learning",
    "pair-landscape",
    "A",
    homeImage("bright-path-learning"),
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
