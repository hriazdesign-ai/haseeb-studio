import type { CaseStudyImage } from "@/lib/case-studies/types";
import type { CaseStudyLightboxItem } from "@/lib/case-studies/lightbox-items";

/**
 * Canonical stills for `/verso`, ordered to match Figma Studio Verso (1555:5335).
 * Paths sync with `public/verso/`.
 */
export const versoMedia = {
  hero: {
    src: "/verso/Verso-hero.jpg",
    alt: "Condé Nast Verso, Copilot and Planner marks on a dark navy field",
    width: 2560,
    height: 1440,
  },
  onboarding: {
    src: "/verso/Verso-1.jpg",
    alt: "Verso system onboarding introducing shared design principles",
    width: 1680,
    height: 1083,
    zoomable: true,
    caption: "System Onboarding · Introducing Shared Design Principles",
  },
  componentLibrary: {
    src: "/verso/Verso-2.jpg",
    alt: "Verso component library showing responsive behaviour and reusable UI patterns",
    width: 1680,
    height: 1083,
    zoomable: true,
    caption: "Component Library · Responsive Behaviour & Reusable UI Patterns",
  },
  brandFoundations: {
    src: "/verso/Verso-3.jpg",
    alt: "Distinct Condé Nast brand identities built on shared Verso design foundations",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Distinct Brand Identities · Shared Design Foundations",
  },
  wiredArticle: {
    src: "/verso/Verso-4a.jpg",
    alt: "WIRED article layout showing responsive design, colour theming and visual hierarchy",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption:
      "WIRED Article · Responsive Design, Colour Theming & Visual Hierarchy",
  },
  storefront: {
    src: "/verso/Verso-4.jpg",
    alt: "Verso storefront showing responsive layouts and visual design",
    width: 1680,
    height: 1083,
    zoomable: true,
    caption: "Verso Storefront · Responsive Layouts & Visual Design",
  },
  imageSpecs: {
    src: "/verso/Verso-5.jpg",
    alt: "Verso image specifications for consistent cropping and aspect ratios",
    width: 1680,
    height: 1083,
    zoomable: true,
    caption: "Image Specifications · Consistent Cropping & Aspect Ratios",
  },
  reusableComponents: {
    src: "/verso/Verso-6.jpg",
    alt: "Reusable Verso components creating consistent UI patterns",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Reusable Components · Creating Consistent UI Patterns",
  },
  designTokens: {
    src: "/verso/Verso-7.jpg",
    alt: "Verso design tokens establishing a shared visual language",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Design Tokens · Establishing a Shared Visual Language",
  },
  crossBrand: {
    src: "/verso/Verso-9.jpg",
    alt: "Verso applied across brands supporting different editorial experiences",
    width: 1680,
    height: 1083,
    zoomable: true,
    caption:
      "Cross-Brand Applications · Supporting Different Editorial Experiences",
  },
  flexibleComponents: {
    src: "/verso/Verso-8.jpg",
    alt: "Flexible Verso components adapting across products and brands",
    width: 1680,
    height: 1083,
    zoomable: true,
    caption: "Flexible Components · Adapting Across Products & Brands",
  },
  refinement: {
    src: "/verso/Verso-10.jpg",
    alt: "Verso system refinement simplifying components through collaboration",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption:
      "System Refinement · Simplifying Components Through Collaboration",
  },
  closing: {
    src: "/verso/Verso-11.jpg",
    alt: "Verso in production as a scalable foundation for editorial products",
    width: 2304,
    height: 1440,
    zoomable: true,
    caption: "Verso in Production · A Scalable Foundation for Editorial Products",
  },
} as const satisfies Record<string, CaseStudyImage>;

/** Lightbox sequence for inline Verso project stills, in page order. */
export function getVersoLightboxItems(): CaseStudyLightboxItem[] {
  return [
    versoMedia.onboarding,
    versoMedia.componentLibrary,
    versoMedia.brandFoundations,
    versoMedia.wiredArticle,
    versoMedia.storefront,
    versoMedia.imageSpecs,
    versoMedia.reusableComponents,
    versoMedia.designTokens,
    versoMedia.crossBrand,
    versoMedia.flexibleComponents,
    versoMedia.refinement,
    versoMedia.closing,
  ].map((image) => ({ src: image.src, alt: image.alt }));
}
