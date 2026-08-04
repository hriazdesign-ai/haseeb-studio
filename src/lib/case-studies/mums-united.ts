import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/mums-united/case-study";

/** Mums United case study — content and crops from Figma node 515:931. */
export const mumsUnitedCaseStudy: CaseStudy = {
  slug: "mums-united",
  name: "Mums United",
  title:
    "Helping a community organisation communicate its impact and support families more clearly.",
  disciplines: "Community Impact · Website Design · UI · Development",
  theme: getCaseStudyTheme("mums-united"),
  /** Approved portfolio light chrome (nav, heading, contact, footer). */
  chrome: "light",
  /** Shared 12-column portfolio heading (label / title / meta). */
  heroLayout: "portfolio",
  meta: [
    { label: "Role:", values: ["Product Designer & Developer"] },
    {
      label: "Focus:",
      values: ["UI/UX", "Responsive Design", "Design System"],
    },
    { label: "Platform:", values: ["Web", "Mobile"] },
    { label: "Year:", values: ["2026"] },
  ],
  hero: {
    src: `${base}/mu-hero.jpg`,
    alt: "Mums United website homepage in a desktop browser mockup",
    width: 2560,
    height: 1440,
  },
  intro: [
    "Mums United supports mothers, young people and families across Sheffield through mentoring, community programmes and practical support.",
    "The goal was to create a digital presence that better reflected the organisation's impact while making support, information and programmes easier to find and understand.",
  ],
  pullQuote: {
    image: {
      src: `${base}/pull-quote.png`,
      alt: "Young person training with boxing gloves and a punching bag",
      width: 2560,
      height: 1440,
    },
    text: "Every programme, service and conversation begins with trust.",
  },
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Parents and families often arrive looking for support during difficult circumstances. They need clear information, reassurance and confidence that the organisation can help.",
      "The existing website contained valuable information and programmes, but much of it was difficult to navigate and did not fully communicate the scale of Mums United's work.",
    ],
  },
  challengeGallery: [
    {
      src: `${base}/service-overview.png`,
      alt: "Service overview UI showing family support messaging",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Service Overview · Helping Parents Access Local Support",
    },
    {
      src: `${base}/programme-directory.png`,
      alt: "Programme directory UI with community activity cards",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Programme Directory · Community Activities & Events",
    },
  ],
  feature: {
    src: `${base}/programmes-feature.png`,
    alt: "Programmes page in a desktop browser mockup on a gold field",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Responsive Design · Support Services Platform",
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
      src: `${base}/mobile-experience.png`,
      alt: "Mobile phone mockup showing a Mums United programme page",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Mobile Experience · Community Support & Resources",
    },
    {
      src: `${base}/impact-snapshot.png`,
      alt: "Impact statistic card reading 600+ young people engaged",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Impact Snapshot · Building Trust Through Transparency",
    },
  ],
  result: {
    id: "result",
    label: "The Result",
    align: "left",
    paragraphs: [
      "Mums United now has a clearer and more professional digital presence that better reflects the organisation's impact and the breadth of its work.",
      "Families can more quickly understand the support available, while the organisation has a stronger platform for sharing programmes, achievements and future initiatives.",
      "The result is a more trustworthy and accessible experience that creates a stronger foundation for future growth and community engagement.",
    ],
  },
  outcome: {
    label: "Outcome",
    items: [
      "Clearer communication of services",
      "Easier access to support information",
      "Improved trust and credibility",
      "Stronger platform for community programmes",
      "Better storytelling of impact",
    ],
  },
};
