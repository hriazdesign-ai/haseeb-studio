"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { MenuToggleButton } from "@/components/layout/MenuToggleButton";

type ImageLightboxProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

/**
 * Restrained zoom lightbox for detailed UI screenshots.
 * Decorative imagery should not use this wrapper.
 */
export function ImageLightbox({ src, alt, children }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="case-study-zoom"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Enlarge image: ${alt}`}
        onClick={() => setOpen(true)}
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
              onClick={close}
            >
              <p id={titleId} className="sr-only">
                {alt}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="case-study-lightbox__image"
                onClick={(event) => event.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
