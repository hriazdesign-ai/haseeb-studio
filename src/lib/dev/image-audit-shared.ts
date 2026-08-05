/**
 * Client-safe types and helpers for the art-direction dashboard.
 * Must never import Node built-ins — imported by Client Components.
 */

export type AuditGroup =
  | "Homepage"
  | "Work"
  | "Case Studies"
  | "Shared Assets";

/**
 * Size quality relative to rendered CSS size and recommended 2× export.
 * `missing` / `unused` are inventory states, not size grades.
 */
export type AuditStatus =
  | "too-small"
  | "good"
  | "ideal"
  | "missing"
  | "unused";

/** Human-facing art-direction role shown on the dashboard. */
export type AuditRoleKind =
  | "Hero"
  | "Large Feature"
  | "Gallery"
  | "Phone Mockup"
  | "Browser Mockup"
  | "Diagram"
  | "Quote"
  | "Thumbnail"
  | "Cover"
  | "Other";

/** Role filter options shown in the management UI. */
export type AuditRoleFilter =
  | ""
  | "Hero"
  | "Large Feature"
  | "Gallery"
  | "Split"
  | "Mobile"
  | "Device Mockup";

export type AuditPreviewAspects = {
  desktop: string;
  tablet: string;
  mobile: string;
};

export type ImageAuditEntry = {
  id: string;
  group: AuditGroup;
  src: string;
  filename: string;
  publicPath: string;
  /**
   * Repo-relative TypeScript/data file where this image is defined.
   * Empty string when the asset is unused on disk (no source).
   */
  sourceFile: string;
  project: string;
  /** Stable slug for project filtering / URL (`?project=`). */
  projectSlug: string;
  pages: string[];
  component: string;
  /** Human-facing role (Hero, Gallery, …). */
  role: AuditRoleKind;
  /** Internal placement key (e.g. `hero`, `challengeGallery[0]`). */
  technicalRole: string;
  /** Why this export size is recommended. */
  recommendedWhy: string;
  sizes: string;
  quality: string;
  loading: string;
  priority: boolean;
  /** Approximate CSS-rendered size at desktop reference width. */
  renderedDimensions: string;
  renderedWidth: number;
  renderedHeight: number;
  /** Human label e.g. `6:4`. */
  aspectRatioLabel: string;
  recommendedExport: string;
  recommendedWidth: number;
  recommendedHeight: number;
  /**
   * Dimensions used for status (file pixels when readable, else data).
   */
  intrinsicWidth: number | null;
  intrinsicHeight: number | null;
  /** Declared width/height from TS data (may differ from the file). */
  dataWidth: number | null;
  dataHeight: number | null;
  /** True when intrinsic dims came from the on-disk file header. */
  intrinsicFromFile: boolean;
  status: AuditStatus;
  statusLabel: string;
  /** Short explanation of the size grade. */
  statusNote: string;
  fileExists: boolean;
  duplicateUsage: string;
  duplicateCount: number;
  notes: string[];
  objectPosition: string;
  mobileObjectPosition: string;
  previewAspects: AuditPreviewAspects;
  /**
   * Declared `mobileSrc` from case-study data (null when omitted).
   * When set, audit paths/status use this value. Expected paths below are
   * always populated as a naming-convention fallback for missing assets.
   */
  mobileSrc: string | null;
  /** Convention-based expected mobile URL (`*-mobile.ext`) from desktop `src`. */
  expectedMobileSrc: string;
  expectedMobileFilename: string;
  expectedMobilePublicPath: string;
  /**
   * Display path: declared `mobileSrc` public path when set, otherwise expected.
   */
  mobilePublicPath: string;
  mobileFilename: string;
  /** True when declared `mobileSrc` exists on disk. */
  mobileFileExists: boolean;
  /** Intrinsic pixels of the mobile asset (file header, else data). */
  mobileIntrinsicWidth: number | null;
  mobileIntrinsicHeight: number | null;
  mobileAspectRatioLabel: string;
  mobileRenderedWidth: number;
  mobileRenderedHeight: number;
  mobileRecommendedExport: string;
  mobileRecommendedWidth: number;
  mobileRecommendedHeight: number;
  mobileStatusLabel: string;
};

export type ImageAuditSummary = {
  total: number;
  ideal: number;
  good: number;
  "too-small": number;
  missing: number;
  unusedOnDisk: number;
  duplicates: number;
  heroes: number;
  mobilePresent: number;
  mobileMissing: number;
};

/**
 * Primary project navigation for `/dev/image-audit`.
 * `filterSlug` is the entry `projectSlug` to match.
 */
export const AUDIT_PROJECT_OPTIONS = [
  { slug: "", label: "All Projects", filterSlug: "" },
  {
    slug: "editorial-experience",
    label: "Editorial Experience",
    filterSlug: "editorial-experience",
  },
  {
    slug: "editorial-publications",
    label: "Editorial Publications",
    filterSlug: "editorial-publications",
  },
  {
    slug: "verso-design-system",
    label: "Verso",
    filterSlug: "verso-design-system",
  },
  { slug: "onenav", label: "OneNav", filterSlug: "onenav" },
  { slug: "mums-united", label: "Mums United", filterSlug: "mums-united" },
  {
    slug: "bright-path-learning",
    label: "Bright Path",
    filterSlug: "bright-path-learning",
  },
  {
    slug: "meridian-and-co",
    label: "Meridian",
    filterSlug: "meridian-and-co",
  },
] as const;

export const AUDIT_ROLE_FILTER_OPTIONS: Array<{
  id: AuditRoleFilter;
  label: string;
}> = [
  { id: "", label: "All" },
  { id: "Hero", label: "Hero" },
  { id: "Large Feature", label: "Large Feature" },
  { id: "Gallery", label: "Gallery" },
  { id: "Split", label: "Split" },
  { id: "Mobile", label: "Mobile" },
  { id: "Device Mockup", label: "Device Mockup" },
];

export type AuditRoleSection =
  | "Hero"
  | "Large Feature"
  | "Gallery"
  | "Mockups"
  | "Other";

export const AUDIT_ROLE_SECTIONS: AuditRoleSection[] = [
  "Hero",
  "Large Feature",
  "Gallery",
  "Mockups",
  "Other",
];

export function roleSectionFor(role: AuditRoleKind): AuditRoleSection {
  if (role === "Hero") return "Hero";
  if (role === "Large Feature") return "Large Feature";
  if (role === "Gallery") return "Gallery";
  if (role === "Phone Mockup" || role === "Browser Mockup") return "Mockups";
  return "Other";
}

/** Append `-mobile` before the file extension. */
export function expectedMobileFilenameFrom(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot <= 0) return `${filename}-mobile`;
  return `${filename.slice(0, lastDot)}-mobile${filename.slice(lastDot)}`;
}

/** Derive expected mobile `src` from a desktop public URL path. */
export function expectedMobileSrcFrom(src: string): string {
  const filename = src.split("/").pop() ?? src;
  const mobileName = expectedMobileFilenameFrom(filename);
  const dir = src.includes("/") ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  return `${dir}${mobileName}`;
}

export function publicPathFromSrc(src: string): string {
  return src.startsWith("/") ? `public${src}` : `public/${src}`;
}

export function filenameFromSrc(src: string): string {
  return src.split("/").pop() ?? src;
}

/** Whether an entry matches a role filter chip. */
export function matchesRoleFilter(
  role: AuditRoleKind,
  filter: AuditRoleFilter,
): boolean {
  if (!filter) return true;
  if (filter === "Hero") return role === "Hero";
  if (filter === "Large Feature") return role === "Large Feature";
  if (filter === "Gallery") return role === "Gallery";
  if (filter === "Split") return role === "Quote";
  if (filter === "Mobile") return role === "Phone Mockup";
  if (filter === "Device Mockup") {
    return role === "Browser Mockup" || role === "Phone Mockup";
  }
  return true;
}

export type ProjectAuditStats = {
  total: number;
  desktopComplete: number;
  mobilePresent: number;
  mobileMissing: number;
  ideal: number;
  good: number;
  needsAttention: number;
};

export function computeProjectStats(
  entries: ImageAuditEntry[],
): ProjectAuditStats {
  let desktopComplete = 0;
  let mobilePresent = 0;
  let mobileMissing = 0;
  let ideal = 0;
  let good = 0;
  let needsAttention = 0;

  for (const entry of entries) {
    if (entry.fileExists && entry.status !== "missing") desktopComplete += 1;
    if (entry.mobileSrc && entry.mobileFileExists) mobilePresent += 1;
    else mobileMissing += 1;

    if (entry.status === "ideal") ideal += 1;
    else if (entry.status === "good") good += 1;
    else if (entry.status === "too-small" || entry.status === "missing") {
      needsAttention += 1;
    }
  }

  return {
    total: entries.length,
    desktopComplete,
    mobilePresent,
    mobileMissing,
    ideal,
    good,
    needsAttention,
  };
}
