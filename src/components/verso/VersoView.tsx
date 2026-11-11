import { CaseStudyLightboxGallery } from "@/components/case-study/ImageLightbox";
import { VersoHeroMedia } from "@/components/verso/VersoHeroMedia";
import {
  VersoFullWidthMedia,
  VersoPairedMedia,
} from "@/components/verso/VersoProjectMedia";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { blocksStatementMotion } from "@/lib/home-parallax-blocks-motion";
import {
  versoChallengeGoals,
  versoCollaboration,
  versoComponentDesign,
  versoDesignTokens,
} from "@/lib/case-studies/verso";
import {
  getVersoLightboxItems,
  versoMedia,
} from "@/lib/case-studies/verso-media";
import type { CaseStudy } from "@/lib/case-studies";
import "@/components/work-motion/work-motion.css";
import "@/components/verso/verso.css";

type VersoViewProps = {
  study: CaseStudy;
};

function NarrativeCopy({
  label,
  subhead,
  paragraphs,
  align = "left",
}: {
  label: string;
  subhead?: string;
  paragraphs: readonly string[];
  align?: "left" | "right";
}) {
  const body = (
    <div
      className="flex max-w-[35.25rem] flex-col"
      style={{ gap: "var(--hero-copy-gap)" }}
    >
      <h2 className="type-cs-section">{label}</h2>
      <div className="flex flex-col gap-8">
        {subhead ? <p className="verso-page__subhead">{subhead}</p> : null}
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="type-cs-body">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <section className="container" aria-label={label}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {align === "right" ? (
          <>
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="lg:col-start-2">{body}</div>
          </>
        ) : (
          <div className="lg:col-start-1">{body}</div>
        )}
      </div>
    </section>
  );
}

function TwoColumnNarrative({
  label,
  subhead,
  left,
  right,
}: {
  label: string;
  subhead: string;
  left: readonly string[];
  right: readonly string[];
}) {
  return (
    <section className="container" aria-label={label}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-6">
        <div
          className="flex max-w-[35.25rem] flex-col"
          style={{ gap: "var(--hero-copy-gap)" }}
        >
          <h2 className="type-cs-section">{label}</h2>
          <div className="flex flex-col gap-8">
            <p className="verso-page__subhead">{subhead}</p>
            {left.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="type-cs-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div
          className="flex max-w-[35.25rem] flex-col"
          style={{ gap: "var(--hero-copy-gap)" }}
        >
          <div className="flex flex-col gap-8">
            {right.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="type-cs-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Standalone Verso case-study layout.
 * Section order and media from Figma Studio Verso (1576:13441).
 * Spacing / media patterns mirror `/rtl-localisation`.
 */
export function VersoView({ study }: VersoViewProps) {
  const challenge = study.challenge;
  const solution = study.solution;
  const result = study.result;
  const pullQuote = study.pullQuote;

  if (!challenge || !solution || !result) return null;

  const overviewParagraphs = study.intro;
  const challengeSubhead = challenge.paragraphs[0];
  const challengeParagraphs = challenge.paragraphs.slice(1);
  const visualSubhead = solution.paragraphs[0];
  const visualParagraphs = solution.paragraphs.slice(1);
  const outcomeSubhead = result.paragraphs[0];
  const outcomeParagraphs = result.paragraphs.slice(1);

  const heroMeta = [
    "Design System",
    "Component Library",
    "Documentation",
    "Governance",
    "2026",
  ];

  return (
    <CaseStudyLightboxGallery items={getVersoLightboxItems()}>
      <article className="case-study">
        <header className="case-study__hero">
          <div className="prototype-page-container case-study-hero">
            <div className="case-study-hero__header">
              <div className="verso-page__hero-grid">
                <ul className="verso-page__hero-meta" aria-label="Project details">
                  {heroMeta.map((item) => (
                    <li key={item} className="verso-page__hero-meta-item">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="verso-page__hero-copy">
                  <p className="case-study-hero__label work-motion-hero__label">
                    {study.name}
                  </p>
                  <h1 className="case-study-hero__title hp-hero__title">
                    {study.title}
                  </h1>
                  {study.disciplines ? (
                    <p className="verso-page__hero-disciplines">
                      {study.disciplines}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <VersoHeroMedia image={study.hero} />
        </header>

        <div
          className="case-study__body stack"
          style={{ gap: "var(--stack-gap)" }}
        >
          {/* Project overview — unchanged */}
          <NarrativeCopy
            label={study.introLabel ?? "Project overview"}
            paragraphs={overviewParagraphs}
            align="right"
          />

          <VersoPairedMedia
            images={[versoMedia.onboarding, versoMedia.componentLibrary]}
            label="Project Overview"
          />

          {/* The Challenge — unchanged */}
          <section className="container" aria-label="The Challenge">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-6">
              <div
                className="flex max-w-[35.25rem] flex-col"
                style={{ gap: "var(--hero-copy-gap)" }}
              >
                <h2 className="type-cs-section">{challenge.label}</h2>
                <div className="flex flex-col gap-8">
                  <p className="verso-page__subhead">{challengeSubhead}</p>
                  {challengeParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="type-cs-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className="flex max-w-[35.25rem] flex-col"
                style={{ gap: "var(--hero-copy-gap)" }}
              >
                <div
                  className="flex flex-col gap-8"
                  aria-label="Challenge continued"
                >
                  {versoChallengeGoals.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="type-cs-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <VersoFullWidthMedia
            image={versoMedia.brandFoundations}
            label="Distinct Brand Identities"
          />

          {/* Visual design */}
          <NarrativeCopy
            label={solution.label}
            subhead={visualSubhead}
            paragraphs={visualParagraphs}
            align="right"
          />

          <VersoPairedMedia
            images={[versoMedia.storefront, versoMedia.imageSpecs]}
            label="Storefront and image specifications"
          />

          {/* Component Design */}
          <TwoColumnNarrative
            label={versoComponentDesign.label}
            subhead={versoComponentDesign.subhead}
            left={versoComponentDesign.left}
            right={versoComponentDesign.right}
          />

          <VersoFullWidthMedia
            image={versoMedia.reusableComponents}
            label="Reusable Components"
          />

          <VersoPairedMedia
            images={[versoMedia.navArchitecture, versoMedia.navCrossBrand]}
            label="Global Navigation"
          />

          <VersoFullWidthMedia
            image={versoMedia.wiredArticle}
            label="WIRED Article"
          />

          {/* Design tokens */}
          <NarrativeCopy
            label={versoDesignTokens.label}
            subhead={versoDesignTokens.subhead}
            paragraphs={versoDesignTokens.paragraphs}
            align="left"
          />

          <VersoFullWidthMedia
            image={versoMedia.designTokens}
            label="Design Tokens"
          />

          <VersoPairedMedia
            images={[versoMedia.crossBrand, versoMedia.japaneseLayouts]}
            label="Cross-brand and Japanese-language examples"
          />

          {/* Collaboration & Refinement */}
          <TwoColumnNarrative
            label={versoCollaboration.label}
            subhead={versoCollaboration.subhead}
            left={versoCollaboration.left}
            right={versoCollaboration.right}
          />

          <VersoFullWidthMedia
            image={versoMedia.refinement}
            label="System Refinement"
          />

          <VersoFullWidthMedia
            image={versoMedia.futureExplorations}
            label="Future Explorations"
          />

          {/* Outcome — quote left, outcome right */}
          <section
            className="container"
            aria-labelledby={result.label ? "result-heading" : undefined}
          >
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-6">
              {pullQuote ? (
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
              ) : (
                <div className="hidden lg:block" aria-hidden="true" />
              )}

              <div
                className="flex max-w-[35.25rem] flex-col"
                style={{ gap: "var(--hero-copy-gap)" }}
              >
                <h2 id="result-heading" className="type-cs-section">
                  {result.label}
                </h2>
                <div className="flex flex-col gap-8">
                  <p className="verso-page__subhead">{outcomeSubhead}</p>
                  {outcomeParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="type-cs-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </CaseStudyLightboxGallery>
  );
}
