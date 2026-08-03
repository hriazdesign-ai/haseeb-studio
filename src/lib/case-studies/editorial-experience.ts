import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/editorial-experience/case-study";

/** Editorial Experience case study — content and crops from Figma node 516:940. */
export const editorialExperienceCaseStudy: CaseStudy = {
  slug: "editorial-experience",
  name: "Editorial Experience",
  title:
    "Designing editorial tools that help publishing teams work faster and smarter.",
  disciplines: "Product Design · UX · Editorial Platform · AI Features",
  theme: getCaseStudyTheme("editorial-experience"),
  meta: [
    { label: "Role:", values: ["Senior Product Designer"] },
    {
      label: "Focus:",
      values: ["Editorial Tools", "AI Experience", "Content Workflows"],
    },
    { label: "Platform:", values: ["Web", "Editorial Platform"] },
    { label: "Year:", values: ["2024–2026"] },
  ],
  hero: {
    src: `${base}/hero.png`,
    alt: "Highlight Box editorial tooling beside a British Vogue mobile preview",
    width: 2560,
    height: 1440,
  },
  intro: [
    "Condé Nast's editorial platform supports the creation and publishing of content across some of the world's best-known brands, including Vogue, GQ, WIRED and Vanity Fair. Used daily by editors, journalists and content producers, the platform plays a central role in how stories move from idea to publication.",
    "Working across multiple areas of the platform, I designed experiences that helped simplify complex editorial workflows while supporting the pace and demands of modern publishing.",
    "Rather than focusing on a single feature, my work spanned several initiatives, from AI-assisted tools and content planning to responsive publishing experiences, navigation improvements and exploration into right-to-left publishing. Every feature shared the same objective: reduce friction, improve clarity and help editorial teams focus on creating great content rather than navigating complicated software.",
  ],
  challengeGalleryPlacement: "before",
  challengeGallery: [
    {
      src: `${base}/content-planner.png`,
      alt: "Content Planner interface for editorial scheduling workflows",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Content Planner · Optimising planning and daily workflows.",
    },
    {
      src: `${base}/expressive-storytelling.png`,
      alt: "Expressive storytelling layout controls in the editorial platform",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Expressive Storytelling · Simplifying advanced editorial layouts.",
    },
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Editorial teams work in fast-moving environments where stories evolve throughout the day and publishing deadlines rarely slow down. As products grow over time, new features and requirements naturally increase complexity, making it more difficult for users to complete everyday tasks efficiently.",
      "The challenge was to improve existing workflows without disrupting the habits that editors had already developed. Any changes needed to feel familiar, reduce unnecessary steps and support a wide variety of publishing scenarios across different brands and teams.",
      "Alongside usability, the platform also needed to evolve to support emerging technologies and changing editorial requirements. AI-assisted experiences, flexible storytelling, mobile publishing and internationalisation all presented new opportunities while introducing additional complexity that needed careful consideration.",
    ],
  },
  pullQuote: {
    appearance: "aside",
    text: "The best editorial tools disappear into the background, letting great journalism take centre stage.",
  },
  featurePlacement: "beforeMidGallery",
  feature: {
    src: `${base}/global-publishing.png`,
    alt: "RTL editorial Copilot interface with Arabic mobile preview",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Global Publishing · Supporting multilingual editorial experiences.",
  },
  midGallery: [
    {
      src: `${base}/future-exploration.png`,
      alt: "Future editorial experience exploration concepts",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Future Exploration · Designing for future editorial needs.",
    },
    {
      src: `${base}/live-experience.png`,
      alt: "Live editorial experience applied across publishing products",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Live Experience · Applied across editorial products.",
    },
  ],
  solution: {
    id: "solution",
    label: "The Solution",
    align: "right",
    paragraphs: [
      "Rather than approaching each feature independently, I looked for opportunities to improve the overall publishing experience by simplifying interactions and creating more consistent interface patterns. Every design decision considered how individual improvements contributed to the wider editorial workflow.",
      "The work included designing AI-assisted experiences that helped editors understand content more quickly, refining planning tools that improved visibility across publishing schedules and exploring flexible storytelling layouts that supported richer editorial experiences.",
      "I also contributed to responsive workflows that allowed products to adapt across devices while investigating solutions for right-to-left publishing to better support international audiences. Close collaboration with product managers, engineers and fellow designers ensured ideas could be tested, refined and implemented in ways that balanced editorial needs with technical constraints.",
      "The result was a collection of improvements that strengthened the platform without introducing unnecessary complexity.",
    ],
  },
  closingFeature: {
    src: `${base}/storytelling-desktop-mobile.png`,
    alt: "Expressive storytelling controls with real-time desktop and mobile previews",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption:
      "Expressive Storytelling · Real-time control across desktop and mobile.",
  },
  result: {
    id: "result",
    label: "The Result",
    align: "left",
    paragraphs: [
      "Working across the editorial platform reinforced the importance of designing products that support real-world workflows rather than idealised processes. Every improvement needed to consider how editors think, collaborate and publish under tight deadlines, making clarity and consistency essential throughout the experience.",
      "By approaching the platform as a connected ecosystem rather than a collection of separate features, the work helped create more intuitive editorial tools that reduced friction while supporting the evolving needs of global publishing teams. The experience strengthened my understanding of enterprise product design, cross-functional collaboration and the value of incremental improvements within complex systems.",
    ],
  },
  outcome: {
    label: "Outcome",
    items: [
      "Improved editorial workflows",
      "Enhanced publishing experience",
      "Introduced AI-assisted tools",
      "Simplified content planning",
      "Supported global publishing",
      "Strengthened design consistency",
    ],
  },
};
