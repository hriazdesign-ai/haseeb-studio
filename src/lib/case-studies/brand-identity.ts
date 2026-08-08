import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/brand-identity/case-study";

/** Brand Identity case study — content from Figma node 562:15562. */
export const brandIdentityCaseStudy: CaseStudy = {
  slug: "brand-identity",
  name: "Brand Identity",
  title:
    "Designing memorable brand identities through thoughtful visual systems, typography and real-world applications.",
  disciplines: "",
  theme: getCaseStudyTheme("brand-identity"),
  /** Approved portfolio light chrome (nav, heading, contact, footer). */
  chrome: "light",
  /** Shared 12-column portfolio heading (label / title / meta). */
  heroLayout: "portfolio",
  meta: [
    { label: "Role:", values: ["Senior Designer"] },
    {
      label: "Focus:",
      values: ["Brand Identity", "Visual Systems", "Art Direction"],
    },
    { label: "Platform:", values: ["Print", "Digital", "Physical"] },
    { label: "Year:", values: ["2011–2021"] },
  ],
  hero: {
    src: `${base}/hero-1.png`,
    mobileSrc: `${base}/hero-1-mobile.png`,
    alt: "Mikado Power Tools brand identity with neon-lit tools on a dark field",
    width: 1620,
    height: 911,
    mobileWidth: 1170,
    mobileHeight: 780,
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  introLabel: "Overview",
  intro: [
    "Brand Identity brings together a selection of identity projects created across hospitality, retail and commercial organisations. Each project established a distinctive visual language that could be applied consistently across every customer touchpoint.",
    "Working as a Creative Designer, I developed logos, typography, colour palettes and supporting brand assets before applying them across packaging, printed communications, marketing materials and digital experiences. The focus was always on creating identities that were both memorable and practical to use.",
  ],
  bodyBlocks: [
    {
      type: "gallery",
      label: "MiA Ice Cream",
      images: [
        {
          src: `${base}/mia-identity.png`,
          alt: "MiA Ice Cream logo with overlapping translucent colour circles",
          width: 1620,
          height: 913,
          zoomable: true,
          caption:
            "MiA Ice Cream · Creating a playful identity for a modern dessert brand.",
        },
        {
          src: `${base}/mia-packaging.png`,
          alt: "MiA Ice Cream packaging on smoothie cups",
          width: 1920,
          height: 1280,
          zoomable: true,
          caption: "Packaging · Extending the brand across products.",
        },
      ],
    },
    {
      type: "feature",
      label: "Street Foods",
      image: {
        src: `${base}/street-foods-1.png`,
        mobileSrc: `${base}/street-foods-1-mobile.png`,
        alt: "BMÔH Street Foods stencilled logo on a textured wall",
        width: 1920,
        height: 1080,
        mobileWidth: 1170,
        mobileHeight: 780,
        zoomable: true,
        caption:
          "Street Foods · Building a memorable identity for a food brand.",
      },
    },
    {
      type: "narrative",
      narrative: {
        id: "approach",
        label: "",
        align: "left",
        paragraphs: [
          "Every brand required its own personality, audience and visual language. Rather than relying on trends, each identity was shaped around the values of the organisation, creating systems that could adapt across packaging, stationery, signage and promotional materials.",
          "Beyond the logo itself, the work extended into complete identity applications, ensuring every touchpoint felt connected and recognisable while remaining flexible enough to evolve over time.",
        ],
      },
    },
    {
      type: "gallery",
      label: "Hotei Sushi",
      images: [
        {
          src: `${base}/hotei-identity.png`,
          alt: "Hotei Sushi logo in pink script and bold black type",
          width: 1920,
          height: 1080,
          zoomable: true,
          caption:
            "Restaurant identity · Designing a bold hospitality brand.",
        },
        {
          src: `${base}/hotei-touchpoints.png`,
          alt: "Hotei Sushi wine list and printed touchpoints",
          width: 1920,
          height: 1080,
          zoomable: true,
          caption: "Stationery · Consistent business touchpoints.",
        },
      ],
    },
    {
      type: "gallery",
      label: "Vietnamese Noodle Bar",
      images: [
        {
          src: `${base}/vietnamese-identity.png`,
          alt: "Vietnamese Noodle Bar Restaurants logo with bowl and chopsticks mark",
          width: 1920,
          height: 1080,
          zoomable: true,
          caption:
            "Restaurant branding · Creating a distinctive visual identity.",
        },
        {
          src: `${base}/vietnamese-stationery.png`,
          alt: "Vietnamese Noodle Bar letterhead, business cards and envelope",
          width: 1920,
          height: 1080,
          zoomable: true,
          caption:
            "Business stationery · Reinforcing the visual identity.",
        },
      ],
    },
    {
      type: "narrative",
      narrative: {
        id: "reflection",
        label: "Reflection",
        align: "right",
        paragraphs: [
          "Designing brand identities reinforced the importance of simplicity, consistency and longevity. The strongest identities were those that could move effortlessly between print, packaging and digital applications while remaining instantly recognisable.",
        ],
      },
    },
    {
      type: "feature",
      label: "Balqees",
      image: {
        src: `${base}/balqees-logo-1.png`,
        mobileSrc: `${base}/balqees-logo-1-mobile.png`,
        alt: "Balqees geometric gold honey bee logo on a deep maroon patterned field",
        width: 1620,
        height: 900,
        mobileWidth: 1170,
        mobileHeight: 780,
        zoomable: true,
        caption:
          "Balqees · Developing a premium identity inspired by heritage.",
      },
    },
    {
      type: "gallery",
      label: "Balqees applications",
      images: [
        {
          src: `${base}/balqees-packaging.png`,
          alt: "Balqees honey jars with gold labels and black lids",
          width: 1620,
          height: 911,
          zoomable: true,
          caption:
            "Luxury branding · Applying the identity across retail packaging.",
        },
        {
          src: `${base}/balqees-applications.png`,
          alt: "Balqees gift box and premium shopping bag with gold logo",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Brand applications · Creating premium retail packaging.",
        },
      ],
    },
  ],
};
