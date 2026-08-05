import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/verso-design-system/case-study";

/** Verso Design System case study — content and crops from Figma node 530:1451. */
export const versoDesignSystemCaseStudy: CaseStudy = {
  slug: "verso-design-system",
  name: "Verso Design System",
  title:
    "Building a scalable design system for Condé Nast's global products.",
  disciplines:
    "Design System · Product Design · Documentation · Component Library",
  theme: getCaseStudyTheme("verso-design-system"),
  /** Approved portfolio light chrome (nav, heading, contact, footer). */
  chrome: "light",
  /** Shared 12-column portfolio heading (label / title / meta). */
  heroLayout: "portfolio",
  meta: [
    { label: "Role:", values: ["Senior Product Designer"] },
    {
      label: "Focus:",
      values: ["Design Systems", "UI Architecture", "Component Design"],
    },
    { label: "Platform:", values: ["Web", "Storybook / Figma"] },
    { label: "Year:", values: ["2022–2026"] },
  ],
  hero: {
    src: `${base}/hero.png`,
    alt: "Verso design system component collage on a deep navy field",
    width: 2560,
    height: 1440,
  },
  intro: [
    "Verso is Condé Nast's shared design system, created to bring consistency across digital products used by editorial teams around the world.",
    "Rather than designing individual interfaces in isolation, the system provides a common foundation of reusable components, design principles and documentation that enables teams to build products more efficiently while maintaining a consistent user experience.",
    "As part of the design systems team, I contributed to the continued evolution of Verso by designing and refining components, improving documentation and helping establish patterns that could scale across multiple products. My work focused on balancing consistency with flexibility, ensuring the system could support different editorial workflows without becoming restrictive.",
    "The project required close collaboration between product designers, engineers and stakeholders, creating shared solutions that improved both the design process and the products themselves.",
  ],
  challengeGalleryPlacement: "before",
  challengeGallery: [
    {
      src: `${base}/system-onboarding.png`,
      alt: "Verso system onboarding documentation interface",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "System onboarding · Helping teams adopt shared standards.",
    },
    {
      src: `${base}/simplifying-system.png`,
      alt: "Verso component simplification documentation",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Simplifying the system · Reducing complexity across components.",
    },
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "As digital products evolved across different teams, inconsistencies naturally began to appear. Components solved similar problems in different ways, documentation varied between projects and new features often required teams to recreate patterns that already existed elsewhere.",
      "The challenge wasn't simply to create a library of UI components. It was to establish a system that encouraged consistency while remaining flexible enough to support the diverse needs of editorial products across multiple brands.",
      "Every new component needed to consider accessibility, responsive behaviour, scalability and future maintenance. Decisions made at system level would influence many products rather than a single interface, making clarity and long-term thinking essential throughout the design process.",
    ],
  },
  pullQuote: {
    appearance: "aside",
    text: "Good design systems don't create consistency for its own sake. They create confidence for designers, engineers and the teams they build together.",
  },
  midGallery: [
    {
      src: `${base}/design-tokens.png`,
      alt: "Verso design tokens documentation in Storybook",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Design tokens · Creating a shared design language.",
    },
    {
      src: `${base}/in-production.png`,
      alt: "Verso components applied in a live editorial product",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "In production · Applied across editorial products.",
    },
  ],
  feature: {
    src: `${base}/across-brands.png`,
    mobileSrc: `${base}/across-brands-mobile.png`,
    alt: "Verso components supporting multiple editorial brand experiences",
    width: 2304,
    height: 1440,
    mobileWidth: 1170,
    mobileHeight: 780,
    zoomable: true,
    caption: "Across every brand · Supporting multiple editorial experiences.",
  },
  solution: {
    id: "solution",
    label: "The Solution",
    align: "right",
    paragraphs: [
      "Rather than approaching components as isolated interface elements, each pattern was considered as part of a larger design language. Existing solutions were reviewed, simplified where possible and documented to provide designers and engineers with a shared reference for implementation.",
      "Alongside component design, significant effort was placed on improving documentation. Clear guidance helped communicate intended behaviour, usage and responsive considerations, reducing ambiguity during implementation and making the system easier to adopt across teams.",
      "The work also explored design tokens, reusable layouts, navigation patterns and utility components that could be combined to support a wide range of editorial experiences while maintaining visual consistency.",
      "Throughout the project, collaboration between design and engineering remained central. Components were refined through discussion, testing and iteration, ensuring the final system was practical to implement as well as intuitive to use.",
    ],
  },
  closingFeature: {
    src: `${base}/built-for-publishing.png`,
    mobileSrc: `${base}/built-for-publishing-mobile.png`,
    alt: "Verso components applied across Condé Nast publishing brands",
    width: 2304,
    height: 1440,
    mobileWidth: 1170,
    mobileHeight: 780,
    zoomable: true,
    caption: "Built for publishing · Applied across Condé Nast brands.",
  },
  result: {
    id: "result",
    label: "The Result",
    align: "left",
    paragraphs: [
      "Working on Verso strengthened the consistency of digital products while improving the efficiency of the teams building them. Shared components reduced duplication, documentation improved implementation and common patterns helped create a more unified experience across products.",
      "More importantly, the project demonstrated how thoughtful systems thinking can influence far more than individual interfaces. Small decisions made at component level contributed to a stronger, more maintainable foundation that benefited designers, engineers and users alike.",
    ],
  },
  outcome: {
    label: "Outcome",
    items: [
      "Shared design language across multiple products",
      "Reusable component library",
      "Consistent implementation across teams",
      "Improved editorial experiences",
      "Stronger cross-functional collaboration",
      "Scalable foundation for future growth",
    ],
  },
};
