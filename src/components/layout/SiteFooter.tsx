import Link from "next/link";
import { siteNav, socialLinks } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <p className="type-body-lg max-w-[23.25rem]">Haseeb Riaz Studio</p>
            <p className="type-status max-w-[23.25rem] whitespace-pre-line">
              {`CURRENTLY ACCEPTING\nNEW PROJECTS`}
            </p>
          </div>

          <div className="site-footer__links">
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-2">
                {siteNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="type-body-lg">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex flex-col gap-2">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  {/* TODO: Replace with a link when social destinations are available. */}
                  <span className="type-body-lg">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
