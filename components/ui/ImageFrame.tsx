"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ImageFrameProps = {
  src?: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
  sizes?: string;
};

export default function ImageFrame({
  src,
  alt,
  className = "aspect-[752/441] w-full",
  objectPosition = "object-top",
  priority = false,
  parallax = true,
  parallaxSpeed = 1,
  sizes = "(max-width: 1024px) 100vw, 752px",
}: ImageFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || !src) return;

    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 1023px)");

    let raf = 0;

    const resetLayer = () => {
      layer.style.transform = "translate3d(0, 0, 0) scale(1.04)";
    };

    const update = () => {
      if (motionQuery.matches) {
        resetLayer();
        return;
      }

      const maxOffset = mobileQuery.matches ? 9 : 20;
      const factor = mobileQuery.matches ? 0.018 : 0.035;
      const rect = frame.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(
        -maxOffset,
        Math.min(maxOffset, center * factor * parallaxSpeed),
      );
      layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const bindScroll = () => {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };

    const unbindScroll = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        unbindScroll();
        resetLayer();
        return;
      }
      update();
      bindScroll();
    };

    if (motionQuery.matches) {
      resetLayer();
    } else {
      update();
      bindScroll();
    }

    motionQuery.addEventListener("change", onMotionChange);
    mobileQuery.addEventListener("change", onScroll);

    return () => {
      unbindScroll();
      motionQuery.removeEventListener("change", onMotionChange);
      mobileQuery.removeEventListener("change", onScroll);
      resetLayer();
    };
  }, [parallax, parallaxSpeed, src]);

  return (
    <div
      ref={frameRef}
      role={src ? undefined : "img"}
      aria-label={src ? undefined : alt}
      className={`relative isolate w-full shrink-0 overflow-hidden bg-background ${className}`}
    >
      {src ? (
        <div
          ref={layerRef}
          className="absolute inset-0 z-0 will-change-transform"
          style={{ transform: "translate3d(0, 0, 0) scale(1.04)" }}
        >
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className={`object-cover ${objectPosition}`}
              sizes={sizes}
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-panel" aria-hidden="true" />
      )}
    </div>
  );
}
