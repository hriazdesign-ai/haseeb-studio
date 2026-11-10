import { CaseStudyHeroHeading } from "@/components/case-study/CaseStudyHeroHeading";
import { CaseStudyLightboxGallery } from "@/components/case-study/ImageLightbox";
import { RtlHeroMedia } from "@/components/rtl-localisation/RtlHeroMedia";
import {
  RtlFullWidthMedia,
  RtlPairedMedia,
} from "@/components/rtl-localisation/RtlProjectMedia";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { blocksStatementMotion } from "@/lib/home-parallax-blocks-motion";
import {
  getRtlLocalisationLightboxItems,
  rtlMedia,
} from "@/lib/case-studies/rtl-localisation-media";
import type { CaseStudy, CaseStudyNarrative } from "@/lib/case-studies";
import "@/components/rtl-localisation/rtl-localisation.css";

type RtlLocalisationViewProps = {
  study: CaseStudy;
};

function NarrativeBlock({ narrative }: { narrative: CaseStudyNarrative }) {
  return (
    <div
      className="flex max-w-[35.25rem] flex-col"
      style={{ gap: "var(--hero-copy-gap)" }}
    >
      {narrative.label ? (
        <h2 className="type-cs-section">{narrative.label}</h2>
      ) : null}
      <div className="flex flex-col gap-8">
        {narrative.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="type-cs-body">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function SectionCopy({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: string[];
}) {
  return (
    <section className="container" aria-label={label}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="lg:col-start-1">
          <div
            className="flex max-w-[35.25rem] flex-col"
            style={{ gap: "var(--hero-copy-gap)" }}
          >
            <h2 className="type-cs-section">{label}</h2>
            <div className="flex flex-col gap-8">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="type-cs-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Standalone RTL case-study layout.
 * Image hierarchy: medium overview, large research, paired exploration,
 * large content header, then outcome.
 */
export function RtlLocalisationView({ study }: RtlLocalisationViewProps) {
  const challenge = study.challenge;
  const solution = study.solution;
  const result = study.result;
  const pullQuote = study.pullQuote;

  if (!challenge || !solution || !result) return null;

  return (
    <CaseStudyLightboxGallery items={getRtlLocalisationLightboxItems()}>
      <article className="case-study">
        <header className="case-study__hero">
          <div className="prototype-page-container case-study-hero">
            <CaseStudyHeroHeading study={study} />
          </div>
          <RtlHeroMedia image={study.hero} />
        </header>

        <div
          className="case-study__body stack"
          style={{ gap: "var(--stack-gap)" }}
        >
          {/* 01 / 02 Introduction + Project Overview */}
          <section className="container" aria-label="Introduction">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="hidden lg:block" aria-hidden="true" />
              <div
                className="flex max-w-[35.25rem] flex-col"
                style={{ gap: "var(--hero-copy-gap)" }}
              >
                {study.introLabel ? (
                  <h2 className="type-cs-section">{study.introLabel}</h2>
                ) : null}
                <div className="flex flex-col gap-8">
                  {study.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="type-cs-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <RtlFullWidthMedia
            image={rtlMedia.projectOverview}
            label="Project Overview"
          />

          {/* 03 The Challenge */}
          <section className="container">
            {pullQuote && !pullQuote.image ? (
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-6">
                <NarrativeBlock narrative={challenge} />
                <ScrollReveal
                  as="p"
                  className={[
                    "type-cs-quote max-w-[35.25rem]",
                    pullQuote.appearance === "aside" && "type-cs-quote--aside",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  offset={blocksStatementMotion.offset}
                  range={[0, 1]}
                  opacity={blocksStatementMotion.opacity}
                  y={blocksStatementMotion.y}
                  applyCaptionMultiplier
                >
                  {pullQuote.text}
                </ScrollReveal>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="lg:col-start-1">
                  <NarrativeBlock narrative={challenge} />
                </div>
              </div>
            )}
          </section>

          {/* 04 Research & Benchmarking */}
          <SectionCopy
            label="Research & Benchmarking"
            paragraphs={[
              "I compared English and Arabic digital experiences to identify established RTL patterns. The research made clear that RTL does not mean mirroring every interface element: text alignment, reading direction and layout need to work together, while directional navigation and controls require individual consideration.",
              "Some interface elements are better left unchanged to preserve familiarity and usability. Consistency between the CMS and the published experience also mattered, so editors could trust that Arabic content would hold up from authoring through to the live page.",
            ]}
          />

          <RtlFullWidthMedia
            image={rtlMedia.researchBenchmarking}
            label="Research & Benchmarking board"
          />

          {/* 05 Design Exploration */}
          <section className="container">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="lg:col-start-1">
                <NarrativeBlock narrative={solution} />
              </div>
            </div>
          </section>

          <RtlPairedMedia
            images={[rtlMedia.seoSocial, rtlMedia.contentForm]}
            label="Design Exploration screenshots"
          />

          {/* 06 Content Header Exploration */}
          <RtlFullWidthMedia
            image={rtlMedia.contentHeader}
            label="Content Header Exploration"
          />

          {/* 07 Outcome & Learnings */}
          <section
            className="container"
            aria-labelledby={result.label ? "result-heading" : undefined}
          >
            {study.outcome ? (
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-6">
                <div
                  className="flex max-w-[35.25rem] flex-col"
                  style={{ gap: "var(--hero-copy-gap)" }}
                >
                  <h2 id="result-heading" className="type-cs-section">
                    {result.label}
                  </h2>
                  <div className="flex flex-col gap-8">
                    {result.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="type-cs-body"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div
                  className="flex max-w-[35.25rem] flex-col"
                  style={{ gap: "var(--hero-copy-gap)" }}
                >
                  <h2 className="type-cs-section">{study.outcome.label}</h2>
                  <ul className="case-study-outcome__list m-0 flex list-none flex-col p-0">
                    {study.outcome.items.map((item) => (
                      <li
                        key={item}
                        className="type-cs-body case-study-outcome__item"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="lg:col-start-1">
                  <NarrativeBlock narrative={result} />
                </div>
              </div>
            )}
          </section>
        </div>
      </article>
    </CaseStudyLightboxGallery>
  );
}
