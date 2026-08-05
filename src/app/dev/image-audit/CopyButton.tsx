"use client";

import { useEffect, useRef, useState } from "react";

const COPIED_RESET_MS = 1800;

type CopyButtonProps = {
  /** Idle label shown on the button. */
  label: string;
  /** Clipboard payload. */
  value: string;
  /** Visually primary vs secondary (filename). */
  variant?: "primary" | "secondary";
  /** Disable when there is nothing useful to copy. */
  disabled?: boolean;
};

/**
 * Shared clipboard control for the image-audit page only.
 */
export function CopyButton({
  label,
  value,
  variant = "primary",
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const idleLabel = label;
  const busy = disabled || !value;

  return (
    <button
      type="button"
      className={[
        "dev-image-audit__copy",
        variant === "secondary" ? "dev-image-audit__copy--secondary" : null,
      ]
        .filter(Boolean)
        .join(" ")}
      data-copied={copied ? "true" : "false"}
      disabled={busy}
      aria-label={copied ? `${idleLabel}: copied` : idleLabel}
      onClick={async () => {
        if (busy) return;
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          if (timerRef.current != null) {
            window.clearTimeout(timerRef.current);
          }
          timerRef.current = window.setTimeout(() => {
            setCopied(false);
            timerRef.current = null;
          }, COPIED_RESET_MS);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? "Copied" : idleLabel}
    </button>
  );
}
