import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyThemeProvider } from "@/components/case-study/CaseStudyThemeProvider";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { PageShell } from "@/components/layout/PageShell";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";

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

  return (
    <CaseStudyThemeProvider theme={study.theme}>
      <PageShell fullWidth unpadded className="case-study-page">
        <CaseStudyView study={study} />
        <div className="container" aria-hidden="true">
          <hr className="m-0 h-px w-full border-0 bg-border" />
        </div>
      </PageShell>
    </CaseStudyThemeProvider>
  );
}
