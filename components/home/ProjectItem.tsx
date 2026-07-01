"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ProjectItemProps = {
  title: string;
  sector: string;
  description: string;
  image: string;
  alt: string;
  reversed?: boolean;
  priority?: boolean;
};

export default function ProjectItem({
  title,
  sector,
  description,
  image,
  alt,
  reversed = false,
  priority = false,
}: ProjectItemProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = parallaxRef.current;
    if (!frame || !layer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let raf = 0;

    const updateParallax = () => {
      const rect = frame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (elementCenter - viewportCenter) * 0.035;
      const clamped = Math.max(-20, Math.min(20, offset));
      layer.style.transform = `translate3d(0, ${clamped}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <article
      className={`group grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div ref={frameRef} className="lg:col-span-7">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
          <div
            ref={parallaxRef}
            className="absolute inset-0 will-change-transform"
          >
            <div className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]">
              <Image
                src={image}
                alt={alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority={priority}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center lg:col-span-5">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
          {sector}
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span>2026</span>
          <span>Website Design</span>
          <span>Next.js</span>
        </div>
        <a
          href="#"
          className="mt-8 inline-block text-sm text-foreground underline decoration-border underline-offset-[6px] transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-80"
        >
          View project
        </a>
      </div>
    </article>
  );
}
