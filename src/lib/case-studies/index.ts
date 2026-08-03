import { brandIdentityCaseStudy } from "./brand-identity";
import { brightPathLearningCaseStudy } from "./bright-path-learning";
import { deliveryDropCaseStudy } from "./delivery-drop";
import { digitalEditionsCaseStudy } from "./digital-editions";
import { editorialExperienceCaseStudy } from "./editorial-experience";
import { editorialPublicationsCaseStudy } from "./editorial-publications";
import { meridianAndCoCaseStudy } from "./meridian-and-co";
import { mumsUnitedCaseStudy } from "./mums-united";
import { oneNavCaseStudy } from "./onenav";
import { versoDesignSystemCaseStudy } from "./verso-design-system";
import type { CaseStudy } from "./types";

export type {
  CaseStudy,
  CaseStudyBodyBlock,
  CaseStudyImage,
  CaseStudyNarrative,
  CaseStudyTheme,
} from "./types";

export { getCaseStudyTheme, projectThemes, studioTheme } from "@/lib/project-themes";
export type { ProjectTheme, ProjectThemeId } from "@/lib/project-themes";

export const caseStudies: CaseStudy[] = [
  mumsUnitedCaseStudy,
  brightPathLearningCaseStudy,
  meridianAndCoCaseStudy,
  versoDesignSystemCaseStudy,
  oneNavCaseStudy,
  editorialExperienceCaseStudy,
  digitalEditionsCaseStudy,
  editorialPublicationsCaseStudy,
  brandIdentityCaseStudy,
  deliveryDropCaseStudy,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
