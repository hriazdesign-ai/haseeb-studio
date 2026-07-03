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
    <div className="min-h-screen w-full overflow-x-hidden bg-background p-5 lg:px-10 lg:pb-10 lg:pt-5">
      <main className="w-full">
        {/* Hero / Intro — wordmark, headline, stacked nav in one row */}
        <section id="about" className="pb-[260px]">
          <div className="grid w-full grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4 gap-y-10 lg:grid-cols-[1fr_420px_1fr] lg:items-start lg:gap-x-[70px] lg:gap-y-0">
            <div className="col-start-1 row-start-1 min-w-0 lg:justify-self-start">
              <Link
                href="/"
                className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground"
              >
                Haseeb Riaz Studio
              </Link>
            </div>

            <div className="col-start-2 row-start-1 lg:col-start-3 lg:row-start-1 lg:flex lg:justify-end">
              <HeroNav />
            </div>

            <div className="col-span-2 row-start-2 w-full shrink-0 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:w-[420px]">
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
          </div>
        </section>

        <GrowingRule className="mb-16" />

        {/* Selected Work */}
        <section id="work" className="flex flex-col gap-16 pb-[260px]">
          {/* Row 2 — quote + Bright Path */}
          <div className="grid min-w-0 gap-4 lg:grid-cols-[255px_minmax(0,1fr)] lg:gap-4">
            <ScrollReveal className="w-[255px] max-w-full shrink-0 self-start">
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
          <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.56fr)_minmax(0,1fr)] lg:gap-4">
            <ProjectCard {...mumsUnited} />

            <ProjectCard {...meridian} contentClassName="lg:pt-0" />
          </div>
        </section>

        {/* Services anchor — minimal, typographic */}
        <section id="services" className="pb-[260px]">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[255px_minmax(0,420px)] lg:gap-[70px]">
              <p className="w-[255px] max-w-full shrink-0 text-[20px] leading-[22px] tracking-[-0.04em] text-muted">
                Services
              </p>
              <p className="max-w-[420px] text-[20px] leading-[22px] tracking-[-0.04em] text-foreground">
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
