import fs from "node:fs";
import path from "node:path";
import { caseStudies, type CaseStudy, type CaseStudyImage } from "@/lib/case-studies";
import { homeParallaxProjects } from "@/lib/home-parallax";
import {
  experienceProjects,
  studioWorkProjects,
  type Project,
} from "@/lib/projects";
import { workMotionItems, type WorkMotionMediaRole } from "@/lib/work-motion";

export type AuditGroup =
  | "Homepage"
  | "Work"
  | "Case Studies"
  | "Shared Assets";

export type AuditStatus = "good" | "needs-larger" | "missing";

export type ImageAuditEntry = {
  id: string;
  group: AuditGroup;
  src: string;
  filename: string;
  publicPath: string;
  project: string;
  pages: string[];
  component: string;
  role: string;
  sizes: string;
  quality: string;
  loading: string;
  priority: boolean;
  /** Approximate CSS-rendered size at desktop reference width. */
  renderedDimensions: string;
  renderedWidth: number;
  renderedHeight: number;
  recommendedExport: string;
  recommendedWidth: number;
  recommendedHeight: number;
  intrinsicWidth: number | null;
  intrinsicHeight: number | null;
  status: AuditStatus;
  statusLabel: string;
  fileExists: boolean;
  duplicateUsage: string;
  duplicateCount: number;
  notes: string[];
};

type UsageDraft = {
  group: AuditGroup;
  src: string;
  project: string;
  pages: string[];
  component: string;
  role: string;
  sizes: string;
  priority: boolean;
  /** Desktop CSS display size (1×). */
  renderedWidth: number;
  renderedHeight: number;
  intrinsicWidth: number | null;
  intrinsicHeight: number | null;
  notes?: string[];
};

const DPR = 2;
/** Design reference viewport for full-bleed estimates. */
const VIEWPORT = 1440;
/** Shared `.container` max width. */
const CONTAINER = 1300;
const NEXT_DEFAULT_QUALITY = "75 (Next.js default)";

function publicPathFromSrc(src: string): string {
  return src.startsWith("/") ? `public${src}` : `public/${src}`;
}

function filenameFromSrc(src: string): string {
  return src.split("/").pop() ?? src;
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

function workMotionRendered(role: WorkMotionMediaRole): { w: number; h: number } {
  const max = Math.min(VIEWPORT, 1440);
  switch (role) {
    case "feature-landscape":
      return { w: max, h: max * (690 / 1280) };
    case "offset-landscape":
      return { w: max * 0.5, h: max * 0.5 * (517 / 800) };
    case "offset-square":
      return { w: max * 0.65, h: max * 0.65 };
    case "square-pair":
      return { w: max * 0.28, h: max * 0.28 };
    case "pair-landscape":
      return { w: max * 0.5, h: max * 0.5 * (392 / 608) };
  }
}

function collectCaseStudyImages(study: CaseStudy): Array<{
  image: CaseStudyImage;
  role: string;
  sizes: string;
  priority: boolean;
  renderedWidth: number;
  renderedHeight: number;
}> {
  const out: Array<{
    image: CaseStudyImage;
    role: string;
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
  const feature = { w: VIEWPORT, h: 720 };

  const push = (
    image: CaseStudyImage | undefined,
    role: string,
    sizes: string,
    priority: boolean,
    rendered: { w: number; h: number },
  ) => {
    if (!image) return;
    out.push({
      image,
      role,
      sizes,
      priority,
      renderedWidth: rendered.w,
      renderedHeight: rendered.h,
    });
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
        push(
          block.image,
          `bodyBlocks[${index}].feature`,
          "100vw",
          false,
          feature,
        );
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
  push(study.feature, "feature", "100vw", false, feature);
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
  push(study.closingFeature, "closingFeature", "100vw", false, feature);
  push(study.postResultFeature, "postResultFeature", "100vw", false, feature);

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

    drafts.push({
      group: "Homepage",
      src: project.image.src,
      project: project.name,
      pages: ["/", "/home-parallax-blocks", "/home-parallax"],
      component: isFeatured
        ? "BlocksWorkSection / FeaturedProject"
        : "BlocksWorkSection / FeaturedProject",
      role: `home-parallax · ${project.layout}`,
      sizes: isFeatured ? "100vw" : "(max-width: 1023px) 100vw, 50vw",
      priority: isFeatured,
      renderedWidth: rendered.w,
      renderedHeight: rendered.h,
      intrinsicWidth: project.image.width,
      intrinsicHeight: project.image.height,
      notes: [
        "Blocks homepage uses BlocksWorkSection; /home-parallax uses FeaturedProject",
      ],
    });
  }

  for (const project of studioWorkProjects) {
    if (!project.image) continue;
    const rendered = workCardRendered(project.size);
    drafts.push({
      group: "Work",
      src: project.image.src,
      project: project.name,
      pages: ["/work"],
      component: "WorkCard",
      role: `studio cover · ${project.size}`,
      sizes: workCardSizes(project.size),
      priority: project.size === "featured",
      renderedWidth: rendered.w,
      renderedHeight: rendered.h,
      intrinsicWidth: project.image.width,
      intrinsicHeight: project.image.height,
    });
  }

  for (const project of experienceProjects) {
    if (!project.image) continue;
    const rendered = workCardRendered(project.size);
    const motion = Object.values(workMotionItems).find(
      (item) => item.id === project.id,
    );

    drafts.push({
      group: "Work",
      src: project.image.src,
      project: project.name,
      pages: motion ? ["/work", "/work-motion-test"] : ["/work"],
      component: motion ? "WorkCard + WorkMotionProject" : "WorkCard",
      role: motion
        ? `experience cover · ${project.size} · motion ${motion.role}`
        : `experience cover · ${project.size}`,
      sizes: motion
        ? `WorkCard: ${workCardSizes(project.size)} · WorkMotion: ${workMotionSizes(motion.role)}`
        : workCardSizes(project.size),
      priority: motion?.id === "verso-design-system",
      renderedWidth: motion
        ? Math.max(rendered.w, workMotionRendered(motion.role).w)
        : rendered.w,
      renderedHeight: motion
        ? Math.max(rendered.h, workMotionRendered(motion.role).h)
        : rendered.h,
      intrinsicWidth: project.image.width,
      intrinsicHeight: project.image.height,
      notes: motion
        ? [
            `WorkMotion largest frame ~${formatDims(workMotionRendered(motion.role).w, workMotionRendered(motion.role).h)}`,
            `WorkCard frame ~${formatDims(rendered.w, rendered.h)}`,
          ]
        : undefined,
    });
  }

  for (const study of caseStudies) {
    for (const entry of collectCaseStudyImages(study)) {
      drafts.push({
        group: "Case Studies",
        src: entry.image.src,
        project: study.name,
        pages: [`/work/${study.slug}`],
        component: entry.priority
          ? "CaseStudyView → CaseStudyMedia (hero)"
          : entry.role.includes("gallery")
            ? "CaseStudyView → PairedGallery → CaseStudyMedia"
            : entry.role.includes("pullQuote")
              ? "CaseStudyView → PullQuoteImage → ScrollParallaxImage"
              : "CaseStudyView → LargeFeature → CaseStudyMedia",
        role: entry.role,
        sizes: entry.sizes,
        priority: entry.priority,
        renderedWidth: entry.renderedWidth,
        renderedHeight: entry.renderedHeight,
        intrinsicWidth: entry.image.width,
        intrinsicHeight: entry.image.height,
        notes: entry.image.zoomable
          ? ["zoomable — lightbox may show up to ~1200px wide"]
          : undefined,
      });
    }
  }

  return drafts;
}

function resolveStatus(
  exists: boolean,
  intrinsicWidth: number | null,
  recommendedWidth: number,
): { status: AuditStatus; statusLabel: string } {
  if (!exists) {
    return { status: "missing", statusLabel: "❌ Missing" };
  }
  if (
    intrinsicWidth != null &&
    intrinsicWidth < recommendedWidth * 0.95
  ) {
    return {
      status: "needs-larger",
      statusLabel: "⚠ Needs larger export",
    };
  }
  return { status: "good", statusLabel: "✅ Good" };
}

/**
 * Build the full image audit for `/dev/image-audit`.
 * Server-only (uses `fs`).
 */
export function buildImageAudit(): {
  entries: ImageAuditEntry[];
  groups: AuditGroup[];
  summary: Record<AuditStatus, number> & { total: number; unusedOnDisk: number };
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
      pages: ["(not referenced)"],
      component: "—",
      role: "unused on-disk asset",
      sizes: "—",
      priority: false,
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
    const rec =
      draft.renderedWidth > 0
        ? recommend(draft.renderedWidth, draft.renderedHeight)
        : { width: 0, height: 0 };

    let status: AuditStatus;
    let statusLabel: string;
    if (!exists) {
      status = "missing";
      statusLabel = "❌ Missing";
    } else if (isUnused) {
      status = "needs-larger";
      statusLabel = "⚠ Unused on disk";
    } else {
      ({ status, statusLabel } = resolveStatus(
        exists,
        draft.intrinsicWidth,
        rec.width,
      ));
    }

    const pageCount = srcPageSets.get(draft.src)?.size ?? draft.pages.length;
    const usageCount = srcCounts.get(draft.src) ?? 1;
    const duplicateCount = Math.max(pageCount, usageCount);

    return {
      id: `${draft.group}-${index}-${draft.src}`,
      group: draft.group,
      src: draft.src,
      filename: filenameFromSrc(draft.src),
      publicPath: publicPathFromSrc(draft.src),
      project: draft.project,
      pages: draft.pages,
      component: draft.component,
      role: draft.role,
      sizes: draft.sizes,
      quality: NEXT_DEFAULT_QUALITY,
      loading: draft.priority ? "eager (priority)" : "lazy (default)",
      priority: draft.priority,
      renderedDimensions:
        draft.renderedWidth > 0
          ? `~${formatDims(draft.renderedWidth, draft.renderedHeight)} (desktop ref)`
          : "—",
      renderedWidth: draft.renderedWidth,
      renderedHeight: draft.renderedHeight,
      recommendedExport:
        rec.width > 0 ? formatDims(rec.width, rec.height) : "—",
      recommendedWidth: rec.width,
      recommendedHeight: rec.height,
      intrinsicWidth: draft.intrinsicWidth,
      intrinsicHeight: draft.intrinsicHeight,
      status,
      statusLabel,
      fileExists: exists,
      duplicateUsage:
        duplicateCount > 1
          ? `Yes · used across ${pageCount} page${pageCount === 1 ? "" : "s"}`
          : "No",
      duplicateCount,
      notes: draft.notes ?? [],
    };
  });

  const summary = {
    total: entries.length,
    good: entries.filter((e) => e.status === "good").length,
    "needs-larger": entries.filter((e) => e.status === "needs-larger").length,
    missing: entries.filter((e) => e.status === "missing").length,
    unusedOnDisk: unused.length,
  };

  return {
    entries,
    groups: ["Homepage", "Work", "Case Studies", "Shared Assets"],
    summary,
  };
}
