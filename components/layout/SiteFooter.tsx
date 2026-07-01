import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { footerLinks, socialLinks } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-background">
      <ScrollReveal>
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pb-16 pt-[260px] lg:grid-cols-[255px_minmax(0,1fr)_88px] lg:items-end lg:gap-[70px]">
          <p className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground">
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

          <div className="flex flex-col gap-3 lg:text-right">
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
