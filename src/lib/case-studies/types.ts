export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Enable zoom-in lightbox for detailed UI screenshots. */
  zoomable?: boolean;
  caption?: string;
};

export type CaseStudyMetaGroup = {
  label: string;
  values: string[];
};

export type CaseStudyNarrative = {
  id: string;
  label: string;
  /** `left` | `right` column placement on desktop (Figma 2-col grid). */
  align: "left" | "right";
  paragraphs: string[];
};

/** Per-project colours for hero + shared SiteHeader theming. */
export type CaseStudyTheme = {
  heroBackground: string;
  navBackground: string;
  navForeground: string;
  navUnderline: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  disciplines: string;
  theme: CaseStudyTheme;
  meta: CaseStudyMetaGroup[];
  hero: CaseStudyImage;
  intro: string[];
  pullQuote: {
    image: CaseStudyImage;
    text: string;
  };
  challenge: CaseStudyNarrative;
  challengeGallery: [CaseStudyImage, CaseStudyImage];
  feature: CaseStudyImage;
  solution: CaseStudyNarrative;
  solutionGallery: [CaseStudyImage, CaseStudyImage];
  result: CaseStudyNarrative;
  outcome: {
    label: string;
    items: string[];
  };
};
