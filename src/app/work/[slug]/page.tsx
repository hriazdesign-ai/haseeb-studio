import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyThemeProvider } from "@/components/case-study/CaseStudyThemeProvider";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { BlocksContactSection } from "@/components/home-parallax/BlocksContactSection";
import { PrototypeFooter } from "@/components/home-parallax/PrototypeFooter";
import { PageShell } from "@/components/layout/PageShell";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import "@/components/home-parallax/home-parallax.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.name} — Haseeb Riaz Studio`,
    description: study.title,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const chrome = study.chrome ?? "dark";
  const isLightChrome = chrome === "light";

  return (
    <CaseStudyThemeProvider theme={study.theme} chrome={chrome}>
      <PageShell
        fullWidth
        unpadded
        className={
          isLightChrome
            ? "case-study-page case-study-page--light home-parallax-page home-parallax-page--blocks"
            : "case-study-page"
        }
      >
        <CaseStudyView study={study} />
        {isLightChrome ? (
          <>
            <BlocksContactSection />
            <PrototypeFooter alignWithChrome />
          </>
        ) : (
          <div className="container" aria-hidden="true">
            <hr className="m-0 h-px w-full border-0 bg-border" />
          </div>
        )}
      </PageShell>
    </CaseStudyThemeProvider>
  );
}
