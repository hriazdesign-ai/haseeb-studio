import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/delivery-drop/case-study";

/** Delivery Drop case study — content from Figma node 559:14000. */
export const deliveryDropCaseStudy: CaseStudy = {
  slug: "delivery-drop",
  name: "Delivery Drop",
  title:
    "Designing a rapid grocery delivery platform that combined product design, brand identity and launch strategy into a cohesive customer experience.",
  disciplines: "",
  theme: getCaseStudyTheme("delivery-drop"),
  /** Approved portfolio light chrome (nav, heading, contact, footer). */
  chrome: "light",
  /** Shared 12-column portfolio heading (label / title / meta). */
  heroLayout: "portfolio",
  meta: [
    { label: "Role:", values: ["Lead Designer"] },
    {
      label: "Focus:",
      values: ["Product Design", "Brand Identity", "Digital Experience"],
    },
    { label: "Platform:", values: ["Web", "Mobile"] },
    { label: "Year:", values: ["2021–2022"] },
  ],
  hero: {
    src: `${base}/hero-1.png`,
    mobileSrc: `${base}/hero-1-mobile.png`,
    alt: "Delivery Drop logo and illustrated orange character on a green field",
    width: 1620,
    height: 911,
    mobileWidth: 1170,
    mobileHeight: 780,
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  introLabel: "Overview",
  intro: [
    "Delivery Drop is a UK-based quick-commerce platform designed to help independent retailers offer fast local grocery delivery through a seamless digital experience.",
    "As Creative Director for the startup, I shaped the creative vision across the product, brand and launch campaign. From the customer experience and interface design to the visual identity, advertising and marketing assets, the goal was to create a cohesive brand from the ground up.",
  ],
  bodyBlocks: [
    {
      type: "gallery",
      label: "Discovery and wireframes",
      images: [
        {
          src: `${base}/journey-mapping.png`,
          alt: "Delivery Drop journey map connecting retailers, drivers and customers",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Journey mapping · Defining the end-to-end customer journey.",
        },
        {
          src: `${base}/wireframes.png`,
          alt: "Delivery Drop mobile wireframe screens exploring key user flows",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Wireframes · Exploring layouts, interactions and key user flows.",
        },
      ],
    },
    {
      type: "feature",
      label: "Category browsing",
      parallax: false,
      image: {
        src: `${base}/category-browsing-1.png`,
        mobileSrc: `${base}/category-browsing-1-mobile.png`,
        alt: "Delivery Drop category tiles and mobile shopping screens",
        width: 3240,
        height: 2072,
        mobileWidth: 1170,
        mobileHeight: 780,
        zoomable: true,
        caption:
          "Category browsing · Creating a simple and visual shopping experience.",
      },
    },
    {
      type: "narrative",
      narrative: {
        id: "approach",
        label: "",
        align: "left",
        paragraphs: [
          "Every interaction was designed to create a consistent experience across the customer journey from browsing products to placing an order. Navigation, information hierarchy and checkout flows were simplified to reduce friction, while reusable interface patterns established a scalable foundation for future growth.",
          "Beyond the application itself, the project extended into launch campaigns, marketing materials and promotional assets, creating a cohesive brand experience across every customer touchpoint.",
        ],
      },
    },
    {
      type: "gallery",
      label: "Basket and delivery tracking",
      images: [
        {
          src: `${base}/unified-basket.png`,
          alt: "Delivery Drop unified basket with products from multiple retailers",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Unified basket · Bringing products from multiple retailers into a single checkout.",
        },
        {
          src: `${base}/delivery-tracking.png`,
          alt: "Delivery Drop order tracking map and status screens",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Delivery tracking · Visualising the journey from checkout to doorstep.",
        },
      ],
    },
    {
      type: "feature",
      label: "Illustration system",
      image: {
        src: `${base}/illustration-system-1.png`,
        mobileSrc: `${base}/illustration-system-1-mobile.png`,
        alt: "Delivery Drop brand illustrations including characters and product icons",
        width: 3240,
        height: 2072,
        mobileWidth: 1170,
        mobileHeight: 780,
        zoomable: true,
        caption:
          "Illustration system · Creating a friendly and recognisable brand personality.",
      },
    },
    {
      type: "gallery",
      label: "Physical branding and launch",
      images: [
        {
          src: `${base}/physical-branding.png`,
          alt: "Delivery Drop branded green delivery bag",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Physical branding · Extending the identity into the real world.",
        },
        {
          src: `${base}/launch-campaign.png`,
          alt: "Delivery Drop launch campaign poster with Local shopping made easy",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Launch campaign · Building awareness across digital and print.",
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
          "Delivery Drop reinforced the value of designing a product and its brand as one connected experience. By shaping everything from the interface to advertising and physical touchpoints, every interaction contributed to a more recognisable and consistent service.",
        ],
      },
    },
    {
      type: "feature",
      label: "Digital advertising",
      parallax: false,
      image: {
        src: `${base}/digital-advertising-1a.png`,
        mobileSrc: `${base}/digital-advertising-1-mobile.png`,
        alt: "Delivery Drop digital advertising campaign across online channels",
        width: 3240,
        height: 2072,
        mobileWidth: 1170,
        mobileHeight: 780,
        zoomable: true,
        caption:
          "Digital advertising · Art directing a campaign across multiple online channels.",
      },
    },
  ],
};
