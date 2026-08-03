/**
 * Prototype-only simplified footer for `/home-parallax`.
 * Does not replace the shared SiteFooter.
 * When `alignWithChrome`, horizontal padding matches SiteHeader via `.site-chrome-inner`.
 */
export function PrototypeFooter({
  alignWithChrome = false,
}: {
  alignWithChrome?: boolean;
} = {}) {
  return (
    <footer className="hp-footer">
      <div
        className={
          alignWithChrome
            ? "hp-footer__inner site-chrome-inner"
            : "hp-footer__inner"
        }
      >
        <p className="hp-footer__brand">Haseeb Riaz Studio. 2026</p>
        <p className="hp-footer__status">Currently accepting new projects</p>
      </div>
    </footer>
  );
}
