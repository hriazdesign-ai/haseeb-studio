"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useScrollDirectionHeader } from "@/hooks/useScrollDirectionHeader";
import { siteNav } from "@/lib/navigation";

const DESKTOP_NAV_MQ = "(min-width: 1024px)";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useScrollDirectionHeader({
    headerRef,
    enabled: !open,
  });

  // Close when viewport reaches desktop; read matchMedia only after mount.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV_MQ);

    const onChange = () => {
      if (media.matches) {
        setOpen(false);
      }
    };

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Keep spacer / menu height in sync with the header bar.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const sync = () => {
      const height = `${bar.getBoundingClientRect().height}px`;
      document.documentElement.style.setProperty("--site-header-height", height);
      headerRef.current?.style.setProperty("--site-header-height", height);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  // Body scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.navOpen = "true";

    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.navOpen;
    };
  }, [open]);

  // Escape to close; focus trap within toggle + panel.
  useEffect(() => {
    if (!open) return;

    const getFocusable = () => {
      const root = headerRef.current;
      if (!root) return [] as HTMLElement[];

      return Array.from(
        root.querySelectorAll<HTMLElement>(
          "button.menu-toggle, .mobile-nav a[href]",
        ),
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inHeader = Boolean(
        active && headerRef.current?.contains(active),
      );

      if (event.shiftKey) {
        if (active === first || !inHeader) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !inHeader) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  // Return focus to the toggle when the menu closes.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      buttonRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="site-header">
        <div ref={barRef} className="site-header__bar bg-background">
          <div className="container">
            <div
              className="flex items-center justify-between gap-6"
              style={{ paddingBlock: "var(--header-py)" }}
            >
              <Link href="/" className="type-body-lg tracking-[-0.02em]">
                Haseeb Riaz Studio
              </Link>

              <nav aria-label="Primary" className="site-header__desktop-nav">
                <ul
                  className="grid grid-cols-4"
                  style={{ gap: "var(--nav-gap)" }}
                >
                  {siteNav.map((item) => (
                    <li key={item.href} className="min-w-0">
                      <Link
                        href={item.href}
                        className="type-body-lg tracking-[-0.02em]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <button
                ref={buttonRef}
                type="button"
                className="menu-toggle"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((value) => !value)}
              >
                <span className="menu-toggle__icon" aria-hidden="true">
                  <span className="menu-toggle__line menu-toggle__line--top" />
                  <span className="menu-toggle__line menu-toggle__line--bottom" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          id={menuId}
          className={["mobile-nav", open ? "is-open" : null]
            .filter(Boolean)
            .join(" ")}
          aria-hidden={!open}
          inert={!open ? true : undefined}
        >
          <div className="mobile-nav__clip">
            <div className="mobile-nav__panel">
              <nav aria-label="Mobile" className="mobile-nav__inner container">
                <ul className="mobile-nav__list">
                  {siteNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="type-body-lg tracking-[-0.02em]"
                        onClick={closeMenu}
                        tabIndex={open ? undefined : -1}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="site-header-spacer" aria-hidden="true" />
    </>
  );
}
