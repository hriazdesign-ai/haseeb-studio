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
      values: ["UI/UX", "Responsive Design", "Visual Design"],
    },
    { label: "Platform:", values: ["Web", "Mobile"] },
    { label: "Year:", values: ["2026"] },
  ],
  hero: {
    src: `${base}/hero-2.png`,
    mobileSrc: `${base}/hero-2-mobile.png`,
    alt: "Mums United website homepage in a desktop browser mockup",
    width: 2880,
    height: 1440,
    mobileWidth: 1560,
    mobileHeight: 1006,
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  intro: [
    "Mums United supports mothers, young people and families across Sheffield through mentoring, community programmes and practical support.",
    "The goal was to create a digital presence that better reflected the organisation's impact while making support, information and programmes easier to find and understand.",
  ],
  /**
   * Open with the 2-up + large feature cluster after intro; pull-quote image
   * moves to after The Challenge (where the cluster previously sat).
   */
  challengeGalleryPlacement: "before",
  featurePlacement: "beforeChallenge",
  challengeGallery: [
    {
      src: `${base}/mu-1.png`,
      alt: "Service overview UI showing family support messaging",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Service Overview · Helping Families Access The Right Support",
    },
    {
      src: `${base}/mu-2.png`,
      alt: "Mums United About page showing the organisation's story and purpose",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "About · Introducing The Purpose & People Behind Mums United",
    },
  ],
  feature: {
    src: `${base}/mu-lf-2.png`,
    videoSrc: `/videos/mums-united/mu-lf-2.webm`,
    alt: "Mums United homepage scrolling inside a desktop browser mockup",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Homepage Experience · Bringing The Full Mums United Story Together",
  },
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
  solution: {
    id: "solution",
    label: "The Solution",
    align: "right",
    paragraphs: [
      "The design uses a calm visual system, structured page layouts and clear messaging to guide users through the service.",
      "Key areas were organised into clear journeys around support services, programmes, community impact and contact. This made the organisation’s work easier to understand and helped families find relevant support more quickly.",
    ],
  },
  solutionGallery: [
    {
      src: `${base}/mu-3.png`,
      alt: "Mobile phone mockup showing a Mums United programme page",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Past Programmes · Showcasing Mums United's Community Initiatives",
    },
    {
      src: `${base}/mu-4.png`,
      alt: "Mums United mobile screens showing the mission and donation experience",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Mobile Experience · Making Support Accessible On The Go",
    },
  ],
  extension: {
    label: "Beyond the website",
    heading: "A consistent presence across every touchpoint.",
    paragraphs: [
      "The identity extended beyond the digital experience into Mums United's everyday communications. I created campaign and outreach materials that helped the charity present a more consistent, recognisable and professional presence across community events, programmes and public-facing activity.",
      "From printed collateral to campaign graphics, each piece used the same visual language established across the wider brand, helping different initiatives feel connected while still allowing individual programmes to have their own character.",
    ],
    gallery: [
      {
        src: `${base}/mums-campaigns.png`,
        alt: "Mums United campaign and outreach communications across community programmes",
        width: 1120,
        height: 722,
        caption:
          "Impact · Making The Organisation’s Reach More Visible",
      },
      {
        src: `${base}/mums-events.png`,
        alt: "Mums United events and physical community activity with brand identity applied",
        width: 1120,
        height: 722,
        caption:
          "Events · Extending The Identity Into Community Spaces",
      },
    ],
    features: [
      {
        src: `${base}/steel-champs-identity.png`,
        mobileSrc: `${base}/steel-champs-identity-mobile.png`,
        alt: "Steel Champs Academy identity for a community boxing programme",
        width: 2344,
        height: 1563,
        mobileWidth: 2340,
        mobileHeight: 1560,
        caption:
          "Steel Champs Academy · Creating An Identity For The Boxing Programme",
      },
      {
        src: `${base}/steel-champs-environment.png`,
        mobileSrc: `${base}/steel-champs-environment-mobile.png`,
        alt: "Steel Champs environmental graphics in a physical training space",
        width: 2344,
        height: 1563,
        mobileWidth: 2340,
        mobileHeight: 1560,
        caption:
          "Environmental Graphics · Bringing The Steel Champs Identity Into The Physical Space",
      },
    ],
  },
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
