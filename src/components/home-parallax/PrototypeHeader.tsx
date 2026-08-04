import Link from "next/link";

/**
 * Prototype-only header for `/home-parallax`.
 * Leaves the shared SiteHeader untouched; global chrome is hidden by layout CSS.
 */
export function PrototypeHeader() {
  return (
    <header className="hp-header">
      <div className="hp-header__inner">
        <Link href="/" className="hp-header__brand">
          Haseeb Riaz Studio
        </Link>
        <nav aria-label="Prototype primary" className="hp-header__nav">
          <Link href="/work">Work</Link>
          {/* No dedicated Case Studies route yet — points at Work until one exists. */}
          <Link href="/work">Case Studies</Link>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
