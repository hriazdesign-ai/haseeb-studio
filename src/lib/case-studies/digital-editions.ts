import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/digital-editions/case-study";

/** Digital Editions case study — content and crops from Figma node 560:14659. */
export const digitalEditionsCaseStudy: CaseStudy = {
  slug: "digital-editions",
  name: "Digital Editions",
  title:
    "Reimagining magazine publishing through responsive editorial design and interactive reading experiences.",
  disciplines: "Editorial Design · Digital Publishing · Interactive Design",
  theme: getCaseStudyTheme("digital-editions"),
  meta: [
    { label: "Role:", values: ["Senior Product Designer"] },
    {
      label: "Focus:",
      values: ["Responsive Design", "Editorial UX", "Visual Systems"],
    },
    { label: "Platform:", values: ["Web", "Mobile"] },
    { label: "Year:", values: ["2019–2023"] },
  ],
  hero: {
    src: `${base}/hero.png`,
    alt: "Vogue and Wired digital edition mockups across laptop, tablet and phone",
    width: 2560,
    height: 1440,
  },
  introLabel: "Overview",
  intro: [
    "Condé Nast Digital Editions was part of the Mag Apps initiative, an internal platform created to transform editorial content into responsive digital editions across multiple Condé Nast publications.",
    "As Product Designer, I worked on the visual language and layout systems for titles including Vogue and Wired. The aim was to move away from bespoke, platform-specific editions and create a flexible framework that could scale across publications while still reflecting each brand’s identity.",
  ],
  featurePlacement: "beforeChallenge",
  feature: {
    src: `${base}/editorial-system.png`,
    alt: "Responsive editorial system layouts and typography for digital publishing",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption:
      "Editorial system · Developing responsive layouts and typography for digital publishing.",
  },
  challenge: {
    id: "challenge",
    label: "",
    align: "left",
    paragraphs: [
      "Every layout needed to balance two competing needs: preserving the distinctive visual identity of each publication while working within a shared digital framework. Typography, image treatments and editorial patterns were developed to give teams enough flexibility to create expressive stories without relying on bespoke builds.",
      "Rather than replicating print layouts directly, the system adapted them for readability and responsiveness across different screen sizes. This created a more scalable publishing workflow while allowing titles such as Vogue and Wired to retain their own visual voice.",
    ],
  },
  midGallery: [
    {
      src: `${base}/wired-exploration.png`,
      alt: "WIRED digital edition system metrics and typography exploration",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "WIRED exploration · Defining a bold digital identity.",
    },
    {
      src: `${base}/vogue-exploration.png`,
      alt: "Vogue digital edition layout and imagery exploration",
      width: 1120,
      height: 722,
      zoomable: true,
      caption: "Vogue exploration · Defining a refined digital identity.",
    },
  ],
  closingFeature: {
    src: `${base}/digital-covers.png`,
    alt: "Digital edition covers across Condé Nast publications",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption:
      "Digital covers · Preserving the identity of iconic publications across digital editions.",
  },
  result: {
    id: "result",
    label: "Reflection",
    align: "right",
    paragraphs: [
      "Digital Editions reinforced the importance of balancing brand expression with reusable systems. By creating layouts that could adapt across devices and publications, the work helped editorial teams publish more efficiently without making every title feel visually uniform.",
    ],
  },
  postResultFeature: {
    src: `${base}/interactive-edition.png`,
    alt: "Interactive digital edition reading experience on tablet",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption:
      "Interactive edition · Bringing editorial stories to life through responsive reading experiences.",
  },
};
