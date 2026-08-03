"use client";

import { useState } from "react";
import type { AuditGroup, ImageAuditEntry } from "@/lib/dev/image-audit";

type ImageAuditClientProps = {
  groups: AuditGroup[];
  entries: ImageAuditEntry[];
  summary: {
    total: number;
    good: number;
    "needs-larger": number;
    missing: number;
    unusedOnDisk: number;
  };
};

function CopyFilenameButton({ filename }: { filename: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="dev-image-audit__copy"
      data-copied={copied ? "true" : "false"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(filename);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? "Copied" : "Copy filename"}
    </button>
  );
}

function AuditCard({ entry }: { entry: ImageAuditEntry }) {
  return (
    <article className="dev-image-audit__card">
      {entry.fileExists ? (
        <a
          href={entry.src}
          target="_blank"
          rel="noopener noreferrer"
          className="dev-image-audit__thumb-wrap"
          title="Open original"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.src}
            alt=""
            className="dev-image-audit__thumb"
            width={160}
            height={120}
          />
        </a>
      ) : (
        <div className="dev-image-audit__thumb-wrap" aria-hidden="true">
          <div className="dev-image-audit__thumb--missing">File missing</div>
        </div>
      )}

      <div className="dev-image-audit__meta">
        <div className="dev-image-audit__row-top">
          <span
            className={`dev-image-audit__status dev-image-audit__status--${entry.status}`}
          >
            {entry.statusLabel}
          </span>
          <h3 className="dev-image-audit__filename">{entry.filename}</h3>
          <CopyFilenameButton filename={entry.filename} />
        </div>

        <dl className="dev-image-audit__grid">
          <div>
            <dt>Project</dt>
            <dd>{entry.project}</dd>
          </div>
          <div>
            <dt>Page(s)</dt>
            <dd>{entry.pages.join(", ")}</dd>
          </div>
          <div>
            <dt>Public path</dt>
            <dd>{entry.publicPath}</dd>
          </div>
          <div>
            <dt>Component</dt>
            <dd>{entry.component}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{entry.role}</dd>
          </div>
          <div>
            <dt>Recommended export</dt>
            <dd>{entry.recommendedExport}</dd>
          </div>
          <div>
            <dt>Current rendered</dt>
            <dd>{entry.renderedDimensions}</dd>
          </div>
          <div>
            <dt>Intrinsic (data)</dt>
            <dd>
              {entry.intrinsicWidth != null && entry.intrinsicHeight != null
                ? `${entry.intrinsicWidth} × ${entry.intrinsicHeight}`
                : "—"}
            </dd>
          </div>
          <div>
            <dt>sizes</dt>
            <dd>{entry.sizes}</dd>
          </div>
          <div>
            <dt>quality</dt>
            <dd>{entry.quality}</dd>
          </div>
          <div>
            <dt>loading</dt>
            <dd>{entry.loading}</dd>
          </div>
          <div>
            <dt>priority</dt>
            <dd>{entry.priority ? "true" : "false"}</dd>
          </div>
          <div>
            <dt>Duplicate usage</dt>
            <dd>{entry.duplicateUsage}</dd>
          </div>
          <div>
            <dt>File</dt>
            <dd>{entry.fileExists ? "Found" : "Missing"}</dd>
          </div>
        </dl>

        {entry.notes.length > 0 ? (
          <ul className="dev-image-audit__notes">
            {entry.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export function ImageAuditClient({
  groups,
  entries,
  summary,
}: ImageAuditClientProps) {
  return (
    <div className="dev-image-audit">
      <div className="dev-image-audit__inner">
        <header className="dev-image-audit__header">
          <p className="dev-image-audit__eyebrow">Developer only</p>
          <h1 className="dev-image-audit__title">Image audit</h1>
          <p className="dev-image-audit__lede">
            Inventory of every portfolio image: usage, Next/Image settings,
            recommended 2× export size vs declared intrinsic size. Production
            pages are untouched.
          </p>
          <ul className="dev-image-audit__summary">
            <li>{summary.total} entries</li>
            <li>✅ {summary.good} good</li>
            <li>⚠ {summary["needs-larger"]} needs attention</li>
            <li>❌ {summary.missing} missing</li>
            <li>{summary.unusedOnDisk} unused on disk</li>
          </ul>
        </header>

        <nav className="dev-image-audit__nav" aria-label="Audit sections">
          {groups.map((group) => (
            <a key={group} href={`#${slugify(group)}`}>
              {group}
            </a>
          ))}
        </nav>

        {groups.map((group) => {
          const groupEntries = entries.filter((entry) => entry.group === group);
          return (
            <section
              key={group}
              id={slugify(group)}
              className="dev-image-audit__group"
            >
              <h2 className="dev-image-audit__group-title">
                {group}{" "}
                <span style={{ color: "var(--dia-muted)", fontWeight: 400 }}>
                  ({groupEntries.length})
                </span>
              </h2>
              {groupEntries.length === 0 ? (
                <p className="dev-image-audit__empty">No images in this group.</p>
              ) : (
                <div className="dev-image-audit__list">
                  {groupEntries.map((entry) => (
                    <AuditCard key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}
