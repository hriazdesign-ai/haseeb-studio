/**
 * Server-only image audit builder (uses `node:fs`).
 * Client Components must import from `@/lib/dev/image-audit-shared` instead.
 */
import fs from "node:fs";
import path from "node:path";
import { caseStudies, type CaseStudy, type CaseStudyImage } from "@/lib/case-studies";
import {
  correctMetadataSnippet,
  expectedMobileFilenameFrom,
  expectedMobileSrcFrom,
  filenameFromSrc,
  isArtDirectedAuditRole,
  metadataStatusLabel,
  publicPathFromSrc,
  requiresMobileArtwork,
  resolveMetadataStatus,
  type AuditGroup,
  type AuditPreviewAspects,
  type AuditRoleKind,
  type AuditStatus,
  type ImageAuditEntry,
  type ImageAuditSummary,
  type WorkCoverAudit,
  type WorkCoverUsagePanel,
} from "@/lib/dev/image-audit-shared";
import { homeParallaxProjects } from "@/lib/home-parallax";
import {
  expectedSmallCoverFilename,
  expectedSmallCoverSrc,
  getPortfolioProjects,
  type Project,
} from "@/lib/projects";
import {
  isSmallWorkMotionRole,
  workMotionItems,
  type WorkMotionMediaRole,
} from "@/lib/work-motion";
import { projectsMotionItems } from "@/lib/projects-motion";

export type {
  AuditGroup,
  AuditPreviewAspects,
  AuditRoleKind,
  AuditRoleSection,
  AuditStatus,
  ImageAuditEntry,
  ImageAuditSummary,
  WorkCoverAudit,
  WorkCoverUsagePanel,
} from "@/lib/dev/image-audit-shared";

export {
  buildAuditProjectOptions,
  AUDIT_ROLE_FILTER_OPTIONS,
  AUDIT_ROLE_SECTIONS,
  computeProjectStats,
  correctMetadataSnippet,
  expectedMobileFilenameFrom,
  expectedMobileSrcFrom,
  isArtDirectedAuditRole,
  matchesRoleFilter,
  metadataStatusLabel,
  requiresMobileArtwork,
  resolveMetadataStatus,
  roleSectionFor,
} from "@/lib/dev/image-audit-shared";

type UsageDraft = {
  group: AuditGroup;
  src: string;
  project: string;
  projectSlug: string;
  pages: string[];
  component: string;
  role: AuditRoleKind;
  technicalRole: string;
  sizes: string;
  priority: boolean;
  /** Repo-relative path to the defining data file. */
  sourceFile: string;
  /** Desktop CSS display size (1×). */
  renderedWidth: number;
  renderedHeight: number;
  intrinsicWidth: number | null;
  intrinsicHeight: number | null;
  notes?: string[];
  objectPosition?: string;
  mobileObjectPosition?: string;
  /** Optional art-directed mobile asset (heroes, Large Features). */
  mobileSrc?: string;
  mobileWidth?: number;
  mobileHeight?: number;
  alt?: string;
  /** Work cover dual-frame audit (Large + Small). */
  workCover?: {
    smallSrc?: string;
    smallWidth?: number;
    smallHeight?: number;
    /** Rendered reference for the small 6∶4 frame on this layout. */
    smallRenderedWidth: number;
    smallRenderedHeight: number;
  };
};

const SOURCE_HOME_PARALLAX = "src/lib/home-parallax.ts";
const SOURCE_PROJECTS = "src/lib/projects.ts";

const ROLE_WHY: Record<AuditRoleKind, string> = {
  Hero:
    "Full-width image with subtle motion. Optional mobileSrc for art-directed mobile composition.",
  "Large Feature":
    "Fixed 6∶4 landscape on desktop, tablet and mobile (2× export). Optional mobileSrc for art-directed composition within the same frame.",
  "Closing Feature":
    "Closing Large Feature — same 6∶4 frame and optional mobileSrc as other Large Features.",
  Gallery: "Supports lightbox viewing.",
  "Phone Mockup": "Matches device rendering.",
  "Browser Mockup": "Matches browser chrome framing.",
  Diagram: "Preserves fine detail and labels.",
  Quote: "Atmospheric crop beside editorial quote.",
  Thumbnail: "Smaller list / motion thumbnail density.",
  Cover:
    "Work / Case Studies cover — audited for LARGE (featured) and SMALL (6∶4) card frames separately.",
  "Work Card":
    "Smaller Work-page card — fixed 6∶4 landscape frame. Export at 2400 × 1600. Prefer dedicated smallSrc when the large cover ratio differs.",
  Other: "Supports Retina displays.",
};

function caseStudySourceFile(slug: string): string {
  return `src/lib/case-studies/${slug}.ts`;
}

function inferRoleKind(input: {
  technicalRole: string;
  filename: string;
  alt?: string;
  group: AuditGroup;
  layoutHint?: string;
}): AuditRoleKind {
  const technical = input.technicalRole.toLowerCase();
  const hint = (input.layoutHint ?? "").toLowerCase();
  const blob = `${input.filename} ${input.alt ?? ""}`.toLowerCase();

  if (technical === "hero" || hint === "featured") return "Hero";
  if (technical.includes("pullquote")) return "Quote";
  if (technical.includes("gallery")) return "Gallery";
  if (technical.includes("closingfeature")) return "Closing Feature";
  if (
    technical === "feature" ||
    technical.includes("postresultfeature") ||
    technical.includes(".feature")
  ) {
    return "Large Feature";
  }
  /** Work / cover metadata wins over filename heuristics (e.g. “laptop” in alt). */
  if (input.group === "Work" || technical.includes("cover")) {
    /** Smaller WorkMotion cards (not the full-width featured enterprise slot). */
    if (
      technical.includes("motion") &&
      !technical.includes("feature-landscape")
    ) {
      return "Work Card";
    }
    return "Cover";
  }
  if (input.group === "Homepage") {
    return hint === "secondary" || hint === "primary" ? "Cover" : "Hero";
  }
  if (
    blob.includes("phone") ||
    blob.includes("iphone") ||
    blob.includes("mobile mock")
  ) {
    return "Phone Mockup";
  }
  if (
    blob.includes("browser") ||
    blob.includes("laptop") ||
    blob.includes("desktop mock")
  ) {
    return "Browser Mockup";
  }
  if (blob.includes("diagram") || blob.includes("flowchart")) {
    return "Diagram";
  }
  return "Other";
}

function previewAspectsFor(
  role: AuditRoleKind,
  renderedWidth: number,
  renderedHeight: number,
): AuditPreviewAspects {
  const desktop =
    renderedWidth > 0 && renderedHeight > 0
      ? `${Math.round(renderedWidth)} / ${Math.round(renderedHeight)}`
      : "16 / 9";

  switch (role) {
    case "Hero":
      return {
        desktop,
        tablet: "16 / 9",
        mobile: "16 / 9",
      };
    case "Large Feature":
    case "Closing Feature":
    case "Work Card":
      /** Same 6∶4 landscape frame at every breakpoint. */
      return {
        desktop: "6 / 4",
        tablet: "6 / 4",
        mobile: "6 / 4",
      };
    case "Gallery":
      return {
        desktop,
        tablet: "560 / 361",
        mobile: "6 / 4",
      };
    case "Quote":
      return {
        desktop,
        tablet: "16 / 9",
        mobile: "16 / 9",
      };
    case "Cover":
      return {
        desktop: renderedWidth === renderedHeight ? "1 / 1" : desktop,
        tablet: "1 / 1",
        mobile: "6 / 4",
      };
    case "Thumbnail":
      return {
        desktop,
        tablet: "6 / 4",
        mobile: "6 / 4",
      };
    case "Phone Mockup":
      return {
        desktop,
        tablet: "16 / 9",
        mobile: "16 / 9",
      };
    default:
      return {
        desktop,
        tablet: "16 / 9",
        mobile: "6 / 4",
      };
  }
}

const DPR = 2;
/** Design reference viewport for full-bleed estimates. */
const VIEWPORT = 1440;
/** Shared `.container` max width (`--content-max`). */
const CONTAINER = 1300;
/**
 * Desktop `.container` inner content width.
 * border-box max 1300px − 2 × 64px gutter (`clamp` max of `--gutter`).
 */
const CONTAINER_INNER = CONTAINER - 2 * 64; // 1172
const NEXT_DEFAULT_QUALITY = "75 (Next.js default)";
const LARGE_FEATURE_SIZES =
  "(max-width: 1299px) calc(100vw - 2 * clamp(1.25rem, 5vw, 4rem)), 1172px";

/**
 * Large Feature: fixed 6∶4 frame at `.container` content width.
 * Height is always width × (4/6), independent of source image ratio.
 * Desktop export = rendered × 2 → ~2344 × 1563.
 */
function largeFeatureRendered(): { w: number; h: number } {
  const w = CONTAINER_INNER;
  return { w, h: w * (4 / 6) };
}

/**
 * Large Feature mobile frame — same 6∶4 landscape as desktop/tablet.
 * CSS ~585 × 390 → 2× export 1170 × 780.
 * `mobileSrc` may recompose the subject; the canvas stays 6∶4.
 */
function largeFeatureMobileRendered(): { w: number; h: number } {
  const w = 585;
  return { w, h: w * (4 / 6) };
}

/** Typical phone content width for non–Large Feature mobile estimates. */
const MOBILE_CONTENT = 390;

function mobileRenderedFor(
  role: AuditRoleKind,
  desktopW: number,
  desktopH: number,
): { w: number; h: number; aspectLabel: string } {
  if (role === "Large Feature" || role === "Closing Feature") {
    const rendered = largeFeatureMobileRendered();
    return { ...rendered, aspectLabel: "6:4" };
  }
  if (role === "Hero" || role === "Quote") {
    return {
      w: MOBILE_CONTENT,
      h: MOBILE_CONTENT * (9 / 16),
      aspectLabel: "16:9",
    };
  }
  if (role === "Phone Mockup") {
    return {
      w: MOBILE_CONTENT * 0.55,
      h: MOBILE_CONTENT * 0.55 * (19.5 / 9),
      aspectLabel: "9:19.5",
    };
  }
  if (desktopW > 0 && desktopH > 0) {
    const ratio = desktopH / desktopW;
    return {
      w: MOBILE_CONTENT,
      h: MOBILE_CONTENT * ratio,
      aspectLabel: simplifyAspect(desktopW, desktopH),
    };
  }
  return { w: MOBILE_CONTENT, h: MOBILE_CONTENT * (4 / 6), aspectLabel: "6:4" };
}

function simplifyAspect(w: number, h: number): string {
  if (w <= 0 || h <= 0) return "—";
  const round = (n: number) => Math.round(n * 100) / 100;
  const rw = round(w);
  const rh = round(h);
  // Prefer familiar labels when close.
  const ratio = w / h;
  if (Math.abs(ratio - 6 / 4) < 0.02) return "6:4";
  if (Math.abs(ratio - 16 / 9) < 0.02) return "16:9";
  if (Math.abs(ratio - 3 / 4) < 0.02) return "3:4";
  if (Math.abs(ratio - 1) < 0.02) return "1:1";
  return `${rw}:${rh}`;
}

function desktopAspectLabel(
  role: AuditRoleKind,
  renderedWidth: number,
  renderedHeight: number,
): string {
  if (
    role === "Large Feature" ||
    role === "Closing Feature" ||
    role === "Work Card"
  ) {
    return "6:4";
  }
  if (role === "Hero") return "16:9";
  return simplifyAspect(renderedWidth, renderedHeight);
}

function absFromSrc(src: string): string {
  return path.join(process.cwd(), publicPathFromSrc(src));
}

function fileExists(src: string): boolean {
  try {
    return fs.existsSync(absFromSrc(src));
  } catch {
    return false;
  }
}

/**
 * Read width/height from common raster headers (no image libraries).
 */
function readFileDimensions(
  src: string,
): { width: number; height: number } | null {
  try {
    const abs = absFromSrc(src);
    if (!fs.existsSync(abs)) return null;
    const fd = fs.openSync(abs, "r");
    try {
      const header = Buffer.alloc(64);
      const bytes = fs.readSync(fd, header, 0, 64, 0);
      if (bytes < 24) return null;

      // PNG: 8-byte signature + IHDR length/type + width/height
      if (
        header[0] === 0x89 &&
        header[1] === 0x50 &&
        header[2] === 0x4e &&
        header[3] === 0x47
      ) {
        return {
          width: header.readUInt32BE(16),
          height: header.readUInt32BE(20),
        };
      }

      // GIF
      if (
        header[0] === 0x47 &&
        header[1] === 0x49 &&
        header[2] === 0x46
      ) {
        return {
          width: header.readUInt16LE(6),
          height: header.readUInt16LE(8),
        };
      }

      // JPEG — scan for SOF0/SOF2
      if (header[0] === 0xff && header[1] === 0xd8) {
        const full = fs.readFileSync(abs);
        let offset = 2;
        while (offset < full.length - 8) {
          if (full[offset] !== 0xff) {
            offset += 1;
            continue;
          }
          const marker = full[offset + 1];
          if (marker === 0xd9 || marker === 0xda) break;
          const size = full.readUInt16BE(offset + 2);
          // SOF0 / SOF1 / SOF2
          if (
            marker === 0xc0 ||
            marker === 0xc1 ||
            marker === 0xc2
          ) {
            return {
              height: full.readUInt16BE(offset + 5),
              width: full.readUInt16BE(offset + 7),
            };
          }
          offset += 2 + size;
        }
        return null;
      }

      // WebP (VP8X / VP8 / VP8L)
      if (
        header.toString("ascii", 0, 4) === "RIFF" &&
        header.toString("ascii", 8, 12) === "WEBP"
      ) {
        const full = fs.readFileSync(abs);
        const chunk = full.toString("ascii", 12, 16);
        if (chunk === "VP8X" && full.length >= 30) {
          const w =
            1 +
            full[24] +
            (full[25] << 8) +
            (full[26] << 16);
          const h =
            1 +
            full[27] +
            (full[28] << 8) +
            (full[29] << 16);
          return { width: w, height: h };
        }
        if (chunk === "VP8 " && full.length >= 30) {
          return {
            width: full.readUInt16LE(26) & 0x3fff,
            height: full.readUInt16LE(28) & 0x3fff,
          };
        }
        if (chunk === "VP8L" && full.length >= 25) {
          const bits = full.readUInt32LE(21);
          return {
            width: (bits & 0x3fff) + 1,
            height: ((bits >> 14) & 0x3fff) + 1,
          };
        }
      }

      return null;
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return null;
  }
}

function recommend(w: number, h: number) {
  return {
    width: Math.round(w * DPR),
    height: Math.round(h * DPR),
  };
}

function formatDims(w: number, h: number): string {
  return `${Math.round(w)} × ${Math.round(h)}`;
}

function workCardSizes(size: Project["size"]): string {
  switch (size) {
    case "featured":
      return "100vw";
    case "experience":
      return "(max-width: 1023px) 100vw, 25vw";
    case "secondary":
      return "(max-width: 1023px) 100vw, 33vw";
    default:
      return "(max-width: 1023px) 100vw, 66vw";
  }
}

function workCardRendered(size: Project["size"]): { w: number; h: number } {
  switch (size) {
    case "featured":
      // aspect-[1152/744] full container
      return { w: CONTAINER, h: CONTAINER * (744 / 1152) };
    case "secondary":
      // ~33% of container, aspect 16/10
      return { w: CONTAINER * 0.33, h: CONTAINER * 0.33 * (10 / 16) };
    case "primary":
      return { w: CONTAINER * 0.66, h: CONTAINER * 0.66 * (10 / 16) };
    case "experience":
      // 4-col grid ≈ 25%
      return { w: CONTAINER * 0.25, h: CONTAINER * 0.25 * (482 / 748) };
  }
}

function workMotionSizes(role: WorkMotionMediaRole): string {
  switch (role) {
    case "feature-landscape":
      return "(max-width: 1023px) 100vw, min(1440px, 100vw)";
    case "offset-landscape":
      return "(max-width: 1023px) 100vw, 50vw";
    case "offset-square":
      return "(max-width: 1023px) 100vw, 65vw";
    case "square-pair":
      return "(max-width: 1023px) 50vw, 28vw";
    case "pair-landscape":
      return "(max-width: 1023px) 100vw, 50vw";
  }
}

/**
 * WorkMotion CSS display size (1×) from Figma rail (1240 content / 1440 max).
 * Smaller cards use a fixed 6∶4 frame; featured feature-landscape keeps 1280∶690.
 */
function workMotionRendered(role: WorkMotionMediaRole): { w: number; h: number } {
  const max = Math.min(VIEWPORT, 1440);
  /** Figma content rail inside 20px side padding. */
  const rail = Math.min(1240, max - 40);
  const landscape64 = (w: number) => ({ w, h: w * (4 / 6) });

  switch (role) {
    case "feature-landscape":
      return { w: max, h: max * (690 / 1280) };
    case "offset-landscape":
      return landscape64(rail * (800 / 1240));
    case "offset-square":
      return landscape64(rail * (416 / 1240));
    case "square-pair":
      return landscape64(rail * (392 / 1240));
    case "pair-landscape":
      return landscape64(rail * (608 / 1240));
  }
}

const LARGE_WORK_RATIO = 1280 / 690;
const SMALL_WORK_RATIO = 6 / 4;
const RATIO_TOLERANCE = 0.025;
/** Featured Work cover 2× export (matches approved Verso asset). */
const LARGE_WORK_EXPORT = { width: 2880, height: 1553 };
/** Standard small Work card 2× export. */
const SMALL_WORK_EXPORT = { width: 2400, height: 1600 };

function ratioMatches(
  width: number | null,
  height: number | null,
  targetRatio: number,
): boolean {
  if (width == null || height == null || width <= 0 || height <= 0) {
    return false;
  }
  return Math.abs(width / height - targetRatio) < RATIO_TOLERANCE;
}

function buildWorkCoverAudit(input: {
  desktopSrc: string;
  largeRendered: { w: number; h: number };
  smallRendered: { w: number; h: number };
  srcWidth: number | null;
  srcHeight: number | null;
  declaredSmallSrc: string | null;
  smallFileExists: boolean;
  smallWidth: number | null;
  smallHeight: number | null;
}): WorkCoverAudit {
  const largeOk = ratioMatches(
    input.srcWidth,
    input.srcHeight,
    LARGE_WORK_RATIO,
  );
  const large: WorkCoverUsagePanel = {
    title: "LARGE WORK CARD",
    frameRatioLabel: "1280:690",
    renderedReference: `~${formatDims(input.largeRendered.w, input.largeRendered.h)}`,
    recommendedExport: formatDims(
      LARGE_WORK_EXPORT.width,
      LARGE_WORK_EXPORT.height,
    ),
    status: largeOk ? "correct" : "warn",
    statusLabel: largeOk
      ? "✓ Correct ratio"
      : "⚠ Source artwork does not match large Work frame",
    guidance: largeOk
      ? null
      : "Large Work card uses ~1280∶690. Keep src sized for the featured frame.",
    expectedFilename: null,
    artworkSrc: null,
    artworkPresent: null,
    artworkLabel: null,
    smallSrcConfigured: null,
    smallSrcConfiguredLabel: null,
  };

  const configured = Boolean(input.declaredSmallSrc);
  const expectedFilename = configured
    ? filenameFromSrc(input.declaredSmallSrc!)
    : expectedSmallCoverFilename(filenameFromSrc(input.desktopSrc));
  const expectedSrc = configured
    ? input.declaredSmallSrc!
    : expectedSmallCoverSrc(input.desktopSrc);

  /**
   * Ratio: use on-disk small artwork when present; otherwise fall back to
   * desktop src (live cards also fall back until the PNG is exported).
   */
  const ratioW = input.smallFileExists ? input.smallWidth : input.srcWidth;
  const ratioH = input.smallFileExists ? input.smallHeight : input.srcHeight;
  const smallOk = ratioMatches(ratioW, ratioH, SMALL_WORK_RATIO);

  let statusLabel: string;
  let guidance: string | null = null;

  if (configured && !input.smallFileExists) {
    statusLabel = "⚠ Small artwork file missing";
    guidance =
      "Export a dedicated 6:4 cover (2400 × 1600) to the expected path. Live cards fall back to src until the file exists.";
  } else if (configured && input.smallFileExists && smallOk) {
    statusLabel = "✓ Correct ratio";
  } else if (configured && input.smallFileExists && !smallOk) {
    statusLabel = "⚠ Source artwork does not match 6:4";
    guidance = "Export a dedicated 6:4 cover to avoid banding/cropping.";
  } else if (!configured && smallOk) {
    statusLabel = "✓ Correct ratio (via src)";
    guidance = `Add smallSrc (“${expectedFilename}”) so the expected path is configured in code.`;
  } else {
    statusLabel = "⚠ Source artwork does not match 6:4";
    guidance =
      "Export a dedicated 6:4 cover to avoid banding/cropping. Add smallSrc in project data first.";
  }

  const small: WorkCoverUsagePanel = {
    title: "SMALL WORK CARD",
    frameRatioLabel: "6:4",
    renderedReference: `~${formatDims(input.smallRendered.w, input.smallRendered.h)}`,
    recommendedExport: formatDims(
      SMALL_WORK_EXPORT.width,
      SMALL_WORK_EXPORT.height,
    ),
    status:
      configured && input.smallFileExists && smallOk ? "correct" : "warn",
    statusLabel,
    guidance,
    expectedFilename,
    artworkSrc: expectedSrc,
    artworkPresent: input.smallFileExists,
    artworkLabel: input.smallFileExists ? "Present" : "Missing",
    smallSrcConfigured: configured,
    smallSrcConfiguredLabel: configured ? "YES" : "NO",
  };

  return { large, small };
}

function collectCaseStudyImages(study: CaseStudy): Array<{
  image: CaseStudyImage;
  technicalRole: string;
  sizes: string;
  priority: boolean;
  renderedWidth: number;
  renderedHeight: number;
}> {
  const out: Array<{
    image: CaseStudyImage;
    technicalRole: string;
    sizes: string;
    priority: boolean;
    renderedWidth: number;
    renderedHeight: number;
  }> = [];

  const hero = {
    w: VIEWPORT,
    h: 720,
  };
  const gallery = {
    w: CONTAINER * 0.5,
    h: CONTAINER * 0.5 * (361 / 560),
  };

  const push = (
    image: CaseStudyImage | undefined,
    technicalRole: string,
    sizes: string,
    priority: boolean,
    rendered: { w: number; h: number },
  ) => {
    if (!image) return;
    out.push({
      image,
      technicalRole,
      sizes,
      priority,
      renderedWidth: rendered.w,
      renderedHeight: rendered.h,
    });
  };

  const pushFeature = (
    image: CaseStudyImage | undefined,
    technicalRole: string,
  ) => {
    if (!image) return;
    const rendered = largeFeatureRendered();
    push(image, technicalRole, LARGE_FEATURE_SIZES, false, rendered);
  };

  push(study.hero, "hero", "100vw", true, hero);
  push(study.pullQuote?.image, "pullQuote.image", "100vw", false, hero);

  if (study.bodyBlocks) {
    study.bodyBlocks.forEach((block, index) => {
      if (block.type === "gallery") {
        push(
          block.images[0],
          `bodyBlocks[${index}].gallery[0]`,
          "(max-width: 1023px) 100vw, 50vw",
          false,
          gallery,
        );
        push(
          block.images[1],
          `bodyBlocks[${index}].gallery[1]`,
          "(max-width: 1023px) 100vw, 50vw",
          false,
          gallery,
        );
      }
      if (block.type === "feature") {
        pushFeature(block.image, `bodyBlocks[${index}].feature`);
      }
    });
    return out;
  }

  study.challengeGallery?.forEach((image, i) => {
    push(
      image,
      `challengeGallery[${i}]`,
      "(max-width: 1023px) 100vw, 50vw",
      false,
      gallery,
    );
  });
  pushFeature(study.feature, "feature");
  study.midGallery?.forEach((image, i) => {
    push(
      image,
      `midGallery[${i}]`,
      "(max-width: 1023px) 100vw, 50vw",
      false,
      gallery,
    );
  });
  study.solutionGallery?.forEach((image, i) => {
    push(
      image,
      `solutionGallery[${i}]`,
      "(max-width: 1023px) 100vw, 50vw",
      false,
      gallery,
    );
  });
  pushFeature(study.closingFeature, "closingFeature");
  study.extension?.gallery.forEach((image, i) => {
    push(
      image,
      `extension.gallery[${i}]`,
      "(max-width: 1023px) 100vw, 50vw",
      false,
      gallery,
    );
  });
  study.extension?.features.forEach((image, i) => {
    pushFeature(image, `extension.features[${i}]`);
  });
  pushFeature(study.postResultFeature, "postResultFeature");

  return out;
}

function walkPublicImages(
  absDir = path.join(process.cwd(), "public", "images"),
  urlBase = "/images",
): string[] {
  if (!fs.existsSync(absDir)) return [];
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const url = `${urlBase}/${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...walkPublicImages(path.join(absDir, entry.name), url));
    } else if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(entry.name)) {
      files.push(url);
    }
  }
  return files;
}

function buildUsageDrafts(): UsageDraft[] {
  const drafts: UsageDraft[] = [];

  for (const project of homeParallaxProjects) {
    const isFeatured = project.layout === "featured";
    const isSecondary = project.layout === "secondary";
    const rendered = isFeatured
      ? { w: VIEWPORT, h: 690 }
      : isSecondary
        ? { w: VIEWPORT * 0.5, h: VIEWPORT * 0.5 }
        : { w: VIEWPORT * 0.5, h: VIEWPORT * 0.5 * (690 / 566) };
    const technicalRole = `home-parallax · ${project.layout}`;
    const filename = filenameFromSrc(project.image.src);
    const role = inferRoleKind({
      technicalRole,
      filename,
      alt: project.image.alt,
      group: "Homepage",
      layoutHint: project.layout,
    });

    drafts.push({
      group: "Homepage",
      src: project.image.src,
      project: project.name,
      projectSlug: project.id,
      pages: ["/", "/home-parallax-blocks", "/home-parallax"],
      component: "BlocksWorkSection / FeaturedProject",
      role,
      technicalRole,
      sizes: isFeatured ? "100vw" : "(max-width: 1023px) 100vw, 50vw",
      priority: isFeatured,
      sourceFile: SOURCE_HOME_PARALLAX,
      renderedWidth: rendered.w,
      renderedHeight: rendered.h,
      intrinsicWidth: project.image.width,
      intrinsicHeight: project.image.height,
      objectPosition: project.objectPosition,
      mobileObjectPosition: project.objectPosition,
      alt: project.image.alt,
      notes: [
        "Blocks homepage uses BlocksWorkSection; /home-parallax uses FeaturedProject",
      ],
    });
  }

  const projectsMotionById = new Map(
    Object.values(projectsMotionItems).map((item) => [item.id, item]),
  );

  for (const project of getPortfolioProjects()) {
    if (!project.image) continue;
    const rendered = workCardRendered(project.size);
    const motion = Object.values(workMotionItems).find(
      (item) => item.id === project.id,
    );
    const projectsMotion = projectsMotionById.get(project.id);
    const coverKind =
      project.size === "experience" ? "experience cover" : "studio cover";
    const motionRole = motion?.role ?? projectsMotion?.role;
    const technicalRole = motionRole
      ? `${coverKind} · ${project.size} · motion ${motionRole}`
      : `${coverKind} · ${project.size}`;
    const filename = filenameFromSrc(project.image.src);
    const role = inferRoleKind({
      technicalRole,
      filename,
      alt: project.image.alt,
      group: "Work",
    });

    const pages = new Set<string>(["/work"]);
    if (motion) {
      pages.add("/work");
      pages.add("/work-motion-test");
    }
    if (projectsMotion) {
      pages.add("/projects-motion-test");
    }

    const largeRendered = workMotionRendered("feature-landscape");
    const smallRole: WorkMotionMediaRole =
      motionRole && isSmallWorkMotionRole(motionRole)
        ? motionRole
        : "offset-landscape";
    const smallRendered = workMotionRendered(smallRole);

    drafts.push({
      group: "Work",
      src: project.image.src,
      project: project.name,
      projectSlug: project.id,
      pages: [...pages],
      component:
        motion || projectsMotion
          ? "WorkMotionProject"
          : "WorkCard",
      role,
      technicalRole,
      sizes: motionRole
        ? workMotionSizes(motionRole)
        : workCardSizes(project.size),
      priority:
        project.size === "featured" || motionRole === "feature-landscape",
      sourceFile: SOURCE_PROJECTS,
      renderedWidth: motionRole
        ? workMotionRendered(motionRole).w
        : rendered.w,
      renderedHeight: motionRole
        ? workMotionRendered(motionRole).h
        : rendered.h,
      intrinsicWidth: project.image.width,
      intrinsicHeight: project.image.height,
      objectPosition:
        motion?.objectPosition ?? projectsMotion?.objectPosition,
      mobileObjectPosition:
        motion?.mobileObjectPosition ?? projectsMotion?.mobileObjectPosition,
      alt: project.image.alt,
      workCover: {
        smallSrc: project.image.smallSrc,
        smallWidth: project.image.smallWidth,
        smallHeight: project.image.smallHeight,
        smallRenderedWidth: smallRendered.w,
        smallRenderedHeight: smallRendered.h,
      },
      notes: [
        "Image Manager audits LARGE + SMALL Work card frames for this cover.",
        `Large frame ~${formatDims(largeRendered.w, largeRendered.h)} · export ${formatDims(LARGE_WORK_EXPORT.width, LARGE_WORK_EXPORT.height)}`,
        `Small frame 6∶4 · export ${formatDims(SMALL_WORK_EXPORT.width, SMALL_WORK_EXPORT.height)}`,
      ],
    });
  }

  const portfolioNameById = new Map(
    getPortfolioProjects().map((project) => [project.id, project.name]),
  );

  for (const study of caseStudies) {
    for (const entry of collectCaseStudyImages(study)) {
      const filename = filenameFromSrc(entry.image.src);
      const role = inferRoleKind({
        technicalRole: entry.technicalRole,
        filename,
        alt: entry.image.alt,
        group: "Case Studies",
      });

      drafts.push({
        group: "Case Studies",
        src: entry.image.src,
        project: portfolioNameById.get(study.slug) ?? study.name,
        projectSlug: study.slug,
        pages: [`/work/${study.slug}`],
        component:
          entry.technicalRole === "hero"
            ? "CaseStudyView → CaseStudyHeroMedia"
            : entry.technicalRole.includes("gallery")
              ? "CaseStudyView → PairedGallery → CaseStudyMedia"
              : entry.technicalRole.includes("pullQuote")
                ? "CaseStudyView → PullQuoteImage → ScrollParallaxImage"
                : "CaseStudyView → LargeFeature → CaseStudyMedia",
        role,
        technicalRole: entry.technicalRole,
        sizes: entry.sizes,
        priority: entry.priority,
        sourceFile: caseStudySourceFile(study.slug),
        renderedWidth: entry.renderedWidth,
        renderedHeight: entry.renderedHeight,
        intrinsicWidth: entry.image.width,
        intrinsicHeight: entry.image.height,
        objectPosition: entry.image.objectPosition,
        mobileObjectPosition: entry.image.mobileObjectPosition,
        mobileSrc: entry.image.mobileSrc,
        mobileWidth: entry.image.mobileWidth,
        mobileHeight: entry.image.mobileHeight,
        alt: entry.image.alt,
        notes: entry.image.zoomable
          ? ["zoomable — lightbox may show up to ~1200px wide"]
          : undefined,
      });
    }
  }

  return drafts;
}

function resolveSizeStatus(
  intrinsicWidth: number | null,
  intrinsicHeight: number | null,
  renderedWidth: number,
  renderedHeight: number,
  recommendedWidth: number,
  recommendedHeight: number,
): { status: AuditStatus; statusLabel: string; statusNote: string } {
  if (
    intrinsicWidth == null ||
    intrinsicHeight == null ||
    renderedWidth <= 0 ||
    renderedHeight <= 0
  ) {
    return {
      status: "good",
      statusLabel: "✓ Good",
      statusNote:
        "Dimensions unavailable — status could not be fully verified.",
    };
  }

  const meetsRendered =
    intrinsicWidth >= renderedWidth && intrinsicHeight >= renderedHeight;
  const meetsRecommended =
    intrinsicWidth >= recommendedWidth &&
    intrinsicHeight >= recommendedHeight;

  if (!meetsRendered) {
    return {
      status: "too-small",
      statusLabel: "⚠ Too Small",
      statusNote: "Below the rendered size and likely to appear soft.",
    };
  }

  if (!meetsRecommended) {
    return {
      status: "good",
      statusLabel: "✓ Good",
      statusNote:
        "Large enough for the current layout but below the ideal export.",
    };
  }

  return {
    status: "ideal",
    statusLabel: "✓ Ideal",
    statusNote: "Meets or exceeds the recommended export.",
  };
}

/**
 * Build the full image audit for `/dev/image-audit`.
 * Server-only (uses `fs`).
 */
export function buildImageAudit(): {
  entries: ImageAuditEntry[];
  groups: AuditGroup[];
  summary: ImageAuditSummary;
} {
  const drafts = buildUsageDrafts();
  const srcCounts = new Map<string, number>();
  for (const draft of drafts) {
    srcCounts.set(draft.src, (srcCounts.get(draft.src) ?? 0) + 1);
  }

  // Also count same src across pages as duplicate even if one draft
  const srcPageSets = new Map<string, Set<string>>();
  for (const draft of drafts) {
    const set = srcPageSets.get(draft.src) ?? new Set<string>();
    draft.pages.forEach((p) => set.add(p));
    srcPageSets.set(draft.src, set);
  }

  const referenced = new Set(drafts.map((d) => d.src));
  const onDisk = walkPublicImages();
  const unused = onDisk.filter((src) => !referenced.has(src));

  for (const src of unused) {
    drafts.push({
      group: "Shared Assets",
      src,
      project: "—",
      projectSlug: "",
      pages: ["(not referenced)"],
      component: "—",
      role: "Other",
      technicalRole: "unused on-disk asset",
      sizes: "—",
      priority: false,
      sourceFile: "",
      renderedWidth: 0,
      renderedHeight: 0,
      intrinsicWidth: null,
      intrinsicHeight: null,
      notes: ["Present in public/ but not referenced in src/"],
    });
  }

  const entries: ImageAuditEntry[] = drafts.map((draft, index) => {
    const exists = fileExists(draft.src);
    const isUnused = draft.group === "Shared Assets";

    const fileDims = exists ? readFileDimensions(draft.src) : null;
    const intrinsicFromFile = fileDims != null;
    const intrinsicWidth = fileDims?.width ?? draft.intrinsicWidth;
    const intrinsicHeight = fileDims?.height ?? draft.intrinsicHeight;
    const objectPosition = draft.objectPosition ?? "center";
    const mobileObjectPosition =
      draft.mobileObjectPosition ?? draft.objectPosition ?? "center";

    /**
     * Large / Closing Features: fixed 6∶4 frame at 1172px content width.
     */
    const rendered =
      draft.role === "Large Feature" || draft.role === "Closing Feature"
        ? largeFeatureRendered()
        : {
            w: draft.renderedWidth,
            h: draft.renderedHeight,
          };
    const renderedWidth = rendered.w;
    const renderedHeight = rendered.h;
    const rec =
      renderedWidth > 0
        ? recommend(renderedWidth, renderedHeight)
        : { width: 0, height: 0 };

    let status: AuditStatus;
    let statusLabel: string;
    let statusNote: string;
    if (!exists) {
      status = "missing";
      statusLabel = "⚠ Missing";
      statusNote = "File not found on disk.";
    } else if (isUnused) {
      status = "unused";
      statusLabel = "⚠ Unused";
      statusNote = "Present in public/ but not referenced in src/.";
    } else {
      ({ status, statusLabel, statusNote } = resolveSizeStatus(
        intrinsicWidth,
        intrinsicHeight,
        renderedWidth,
        renderedHeight,
        rec.width,
        rec.height,
      ));
    }

    const pageCount = srcPageSets.get(draft.src)?.size ?? draft.pages.length;
    const usageCount = srcCounts.get(draft.src) ?? 1;
    const duplicateCount = Math.max(pageCount, usageCount);

    const filename = filenameFromSrc(draft.src);
    /**
     * Art-directed roles: only use paths declared in case-study data.
     * Do not invent `*-mobile` filenames when `mobileSrc` is absent.
     */
    const declaredMobileSrc = draft.mobileSrc ?? null;
    const expectedMobileSrc = declaredMobileSrc
      ? declaredMobileSrc
      : isArtDirectedAuditRole(draft.role)
        ? ""
        : expectedMobileSrcFrom(draft.src);
    const expectedMobileFilename = declaredMobileSrc
      ? filenameFromSrc(declaredMobileSrc)
      : expectedMobileSrc
        ? expectedMobileFilenameFrom(filename)
        : "";
    const expectedMobilePublicPath = expectedMobileSrc
      ? publicPathFromSrc(expectedMobileSrc)
      : "";
    const mobileFileExists = declaredMobileSrc
      ? fileExists(declaredMobileSrc)
      : false;
    const mobileFileDims =
      declaredMobileSrc && mobileFileExists
        ? readFileDimensions(declaredMobileSrc)
        : null;
    const mobileIntrinsicFromFile = mobileFileDims != null;
    const mobileDataWidth = draft.mobileWidth ?? null;
    const mobileDataHeight = draft.mobileHeight ?? null;
    const mobileIntrinsicWidth =
      mobileFileDims?.width ?? mobileDataWidth;
    const mobileIntrinsicHeight =
      mobileFileDims?.height ?? mobileDataHeight;
    const mobileFrame = mobileRenderedFor(
      draft.role,
      renderedWidth,
      renderedHeight,
    );
    /** Prefer declared mobile export size when present (data or file). */
    const mobileRec =
      mobileIntrinsicWidth != null && mobileIntrinsicHeight != null
        ? {
            width: mobileIntrinsicWidth,
            height: mobileIntrinsicHeight,
          }
        : mobileFrame.w > 0
          ? recommend(mobileFrame.w, mobileFrame.h)
          : { width: 0, height: 0 };

    const dataWidth = draft.intrinsicWidth;
    const dataHeight = draft.intrinsicHeight;
    const metadataStatus = resolveMetadataStatus(
      dataWidth,
      dataHeight,
      intrinsicWidth,
      intrinsicHeight,
      exists,
      intrinsicFromFile,
    );
    const requiresMobile = requiresMobileArtwork(draft.role);
    const mobileRequiredMissing =
      requiresMobile && !(declaredMobileSrc && mobileFileExists);

    const mobileMetadataStatus = !declaredMobileSrc
      ? ("not-applicable" as const)
      : resolveMetadataStatus(
          mobileDataWidth,
          mobileDataHeight,
          mobileFileDims?.width ?? null,
          mobileFileDims?.height ?? null,
          mobileFileExists,
          mobileIntrinsicFromFile,
        );
    const mobileMetadataMismatch = mobileMetadataStatus === "incorrect";

    const declaredSmallSrc = draft.workCover?.smallSrc ?? null;
    const smallFileExists = declaredSmallSrc
      ? fileExists(declaredSmallSrc)
      : false;
    const smallFileDims =
      declaredSmallSrc && smallFileExists
        ? readFileDimensions(declaredSmallSrc)
        : null;
    const workCoverAudit = draft.workCover
      ? buildWorkCoverAudit({
          desktopSrc: draft.src,
          largeRendered: workMotionRendered("feature-landscape"),
          smallRendered: {
            w: draft.workCover.smallRenderedWidth,
            h: draft.workCover.smallRenderedHeight,
          },
          srcWidth: intrinsicWidth,
          srcHeight: intrinsicHeight,
          declaredSmallSrc,
          smallFileExists,
          smallWidth:
            smallFileDims?.width ?? draft.workCover.smallWidth ?? null,
          smallHeight:
            smallFileDims?.height ?? draft.workCover.smallHeight ?? null,
        })
      : null;

    return {
      id: `${draft.group}-${index}-${draft.src}`,
      group: draft.group,
      src: draft.src,
      filename,
      publicPath: publicPathFromSrc(draft.src),
      sourceFile: draft.sourceFile,
      project: draft.project,
      projectSlug: draft.projectSlug,
      pages: draft.pages,
      component: draft.component,
      role: draft.role,
      technicalRole: draft.technicalRole,
      recommendedWhy: ROLE_WHY[draft.role],
      sizes: draft.sizes,
      quality: NEXT_DEFAULT_QUALITY,
      loading: draft.priority ? "eager (priority)" : "lazy (default)",
      priority: draft.priority,
      renderedDimensions:
        renderedWidth > 0
          ? `~${formatDims(renderedWidth, renderedHeight)} (desktop ref)`
          : "—",
      renderedWidth,
      renderedHeight,
      aspectRatioLabel: desktopAspectLabel(
        draft.role,
        renderedWidth,
        renderedHeight,
      ),
      recommendedExport:
        rec.width > 0 ? formatDims(rec.width, rec.height) : "—",
      recommendedWidth: rec.width,
      recommendedHeight: rec.height,
      intrinsicWidth,
      intrinsicHeight,
      dataWidth,
      dataHeight,
      intrinsicFromFile,
      metadataStatus,
      metadataStatusLabel: metadataStatusLabel(metadataStatus),
      metadataMismatch: metadataStatus === "incorrect",
      correctMetadataSnippet: correctMetadataSnippet(
        intrinsicFromFile ? intrinsicWidth : null,
        intrinsicFromFile ? intrinsicHeight : null,
      ),
      status,
      statusLabel,
      statusNote,
      fileExists: exists,
      requiresMobile,
      mobileRequiredMissing,
      duplicateUsage:
        duplicateCount > 1
          ? `Yes · used across ${pageCount} page${pageCount === 1 ? "" : "s"}`
          : "No",
      duplicateCount,
      notes: draft.notes ?? [],
      objectPosition,
      mobileObjectPosition,
      previewAspects: previewAspectsFor(
        draft.role,
        renderedWidth,
        renderedHeight,
      ),
      mobileSrc: declaredMobileSrc,
      expectedMobileSrc,
      expectedMobileFilename,
      expectedMobilePublicPath,
      mobilePublicPath: declaredMobileSrc
        ? publicPathFromSrc(declaredMobileSrc)
        : expectedMobilePublicPath,
      mobileFilename: declaredMobileSrc
        ? filenameFromSrc(declaredMobileSrc)
        : expectedMobileFilename,
      mobileFileExists,
      mobileDataWidth,
      mobileDataHeight,
      mobileIntrinsicWidth,
      mobileIntrinsicHeight,
      mobileIntrinsicFromFile,
      mobileAspectRatioLabel:
        mobileIntrinsicWidth != null && mobileIntrinsicHeight != null
          ? simplifyAspect(mobileIntrinsicWidth, mobileIntrinsicHeight)
          : mobileFrame.aspectLabel,
      mobileRenderedWidth: mobileFrame.w,
      mobileRenderedHeight: mobileFrame.h,
      mobileRecommendedExport:
        mobileRec.width > 0
          ? formatDims(mobileRec.width, mobileRec.height)
          : "—",
      mobileRecommendedWidth: mobileRec.width,
      mobileRecommendedHeight: mobileRec.height,
      mobileStatusLabel:
        declaredMobileSrc && mobileFileExists
          ? "✓ Present"
          : declaredMobileSrc
            ? "✕ Artwork missing"
            : requiresMobile
              ? "⚠ Missing mobileSrc config"
              : "— Not required",
      mobileMetadataStatus,
      mobileMetadataStatusLabel:
        mobileMetadataStatus === "not-applicable"
          ? "— Not applicable"
          : metadataStatusLabel(mobileMetadataStatus),
      mobileMetadataMismatch,
      mobileCorrectMetadataSnippet: correctMetadataSnippet(
        mobileIntrinsicFromFile ? (mobileFileDims?.width ?? null) : null,
        mobileIntrinsicFromFile ? (mobileFileDims?.height ?? null) : null,
        { width: "mobileWidth", height: "mobileHeight" },
      ),
      workCoverAudit,
    };
  });

  const duplicateSrcs = new Set(
    entries.filter((e) => e.duplicateCount > 1).map((e) => e.src),
  );
  const stats = {
    desktopPresent: entries.filter((e) => e.fileExists).length,
    desktopMissing: entries.filter((e) => !e.fileExists).length,
    mobilePresent: entries.filter(
      (e) => e.requiresMobile && e.mobileSrc && e.mobileFileExists,
    ).length,
    mobileMissing: entries.filter((e) => e.mobileRequiredMissing).length,
    metadataCorrect: entries.filter(
      (e) =>
        e.metadataStatus === "correct" &&
        !e.mobileMetadataMismatch &&
        (e.mobileMetadataStatus === "correct" ||
          e.mobileMetadataStatus === "not-applicable" ||
          e.mobileMetadataStatus === "unknown"),
    ).length,
    metadataIncorrect: entries.filter(
      (e) => e.metadataMismatch || e.mobileMetadataMismatch,
    ).length,
  };

  const summary = {
    total: entries.length,
    ideal: entries.filter((e) => e.status === "ideal").length,
    good: entries.filter((e) => e.status === "good").length,
    "too-small": entries.filter((e) => e.status === "too-small").length,
    missing: entries.filter((e) => e.status === "missing").length,
    unusedOnDisk: unused.length,
    duplicates: duplicateSrcs.size,
    heroes: entries.filter((e) => e.role === "Hero").length,
    desktopPresent: stats.desktopPresent,
    desktopMissing: stats.desktopMissing,
    mobilePresent: stats.mobilePresent,
    mobileMissing: stats.mobileMissing,
    mobileArtworkMissing: entries.filter(
      (e) => e.mobileSrc && !e.mobileFileExists,
    ).length,
    mobileUnconfigured: entries.filter(
      (e) => e.requiresMobile && !e.mobileSrc,
    ).length,
    metadataCorrect: stats.metadataCorrect,
    metadataIncorrect: stats.metadataIncorrect,
  };

  return {
    entries,
    groups: ["Homepage", "Work", "Case Studies", "Shared Assets"],
    summary,
  };
}
