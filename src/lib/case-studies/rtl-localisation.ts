import { getCaseStudyTheme } from "@/lib/project-themes";
import { rtlMedia } from "./rtl-localisation-media";
import type { CaseStudy } from "./types";

/**
 * Arabic RTL & Localisation. Condé Nast editorial platform discovery.
 * Standalone recruiter page at `/rtl-localisation` (not listed in Work).
 */
export const rtlLocalisationCaseStudy: CaseStudy = {
  slug: "rtl-localisation",
  name: "Arabic RTL & Localisation",
  title:
    "Exploring right-to-left publishing for Arabic editorial experiences.",
  disciplines: "Product Design · RTL · Arabic Localisation · UX Discovery",
  theme: getCaseStudyTheme("rtl-localisation"),
  chrome: "light",
  heroLayout: "portfolio",
  meta: [
    { label: "Role:", values: ["Senior Product Designer"] },
    {
      label: "Focus:",
      values: ["RTL", "Arabic localisation", "UX discovery"],
    },
    { label: "Platform:", values: ["Copilot / CKEditor"] },
    {
      label: "Status:",
      values: ["Discovery and exploration"],
    },
  ],
  hero: rtlMedia.hero,
  introLabel: "Overview",
  intro: [
    "I led the initial RTL discovery, exploring how Condé Nast's editorial tools could better support Arabic content creation. The work focused on understanding directional behaviours, identifying gaps in existing workflows and establishing design considerations for future localisation.",
    "The investigation centred on Copilot and CKEditor, looking at how Arabic language support could work across our editorial publishing tools.",
  ],
  challenge: {
    id: "challenge",
    label: "The Challenge",
    align: "left",
    paragraphs: [
      "Most of the editorial platform assumed left-to-right reading patterns. Navigation, tooling panels and inline editing all followed an LTR model, creating friction for Arabic publishing needs.",
      "Localisation is rarely a simple visual flip. Directionality affects alignment, iconography, nested panels and how editors preview stories across desktop and mobile, while remaining practical for a multi-brand system.",
    ],
  },
  pullQuote: {
    appearance: "aside",
    text: "Localisation succeeds when directionality feels natural, not when an interface is simply mirrored.",
  },
  solution: {
    id: "exploration",
    label: "Design Exploration",
    align: "left",
    paragraphs: [
      "I explored how Copilot's editorial workflows could support Arabic editing without forcing unfamiliar patterns, looking at SEO and social fields, content forms and content header configuration across Arabic and English experiences.",
    ],
  },
  result: {
    id: "outcome",
    label: "Outcome",
    align: "left",
    paragraphs: [
      "The discovery established a clearer understanding of the requirements for Arabic editorial workflows, highlighting where existing interface patterns could be retained and where directional behaviour needed further consideration. These findings provided a foundation for future RTL localisation work.",
    ],
  },
  outcome: {
    label: "Key findings",
    items: [
      "Led the initial RTL discovery across editorial tooling",
      "Benchmarked English and Arabic experiences to identify RTL patterns",
      "Explored Copilot SEO, content forms and header layouts for Arabic",
      "Framed findings as a foundation for future localisation",
    ],
  },
};
