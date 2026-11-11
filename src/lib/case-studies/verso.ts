import { getCaseStudyTheme } from "@/lib/project-themes";
import { versoMedia } from "./verso-media";
import type { CaseStudy } from "./types";

/**
 * Verso Design System. Standalone page at `/verso`.
 * Copy and section order from Figma Studio Verso (1555:5335).
 */
export const versoCaseStudy: CaseStudy = {
  slug: "verso-design-system",
  name: "Verso Design System",
  title:
    "Building a scalable design system for Condé Nast's global products.",
  disciplines:
    "Design System · Product Design · Documentation · Component Library",
  theme: getCaseStudyTheme("verso-design-system"),
  chrome: "light",
  heroLayout: "portfolio",
  /** Figma hero left rail — rendered without Role/Focus labels. */
  meta: [
    { label: "Design System", values: ["Design System"] },
    { label: "Component Library", values: ["Component Library"] },
    { label: "Documentation", values: ["Documentation"] },
    { label: "Governance", values: ["Governance"] },
    { label: "Year", values: ["2025"] },
  ],
  hero: versoMedia.hero,
  introLabel: "Project overview",
  intro: [
    "A shared foundation for global products",
    "Verso is Condé Nast's design system, created to bring consistency across digital products while supporting the different needs of editorial teams and publishing brands.",
    "The challenge was to create a common visual language without limiting the flexibility of individual products.",
    "As a Senior Product Designer, I worked across visual design, storefront layouts, reusable components, design tokens and system documentation, helping develop a foundation that could evolve as products and requirements changed.",
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Consistency without uniformity",
      "Condé Nast operates across multiple products, brands and editorial workflows, each with different requirements.",
      "Over time, similar interface patterns had evolved independently, creating inconsistencies in layout, behaviour and implementation.",
    ],
  },
  pullQuote: {
    appearance: "aside",
    text: "Consistency doesn't mean everything should look the same. It's about creating thoughtful foundations that allow different experiences to work together.",
  },
  solution: {
    id: "visual-design",
    label: "Visual design",
    align: "right",
    paragraphs: [
      "Crafting the storefront experience",
      "A significant part of my contribution was designing the visual layouts and storefront experience.",
      "I explored how typography, imagery, spacing and content hierarchy could work together to create interfaces that felt considered, consistent and appropriate for editorial content.",
      "The work involved balancing strong visual expression with practical requirements, including responsive behaviour, varied content lengths and different publishing needs.",
      "The aim was to create layouts that felt purposeful rather than overly prescribed, allowing content to remain the focus.",
    ],
  },
  result: {
    id: "outcome",
    label: "Outcome",
    align: "right",
    paragraphs: [
      "A stronger foundation for future products",
      "Verso helped establish a more consistent and reusable design language across Condé Nast's digital products. Through shared components, clearer documentation and more structured design decisions, teams had a stronger foundation for designing and building interfaces.",
    ],
  },
};

/** Challenge goals column — Figma right rail under The Challenge. */
export const versoChallengeGoals = {
  intro: "The goal was to establish shared foundations that would:",
  items: [
    "Create a more consistent experience.",
    "Reduce duplicated design and development effort.",
    "Support different product and brand requirements.",
    "Make future changes easier to implement and maintain.",
  ],
  closing:
    "The challenge wasn't simply designing individual components. It was understanding how those components would work together as a flexible, scalable system.",
} as const;

export const versoComponentDesign = {
  label: "Component design",
  subhead: "From individual interfaces to reusable patterns",
  paragraphs: [
    "Rather than designing each interface independently, we established reusable patterns that could be applied across different products.",
    "My work involved reviewing existing components, identifying inconsistencies and exploring opportunities to simplify the system.",
    "This included considering component states, layout behaviour, accessibility and how individual elements would work together within larger interfaces.",
    "The objective was to give designers and engineers a reliable foundation without restricting the needs of individual products.",
  ],
} as const;

export const versoDesignTokens = {
  label: "Design tokens",
  subhead: "Creating a shared visual language",
  paragraphs: [
    "Design tokens helped translate visual decisions into a more structured and maintainable system.",
    "By defining shared values for elements such as colour, typography and spacing, we could create greater consistency between design and implementation.",
    "The system also needed enough flexibility to accommodate different product requirements without introducing unnecessary complexity.",
    "This was particularly important when making changes at scale, where a decision affecting one component could influence multiple interfaces.",
  ],
} as const;

export const versoScalability = {
  label: "Scalability",
  subhead: "One system. Multiple experiences.",
  paragraphs: [
    "A key consideration throughout Verso was scalability.",
    "Components and patterns needed to work across different products, screen sizes and editorial contexts while maintaining a coherent experience.",
    "The challenge was finding the right balance between standardisation and flexibility.",
    "A successful system shouldn't force every interface to look identical. It should provide a consistent foundation while allowing individual experiences to meet their specific needs.",
  ],
} as const;

export const versoCollaboration = {
  label: "Collaboration & iteration",
  subhead: "Designing together, refining continuously",
  paragraphs: [
    "Verso was an ongoing collaboration between product designers, engineers and stakeholders.",
    "Design decisions were explored, reviewed and refined through regular discussions and feedback.",
    "A major part of the process involved simplifying existing patterns, clarifying intended behaviour and ensuring components were practical to implement.",
    "Documentation also played an important role, helping teams understand how and when to use components consistently.",
  ],
} as const;
