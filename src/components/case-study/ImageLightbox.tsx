"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { MenuToggleButton } from "@/components/layout/MenuToggleButton";
import type { CaseStudyLightboxItem } from "@/lib/case-studies/lightbox-items";

type ImageLightboxProps = {
  src: string;
  alt: string;
  /**
   * When set, the opened view plays this video instead of the static `src`.
   * `src` remains the reduced-motion fallback.
   */
  videoSrc?: string;
  children: ReactNode;
};

const LightboxGalleryContext = createContext<CaseStudyLightboxItem[] | null>(
  null,
);

export function CaseStudyLightboxGallery({
  items,
  children,
}: {
  items: CaseStudyLightboxItem[];
  children: ReactNode;
}) {
  return (
    <LightboxGalleryContext.Provider value={items}>
      {children}
    </LightboxGalleryContext.Provider>
  );
}

function LightboxChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className="case-study-lightbox__nav-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === "prev" ? "M15 5L8 12L15 19" : "M9 5L16 12L9 19"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Restrained zoom lightbox for inline case-study media.
 * Decorative / full-bleed imagery should not use this wrapper.
 */
export function ImageLightbox({
  src,
  alt,
  videoSrc,
  children,
}: ImageLightboxProps) {
  const gallery = useContext(LightboxGalleryContext);
  const items = useMemo<CaseStudyLightboxItem[]>(() => {
    if (gallery && gallery.length > 0) return gallery;
    return [{ src, alt, videoSrc }];
  }, [gallery, src, alt, videoSrc]);

  const startIndex = Math.max(
    0,
    items.findIndex((item) => item.src === src),
  );

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const swipeConsumedRef = useRef(false);
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();

  const item = items[activeIndex] ?? items[startIndex] ?? { src, alt, videoSrc };
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < items.length - 1;
  const showNav = items.length > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const goTo = useCallback((nextIndex: number) => {
    setActiveIndex((current) => {
      const max = items.length - 1;
      return Math.min(max, Math.max(0, nextIndex));
    });
  }, [items.length]);

  const step = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => {
        const next = current + direction;
        return Math.min(items.length - 1, Math.max(0, next));
      });
    },
    [items.length],
  );

  const openAt = useCallback(() => {
    setActiveIndex(startIndex);
    setOpen(true);
  }, [startIndex]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [
        closeRef.current,
        canPrev ? prevRef.current : null,
        canNext ? nextRef.current : null,
      ].filter((el): el is HTMLButtonElement => Boolean(el));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, step, canPrev, canNext]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAt();
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch || !showNav) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    swipeConsumedRef.current = true;
    if (dx > 0) step(-1);
    else step(1);
  };

  const playVideo = Boolean(item.videoSrc && !shouldReduceMotion);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="case-study-zoom"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Enlarge ${videoSrc ? "media" : "image"}: ${alt}`}
        onClick={openAt}
        onKeyDown={onTriggerKeyDown}
      >
        {children}
      </button>

      {mounted && open
        ? createPortal(
            <div
              className={[
                "case-study-lightbox",
                shouldReduceMotion ? "case-study-lightbox--static" : null,
              ]
                .filter(Boolean)
                .join(" ")}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(event) => {
                if (swipeConsumedRef.current) {
                  swipeConsumedRef.current = false;
                  event.preventDefault();
                  return;
                }
                close();
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <p id={titleId} className="sr-only">
                {item.alt}
                {showNav
                  ? ` (${activeIndex + 1} of ${items.length})`
                  : ""}
              </p>
              <MenuToggleButton
                ref={closeRef}
                open
                closeGlyph
                className="case-study-lightbox__close"
                aria-label="Close image"
                onClick={(event) => {
                  event.stopPropagation();
                  close();
                }}
              />
              {showNav ? (
                <>
                  <button
                    ref={prevRef}
                    type="button"
                    className="case-study-lightbox__nav case-study-lightbox__nav--prev"
                    aria-label="Previous media"
                    disabled={!canPrev}
                    onClick={(event) => {
                      event.stopPropagation();
                      goTo(activeIndex - 1);
                    }}
                  >
                    <LightboxChevron direction="prev" />
                  </button>
                  <button
                    ref={nextRef}
                    type="button"
                    className="case-study-lightbox__nav case-study-lightbox__nav--next"
                    aria-label="Next media"
                    disabled={!canNext}
                    onClick={(event) => {
                      event.stopPropagation();
                      goTo(activeIndex + 1);
                    }}
                  >
                    <LightboxChevron direction="next" />
                  </button>
                </>
              ) : null}
              {playVideo ? (
                <video
                  key={item.videoSrc}
                  className="case-study-lightbox__image"
                  src={item.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={item.alt}
                  disablePictureInPicture
                  disableRemotePlayback
                  onClick={(event) => event.stopPropagation()}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  className="case-study-lightbox__image"
                  onClick={(event) => event.stopPropagation()}
                />
              )}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
