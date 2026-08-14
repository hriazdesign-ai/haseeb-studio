/**
 * Client-safe types and helpers for the art-direction dashboard.
 * Must never import Node built-ins — imported by Client Components.
 */

import {
  getPortfolioProjects,
  portfolioProjectOrder,
} from "@/lib/projects";

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
  | "Closing Feature"
  | "Gallery"
  | "Phone Mockup"
  | "Browser Mockup"
  | "Diagram"
  | "Quote"
  | "Thumbnail"
  | "Cover"
  | "Work Card"
  | "Other";

/** Roles that pair a desktop asset with an optional art-directed mobileSrc. */
export function isArtDirectedAuditRole(role: AuditRoleKind): boolean {
  return (
    role === "Hero" ||
    role === "Large Feature" ||
    role === "Closing Feature"
  );
}

/**
 * Roles that must declare + ship mobile artwork.
 * Gallery / Cover / Thumbnail / Work Card never require mobile.
 */
export function requiresMobileArtwork(role: AuditRoleKind): boolean {
  return isArtDirectedAuditRole(role);
}

export type MetadataStatus = "correct" | "incorrect" | "unknown";

export function resolveMetadataStatus(
  dataWidth: number | null,
  dataHeight: number | null,
  intrinsicWidth: number | null,
  intrinsicHeight: number | null,
  fileExists: boolean,
  intrinsicFromFile: boolean,
): MetadataStatus {
  if (
    !fileExists ||
    !intrinsicFromFile ||
    dataWidth == null ||
    dataHeight == null ||
    intrinsicWidth == null ||
    intrinsicHeight == null
  ) {
    return "unknown";
  }
  return dataWidth === intrinsicWidth && dataHeight === intrinsicHeight
    ? "correct"
    : "incorrect";
}

export function metadataStatusLabel(status: MetadataStatus): string {
  if (status === "correct") return "✓ Metadata Correct";
  if (status === "incorrect") return "⚠ Metadata Incorrect";
  return "— Metadata unverified";
}

/** Clipboard payload for fixing TS width/height from intrinsic pixels. */
export function correctMetadataSnippet(
  width: number | null,
  height: number | null,
  keys: { width: string; height: string } = {
    width: "width",
    height: "height",
  },
): string {
  if (width == null || height == null) return "";
  return `${keys.width}: ${width},\n${keys.height}: ${height},`;
}

/** Role filter options shown in the management UI. */
export type AuditRoleFilter =
  | ""
  | "Hero"
  | "Large Feature"
  | "Closing Feature"
  | "Gallery"
  | "Cover"
  | "Work Card"
  | "Split"
  | "Mobile"
  | "Device Mockup";

export type AuditPreviewAspects = {
  desktop: string;
  tablet: string;
  mobile: string;
};

/** Dual-frame audit for Work / Case Studies cover assets. */
export type WorkCoverUsageStatus = "correct" | "warn";

export type WorkCoverUsagePanel = {
  title: "LARGE WORK CARD" | "SMALL WORK CARD";
  frameRatioLabel: string;
  /** CSS rendered reference, e.g. `~1440 × 776`. */
  renderedReference: string;
  recommendedExport: string;
  status: WorkCoverUsageStatus;
  statusLabel: string;
  guidance: string | null;
  /** Small panel only — expected `*-small` filename. */
  expectedFilename: string | null;
  /** Small panel — declared `smallSrc` or expected path. */
  artworkSrc: string | null;
  artworkPresent: boolean | null;
  artworkLabel: string | null;
  /** Small panel — `smallSrc` key present in project data. */
  smallSrcConfigured: boolean | null;
  smallSrcConfiguredLabel: string | null;
};

export type WorkCoverAudit = {
  large: WorkCoverUsagePanel;
  small: WorkCoverUsagePanel;
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
  /** Desktop TS dims vs on-disk PNG dims. */
  metadataStatus: MetadataStatus;
  metadataStatusLabel: string;
  metadataMismatch: boolean;
  /** `width: N,\nheight: N,` from intrinsic pixels when mismatching. */
  correctMetadataSnippet: string;
  status: AuditStatus;
  statusLabel: string;
  /** Short explanation of the size grade. */
  statusNote: string;
  fileExists: boolean;
  /** Hero / Large Feature / Closing Feature require mobile artwork. */
  requiresMobile: boolean;
  /** Required mobile is missing config or missing on disk. */
  mobileRequiredMissing: boolean;
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
  /** Declared mobileWidth / mobileHeight from TS data. */
  mobileDataWidth: number | null;
  mobileDataHeight: number | null;
  /** Intrinsic pixels of the mobile asset (file header, else data). */
  mobileIntrinsicWidth: number | null;
  mobileIntrinsicHeight: number | null;
  /** True when mobile intrinsic dims came from the on-disk file header. */
  mobileIntrinsicFromFile: boolean;
  mobileAspectRatioLabel: string;
  mobileRenderedWidth: number;
  mobileRenderedHeight: number;
  mobileRecommendedExport: string;
  mobileRecommendedWidth: number;
  mobileRecommendedHeight: number;
  mobileStatusLabel: string;
  mobileMetadataStatus: MetadataStatus | "not-applicable";
  mobileMetadataStatusLabel: string;
  mobileMetadataMismatch: boolean;
  mobileCorrectMetadataSnippet: string;
  /**
   * When set, Image Manager shows LARGE + SMALL Work card usage panels
   * instead of a single generic Cover recommendation.
   */
  workCoverAudit: WorkCoverAudit | null;
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
  desktopPresent: number;
  desktopMissing: number;
  mobilePresent: number;
  /** Required mobile missing (config or artwork). */
  mobileMissing: number;
  /** mobileSrc declared but file not on disk. */
  mobileArtworkMissing: number;
  /** Art-directed role with no mobileSrc in data. */
  mobileUnconfigured: number;
  metadataCorrect: number;
  metadataIncorrect: number;
};

export type AuditProjectOption = {
  /** URL `?project=` value (empty = All Projects). */
  slug: string;
  /** Display label in the Project dropdown. */
  label: string;
  /** Matches `ImageAuditEntry.projectSlug`. */
  filterSlug: string;
};

/**
 * Build Project filter options from the shared portfolio + live audit records.
 * Every portfolio project appears even before it has audit entries.
 * Order follows `portfolioProjectOrder`; unknown audit slugs append alphabetically.
 */
export function buildAuditProjectOptions(
  entries: ImageAuditEntry[],
): AuditProjectOption[] {
  const portfolio = getPortfolioProjects();
  const slugToLabel = new Map(
    portfolio.map((project) => [project.id, project.name]),
  );

  for (const entry of entries) {
    if (!entry.projectSlug) continue;
    if (slugToLabel.has(entry.projectSlug)) continue;
    slugToLabel.set(
      entry.projectSlug,
      entry.project && entry.project !== "—"
        ? entry.project
        : entry.projectSlug,
    );
  }

  const options: AuditProjectOption[] = [
    { slug: "", label: "All Projects", filterSlug: "" },
  ];
  const seen = new Set<string>();

  for (const id of portfolioProjectOrder) {
    const label = slugToLabel.get(id);
    if (!label) continue;
    options.push({ slug: id, label, filterSlug: id });
    seen.add(id);
  }

  for (const project of portfolio) {
    if (seen.has(project.id)) continue;
    options.push({
      slug: project.id,
      label: project.name,
      filterSlug: project.id,
    });
    seen.add(project.id);
  }

  const remaining = [...slugToLabel.keys()]
    .filter((id) => !seen.has(id))
    .sort((a, b) =>
      (slugToLabel.get(a) ?? a).localeCompare(slugToLabel.get(b) ?? b),
    );

  for (const id of remaining) {
    options.push({
      slug: id,
      label: slugToLabel.get(id) ?? id,
      filterSlug: id,
    });
  }

  return options;
}

export const AUDIT_ROLE_FILTER_OPTIONS: Array<{
  id: AuditRoleFilter;
  label: string;
}> = [
  { id: "", label: "All" },
  { id: "Hero", label: "Hero" },
  { id: "Large Feature", label: "Large Feature" },
  { id: "Closing Feature", label: "Closing Feature" },
  { id: "Gallery", label: "Gallery" },
  { id: "Cover", label: "Cover" },
  { id: "Work Card", label: "Work Card" },
  { id: "Split", label: "Split" },
  { id: "Mobile", label: "Mobile" },
  { id: "Device Mockup", label: "Device Mockup" },
];

export type AuditRoleSection =
  | "Hero"
  | "Large Feature"
  | "Closing Feature"
  | "Gallery"
  | "Cover"
  | "Mockups"
  | "Other";

export const AUDIT_ROLE_SECTIONS: AuditRoleSection[] = [
  "Hero",
  "Large Feature",
  "Closing Feature",
  "Gallery",
  "Cover",
  "Mockups",
  "Other",
];

export function roleSectionFor(role: AuditRoleKind): AuditRoleSection {
  if (role === "Hero") return "Hero";
  if (role === "Large Feature") return "Large Feature";
  if (role === "Closing Feature") return "Closing Feature";
  if (role === "Gallery") return "Gallery";
  /** Work Card covers share the Cover section (dual Large/Small panels). */
  if (role === "Cover" || role === "Thumbnail" || role === "Work Card") {
    return "Cover";
  }
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
  if (filter === "Closing Feature") return role === "Closing Feature";
  if (filter === "Gallery") return role === "Gallery";
  if (filter === "Cover") {
    return role === "Cover" || role === "Thumbnail" || role === "Work Card";
  }
  if (filter === "Work Card") return role === "Work Card" || role === "Cover";
  if (filter === "Split") return role === "Quote";
  if (filter === "Mobile") {
    return role === "Phone Mockup" || isArtDirectedAuditRole(role);
  }
  if (filter === "Device Mockup") {
    return role === "Browser Mockup" || role === "Phone Mockup";
  }
  return true;
}

export type ProjectAuditStats = {
  total: number;
  desktopPresent: number;
  desktopMissing: number;
  mobilePresent: number;
  mobileMissing: number;
  metadataCorrect: number;
  metadataIncorrect: number;
  ideal: number;
  good: number;
  needsAttention: number;
};

function entryHasMetadataIncorrect(entry: ImageAuditEntry): boolean {
  return entry.metadataMismatch || entry.mobileMetadataMismatch;
}

function entryHasMetadataCorrect(entry: ImageAuditEntry): boolean {
  if (entryHasMetadataIncorrect(entry)) return false;
  return (
    entry.metadataStatus === "correct" &&
    (entry.mobileMetadataStatus === "correct" ||
      entry.mobileMetadataStatus === "not-applicable" ||
      entry.mobileMetadataStatus === "unknown")
  );
}

export function computeProjectStats(
  entries: ImageAuditEntry[],
): ProjectAuditStats {
  let desktopPresent = 0;
  let desktopMissing = 0;
  let mobilePresent = 0;
  let mobileMissing = 0;
  let metadataCorrect = 0;
  let metadataIncorrect = 0;
  let ideal = 0;
  let good = 0;
  let needsAttention = 0;

  for (const entry of entries) {
    if (entry.fileExists) desktopPresent += 1;
    else desktopMissing += 1;

    if (entry.requiresMobile) {
      if (entry.mobileSrc && entry.mobileFileExists) mobilePresent += 1;
      else mobileMissing += 1;
    }

    if (entryHasMetadataIncorrect(entry)) metadataIncorrect += 1;
    else if (entryHasMetadataCorrect(entry)) metadataCorrect += 1;

    if (entry.status === "ideal") ideal += 1;
    else if (entry.status === "good") good += 1;
    else if (entry.status === "too-small" || entry.status === "missing") {
      needsAttention += 1;
    }
  }

  return {
    total: entries.length,
    desktopPresent,
    desktopMissing,
    mobilePresent,
    mobileMissing,
    metadataCorrect,
    metadataIncorrect,
    ideal,
    good,
    needsAttention,
  };
}
