"use client";

import { useEffect, useRef } from "react";

export default function GrowingRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLHRElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <hr
      ref={ref}
      className={`rule-grow border-0 border-t border-border ${className}`}
    />
  );
}
