"use client";

import { type ReactNode } from "react";

type LineRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function LineReveal({
  children,
  className = "",
  delay = 0,
}: LineRevealProps) {
  return (
    <div
      className={`line-reveal ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
