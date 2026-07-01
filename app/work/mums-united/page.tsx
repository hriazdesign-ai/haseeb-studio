import type { Metadata } from "next";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ImageFrame from "@/components/ui/ImageFrame";
import LineReveal from "@/components/ui/LineReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Mums United — Haseeb Riaz Studio",
  description:
    "Case study: helping a community organisation communicate its impact more clearly.",
};

export default function MumsUnitedCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="case-study" category="Community Impact" />

      <main className="mx-auto max-w-[1280px] px-4 pb-[260px]">
        <section className="pb-[100px] pt-8">
          <div className="grid lg:grid-cols-[255px_minmax(0,1fr)_auto] lg:gap-[70px]">
            <div className="hidden lg:block" aria-hidden="true" />
            <LineReveal>
              <h1 className="max-w-[745px] text-[40px] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground lg:text-[48px] lg:leading-[1.03]">
                Helping a community organisation communicate its impact more
                clearly.
              </h1>
            </LineReveal>
          </div>
        </section>

        <section className="pb-[100px]">
          <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)]">
            <ScrollReveal>
              <ImageFrame
                alt="Mums United website overview"
                className="h-[385px] w-full"
              />
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="text-[30px] font-semibold leading-8 tracking-[-0.04em] text-foreground">
                <p>
                  Mums United supports families across Sheffield through
                  mentoring, community programmes and practical support.
                </p>
                <p className="mt-8">
                  The challenge was creating a website that clearly
                  communicated services, built trust and made support easier to
                  find.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-[100px]">
          <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)]">
            <ScrollReveal className="flex min-h-[778px] flex-col justify-between py-2">
              <p className="text-[16px] leading-4 tracking-[-0.04em] text-foreground">
                The Challenge
              </p>
              <div className="text-[30px] font-semibold leading-8 tracking-[-0.04em] text-foreground">
                <p>
                  Mums United offers a wide range of programmes and services,
                  but much of this information was difficult to navigate and
                  lacked a clear structure.
                </p>
                <p className="mt-8">
                  The challenge was not simply creating a new website, but
                  organising content in a way that helped different audiences
                  quickly find what was relevant to them.
                </p>
                <p className="mt-8">
                  Parents, young people, volunteers and funders all arrive with
                  different goals and expectations.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <ImageFrame
                alt="Mums United navigation challenge"
                className="h-[778px] w-full"
              />
            </ScrollReveal>
          </div>
        </section>

        <section className="border-y border-border py-[60px]">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-[70px]">
              <p className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground">
                A website should reduce uncertainty, not create it.
              </p>
              <p className="text-[20px] leading-[22px] tracking-[-0.04em] text-foreground">
                The structure was designed to help visitors understand the
                organisation&apos;s work within moments of arriving on the site.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-[100px]">
          <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)]">
            <ScrollReveal>
              <ImageFrame
                alt="Mums United website solution"
                className="h-[778px] w-full"
              />
            </ScrollReveal>

            <ScrollReveal
              delay={120}
              className="flex min-h-[778px] flex-col justify-between py-2"
            >
              <p className="text-[16px] leading-4 tracking-[-0.04em] text-foreground">
                The Solution
              </p>
              <p className="text-[30px] font-semibold leading-8 tracking-[-0.04em] text-foreground">
                The design creates space for stories, achievements and real
                moments that demonstrate the value of the organisation&apos;s
                work.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-[100px]">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-[70px]">
              <p className="text-[16px] leading-4 tracking-[-0.04em] text-foreground">
                Outcome
              </p>
              <div className="text-[30px] font-semibold leading-8 tracking-[-0.04em] text-foreground">
                <p>
                  The result is a website that better reflects the
                  professionalism, credibility and impact of Mums United.
                </p>
                <p className="mt-8">
                  It provides a stronger foundation for future growth while
                  making support, information and community programmes easier to
                  access for the people who need them most.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section>
          <ScrollReveal>
            <ImageFrame
              alt="Mums United full website view"
              className="h-[574px] w-full"
            />
          </ScrollReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
