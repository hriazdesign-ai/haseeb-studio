"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { heroNavLinks } from "@/lib/content";

export default function HeroNav() {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="flex w-full flex-col gap-1.5 lg:flex-1 lg:justify-center"
    >
      {heroNavLinks.map((link) => {
        const isActive =
          "hash" in link && activeHash === link.hash;
        const className = `nav-link-stacked text-[15px] leading-[18px] tracking-[-0.02em] ${
          isActive ? "is-active" : ""
        }`;

        if ("external" in link) {
          return (
            <a
              key={link.label}
              href={link.href}
              className={className}
            >
              {link.label}
            </a>
          );
        }

        return (
          <Link key={link.label} href={link.href} className={className}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
