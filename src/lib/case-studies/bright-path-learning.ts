import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/bright-path-learning/case-study";

/** Bright Path Learning case study — content and crops from Figma node 514:6214. */
export const brightPathLearningCaseStudy: CaseStudy = {
  slug: "bright-path-learning",
  name: "Bright Path Learning",
  title:
    "Helping an education provider build trust with parents and students.",
  disciplines: "Education · Website Design · UI · Development",
  theme: getCaseStudyTheme("bright-path-learning"),
  meta: [
    { label: "Role:", values: ["Product Designer"] },
    {
      label: "Focus:",
      values: ["UX/UI Design", "Visual Design"],
    },
    { label: "Platform:", values: ["Responsive Web", "Development"] },
    { label: "Year:", values: ["2026"] },
  ],
  hero: {
    src: `${base}/hero.png`,
    alt: "Bright Path Learning website homepage in a desktop browser mockup",
    width: 2560,
    height: 1440,
  },
  intro: [
    "Bright Path Learning is a tutoring website designed to feel calm, clear and reassuring. The goal was to help parents quickly understand the support available, feel confident in the service, and take the next step without confusion.",
    "The project focused on creating a more polished digital presence for a learning provider, with clear routes into services, student support, programmes and contact.",
  ],
  challengeGalleryPlacement: "before",
  challengeGallery: [
    {
      src: `${base}/mobile-confidence.png`,
      alt: "Mobile mockup showing Bright Path Learning clear messaging",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Building confidence · Clear messaging and reassurance.",
    },
    {
      src: `${base}/mobile-support.png`,
      alt: "Mobile mockup showing Bright Path Learning social proof",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Trusted support · Social proof and credibility.",
    },
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Parents looking for tutoring support often arrive with uncertainty. They want to know whether the service is suitable, what kind of support is offered, and whether they can trust the provider.",
      "The challenge was to create a website that answered those questions quickly, while still feeling warm, professional and easy to navigate.",
    ],
  },
  pullQuote: {
    image: {
      src: `${base}/pull-quote.png`,
      alt: "Two children studying together at a table",
      width: 2560,
      height: 1440,
    },
    text: "A learning website should reduce uncertainty, not add to it.",
  },
  solution: {
    id: "solution",
    label: "The Solution",
    align: "right",
    paragraphs: [
      "The design uses a calm visual system, structured page layouts and clear messaging to guide users through the service.",
      "Key areas were separated into simple journeys: services, student support, programmes and contact. This helped make the site feel easier to understand and more useful for parents comparing education options.",
    ],
  },
  solutionGallery: [
    {
      src: `${base}/service-overview.png`,
      alt: "Desktop UI showing Bright Path Learning service overview",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Service overview. Helping parents understand available support.",
    },
    {
      src: `${base}/student-support.png`,
      alt: "Desktop UI showing Bright Path Learning student support page",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Student support. Clear pathways to information and contact.",
    },
  ],
  result: {
    id: "result",
    label: "The Result",
    align: "left",
    paragraphs: [
      "Bright Path Learning now has a more confident and professional digital presence that better reflects the quality of its service.",
      "Parents can more quickly understand the support available, navigate the website with greater ease and feel more confident in taking the next step.",
      "The result is a clearer experience that builds trust and creates a stronger foundation for future enquiries and growth.",
    ],
  },
  outcome: {
    label: "Outcome",
    items: [
      "Clearer service navigation",
      "Improved credibility",
      "Better communication of support",
      "Stronger digital foundation",
    ],
  },
};
