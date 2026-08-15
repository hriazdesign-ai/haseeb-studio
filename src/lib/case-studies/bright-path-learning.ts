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
  /** Approved portfolio light chrome (nav, heading, contact, footer). */
  chrome: "light",
  /** Shared 12-column portfolio heading (label / title / meta). */
  heroLayout: "portfolio",
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
    src: `${base}/hero-3.png`,
    mobileSrc: `${base}/hero-3-mobile.png`,
    alt: "Bright Path Learning website homepage in a desktop browser mockup",
    width: 2880,
    height: 1440,
    mobileWidth: 1560,
    mobileHeight: 1006,
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  intro: [
    "Bright Path Learning is a tutoring website designed to feel calm, clear and reassuring. The goal was to help parents quickly understand the support available, feel confident in the service, and take the next step without confusion.",
    "The project focused on creating a more polished digital presence for a learning provider, with clear routes into services, student support, programmes and contact.",
  ],
  challengeGalleryPlacement: "before",
  challengeGallery: [
    {
      src: `${base}/bright-1.png`,
      alt: "Mobile mockup showing Bright Path Learning clear messaging",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Clear Messaging · Helping Families Understand The Support Available" ,
    },
    {
      src: `${base}/bright-2.png`,
      videoSrc: `/videos/bright-path-learning/bright-2.webm`,
      alt: "Mobile mockup showing Bright Path Learning social proof",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Trusted Support · Building Confidence Through Social Proof",
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
      src: `${base}/bright-3.png`,
      alt: "Desktop UI showing Bright Path Learning service overview",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Services · Making Tutoring Options Clear And Easy To Explore",
    },
    {
      src: `${base}/bright-4.png`,
      alt: "Desktop UI showing Bright Path Learning student support page",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Student Support · Guiding Families Towards The Right Help.",
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
