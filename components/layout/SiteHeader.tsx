import Link from "next/link";
import { navLinks } from "@/lib/content";

type SiteHeaderProps = {
  variant?: "home" | "case-study";
  category?: string;
};

export default function SiteHeader({
  variant = "home",
  category,
}: SiteHeaderProps) {
  if (variant === "case-study" && category) {
    return (
      <header className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-4">
          <div className="grid gap-6 text-[20px] leading-[22px] tracking-[-0.04em] lg:grid-cols-[255px_minmax(0,1fr)_auto] lg:gap-[70px]">
            <Link href="/#work" className="link-underline text-foreground">
              Work
            </Link>
            <p className="text-foreground">{category}</p>
            <a
              href="mailto:hello@haseebriaz.com"
              className="link-underline text-muted lg:text-right"
            >
              Get in touch
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background">
      <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-6 px-4 py-4">
        <Link
          href="/"
          className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground"
        >
          Haseeb Riaz Studio
        </Link>

        <nav className="flex shrink-0 flex-wrap items-center justify-end gap-6 sm:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline text-[20px] leading-[22px] tracking-[-0.04em] text-muted transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
