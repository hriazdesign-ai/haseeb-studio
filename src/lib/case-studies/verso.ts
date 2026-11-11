import { getCaseStudyTheme } from "@/lib/project-themes";
import { versoMedia } from "./verso-media";
import type { CaseStudy } from "./types";

/**
 * Verso Design System. Standalone page at `/verso`.
 * Section order and media from Figma Studio Verso (1555:5335).
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
    "Verso is Condé Nast's design system, created to bring consistency and scalability to digital products across global brands including Vogue, WIRED, GQ and The New Yorker.",
    "As a Senior Product Designer, I contributed to the development and evolution of the system, working across reusable components, visual design, documentation and responsive patterns.",
    "The aim was to create shared foundations that teams could build upon, while preserving the individual character of each brand.",
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Consistency without uniformity",
      "Condé Nast operates across multiple products, brands and editorial workflows, each with different requirements. Over time, similar interface patterns had evolved independently, creating inconsistencies in layout, behaviour and implementation.",
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
    label: "Outcome and reflection",
    align: "right",
    paragraphs: [
      "Verso established a shared design language across Condé Nast's digital products, supporting consistency while allowing individual brands to retain their visual identities.",
      "The work reinforced the importance of designing systems that are not only visually consistent, but also practical for the teams using them.",
      "For me, the biggest lesson was that a successful design system needs to balance structure with flexibility. It should make everyday design decisions easier without limiting creativity or the ability to evolve.",
    ],
  },
};

/** Challenge right column — continues The Challenge narrative. */
export const versoChallengeGoals = {
  paragraphs: [
    "We needed a system that would reduce duplication, improve consistency and make future changes easier to manage, without restricting individual brand identities.",
    "The challenge wasn't simply creating reusable components. It was making them flexible enough to work across different products, teams and editorial experiences.",
  ],
} as const;

export const versoComponentDesign = {
  label: "Design system and components",
  paragraphs: [
    "A key part of my work involved developing and refining reusable interface patterns that could support different brands and product requirements.",
    "This included looking at component behaviour, responsive layouts, typography and design tokens, alongside the documentation teams needed to use the system effectively.",
    "Rather than treating components as isolated elements, I focused on how they worked together to create consistent, flexible experiences.",
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
  label: "What we found",
  paragraphs: [
    "Reviewing existing components revealed opportunities to simplify the system.",
    "Some components had accumulated unnecessary variations, overlapping properties and inconsistent naming conventions, making them harder to understand and maintain.",
    "By identifying these issues, we could establish clearer patterns and reduce complexity for both designers and developers.",
  ],
} as const;
