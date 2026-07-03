import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { footerLinks, socialLinks } from "@/lib/content";

type SiteFooterProps = {
  className?: string;
};

export default function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer id="contact" className="bg-background">
      <ScrollReveal>
        <div
          className={`grid gap-10 pb-16 pt-[260px] lg:grid-cols-[255px_minmax(0,1fr)_88px] lg:items-end lg:gap-[70px] ${className}`}
        >
          <p className="w-[255px] max-w-full shrink-0 text-[20px] leading-[22px] tracking-[-0.04em] text-foreground">
            Haseeb Riaz Studio
          </p>

          <nav className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="link-underline w-fit text-[40px] leading-[42px] tracking-[-0.04em] text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex w-[88px] shrink-0 flex-col gap-3 lg:text-right">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline block w-full text-[20px] leading-[22px] tracking-[-0.04em] text-muted transition-colors duration-300 ease-out hover:text-accent lg:text-right"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
