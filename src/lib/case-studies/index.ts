import { mumsUnitedCaseStudy } from "./mums-united";
import type { CaseStudy } from "./types";

export type {
  CaseStudy,
  CaseStudyImage,
  CaseStudyNarrative,
  CaseStudyTheme,
} from "./types";

export const caseStudies: CaseStudy[] = [mumsUnitedCaseStudy];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
