import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroNav from "@/components/home/HeroNav";
import ProjectCard from "@/components/home/ProjectCard";
import GrowingRule from "@/components/ui/GrowingRule";
import LineReveal from "@/components/ui/LineReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects } from "@/lib/content";

export default function Home() {
  const [brightPath, mumsUnited, meridian] = projects;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1280px] px-4">
        {/* Hero / Intro — wordmark, headline, stacked nav in one row */}
        <section id="about" className="pb-[260px] pt-4">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[70px]">
            <div className="lg:flex-1">
              <Link
                href="/"
                className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground"
              >
                Haseeb Riaz Studio
              </Link>
            </div>

            <div className="w-full shrink-0 lg:w-[420px]">
              <LineReveal>
                <h1 className="text-[40px] font-semibold leading-[42px] tracking-[-0.04em] text-foreground">
                  Helping organisations
                  <br />
                  earn trust through
                  <br />
                  better digital experiences.
                </h1>
              </LineReveal>

              <LineReveal delay={120} className="mt-[35px]">
                <p className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground">
                  20+ years designing digital experiences across
                  <br className="hidden sm:block" />
                  product, UI, UX, branding and design systems.
                  <br />
                  <br />
                  16 years at Condé Nast.
                </p>
              </LineReveal>
            </div>

            <HeroNav />
          </div>
        </section>

        <GrowingRule className="mb-16" />

        {/* Selected Work */}
        <section id="work" className="flex flex-col gap-16 pb-[260px]">
          {/* Row 2 — quote + Bright Path */}
          <div className="grid gap-4 lg:grid-cols-[255px_minmax(0,1fr)] lg:gap-4">
            <ScrollReveal className="self-start">
              <p className="text-[30px] leading-8 tracking-[-0.04em] text-accent">
                Good design earns trust before it asks for action.
                <br />
                <br />
                Whether that&apos;s supporting families,
                <br />
                advising clients or helping students succeed.
              </p>
            </ScrollReveal>

            <ProjectCard {...brightPath} priority />
          </div>

          {/* Row 1 — Mums United + Meridian */}
          <div className="grid gap-4 lg:grid-cols-[1.56fr_1fr]">
            <ProjectCard {...mumsUnited} />

            <ProjectCard {...meridian} contentClassName="lg:pt-0" />
          </div>
        </section>

        {/* Services anchor — minimal, typographic */}
        <section id="services" className="pb-[260px]">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[255px_minmax(0,420px)] lg:gap-[70px]">
              <p className="text-[20px] leading-[22px] tracking-[-0.04em] text-muted">
                Services
              </p>
              <p className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground">
                Specialist website design and development for charities,
                education organisations and professional service businesses.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
