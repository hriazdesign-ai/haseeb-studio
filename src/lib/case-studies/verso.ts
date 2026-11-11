import { getCaseStudyTheme } from "@/lib/project-themes";
import { versoMedia } from "./verso-media";
import type { CaseStudy } from "./types";

/**
 * Verso Design System. Standalone page at `/verso`.
 * Section order and media from Figma Studio Verso (1576:13441).
 * Project overview and Challenge copy preserved.
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
    { label: "Year", values: ["2026"] },
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
    text: "Good design systems make things consistent without making everything look the same.",
  },
  solution: {
    id: "visual-design",
    label: "Visual design",
    align: "right",
    paragraphs: [
      "Making the design system accessible",
      "One of my main contributions was working on the Verso storefront, where teams could explore the design system, its components and guidelines.",
      "I worked on the visual layouts and illustrations, helping make the system easier to navigate and understand.",
      "This also involved documenting things like image ratios, responsive behaviour and component usage, giving teams clearer guidance when building their products.",
    ],
  },
  result: {
    id: "outcome",
    label: "Outcome & Reflection",
    align: "right",
    paragraphs: [
      "A stronger foundation for future products",
      "Verso helped establish a more consistent and reusable design language across Condé Nast's digital products.",
      "Through shared components, clearer documentation and more structured design decisions, teams had a stronger foundation for designing and building interfaces.",
      "For me, one of the biggest lessons was that a design system is never really finished. It needs to evolve as products, teams and requirements change.",
      "Working across different brands and languages also showed me the importance of designing for flexibility from the beginning, rather than trying to accommodate every variation later.",
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
  label: "Component Design",
  subhead: "From reusable components to real experiences",
  left: [
    "Another part of my work involved creating and refining reusable components, including content cards, image layouts, buttons and navigation patterns.",
    "Rather than designing these separately for every product, we wanted teams to have a shared library they could build from.",
    "One example was the global navigation, which I worked on across 13 Condé Nast brands.",
  ],
  right: [
    "I explored different configurations, component states and responsive behaviour to make sure the navigation could adapt to different screen sizes and brand requirements.",
    "The Figma work shows how the component was structured, alongside the finished navigation across GQ, WIRED, SELF and Pitchfork.",
  ],
} as const;

export const versoDesignTokens = {
  label: "Design tokens",
  subhead: "Creating flexibility through design tokens",
  paragraphs: [
    "Design tokens helped us manage typography, colour and spacing consistently while allowing individual brands to maintain their own visual identity.",
    "I worked on documenting typography and visual rules, looking at how these could translate into real editorial layouts.",
    "This became particularly interesting when working with the Japanese team, where we needed to consider how the system would support different languages.",
    "Japanese typography introduced different considerations compared with English, including character density, line wrapping, spacing and how text behaves across different screen sizes.",
    "It reinforced the importance of testing layouts with real content and allowing enough flexibility for different languages without compromising the underlying system.",
  ],
} as const;

export const versoCollaboration = {
  label: "Collaboration & Refinement",
  subhead: "Improving and evolving the system",
  left: [
    "Verso was an ongoing collaboration between designers and developers, with regular reviews to improve the components and patterns we already had.",
    "Part of my work involved auditing existing components, identifying inconsistencies and exploring ways to simplify the system.",
    "In one example, we found a component with 21 variations and 43 properties, making it unnecessarily difficult to understand and maintain.",
    "We reviewed where properties overlapped, where variations could be combined and how clearer naming and documentation could make components easier to use.",
  ],
  right: [
    "Towards the end of the project, I also explored further opportunities to improve the experience, including adaptive mastheads, enhanced search and contextual navigation elements.",
    "These explorations helped us think about how the system could continue evolving to support new requirements.",
  ],
} as const;
