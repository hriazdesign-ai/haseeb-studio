export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Optional art-directed mobile asset (heroes, Large Features).
   * Used below the shared art-direction breakpoint (`max-width: 767px`).
   * Falls back to `src` when omitted.
   */
  mobileSrc?: string;
  /** Intrinsic width of `mobileSrc` when it differs from desktop. */
  mobileWidth?: number;
  /** Intrinsic height of `mobileSrc` when it differs from desktop. */
  mobileHeight?: number;
  /**
   * CSS `object-position` for art-directing crops (esp. case-study heroes).
   * Examples: `"center"`, `"center top"`, `"center 35%"`, `"center 60%"`.
   * Defaults to `"center"` when omitted.
   */
  objectPosition?: string;
  /**
   * Mobile-only `object-position` (below the art-direction breakpoint, 767px).
   * Falls back to `objectPosition`, then `"center"`.
   */
  mobileObjectPosition?: string;
  /** Enable zoom-in lightbox for detailed UI screenshots. */
  zoomable?: boolean;
  caption?: string;
  /**
   * Optional looping video that replaces the framed fill image.
   * `src` remains the static fallback (e.g. prefers-reduced-motion / poster).
   */
  videoSrc?: string;
};

export type CaseStudyMetaGroup = {
  label: string;
  values: string[];
};

export type CaseStudyNarrative = {
  id: string;
  label: string;
  /** `left` | `right` column placement on desktop (Figma 2-col grid). */
  align: "left" | "right";
  paragraphs: string[];
};

/**
 * Ordered body blocks for publication-heavy studies whose sequence
 * interleaves galleries, features and narratives beyond the standard flow.
 * When `bodyBlocks` is set on a CaseStudy, it replaces challenge→result.
 */
export type CaseStudyBodyBlock =
  | {
      type: "gallery";
      images: [CaseStudyImage, CaseStudyImage];
      label?: string;
    }
  | {
      type: "feature";
      image: CaseStudyImage;
      label?: string;
      /**
       * @deprecated Large Features no longer use scroll parallax (it clipped
       * exported 6∶4 artwork). Kept for backwards-compatible case-study data.
       */
      parallax?: boolean;
    }
  | {
      type: "narrative";
      narrative: CaseStudyNarrative;
    };

/** Per-project colours for hero + shared SiteHeader theming. */
export type CaseStudyTheme = {
  heroBackground: string;
  navBackground: string;
  navForeground: string;
  navUnderline: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  disciplines: string;
  theme: CaseStudyTheme;
  /**
   * Page chrome theme. Defaults to `dark` (legacy case studies).
   * `light` aligns with the approved Homepage / Work visual system.
   */
  chrome?: "light" | "dark";
  /**
   * Heading layout. `portfolio` = shared 12-column case-study hero
   * (Verso first). Defaults to `legacy`.
   */
  heroLayout?: "legacy" | "portfolio";
  meta: CaseStudyMetaGroup[];
  hero: CaseStudyImage;
  /** Optional section label above the intro (e.g. Overview). */
  introLabel?: string;
  intro: string[];
  /**
   * Optional pull quote. Omit entirely when the study has none.
   * Without `image`, quote renders as body text beside The Challenge (Verso).
   */
  pullQuote?: {
    image?: CaseStudyImage;
    text: string;
    /** Serif muted text-aside quote (Verso). Image overlay quotes stay default. */
    appearance?: "aside";
  };
  /**
   * When set, replaces the standard challenge→…→result body after intro.
   * Use for interleaved gallery / narrative sequences (Editorial & Publications).
   */
  bodyBlocks?: CaseStudyBodyBlock[];
  /** Required for the standard flow; omit when using `bodyBlocks`. */
  challenge?: CaseStudyNarrative;
  /** Optional paired gallery near the challenge. Omit when unused (Digital Editions). */
  challengeGallery?: [CaseStudyImage, CaseStudyImage];
  /**
   * Where the challenge gallery sits relative to the challenge narrative.
   * Defaults to `after` (Mums United). Bright Path / Meridian / Verso use `before`.
   */
  challengeGalleryPlacement?: "before" | "after";
  /**
   * Optional paired gallery after the challenge block
   * (Meridian / Verso / OneNav / Digital Editions).
   */
  midGallery?: [CaseStudyImage, CaseStudyImage];
  /** Optional full-width feature mockup. */
  feature?: CaseStudyImage;
  /**
   * Placement for `feature` relative to challenge / midGallery.
   * Defaults to `afterMidGallery`.
   * Prefer this over the legacy `featureBeforeMidGallery` boolean.
   *
   * `beforeChallenge` — immediately before The Challenge narrative. When
   * `challengeGalleryPlacement` is `"before"`, the paired gallery renders
   * first, then this feature (2-up + large cluster).
   */
  featurePlacement?: "beforeChallenge" | "beforeMidGallery" | "afterMidGallery";
  /**
   * @deprecated Use `featurePlacement: "beforeMidGallery"` instead.
   */
  featureBeforeMidGallery?: boolean;
  /** Optional solution narrative. Omit when unused (Digital Editions). */
  solution?: CaseStudyNarrative;
  /**
   * Optional second narrative beside The Solution (OneNav Platform Evolution).
   * When set, both columns render; `solution.align` is ignored for placement.
   */
  solutionCompanion?: CaseStudyNarrative;
  /** Optional paired gallery after The Solution. */
  solutionGallery?: [CaseStudyImage, CaseStudyImage];
  /** Optional large feature before the result (Verso / OneNav / Digital covers). */
  closingFeature?: CaseStudyImage;
  /**
   * Optional post-solution touchpoint story (Mums United “Beyond the website”).
   * Renders after solution / closing media and before Result / Outcome.
   * Hierarchy: copy → 2-up gallery → large feature → large feature.
   */
  extension?: {
    label: string;
    heading: string;
    paragraphs: string[];
    gallery: [CaseStudyImage, CaseStudyImage];
    features: [CaseStudyImage, CaseStudyImage];
  };
  /** Required for the standard flow; omit when using `bodyBlocks`. */
  result?: CaseStudyNarrative;
  /** Optional outcome list beside the result. Omit when unused (Digital Editions). */
  outcome?: {
    label: string;
    items: string[];
  };
  /** Optional large feature after the result (Digital Editions interactive edition). */
  postResultFeature?: CaseStudyImage;
};
