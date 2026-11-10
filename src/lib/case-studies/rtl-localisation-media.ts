import type { CaseStudyImage } from "@/lib/case-studies/types";
import type { CaseStudyLightboxItem } from "@/lib/case-studies/lightbox-items";

/**
 * Canonical stills for `/rtl-localisation`.
 * Paths are explicit public URLs — keep these in sync with `public/rtl/`.
 */
export const rtlMedia = {
  hero: {
    src: "/rtl/rtl-hero.png",
    alt: "Copilot Arabic article editing beside the published Vogue Arabia mobile experience",
    width: 2880,
    height: 1440,
  },
  projectOverview: {
    src: "/rtl/project-overview.png",
    alt: "Vogue Arabia Copilot CMS with Arabic content fields beside a published mobile article",
    width: 2600,
    height: 1676,
    zoomable: true,
    caption:
      "Project Overview · Exploring Arabic content creation within Condé Nast's editorial platform and the relationship with the published experience.",
  },
  researchBenchmarking: {
    src: "/rtl/rtl-research-benchmarking.png",
    alt: "Full research board comparing English and Arabic digital experiences for RTL patterns",
    width: 4688,
    height: 3126,
    zoomable: true,
    caption:
      "Research & Benchmarking · Comparing English and Arabic interfaces to identify RTL conventions, directional patterns and localisation considerations.",
  },
  seoSocial: {
    src: "/rtl/rtl-seo-social.png",
    alt: "Copilot SEO, social and recirculation fields compared in Arabic RTL and English LTR",
    width: 2600,
    height: 1676,
    zoomable: true,
    caption:
      "Investigating how Arabic content and right-aligned text behave within editorial metadata fields.",
  },
  contentForm: {
    src: "/rtl/rtl-content-form.png",
    alt: "Arabic and English Copilot article editing interfaces compared for content alignment",
    width: 2600,
    height: 1676,
    zoomable: true,
    caption:
      "Examining reading direction, text alignment and editing controls within the article workflow.",
  },
  contentHeader: {
    src: "/rtl/rtl-content-header.png",
    alt: "Content header layout exploration across Arabic and English editorial experiences",
    width: 4688,
    height: 3126,
    zoomable: true,
    caption:
      "Exploring layout, alignment and content presentation options across editorial configurations.",
  },
} as const satisfies Record<string, CaseStudyImage>;

/** Lightbox sequence for inline RTL project stills, in page order. */
export function getRtlLocalisationLightboxItems(): CaseStudyLightboxItem[] {
  return [
    rtlMedia.projectOverview,
    rtlMedia.researchBenchmarking,
    rtlMedia.seoSocial,
    rtlMedia.contentForm,
    rtlMedia.contentHeader,
  ].map((image) => ({ src: image.src, alt: image.alt }));
}
