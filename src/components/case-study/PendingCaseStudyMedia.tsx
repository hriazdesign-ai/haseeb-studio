"use client";

import { useEffect, useState, type ReactNode } from "react";

type PendingCaseStudyMediaProps = {
  src: string;
  caption?: string;
  /** Frame class while artwork is missing / probing (gallery vs large). */
  placeholderClassName: string;
  /**
   * `inline` — figure only (paired gallery cells).
   * `feature` — wraps placeholder in `.container` to match LargeFeature.
   */
  layout?: "inline" | "feature";
  /** Accessible label when `layout="feature"`. */
  label?: string;
  children: ReactNode;
};

/**
 * Renders case-study media when the public file exists; otherwise a calm
 * placeholder so configured-but-not-yet-exported paths never break the page.
 */
export function PendingCaseStudyMedia({
  src,
  caption,
  placeholderClassName,
  layout = "inline",
  label,
  children,
}: PendingCaseStudyMediaProps) {
  const [status, setStatus] = useState<"pending" | "ready" | "missing">(
    "pending",
  );

  useEffect(() => {
    let cancelled = false;

    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setStatus("ready");
    };
    probe.onerror = () => {
      if (!cancelled) setStatus("missing");
    };
    probe.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (status === "ready") {
    return <>{children}</>;
  }

  const placeholder = (
    <figure className="m-0 flex min-w-0 flex-col gap-[18px]">
      <div
        className={[
          "relative w-full overflow-hidden case-study-media--bordered bg-[#f3f3f3]",
          placeholderClassName,
        ].join(" ")}
        aria-hidden={status === "pending"}
      >
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <p className="type-cs-caption m-0 text-[#929292]">
            {status === "missing" ? "Artwork pending" : ""}
          </p>
        </div>
      </div>
      {caption ? (
        <figcaption className="type-cs-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );

  if (layout === "feature") {
    return (
      <section className="container" aria-label={label}>
        {placeholder}
      </section>
    );
  }

  return placeholder;
}
