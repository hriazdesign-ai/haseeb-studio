import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/meridian-and-co/case-study";

/** Meridian & Co. case study — content and crops from Figma node 515:700. */
export const meridianAndCoCaseStudy: CaseStudy = {
  slug: "meridian-and-co",
  name: "Meridian & Co.",
  title: "Accounting built around clarity and confidence.",
  disciplines:
    "Accounting Services · Financial Planning · Small Business Support",
  theme: getCaseStudyTheme("meridian-and-co"),
  /** Approved portfolio light chrome (nav, heading, contact, footer). */
  chrome: "light",
  /** Shared 12-column portfolio heading (label / title / meta). */
  heroLayout: "portfolio",
  meta: [
    { label: "Role:", values: ["Product Designer & Developer"] },
    {
      label: "Focus:",
      values: ["UX/UI Design", "Visual Design", "Responsive Design"],
    },
    { label: "Platform:", values: ["Responsive Web", "Development"] },
    { label: "Year:", values: ["2026"] },
  ],
  liveSite: {
    href: "https://meridian-co-accounting.vercel.app/",
    label: "Live site:",
    text: "Visit website ↗",
  },
  hero: {
    src: `${base}/hero-2.png`,
    mobileSrc: `${base}/hero-2-mobile.png`,
    alt: "Tablet mockup showing the Meridian & Co. website on a desk",
    width: 2880,
    height: 1440,
    mobileWidth: 1560,
    mobileHeight: 1006,
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  intro: [
    "Meridian & Co. is a modern accountancy practice supporting individuals, freelancers and small businesses with accounting, tax and financial planning services.",
    "The goal was to create a professional digital presence that builds trust quickly while making complex financial services feel approachable and easy to understand.",
    "The website needed to communicate expertise without overwhelming visitors with technical language. It also needed to create clear pathways into services, helping people quickly identify the support that was relevant to them and feel confident taking the next step.",
  ],
  challengeGalleryPlacement: "before",
  challengeGallery: [
    {
      src: `${base}/account-1.png`,
      alt: "Mobile mockup of the Meridian & Co. website",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Mobile Experience · Financial Support Across Every Device",
    },
    {
      src: `${base}/account-3.png`,
      alt: "Meridian & Co. Our Results and Our Approach sections",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Results & Approach · Building Trust Through Experience And Expertise",
    },
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Many accounting websites rely on industry jargon, dense content and outdated layouts that can make financial services feel intimidating.",
      "The existing approach lacked clear service pathways and did little to communicate expertise, trust and the personal nature of the firm's support.",
      "For many small businesses and individuals, choosing an accountant is built on confidence and credibility. The challenge was to create a digital experience that felt professional and trustworthy while simplifying information that is often perceived as complex or confusing.",
    ],
  },
  pullQuote: {
    image: {
      src: `${base}/pull-quote.png`,
      alt: "Hands using a calculator and writing financial notes",
      width: 2560,
      height: 1440,
    },
    text: "Helping businesses feel more confident about their finances.",
  },
  /* Large feature sits directly under the quote; pair follows. */
  featurePlacement: "beforeMidGallery",
  midGallery: [
    {
      src: `${base}/account-2.png`,
      alt: "Meridian & Co. homepage hero with Financial clarity, made simple messaging",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Homepage · Creating A Clear And Confident First Impression",
    },
    {
      src: `${base}/account-4.png`,
      alt: "Mobile mockups showing Meridian & Co. audience segments and results metrics",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Responsive Design · Making Key Information Clear On Mobile",
    },
  ],
  feature: {
    src: `${base}/account-5.png`,
    videoSrc: `/videos/meridian/account2.webm`,
    mobileSrc: `${base}/account-5-mobile.png`,
    alt: "Desktop layouts showing Meridian & Co. audience segments, results, testimonial and contact call to action",
    width: 2344,
    height: 1563,
    mobileWidth: 2340,
    mobileHeight: 1560,
    zoomable: true,
    caption: "Trust & Conversion · Building Confidence From Proof To Enquiry",
  },
  solution: {
    id: "solution",
    label: "The Solution",
    align: "right",
    paragraphs: [
      "The design uses a clean visual system, clear page hierarchy and structured service layouts to help visitors quickly understand what the firm offers and how it can help. Key areas were organised into simple journeys around tax, bookkeeping and business support, making information easier to scan and improving confidence when getting in touch.",
      "Trust signals, client-focused messaging and clear calls to action were introduced throughout the experience to reduce friction and encourage enquiries. The result is a website that balances professionalism with approachability, creating an experience that feels credible, welcoming and easy to navigate for both individuals and businesses.",
    ],
  },
  solutionGallery: [
    {
      src: `${base}/account-6a.png`,
      alt: "Mobile mockup of the Meridian & Co. contact page",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Approach & Contact · From Personal Support To A Clear Next Step",
    },
    {
      src: `${base}/account-7.png`,
      alt: "Services section listing Meridian & Co. accounting and tax offerings",
      width: 1300,
      height: 838,
      zoomable: true,
      caption: "Services · Making Accounting Support Clear And Easy To Navigate",
    },
  ],
  result: {
    id: "result",
    label: "The Result",
    align: "left",
    paragraphs: [
      "Meridian & Co. now has a more professional and credible digital presence that better reflects the quality of its services and expertise.",
      "The new website makes it easier for individuals and businesses to understand available services, enquire with confidence and build long-term relationships with the firm.",
      "By simplifying navigation and presenting information more clearly, the website creates a stronger first impression and better supports prospective clients at every stage of their journey. It also provides a scalable foundation that can evolve as the practice grows and introduces new services in the future.",
      "The result is an approachable and trustworthy online experience that provides a stronger foundation for future growth.",
    ],
  },
  outcome: {
    label: "Outcome",
    items: [
      "Clearer service journeys",
      "Improved trust and credibility",
      "Easier access to financial services",
      "Stronger digital presence for the practice",
      "Increased confidence when making enquiries",
    ],
  },
};
