import Link from "next/link";
import { siteNav } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="container">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 py-5">
          <Link
            href="/"
            className="font-medium text-foreground"
            style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}
          >
            Haseeb Studio
          </Link>

          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
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
    </header>
  );
}
