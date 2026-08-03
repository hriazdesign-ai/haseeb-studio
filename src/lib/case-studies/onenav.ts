import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/onenav/case-study";

/** OneNav case study — content and crops from Figma node 516:1172. */
export const oneNavCaseStudy: CaseStudy = {
  slug: "onenav",
  name: "OneNav",
  title:
    "Designing a navigation system that could scale across products and brands.",
  disciplines:
    "Product Design · Navigation Systems · Design Systems · Responsive UX",
  theme: getCaseStudyTheme("onenav"),
  meta: [
    { label: "Role:", values: ["Senior Product Designer"] },
    {
      label: "Focus:",
      values: ["Navigation Systems", "Design Systems", "Responsive UX"],
    },
    { label: "Platform:", values: ["Web", "Mobile"] },
    { label: "Year:", values: ["2023–2026"] },
  ],
  hero: {
    src: `${base}/hero.png`,
    alt: "WIRED desktop side navigation beside a mobile navigation mockup",
    width: 2560,
    height: 1440,
  },
  intro: [
    "As Condé Nast's digital products continued to evolve, navigation became an increasingly important part of the overall user experience. Different products had developed their own approaches over time, making it harder to create consistent journeys while increasing the effort required to maintain and extend navigation across teams.",
    "OneNav was created to establish a shared navigation system that could be adopted across multiple editorial products. Rather than creating a single navigation component, the project explored a flexible set of patterns capable of supporting different products, workflows and content structures while maintaining a consistent experience for users.",
    "My role focused on designing reusable navigation components, exploring responsive behaviours and defining interaction patterns that balanced consistency with the unique needs of each product.",
  ],
  challengeGalleryPlacement: "before",
  challengeGallery: [
    {
      src: `${base}/navigation-patterns.png`,
      alt: "OneNav responsive navigation pattern variations",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Navigation patterns · Responsive layout exploration.",
    },
    {
      src: `${base}/navigation-architecture.png`,
      alt: "Annotated OneNav component architecture with spacing rules",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Navigation architecture · Component rules and behaviours.",
    },
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Navigation sits at the heart of almost every product experience, yet it is often shaped by the unique requirements of individual teams. As products evolve independently, navigation patterns naturally begin to diverge, leading to inconsistencies that affect both users and the teams responsible for maintaining them.",
      "The challenge was to create a navigation system that felt familiar regardless of the product, while remaining flexible enough to support different information structures, workflows and editorial requirements. Every decision needed to consider accessibility, responsive behaviour and future scalability without forcing products into a rigid framework.",
      "The project required careful collaboration between design and engineering to ensure navigation patterns were practical to implement while remaining intuitive for users across desktop and mobile experiences.",
    ],
  },
  midGallery: [
    {
      src: `${base}/cross-brand-rollout.png`,
      alt: "OneNav patterns applied across multiple editorial brand navigation bars",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Cross-brand rollout · Shared patterns across editorial brands.",
    },
    {
      src: `${base}/cross-device-navigation.png`,
      alt: "Desktop, tablet and mobile OneNav adaptations",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Cross-device navigation · Desktop, tablet and mobile adaptation.",
    },
  ],
  feature: {
    src: `${base}/responsive-navigation.png`,
    alt: "them. brand desktop and mobile navigation on a purple field",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Responsive navigation · Tablet navigation in context.",
  },
  solution: {
    id: "solution",
    label: "The Solution",
    align: "left",
    paragraphs: [
      "The solution centred on creating a modular navigation system built from reusable components rather than fixed layouts. Navigation behaviours were standardised across desktop and mobile, allowing common interaction patterns to be shared while accommodating the functional requirements of different editorial products.",
      "Information hierarchy, accessibility and responsive behaviour were carefully considered, creating a foundation that reduced complexity for users while remaining flexible enough to support the unique needs of each brand.",
      "The resulting platform established a consistent navigation experience that could scale across Condé Nast's growing portfolio of digital products.",
    ],
  },
  solutionCompanion: {
    id: "platform-evolution",
    label: "Platform Evolution",
    align: "right",
    paragraphs: [
      "With the core navigation platform established, attention shifted to how it could evolve over time. Working alongside product and engineering teams, we investigated new capabilities that could build on the existing foundation without introducing unnecessary complexity.",
      "Concepts included contextual ribbon messaging, adaptive mastheads, enhanced search experiences and richer editorial journeys. Rather than standalone features, these explorations considered how the navigation platform could continue to evolve while remaining consistent, scalable and familiar across every brand.",
    ],
  },
  closingFeature: {
    src: `${base}/platform-evolution.png`,
    alt: "Annotated platform evolution concepts including adaptive masthead, enhanced search and contextual ribbon",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption:
      "Platform Evolution · Exploring concepts for the next phase of the navigation platform.",
  },
  result: {
    id: "result",
    label: "The Result",
    align: "left",
    paragraphs: [
      "One Navigation established a shared navigation platform across Condé Nast's digital products, reducing duplication while improving consistency, scalability and usability. Beyond the initial rollout, the project also created a clear foundation for future enhancements, enabling the platform to evolve without sacrificing its core principles.",
      "The project reinforced the importance of systems thinking beyond visual components. Navigation influences how users understand products, discover information and complete tasks, making it one of the most fundamental parts of the overall experience. Designing at this level required balancing user needs, technical considerations and long-term scalability to create a solution that could continue evolving alongside future products.",
    ],
  },
  outcome: {
    label: "Outcome",
    items: [
      "Shared navigation patterns",
      "Clearer information hierarchy",
      "Consistent user journeys",
      "Responsive by design",
      "Scalable component system",
      "Stronger design consistency",
    ],
  },
};
