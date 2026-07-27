"use client";

import { useEffect, type RefObject } from "react";

const TOP_GUARD_PX = 80;
const DELTA_THRESHOLD_PX = 10;

type UseScrollDirectionHeaderOptions = {
  headerRef: RefObject<HTMLElement | null>;
  /** When false (e.g. mobile menu open), force the header visible. */
  enabled: boolean;
};

/**
 * Hides a fixed header on meaningful downward scroll and reveals it on upward scroll.
 * Mutates a CSS class on the header to avoid React state on every scroll tick.
 */
export function useScrollDirectionHeader({
  headerRef,
  enabled,
}: UseScrollDirectionHeaderOptions) {
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastY = window.scrollY;
    let hidden = false;
    let frame = 0;

    const setHidden = (next: boolean) => {
      if (next) {
        const active = document.activeElement;
        if (active instanceof Node && header.contains(active)) {
          return;
        }
      }

      if (hidden === next) return;
      hidden = next;
      header.classList.toggle("is-hidden", next);
    };

    const update = () => {
      frame = 0;

      if (!enabled) {
        setHidden(false);
        lastY = window.scrollY;
        return;
      }

      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;

      if (y <= TOP_GUARD_PX) {
        setHidden(false);
        lastY = y;
        return;
      }

      if (Math.abs(delta) < DELTA_THRESHOLD_PX) {
        return;
      }

      if (delta > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    // Ensure a clean visible state when the effect (re)starts.
    setHidden(false);
    lastY = window.scrollY;

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      header.classList.remove("is-hidden");
    };
  }, [enabled, headerRef]);
}
