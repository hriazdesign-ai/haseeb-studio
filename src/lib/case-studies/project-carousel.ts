import {
  experienceProjects,
  portfolioProjectOrder,
  studioWorkProjects,
  type Project,
} from "@/lib/projects";
import { workMotionItems } from "@/lib/work-motion";

export type CaseStudyCarouselProject = {
  id: string;
  /** Card caption — Work/listing editorial label where available. */
  caption: string;
  href: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  objectPosition?: string;
};

const allProjects: Project[] = [...studioWorkProjects, ...experienceProjects];

const workCaptions = new Map(
  Object.values(workMotionItems).map((item) => [item.id, item.caption]),
);

const workObjectPositions = new Map(
  Object.values(workMotionItems).map((item) => [
    item.id,
    item.objectPosition ?? "50% 50%",
  ]),
);

const orderedIdSet = new Set<string>(portfolioProjectOrder);

function getOrderedPortfolioProjects(): Project[] {
  const byId = new Map(allProjects.map((project) => [project.id, project]));
  const ordered: Project[] = [];

  for (const id of portfolioProjectOrder) {
    const project = byId.get(id);
    if (project) ordered.push(project);
  }
  for (const project of allProjects) {
    if (!orderedIdSet.has(project.id)) ordered.push(project);
  }

  return ordered;
}

/**
 * Every portfolio project (studio + enterprise) in canonical order,
 * excluding the open case study. Links and imagery come from `projects.ts`.
 */
export function getCaseStudyCarouselProjects(
  currentProjectSlug: string,
): CaseStudyCarouselProject[] {
  return getOrderedPortfolioProjects()
    .filter((project) => project.id !== currentProjectSlug)
    .filter(
      (project): project is Project & { image: NonNullable<Project["image"]>; href: string } =>
        Boolean(project.image && project.href),
    )
    .map((project) => ({
      id: project.id,
      caption: workCaptions.get(project.id) ?? project.name,
      href: project.href,
      image: {
        src: project.image.src,
        alt: project.image.alt,
        width: project.image.width,
        height: project.image.height,
      },
      objectPosition: workObjectPositions.get(project.id) ?? "50% 50%",
    }));
}
