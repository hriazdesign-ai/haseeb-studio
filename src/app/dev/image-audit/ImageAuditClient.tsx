"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  AuditRoleFilter,
  AuditRoleKind,
  ImageAuditEntry,
  ImageAuditSummary,
  WorkCoverUsagePanel,
} from "@/lib/dev/image-audit-shared";
import {
  buildAuditProjectOptions,
  AUDIT_ROLE_FILTER_OPTIONS,
  AUDIT_ROLE_SECTIONS,
  computeProjectStats,
  isArtDirectedAuditRole,
  matchesRoleFilter,
  roleSectionFor,
} from "@/lib/dev/image-audit-shared";
import { CopyButton } from "./CopyButton";

type ImageAuditClientProps = {
  entries: ImageAuditEntry[];
  summary: ImageAuditSummary;
};

const ROLE_RANK: Record<AuditRoleKind, number> = {
  Hero: 0,
  "Large Feature": 1,
  "Closing Feature": 2,
  Gallery: 3,
  Quote: 4,
  "Phone Mockup": 5,
  "Browser Mockup": 6,
  Diagram: 7,
  Cover: 8,
  "Work Card": 9,
  Thumbnail: 10,
  Other: 11,
};

function AssetThumb({
  src,
  aspect,
  objectPosition,
  missing,
  missingLabel = "No image",
}: {
  src: string | null;
  aspect: string;
  objectPosition?: string;
  missing: boolean;
  missingLabel?: string;
}) {
  return (
    <div
      className="dev-image-audit__preview-frame"
      style={{ aspectRatio: aspect }}
    >
      {missing || !src ? (
        <div className="dev-image-audit__preview-frame--missing">
          {missingLabel}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="dev-image-audit__preview-img"
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
    </div>
  );
}

function MetaRow({
  label,
  value,
  warn = false,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div
      className={[
        "dev-image-audit__meta-row",
        warn ? "dev-image-audit__meta-row--warn" : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function CodeMetadataBlock({
  width,
  height,
  mismatch,
  correctSnippet,
  variant,
}: {
  width: number | null;
  height: number | null;
  mismatch: boolean;
  correctSnippet: string;
  variant: "desktop" | "mobile";
}) {
  return (
    <div
      className={[
        "dev-image-audit__code-meta",
        mismatch ? "dev-image-audit__code-meta--warn" : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dev-image-audit__code-meta-header">
        <h5 className="dev-image-audit__code-meta-title">Code Metadata</h5>
        {mismatch ? (
          <span className="dev-image-audit__badge dev-image-audit__badge--warn">
            ⚠ Mismatch
          </span>
        ) : null}
      </div>

      <dl className="dev-image-audit__meta">
        <MetaRow
          label="Width"
          value={width != null ? String(width) : "—"}
          warn={mismatch}
        />
        <MetaRow
          label="Height"
          value={height != null ? String(height) : "—"}
          warn={mismatch}
        />
      </dl>

      {mismatch ? (
        <div className="dev-image-audit__metadata-warning">
          <p>⚠ Code dimensions do not match the exported image.</p>
          <CopyButton
            label="Copy Correct Metadata"
            value={correctSnippet}
            variant="secondary"
          />
        </div>
      ) : null}

      <p className="dev-image-audit__sr-only">
        {variant} TypeScript width and height
      </p>
    </div>
  );
}

function WorkCoverUsageBlock({ panel }: { panel: WorkCoverUsagePanel }) {
  return (
    <section
      className={[
        "dev-image-audit__usage-panel",
        panel.status === "warn"
          ? "dev-image-audit__usage-panel--warn"
          : "dev-image-audit__usage-panel--ok",
      ].join(" ")}
    >
      <header className="dev-image-audit__usage-panel-header">
        <h5 className="dev-image-audit__usage-panel-title">{panel.title}</h5>
        <span
          className={[
            "dev-image-audit__status",
            panel.status === "warn"
              ? "dev-image-audit__status--too-small"
              : "dev-image-audit__status--ideal",
          ].join(" ")}
        >
          {panel.statusLabel}
        </span>
      </header>
      <dl className="dev-image-audit__meta">
        <MetaRow label="Frame ratio" value={panel.frameRatioLabel} />
        <MetaRow label="Rendered reference" value={panel.renderedReference} />
        <MetaRow label="Recommended export" value={panel.recommendedExport} />
        {panel.expectedFilename ? (
          <MetaRow label="Expected" value={panel.expectedFilename} />
        ) : null}
        {panel.smallSrcConfiguredLabel ? (
          <MetaRow
            label="smallSrc configured"
            value={panel.smallSrcConfiguredLabel}
            warn={panel.smallSrcConfigured === false}
          />
        ) : null}
        {panel.artworkLabel ? (
          <MetaRow
            label="Artwork"
            value={panel.artworkLabel}
            warn={panel.artworkPresent === false}
          />
        ) : null}
        {panel.artworkSrc ? (
          <MetaRow label="Small image path" value={publicPathHint(panel.artworkSrc)} />
        ) : null}
      </dl>
      {panel.guidance ? (
        <p className="dev-image-audit__usage-guidance">{panel.guidance}</p>
      ) : null}
    </section>
  );
}

function publicPathHint(src: string): string {
  return src.startsWith("/") ? `public${src}` : `public/${src}`;
}

function WorkCoverSourceCard({ entry }: { entry: ImageAuditEntry }) {
  const intrinsicLabel =
    entry.intrinsicWidth != null && entry.intrinsicHeight != null
      ? `${entry.intrinsicWidth} × ${entry.intrinsicHeight}`
      : "—";
  const audit = entry.workCoverAudit!;

  return (
    <section className="dev-image-audit__asset-card dev-image-audit__asset-card--cover">
      <header className="dev-image-audit__asset-card-header">
        <h4 className="dev-image-audit__asset-card-title">Source Artwork</h4>
        <div className="dev-image-audit__status-stack">
          <span
            className={`dev-image-audit__status dev-image-audit__status--${entry.status}`}
          >
            {entry.fileExists ? "✓ Desktop artwork exists" : "⚠ Missing Desktop"}
          </span>
          <span
            className={[
              "dev-image-audit__status",
              entry.metadataMismatch
                ? "dev-image-audit__status--too-small"
                : entry.metadataStatus === "correct"
                  ? "dev-image-audit__status--ideal"
                  : "dev-image-audit__status--unused",
            ].join(" ")}
          >
            {entry.metadataStatusLabel}
          </span>
        </div>
      </header>

      <AssetThumb
        src={entry.src}
        aspect={entry.previewAspects.desktop}
        objectPosition={entry.objectPosition}
        missing={!entry.fileExists}
        missingLabel="File missing"
      />

      <div
        className="dev-image-audit__actions"
        role="group"
        aria-label="Source artwork copy actions"
      >
        <CopyButton label="Copy image path" value={entry.publicPath} />
        <CopyButton
          label="Copy filename"
          value={entry.filename}
          variant="secondary"
        />
        {audit.small.expectedFilename ? (
          <CopyButton
            label="Copy expected small filename"
            value={audit.small.expectedFilename}
            variant="secondary"
          />
        ) : null}
      </div>

      <dl className="dev-image-audit__meta">
        <MetaRow label="Image Role" value={entry.role} />
        <MetaRow label="Source filename" value={entry.filename} />
        <MetaRow label="Image path" value={entry.publicPath} />
        <MetaRow label="Intrinsic Size" value={intrinsicLabel} />
        <MetaRow label="Object Position" value={entry.objectPosition} />
        <MetaRow label="Source TS file" value={entry.sourceFile || "—"} />
      </dl>

      <CodeMetadataBlock
        width={entry.dataWidth}
        height={entry.dataHeight}
        mismatch={entry.metadataMismatch}
        correctSnippet={entry.correctMetadataSnippet}
        variant="desktop"
      />

      <div className="dev-image-audit__usage-grid">
        <WorkCoverUsageBlock panel={audit.large} />
        <WorkCoverUsageBlock panel={audit.small} />
      </div>
    </section>
  );
}

function DesktopAssetCard({ entry }: { entry: ImageAuditEntry }) {
  const intrinsicLabel =
    entry.intrinsicWidth != null && entry.intrinsicHeight != null
      ? `${entry.intrinsicWidth} × ${entry.intrinsicHeight}`
      : "—";

  return (
    <section className="dev-image-audit__asset-card">
      <header className="dev-image-audit__asset-card-header">
        <h4 className="dev-image-audit__asset-card-title">Desktop</h4>
        <div className="dev-image-audit__status-stack">
          <span
            className={`dev-image-audit__status dev-image-audit__status--${entry.status}`}
          >
            {entry.fileExists ? "✓ Desktop artwork exists" : "⚠ Missing Desktop"}
          </span>
          <span
            className={[
              "dev-image-audit__status",
              entry.metadataMismatch
                ? "dev-image-audit__status--too-small"
                : entry.metadataStatus === "correct"
                  ? "dev-image-audit__status--ideal"
                  : "dev-image-audit__status--unused",
            ].join(" ")}
          >
            {entry.metadataStatusLabel}
          </span>
        </div>
      </header>

      <AssetThumb
        src={entry.src}
        aspect={entry.previewAspects.desktop}
        objectPosition={entry.objectPosition}
        missing={!entry.fileExists}
        missingLabel="File missing"
      />

      <div
        className="dev-image-audit__actions"
        role="group"
        aria-label="Desktop copy actions"
      >
        <CopyButton label="Copy desktop image path" value={entry.publicPath} />
        <CopyButton
          label="Copy desktop filename"
          value={entry.filename}
          variant="secondary"
        />
      </div>

      <dl className="dev-image-audit__meta">
        <MetaRow label="Image Role" value={entry.role} />
        <MetaRow label="Desktop / Mobile" value="Desktop" />
        <MetaRow label="Source filename" value={entry.filename} />
        <MetaRow label="Image path" value={entry.publicPath} />
        <MetaRow label="Recommended Export" value={entry.recommendedExport} />
        <MetaRow label="Intrinsic Size" value={intrinsicLabel} />
        <MetaRow label="Aspect Ratio" value={entry.aspectRatioLabel} />
        <MetaRow label="Object Position" value={entry.objectPosition} />
        <MetaRow label="Source TS file" value={entry.sourceFile || "—"} />
      </dl>

      <CodeMetadataBlock
        width={entry.dataWidth}
        height={entry.dataHeight}
        mismatch={entry.metadataMismatch}
        correctSnippet={entry.correctMetadataSnippet}
        variant="desktop"
      />
    </section>
  );
}

function MobileAssetCard({ entry }: { entry: ImageAuditEntry }) {
  const declared = Boolean(entry.mobileSrc);
  const hasMobile = declared && entry.mobileFileExists;
  const focused = isArtDirectedAuditRole(entry.role);
  const mobilePath = entry.mobilePublicPath;
  const mobileFilename = entry.mobileFilename;
  const thumbSrc = hasMobile ? entry.mobileSrc : null;
  const intrinsicLabel =
    entry.mobileIntrinsicWidth != null && entry.mobileIntrinsicHeight != null
      ? `${entry.mobileIntrinsicWidth} × ${entry.mobileIntrinsicHeight}`
      : "—";

  return (
    <section className="dev-image-audit__asset-card">
      <header className="dev-image-audit__asset-card-header">
        <h4 className="dev-image-audit__asset-card-title">Mobile</h4>
        <div className="dev-image-audit__status-stack">
          <span
            className={`dev-image-audit__status ${
              hasMobile
                ? "dev-image-audit__status--ideal"
                : entry.requiresMobile
                  ? "dev-image-audit__status--too-small"
                  : "dev-image-audit__status--unused"
            }`}
          >
            {entry.mobileStatusLabel}
          </span>
          {declared ? (
            <span
              className={[
                "dev-image-audit__status",
                entry.mobileMetadataMismatch
                  ? "dev-image-audit__status--too-small"
                  : entry.mobileMetadataStatus === "correct"
                    ? "dev-image-audit__status--ideal"
                    : "dev-image-audit__status--unused",
              ].join(" ")}
            >
              {entry.mobileMetadataStatusLabel}
            </span>
          ) : null}
        </div>
      </header>

      <AssetThumb
        src={thumbSrc}
        aspect={
          entry.mobileAspectRatioLabel.includes(":")
            ? entry.mobileAspectRatioLabel.replace(":", " / ")
            : entry.previewAspects.mobile
        }
        objectPosition={entry.mobileObjectPosition}
        missing={!hasMobile}
        missingLabel={declared ? "Artwork missing" : "Missing mobileSrc config"}
      />

      {!hasMobile ? (
        <div className="dev-image-audit__missing-mobile">
          <p className="dev-image-audit__missing-mobile-title">
            {declared ? "Artwork missing" : "Missing mobileSrc config"}
          </p>
          {focused ? (
            <p>
              {declared
                ? "✓ mobileSrc is configured in case-study data. ✕ Export the file to disk to complete this pair."
                : "Add mobileSrc (and mobileWidth / mobileHeight) to the case-study data for this image."}
            </p>
          ) : null}
          {declared ? (
            <>
              <p>
                <span className="dev-image-audit__muted">mobileSrc</span>
                <br />
                {entry.mobileSrc}
              </p>
              <p>
                <span className="dev-image-audit__muted">Image path</span>
                <br />
                {mobilePath}
              </p>
            </>
          ) : null}
        </div>
      ) : null}

      {declared ? (
        <div
          className="dev-image-audit__actions"
          role="group"
          aria-label="Mobile copy actions"
        >
          <CopyButton label="Copy mobile image path" value={mobilePath} />
          <CopyButton
            label="Copy mobile filename"
            value={mobileFilename}
            variant="secondary"
          />
        </div>
      ) : null}

      <dl className="dev-image-audit__meta">
        <MetaRow label="Image Role" value={entry.role} />
        <MetaRow label="Desktop / Mobile" value="Mobile" />
        <MetaRow
          label="Source filename"
          value={declared ? mobileFilename : "—"}
        />
        <MetaRow label="Image path" value={declared ? mobilePath : "—"} />
        <MetaRow
          label="Export Size"
          value={declared ? entry.mobileRecommendedExport : "—"}
        />
        <MetaRow label="Intrinsic Size" value={hasMobile ? intrinsicLabel : "—"} />
        <MetaRow
          label="Aspect Ratio"
          value={declared ? entry.mobileAspectRatioLabel : "—"}
        />
        <MetaRow
          label="Object Position"
          value={entry.mobileObjectPosition}
        />
        <MetaRow label="Source TS file" value={entry.sourceFile || "—"} />
      </dl>

      {declared ? (
        <CodeMetadataBlock
          width={entry.mobileDataWidth}
          height={entry.mobileDataHeight}
          mismatch={entry.mobileMetadataMismatch}
          correctSnippet={entry.mobileCorrectMetadataSnippet}
          variant="mobile"
        />
      ) : null}
    </section>
  );
}

function AuditCard({ entry }: { entry: ImageAuditEntry }) {
  const showMobilePair = isArtDirectedAuditRole(entry.role);
  const showWorkCover = entry.workCoverAudit != null;

  return (
    <article
      className={[
        "dev-image-audit__card",
        entry.metadataMismatch || entry.mobileMetadataMismatch
          ? "dev-image-audit__card--metadata-warn"
          : null,
        showWorkCover ? "dev-image-audit__card--work-cover" : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dev-image-audit__card-heading">
        <span className="dev-image-audit__role-chip">{entry.role}</span>
        <h3 className="dev-image-audit__filename">{entry.filename}</h3>
        {entry.statusNote ? (
          <p className="dev-image-audit__status-note">{entry.statusNote}</p>
        ) : null}
      </div>

      {showWorkCover ? (
        <div className="dev-image-audit__asset-grid dev-image-audit__asset-grid--single">
          <WorkCoverSourceCard entry={entry} />
        </div>
      ) : showMobilePair ? (
        <div className="dev-image-audit__asset-grid">
          <DesktopAssetCard entry={entry} />
          <MobileAssetCard entry={entry} />
        </div>
      ) : (
        <div className="dev-image-audit__asset-grid dev-image-audit__asset-grid--single">
          <DesktopAssetCard entry={entry} />
        </div>
      )}

      {entry.notes.length > 0 ? (
        <ul className="dev-image-audit__notes">
          {entry.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function AuditOverview({
  title,
  entries,
}: {
  title: string;
  entries: ImageAuditEntry[];
}) {
  const stats = computeProjectStats(entries);

  return (
    <div className="dev-image-audit__project-summary">
      <h2 className="dev-image-audit__project-summary-title">{title}</h2>
      <p className="dev-image-audit__project-summary-count">
        Images Audited: {stats.total}
      </p>
      <div className="dev-image-audit__overview-grid">
        <div>
          <p className="dev-image-audit__toolbar-label">Desktop Images</p>
          <p className="dev-image-audit__summary-ideal">
            ✓ {stats.desktopPresent} Present
          </p>
        </div>
        <div>
          <p className="dev-image-audit__toolbar-label">Mobile Images</p>
          <p className="dev-image-audit__summary-ideal">
            ✓ {stats.mobilePresent} Present
          </p>
        </div>
        <div>
          <p className="dev-image-audit__toolbar-label">Metadata Correct</p>
          <p className="dev-image-audit__summary-ideal">
            ✓ {stats.metadataCorrect}
          </p>
        </div>
        <div>
          <p className="dev-image-audit__toolbar-label">Metadata Incorrect</p>
          <p className="dev-image-audit__summary-too-small">
            ⚠ {stats.metadataIncorrect}
          </p>
        </div>
        <div>
          <p className="dev-image-audit__toolbar-label">Missing Desktop</p>
          <p className="dev-image-audit__summary-too-small">
            ⚠ {stats.desktopMissing}
          </p>
        </div>
        <div>
          <p className="dev-image-audit__toolbar-label">Missing Mobile</p>
          <p className="dev-image-audit__summary-too-small">
            ⚠ {stats.mobileMissing}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectAuditView({
  project,
  entries,
}: {
  project: string;
  entries: ImageAuditEntry[];
}) {
  const sorted = [...entries].sort((a, b) => {
    const role = ROLE_RANK[a.role] - ROLE_RANK[b.role];
    if (role !== 0) return role;
    return a.filename.localeCompare(b.filename);
  });

  const roleGroups = AUDIT_ROLE_SECTIONS.map((section) => ({
    section,
    entries: sorted.filter((entry) => roleSectionFor(entry.role) === section),
  })).filter((group) => group.entries.length > 0);

  return (
    <section id={slugify(project)} className="dev-image-audit__group">
      <h2 className="dev-image-audit__group-title">
        {project}{" "}
        <span className="dev-image-audit__group-count">({entries.length})</span>
      </h2>

      {roleGroups.map((roleGroup) => (
        <div
          key={`${project}-${roleGroup.section}`}
          className="dev-image-audit__role-section"
        >
          <h3 className="dev-image-audit__role-section-title">
            {roleGroup.section}{" "}
            <span className="dev-image-audit__group-count">
              ({roleGroup.entries.length})
            </span>
          </h3>
          <div className="dev-image-audit__list">
            {roleGroup.entries.map((entry) => (
              <AuditCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function ImageAuditDashboard({ entries }: ImageAuditClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project") ?? "";
  const roleParam = (searchParams.get("role") ?? "") as AuditRoleFilter;

  const projectOptions = useMemo(
    () => buildAuditProjectOptions(entries),
    [entries],
  );
  const selectedOption =
    projectOptions.find((item) => item.slug === projectParam) ??
    projectOptions[0];
  const filterSlug = selectedOption.filterSlug;
  const roleFilter: AuditRoleFilter =
    AUDIT_ROLE_FILTER_OPTIONS.some((item) => item.id === roleParam)
      ? roleParam
      : "";

  const setParam = (key: "project" | "role", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (filterSlug && entry.projectSlug !== filterSlug) return false;
      if (!matchesRoleFilter(entry.role, roleFilter)) return false;
      return true;
    });
  }, [entries, filterSlug, roleFilter]);

  const projectGroups = useMemo(() => {
    const map = new Map<string, ImageAuditEntry[]>();
    for (const entry of filtered) {
      const key = entry.project || "—";
      const list = map.get(key) ?? [];
      list.push(entry);
      map.set(key, list);
    }

    const projects = [...map.keys()].sort((a, b) => {
      if (a === "—") return 1;
      if (b === "—") return -1;
      return a.localeCompare(b);
    });

    return projects.map((project) => ({
      project,
      entries: map.get(project) ?? [],
    }));
  }, [filtered]);

  return (
    <div className="dev-image-audit">
      <div className="dev-image-audit__inner">
        <header className="dev-image-audit__header">
          <p className="dev-image-audit__eyebrow">Developer only</p>
          <h1 className="dev-image-audit__title">Image Manager</h1>
          <p className="dev-image-audit__lede">
            Single source of truth for portfolio imagery — missing files,
            incorrect paths, metadata mismatches, and required mobile artwork.
          </p>

          <div className="dev-image-audit__filters">
            <label className="dev-image-audit__project-select">
              <span className="dev-image-audit__toolbar-label">Project</span>
              <select
                value={selectedOption.slug}
                onChange={(event) => setParam("project", event.target.value)}
                aria-label="Filter by project"
              >
                {projectOptions.map((option) => (
                  <option key={option.slug || "all"} value={option.slug}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="dev-image-audit__project-select">
              <span className="dev-image-audit__toolbar-label">Image role</span>
              <select
                value={roleFilter}
                onChange={(event) =>
                  setParam("role", event.target.value as AuditRoleFilter)
                }
                aria-label="Filter by image role"
              >
                {AUDIT_ROLE_FILTER_OPTIONS.map((option) => (
                  <option key={option.id || "all-roles"} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="dev-image-audit__overview">
            <AuditOverview title={selectedOption.label} entries={filtered} />
          </div>
        </header>

        <p className="dev-image-audit__result-count">
          Showing {filtered.length} of {entries.length} images
          {filterSlug ? "" : ` · ${projectGroups.length} projects`}
        </p>

        {projectGroups.length === 0 ? (
          <p className="dev-image-audit__empty">
            No images match the current project or role filter.
          </p>
        ) : (
          projectGroups.map((group) => (
            <ProjectAuditView
              key={group.project}
              project={group.project}
              entries={group.entries}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function ImageAuditClient(props: ImageAuditClientProps) {
  return (
    <Suspense
      fallback={
        <div className="dev-image-audit">
          <div className="dev-image-audit__inner">
            <p className="dev-image-audit__empty">Loading audit…</p>
          </div>
        </div>
      }
    >
      <ImageAuditDashboard {...props} />
    </Suspense>
  );
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
}
