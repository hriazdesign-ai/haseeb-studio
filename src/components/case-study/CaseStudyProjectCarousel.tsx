"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  AnimatedArrow,
  animatedArrowLinkProps,
} from "@/components/motion/AnimatedArrow";
import { useBlocksMotionMultipliers } from "@/components/motion/useBlocksMotionBreakpoint";
import {
  getCaseStudyCarouselProjects,
  type CaseStudyCarouselProject,
} from "@/lib/case-studies/project-carousel";
import { blocksContactMotion } from "@/lib/home-parallax-blocks-motion";
import { progressInRange } from "@/lib/motion";
import "./case-study-project-carousel.css";

const MotionLink = motion.create(Link);

const CAROUSEL_SCROLL_DURATION_MS = 700;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type CaseStudyProjectCarouselProps = {
  currentSlug: string;
};

function CarouselArrowIcon() {
  return (
    <svg
      className="case-study-carousel__arrow-icon"
      viewBox="0 0 25.1023 25.1023"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13.0815 0.530331L1.06066 12.5511L13.0815 24.5719"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M23.9001 12.5492L1.06236 12.5492"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Full-card case-study link (Next.js Link via motion).
 * `href` comes from shared project data — never hardcoded here.
 */
function ProjectCard({ project }: { project: CaseStudyCarouselProject }) {
  return (
    <MotionLink
      href={project.href}
      className="case-study-carousel__card"
      aria-label={project.caption}
      {...animatedArrowLinkProps}
    >
      <div className="case-study-carousel__media">
        <div className="case-study-carousel__media-hover">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            className="case-study-carousel__image"
            sizes="(max-width: 1023px) 85vw, 360px"
            style={{ objectPosition: project.objectPosition }}
            fill
            draggable={false}
          />
        </div>
      </div>
      <p className="case-study-carousel__caption">
        <span className="case-study-carousel__caption-text">
          {project.caption}
        </span>
        <AnimatedArrow
          className="case-study-carousel__caption-arrow"
          kind="caption"
        >
          ↗
        </AnimatedArrow>
      </p>
    </MotionLink>
  );
}

/**
 * “What's next” project carousel — Figma Studio 884:11441.
 *
 * Portfolio grid only provides a measurable anchor (column 6). The scroll
 * viewport is a full-bleed sibling outside the max-width container; track
 * padding uses the measured left so cards start at that grid line.
 */
export function CaseStudyProjectCarousel({
  currentSlug,
}: CaseStudyProjectCarouselProps) {
  const projects = getCaseStudyCarouselProjects(currentSlug);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselAnchorRef = useRef<HTMLDivElement>(null);
  /** Full-viewport scrollport — owns horizontal scrolling. */
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const scrollRafRef = useRef<number | null>(null);
  const scrollAnimatingRef = useRef(false);
  const [carouselLeft, setCarouselLeft] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [dragging, setDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { captionY } = useBlocksMotionMultipliers();
  const motionDisabled = Boolean(shouldReduceMotion);

  const updateEdges = useCallback(() => {
    const el = carouselViewportRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = el.scrollLeft;
    setCanPrev(left > 2);
    setCanNext(left < max - 2);
  }, []);

  const getCardStep = useCallback((viewport: HTMLDivElement) => {
    const card = viewport.querySelector<HTMLElement>(
      ".case-study-carousel__card",
    );
    const track = viewport.querySelector<HTMLElement>(
      ".case-study-carousel__track",
    );
    if (!card) return 0;
    const styles = getComputedStyle(track ?? viewport);
    const gap =
      Number.parseFloat(styles.columnGap || styles.gap || "8") || 8;
    return card.offsetWidth + gap;
  }, []);

  const cancelScrollAnimation = useCallback(() => {
    if (scrollRafRef.current != null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }
    scrollAnimatingRef.current = false;
    carouselViewportRef.current?.classList.remove("is-animating");
    updateEdges();
  }, [updateEdges]);

  /* Measure grid-column-6 anchor → track padding (desktop). */
  useLayoutEffect(() => {
    const anchor = carouselAnchorRef.current;
    if (!anchor) return;

    const measure = () => {
      const next = Math.round(anchor.getBoundingClientRect().left);
      setCarouselLeft((prev) => (prev === next ? prev : next));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(anchor);
    const grid = anchor.closest(".portfolio-container");
    if (grid) ro.observe(grid);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects.length]);

  /* Same heading reveal as BlocksContactSection (“Let’s build…”). */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: blocksContactMotion.offset as unknown as [
      "start end",
      "end start",
    ],
  });

  const headingOpacity = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 1;
    const t = progressInRange(
      progress,
      blocksContactMotion.heading.range[0],
      blocksContactMotion.heading.range[1],
    );
    const [from, to] = blocksContactMotion.heading.opacity;
    return from + (to - from) * t;
  });

  const headingY = useTransform(scrollYProgress, (progress) => {
    if (motionDisabled) return 0;
    const t = progressInRange(
      progress,
      blocksContactMotion.heading.range[0],
      blocksContactMotion.heading.range[1],
    );
    const from = blocksContactMotion.heading.y * captionY;
    return from + (0 - from) * t;
  });

  useEffect(() => {
    const el = carouselViewportRef.current;
    if (!el) return;
    updateEdges();
    const onScroll = () => updateEdges();
    /* Native wheel / touch must interrupt controlled arrow animation. */
    const onUserScrollIntent = () => {
      if (scrollAnimatingRef.current) cancelScrollAnimation();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onUserScrollIntent, { passive: true });
    el.addEventListener("touchstart", onUserScrollIntent, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => {
      cancelScrollAnimation();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onUserScrollIntent);
      el.removeEventListener("touchstart", onUserScrollIntent);
      ro.disconnect();
    };
  }, [projects.length, carouselLeft, updateEdges, cancelScrollAnimation]);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const el = carouselViewportRef.current;
      if (!el) return;
      const step = getCardStep(el);
      if (step <= 0) return;

      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const from = el.scrollLeft;
      const target = Math.min(max, Math.max(0, from + direction * step));
      if (Math.abs(target - from) < 0.5) {
        updateEdges();
        return;
      }

      /* Re-click: cancel in-flight tween and start from live scrollLeft. */
      cancelScrollAnimation();

      if (shouldReduceMotion) {
        el.scrollLeft = target;
        updateEdges();
        return;
      }

      el.classList.add("is-animating");
      scrollAnimatingRef.current = true;
      const start = el.scrollLeft;
      const delta = target - start;
      const startedAt = performance.now();

      const tick = (now: number) => {
        const viewport = carouselViewportRef.current;
        if (!viewport) {
          scrollRafRef.current = null;
          scrollAnimatingRef.current = false;
          return;
        }

        const t = Math.min(1, (now - startedAt) / CAROUSEL_SCROLL_DURATION_MS);
        viewport.scrollLeft = start + delta * easeInOutCubic(t);
        updateEdges();

        if (t < 1) {
          scrollRafRef.current = requestAnimationFrame(tick);
          return;
        }

        viewport.scrollLeft = target;
        scrollRafRef.current = null;
        scrollAnimatingRef.current = false;
        viewport.classList.remove("is-animating");
        updateEdges();
      };

      scrollRafRef.current = requestAnimationFrame(tick);
    },
    [
      cancelScrollAnimation,
      getCardStep,
      shouldReduceMotion,
      updateEdges,
    ],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.pointerType !== "mouse") return;
    const el = carouselViewportRef.current;
    if (!el) return;
    /* Allow Link activation on click — capture only after a real drag. */
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = carouselViewportRef.current;
    if (!drag || !el || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) > 4) {
      drag.moved = true;
      setDragging(true);
      cancelScrollAnimation();
      drag.startScroll = el.scrollLeft;
      drag.startX = event.clientX;
      el.setPointerCapture(event.pointerId);
    }
    if (drag.moved) {
      el.scrollLeft = drag.startScroll - (event.clientX - drag.startX);
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = carouselViewportRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    /* Suppress only the synthetic click from this drag; cleared on next pointerdown. */
    if (drag.moved) suppressClickRef.current = true;
    dragRef.current = null;
    setDragging(false);
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  if (projects.length === 0) return null;

  const viewportStyle = {
    "--carousel-left": `${carouselLeft}px`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="case-study-carousel"
      aria-roledescription="carousel"
      aria-label="What's next"
    >
      <div className="portfolio-container portfolio-grid case-study-carousel__grid">
        <motion.h2
          className="case-study-carousel__title"
          style={{
            opacity: motionDisabled ? 1 : headingOpacity,
            y: motionDisabled ? 0 : headingY,
          }}
        >
          What&apos;s next
        </motion.h2>

        <div className="case-study-carousel__controls">
          <button
            type="button"
            className="case-study-carousel__arrow case-study-carousel__arrow--prev"
            aria-label="Previous projects"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
          >
            <CarouselArrowIcon />
          </button>
          <button
            type="button"
            className="case-study-carousel__arrow case-study-carousel__arrow--next"
            aria-label="Next projects"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
          >
            <CarouselArrowIcon />
          </button>
        </div>

        <div
          ref={carouselAnchorRef}
          className="case-study-carousel__anchor"
          aria-hidden="true"
        />
      </div>

      <div
        ref={carouselViewportRef}
        className={`case-study-carousel__viewport${dragging ? " is-dragging" : ""}`}
        style={viewportStyle}
        tabIndex={0}
        role="group"
        aria-label="Project cards"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard(1);
          }
        }}
      >
        <div className="case-study-carousel__track">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
