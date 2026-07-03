"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { heroNavLinks } from "@/lib/content";

export default function HeroNav() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const menuId = useId();

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClassName = (isActive: boolean) =>
    `nav-link-stacked text-[15px] leading-[18px] tracking-[-0.02em] ${
      isActive ? "is-active" : ""
    }`;

  const renderLink = (link: (typeof heroNavLinks)[number]) => {
    const isActive = "hash" in link && activeHash === link.hash;
    const className = linkClassName(isActive);
    const closeMenu = () => setOpen(false);

    if ("external" in link) {
      return (
        <a key={link.label} href={link.href} className={className} onClick={closeMenu}>
          {link.label}
        </a>
      );
    }

    return (
      <Link key={link.label} href={link.href} className={className} onClick={closeMenu}>
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden w-[255px] shrink-0 flex-col gap-1.5 lg:flex lg:justify-center"
      >
        {heroNavLinks.map(renderLink)}
      </nav>

      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 w-10 flex-col items-end justify-center gap-[5px] text-muted transition-colors duration-300 hover:text-accent"
        >
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ease-out ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-current transition-opacity duration-300 ease-out ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ease-out ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>

        {open ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/70"
              onClick={() => setOpen(false)}
            />
            <nav
              id={menuId}
              aria-label="Primary"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100vw-40px,280px)] flex-col gap-4 bg-background p-5 pt-5"
            >
              {heroNavLinks.map(renderLink)}
            </nav>
          </>
        ) : null}
      </div>
    </>
  );
}
