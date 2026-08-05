"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  AuditRoleFilter,
  AuditRoleKind,
  ImageAuditEntry,
  ImageAuditSummary,
} from "@/lib/dev/image-audit-shared";
import {
  AUDIT_PROJECT_OPTIONS,
  AUDIT_ROLE_FILTER_OPTIONS,
  AUDIT_ROLE_SECTIONS,
  computeProjectStats,
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
  Gallery: 2,
  Quote: 3,
  "Phone Mockup": 4,
  "Browser Mockup": 5,
  Diagram: 6,
  Cover: 7,
  Thumbnail: 8,
  Other: 9,
};

function resolveFilterSlug(projectParam: string): string {
  const option = AUDIT_PROJECT_OPTIONS.find((item) => item.slug === projectParam);
  return option?.filterSlug ?? "";
}

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

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="dev-image-audit__meta-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function isArtDirectedRole(role: ImageAuditEntry["role"]) {
  return role === "Hero" || role === "Large Feature";
}

function DesktopAssetCard({ entry }: { entry: ImageAuditEntry }) {
  const focused = isArtDirectedRole(entry.role);

  return (
    <section className="dev-image-audit__asset-card">
      <header className="dev-image-audit__asset-card-header">
        <h4 className="dev-image-audit__asset-card-title">Desktop</h4>
        <span
          className={`dev-image-audit__status dev-image-audit__status--${entry.status}`}
        >
          {entry.statusLabel}
        </span>
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
        <MetaRow label="Source filename" value={entry.filename} />
        <MetaRow label="Image path" value={entry.publicPath} />
        <MetaRow label="Export size" value={entry.recommendedExport} />
        <MetaRow label="Aspect ratio" value={entry.aspectRatioLabel} />
        {!focused ? (
          <>
            <MetaRow
              label="Intrinsic size"
              value={
                entry.intrinsicWidth != null && entry.intrinsicHeight != null
                  ? `${entry.intrinsicWidth} × ${entry.intrinsicHeight}`
                  : "—"
              }
            />
            <MetaRow label="objectPosition" value={entry.objectPosition} />
            <MetaRow
              label="Source TS file"
              value={entry.sourceFile || "—"}
            />
          </>
        ) : null}
      </dl>
    </section>
  );
}

function MobileAssetCard({ entry }: { entry: ImageAuditEntry }) {
  const declared = Boolean(entry.mobileSrc);
  const hasMobile = declared && entry.mobileFileExists;
  const isLargeFeature = entry.role === "Large Feature";
  const focused = isArtDirectedRole(entry.role);
  const mobilePath = entry.mobilePublicPath;
  const mobileFilename = entry.mobileFilename;
  const thumbSrc = hasMobile ? entry.mobileSrc : null;

  return (
    <section className="dev-image-audit__asset-card">
      <header className="dev-image-audit__asset-card-header">
        <h4 className="dev-image-audit__asset-card-title">Mobile</h4>
        <span
          className={`dev-image-audit__status ${
            hasMobile
              ? "dev-image-audit__status--ideal"
              : "dev-image-audit__status--too-small"
          }`}
        >
          {entry.mobileStatusLabel}
        </span>
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
        missingLabel="Missing Mobile Artwork"
      />

      {!hasMobile ? (
        <div className="dev-image-audit__missing-mobile">
          <p className="dev-image-audit__missing-mobile-title">
            Missing Mobile Artwork
          </p>
          {isLargeFeature ? (
            <p>
              {declared
                ? "mobileSrc is declared in case-study data, but the file was not found on disk."
                : "This Large Feature has not yet been provided with a mobile image (mobileSrc)."}
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
        {declared ? (
          <>
            <MetaRow label="Source filename" value={mobileFilename} />
            <MetaRow label="Image path" value={mobilePath} />
            <MetaRow
              label="Export size"
              value={entry.mobileRecommendedExport}
            />
            <MetaRow
              label="Aspect ratio"
              value={entry.mobileAspectRatioLabel}
            />
          </>
        ) : null}
        {!focused ? (
          <MetaRow
            label="mobileSrc"
            value={entry.mobileSrc ?? "— (not set)"}
          />
        ) : null}
      </dl>
    </section>
  );
}

function AuditCard({ entry }: { entry: ImageAuditEntry }) {
  const showMobilePair = isArtDirectedRole(entry.role);

  return (
    <article className="dev-image-audit__card">
      <div className="dev-image-audit__card-heading">
        <span className="dev-image-audit__role-chip">{entry.role}</span>
        <h3 className="dev-image-audit__filename">{entry.filename}</h3>
        {entry.statusNote ? (
          <p className="dev-image-audit__status-note">{entry.statusNote}</p>
        ) : null}
      </div>

      {showMobilePair ? (
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

function ProjectSummary({
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
        Images: {stats.total}
      </p>
      <div className="dev-image-audit__project-summary-grid">
        <div>
          <p className="dev-image-audit__toolbar-label">Desktop</p>
          <p className="dev-image-audit__summary-ideal">
            ✓ {stats.desktopComplete} Complete
          </p>
        </div>
        <div>
          <p className="dev-image-audit__toolbar-label">Mobile</p>
          <p className="dev-image-audit__summary-ideal">
            ✓ {stats.mobilePresent} Present
          </p>
          <p className="dev-image-audit__summary-too-small">
            ⚠ {stats.mobileMissing} Missing
          </p>
        </div>
        <div>
          <p className="dev-image-audit__toolbar-label">Quality</p>
          <p>
            Ideal <strong>{stats.ideal}</strong>
          </p>
          <p>
            Good <strong>{stats.good}</strong>
          </p>
          <p>
            Needs attention <strong>{stats.needsAttention}</strong>
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
  const selectedOption =
    AUDIT_PROJECT_OPTIONS.find((item) => item.slug === projectParam) ??
    AUDIT_PROJECT_OPTIONS[0];
  const filterSlug = resolveFilterSlug(selectedOption.slug);
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
            Replace portfolio images quickly. Desktop and mobile assets are
            listed separately with exact export sizes and expected filenames.
          </p>

          <div className="dev-image-audit__filters">
            <label className="dev-image-audit__project-select">
              <span className="dev-image-audit__toolbar-label">Project</span>
              <select
                value={selectedOption.slug}
                onChange={(event) => setParam("project", event.target.value)}
                aria-label="Filter by project"
              >
                {AUDIT_PROJECT_OPTIONS.map((option) => (
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
            <ProjectSummary
              title={selectedOption.label}
              entries={filtered}
            />
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
