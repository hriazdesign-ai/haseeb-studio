import Image from "next/image";
import { CaseStudyMedia } from "@/components/case-study/CaseStudyMedia";
import type { CaseStudy, CaseStudyNarrative } from "@/lib/case-studies";

type CaseStudyViewProps = {
  study: CaseStudy;
};

function NarrativeBlock({ narrative }: { narrative: CaseStudyNarrative }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div
        className={[
          "flex max-w-[35.25rem] flex-col",
          narrative.align === "right" ? "lg:col-start-2" : "lg:col-start-1",
        ].join(" ")}
        style={{ gap: "var(--hero-copy-gap)" }}
      >
        <h2 className="type-cs-section">{narrative.label}</h2>
        <div className="flex flex-col gap-8">
          {narrative.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="type-cs-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable case-study layout driven by structured content data.
 * Visual system matches Figma Studio MU (node 515:931).
 */
export function CaseStudyView({ study }: CaseStudyViewProps) {
  return (
    <article className="case-study">
      <header className="case-study__hero">
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
              <p className="type-cs-meta-value">{study.disciplines}</p>
            </div>

            <dl className="case-study__meta m-0">
              {study.meta.map((group) => (
                <div key={group.label} className="case-study__meta-group">
                  <dt className="type-cs-meta-label">{group.label}</dt>
                  {group.values.map((value) => (
                    <dd key={value} className="type-cs-meta-value">
                      {group.label === "Focus:" || group.label === "Platform:"
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
            frameClassName="aspect-[1280/720]"
            sizes="100vw"
          />
        </div>
      </header>

      <div
        className="case-study__body stack"
        style={{ gap: "var(--stack-gap)" }}
      >
        <section className="container" aria-label="Introduction">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="flex max-w-[35.25rem] flex-col gap-8">
              {study.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="type-cs-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section
          className="case-study__pull-quote relative w-full"
          aria-label="Pull quote"
        >
          <div className="relative aspect-[560/315] w-full overflow-hidden">
            <Image
              src={study.pullQuote.image.src}
              alt={study.pullQuote.image.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 container pb-11 text-white">
              <p className="type-cs-quote max-w-[35.25rem]">
                {study.pullQuote.text}
              </p>
            </div>
          </div>
        </section>

        <section className="container">
          <NarrativeBlock narrative={study.challenge} />
        </section>

        <section className="container" aria-label="Challenge gallery">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "2rem" }}>
            {study.challengeGallery.map((image) => (
              <CaseStudyMedia
                key={image.src}
                image={image}
                frameClassName="aspect-[560/361]"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            ))}
          </div>
        </section>

        <section className="container" aria-label="Featured design">
          <CaseStudyMedia
            image={study.feature}
            frameClassName="aspect-[1280/720]"
            sizes="100vw"
          />
        </section>

        <section className="container">
          <NarrativeBlock narrative={study.solution} />
        </section>

        <section className="container" aria-label="Solution gallery">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "2rem" }}>
            {study.solutionGallery.map((image) => (
              <CaseStudyMedia
                key={image.src}
                image={image}
                frameClassName="aspect-[560/361]"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            ))}
          </div>
        </section>

        <section className="container" aria-labelledby="result-heading">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-6">
            <div
              className="flex max-w-[35.25rem] flex-col"
              style={{ gap: "var(--hero-copy-gap)" }}
            >
              <h2 id="result-heading" className="type-cs-section">
                {study.result.label}
              </h2>
              <div className="flex flex-col gap-8">
                {study.result.paragraphs.map((paragraph) => (
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
        </section>
      </div>
    </article>
  );
}
