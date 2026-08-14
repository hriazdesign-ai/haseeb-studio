import { CaseStudyHeroHeading } from "@/components/case-study/CaseStudyHeroHeading";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyHeroMedia";
import { CaseStudyMedia } from "@/components/case-study/CaseStudyMedia";
import { CaseStudyProjectCarousel } from "@/components/case-study/CaseStudyProjectCarousel";
import { LargeFeature } from "@/components/case-study/LargeFeature";
import { PendingCaseStudyMedia } from "@/components/case-study/PendingCaseStudyMedia";
import { ScrollParallaxImage } from "@/components/motion/ScrollParallaxImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { blocksStatementMotion } from "@/lib/home-parallax-blocks-motion";
import type {
  CaseStudy,
  CaseStudyBodyBlock,
  CaseStudyImage,
  CaseStudyNarrative,
} from "@/lib/case-studies";

type CaseStudyViewProps = {
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

function PairedGallery({
  images,
  label,
}: {
  images: [CaseStudyImage, CaseStudyImage];
  label: string;
}) {
  return (
    <section className="container" aria-label={label}>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "2rem" }}>
        {images.map((image) => (
          <CaseStudyMedia
            key={image.src}
            image={image}
            frameClassName="aspect-[560/361]"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        ))}
      </div>
    </section>
  );
}

function PullQuoteImage({
  image,
  text,
}: {
  image: CaseStudyImage;
  text: string;
}) {
  return (
    <section
      className="case-study__pull-quote relative w-full"
      aria-label="Pull quote"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto lg:h-[720px]">
        <ScrollParallaxImage
          src={image.src}
          alt={image.alt}
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[rgb(15_15_15/0.35)]"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 container pb-11 text-white">
          <ScrollReveal
            as="p"
            className="type-cs-quote max-w-[35.25rem]"
            offset={blocksStatementMotion.offset}
            range={[0, 1]}
            opacity={blocksStatementMotion.opacity}
            y={blocksStatementMotion.y}
            applyCaptionMultiplier
          >
            {text}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function BodyBlocks({ blocks }: { blocks: CaseStudyBodyBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "gallery") {
          return (
            <PairedGallery
              key={`gallery-${block.images[0].src}-${index}`}
              images={block.images}
              label={block.label ?? "Gallery"}
            />
          );
        }

        if (block.type === "feature") {
          return (
            <LargeFeature
              key={`feature-${block.image.src}-${index}`}
              image={block.image}
              label={block.label ?? "Featured design"}
            />
          );
        }

        const { narrative } = block;
        return (
          <section
            key={`narrative-${narrative.id}-${index}`}
            className="container"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div
                className={
                  narrative.align === "right"
                    ? "lg:col-start-2"
                    : "lg:col-start-1"
                }
              >
                <NarrativeBlock narrative={narrative} />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

function StandardBody({ study }: { study: CaseStudy }) {
  const galleryBeforeChallenge =
    study.challengeGalleryPlacement === "before";
  const pullQuote = study.pullQuote;
  const hasPullQuoteImage = Boolean(pullQuote?.image);
  const hasTextAsideQuote = Boolean(pullQuote && !pullQuote.image);
  const challengeGallery = study.challengeGallery;
  const challenge = study.challenge;
  const result = study.result;
  const featurePlacement =
    study.featurePlacement ??
    (study.featureBeforeMidGallery ? "beforeMidGallery" : "afterMidGallery");

  if (!challenge || !result) return null;

  return (
    <>
      {galleryBeforeChallenge && challengeGallery ? (
        <PairedGallery
          images={challengeGallery}
          label="Challenge gallery"
        />
      ) : hasPullQuoteImage && pullQuote?.image ? (
        <PullQuoteImage image={pullQuote.image} text={pullQuote.text} />
      ) : null}

      {/*
       * After an early challenge gallery when present, so studies can open with
       * the 2-up + large feature cluster (e.g. Mums United) before The Challenge.
       * Studies without an early gallery still get the feature first (Digital Editions).
       */}
      {featurePlacement === "beforeChallenge" && study.feature ? (
        <LargeFeature image={study.feature} label="Featured design" />
      ) : null}

      <section className="container">
        {hasTextAsideQuote && pullQuote ? (
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
            <div
              className={
                challenge.align === "right"
                  ? "lg:col-start-2"
                  : "lg:col-start-1"
              }
            >
              <NarrativeBlock narrative={challenge} />
            </div>
          </div>
        )}
      </section>

      {galleryBeforeChallenge ? (
        hasPullQuoteImage && pullQuote?.image ? (
          <PullQuoteImage image={pullQuote.image} text={pullQuote.text} />
        ) : null
      ) : challengeGallery ? (
        <PairedGallery
          images={challengeGallery}
          label="Challenge gallery"
        />
      ) : null}

      {featurePlacement === "beforeMidGallery" && study.feature ? (
        <LargeFeature image={study.feature} label="Featured design" />
      ) : null}

      {study.midGallery ? (
        <PairedGallery images={study.midGallery} label="Feature gallery" />
      ) : null}

      {featurePlacement === "afterMidGallery" && study.feature ? (
        <LargeFeature image={study.feature} label="Featured design" />
      ) : null}

      {study.solution ? (
        <section className="container">
          {study.solutionCompanion ? (
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-6">
              <NarrativeBlock narrative={study.solution} />
              <NarrativeBlock narrative={study.solutionCompanion} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div
                className={
                  study.solution.align === "right"
                    ? "lg:col-start-2"
                    : "lg:col-start-1"
                }
              >
                <NarrativeBlock narrative={study.solution} />
              </div>
            </div>
          )}
        </section>
      ) : null}

      {study.solutionGallery ? (
        <PairedGallery
          images={study.solutionGallery}
          label="Solution gallery"
        />
      ) : null}

      {study.closingFeature ? (
        <LargeFeature
          image={study.closingFeature}
          label="Closing feature"
        />
      ) : null}

      {study.extension ? (
        <>
          <section
            className="container"
            aria-labelledby="extension-heading"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="lg:col-start-1">
                <div
                  className="flex max-w-[35.25rem] flex-col"
                  style={{ gap: "var(--hero-copy-gap)" }}
                >
                  {study.extension.label ? (
                    <h2 className="type-cs-section">
                      {study.extension.label}
                    </h2>
                  ) : null}
                  <h3
                    id="extension-heading"
                    className="type-cs-title"
                  >
                    {study.extension.heading}
                  </h3>
                  <div className="flex flex-col gap-8">
                    {study.extension.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="type-cs-body"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="container"
            aria-label={`${study.extension.label} gallery`}
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-2"
              style={{ gap: "2rem" }}
            >
              {study.extension.gallery.map((image) => (
                <PendingCaseStudyMedia
                  key={`pending-gallery:${image.src}`}
                  src={image.src}
                  caption={image.caption}
                  placeholderClassName="aspect-[560/361]"
                >
                  <CaseStudyMedia
                    image={image}
                    frameClassName="aspect-[560/361]"
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    artDirectMobile={false}
                  />
                </PendingCaseStudyMedia>
              ))}
            </div>
          </section>

          {study.extension.features.map((image, index) => (
            <PendingCaseStudyMedia
              key={`pending-feature:${image.src}`}
              src={image.src}
              caption={image.caption}
              layout="feature"
              label={image.caption ?? `Extension feature ${index + 1}`}
              placeholderClassName="aspect-[6/4] min-h-[14rem]"
            >
              <LargeFeature
                image={image}
                label={image.caption ?? `Extension feature ${index + 1}`}
              />
            </PendingCaseStudyMedia>
          ))}
        </>
      ) : null}

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
                  <p key={paragraph.slice(0, 32)} className="type-cs-body">
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
              <ul className="m-0 flex list-none flex-col p-0">
                {study.outcome.items.map((item) => (
                  <li key={item} className="type-cs-body">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div
              className={
                result.align === "right" ? "lg:col-start-2" : "lg:col-start-1"
              }
            >
              <NarrativeBlock narrative={result} />
            </div>
          </div>
        )}
      </section>

      {study.postResultFeature ? (
        <LargeFeature
          image={study.postResultFeature}
          label="Closing feature"
        />
      ) : null}
    </>
  );
}

/**
 * Reusable case-study layout driven by structured content data.
 */
export function CaseStudyView({ study }: CaseStudyViewProps) {
  const usePortfolioHeading = study.heroLayout === "portfolio";

  return (
    <>
      <article className="case-study">
        <header className="case-study__hero">
          {usePortfolioHeading ? (
            <>
              <div className="prototype-page-container case-study-hero">
                <CaseStudyHeroHeading study={study} />
              </div>
              <CaseStudyHeroMedia image={study.hero} />
            </>
          ) : (
            <>
              <div
                className="container case-study__hero-inner"
                style={{ paddingTop: "var(--stack-gap)" }}
              >
                <div className="case-study__hero-grid">
                  <div
                    className="case-study__hero-copy flex flex-col"
                    style={{ gap: "var(--hero-copy-gap)" }}
                  >
                    <p className="type-cs-eyebrow">{study.name}</p>
                    <h1 className="type-cs-title">{study.title}</h1>
                    {study.disciplines ? (
                      <p className="type-cs-meta-value">{study.disciplines}</p>
                    ) : null}
                  </div>

                  <dl className="case-study__meta m-0">
                    {study.meta.map((group) => (
                      <div key={group.label} className="case-study__meta-group">
                        <dt className="type-cs-meta-label">{group.label}</dt>
                        {group.values.map((value) => (
                          <dd key={value} className="type-cs-meta-value">
                            {group.label === "Focus:" ||
                            group.label === "Platform:"
                              ? `· ${value}`
                              : value}
                          </dd>
                        ))}
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="case-study__hero-media">
                <CaseStudyMedia
                  image={study.hero}
                  priority
                  showCaption={false}
                  parallax
                  bordered={false}
                  frameClassName="aspect-[16/9] lg:aspect-auto lg:h-[720px]"
                  sizes="100vw"
                />
              </div>
            </>
          )}
        </header>

        <div
          className="case-study__body stack"
          style={{ gap: "var(--stack-gap)" }}
        >
          <section className="container" aria-label="Introduction">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="hidden lg:block" aria-hidden="true" />
              <div
                className="flex max-w-[35.25rem] flex-col"
                style={{
                  gap: study.introLabel
                    ? "var(--hero-copy-gap)"
                    : undefined,
                }}
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

          {study.bodyBlocks ? (
            <BodyBlocks blocks={study.bodyBlocks} />
          ) : (
            <StandardBody study={study} />
          )}
        </div>
      </article>
      <CaseStudyProjectCarousel currentSlug={study.slug} />
    </>
  );
}
