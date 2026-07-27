import Link from "next/link";
import { siteNav } from "@/lib/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container">
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p
              className="font-medium text-foreground"
              style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}
            >
              Haseeb Studio
            </p>
            <p className="type-small">© {year} Haseeb Studio</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {siteNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="type-small">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
