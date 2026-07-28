import { PageShell } from "@/components/layout/PageShell";
import { WorkSection } from "@/components/home/WorkSection";
import { ExperienceSection } from "@/components/work/ExperienceSection";
import { SectionHeading } from "@/components/work/SectionHeading";
import {
  experienceProjects,
  studioWorkProjects,
} from "@/lib/projects";

const [mumsUnited, brightPath, meridian] = studioWorkProjects;

export default function WorkPage() {
  return (
    <PageShell fullWidth unpadded className="stack home-page">
      <section
        aria-labelledby="work-intro-heading"
        className="container"
        style={{ paddingTop: "var(--stack-gap)" }}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="hidden lg:block" aria-hidden="true" />
          <div
            className="flex max-w-[35.25rem] flex-col"
            style={{ gap: "var(--hero-copy-gap)" }}
          >
            <div
              className="flex flex-col"
              style={{ gap: "var(--hero-copy-gap)" }}
            >
              <p className="type-label uppercase tracking-[0.02em]">
                Selected work
              </p>
              <h1 id="work-intro-heading" className="type-display">
                Digital experiences built around clarity, trust and usability.
              </h1>
            </div>
            <p className="type-label">
              Product · UI/UX · Design Systems · Web Design · Development
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="studio-work-heading"
        className="flex flex-col"
        style={{ gap: "var(--stack-gap)" }}
      >
        <div className="container">
          <SectionHeading
            number="01"
            title="Studio Work"
            id="studio-work-heading"
          />
        </div>
        <WorkSection
          mumsUnited={mumsUnited}
          brightPath={brightPath}
          meridian={meridian}
          rowGap="42px"
        />
      </section>

      <section
        aria-labelledby="experience-heading"
        className="flex flex-col"
        style={{ gap: "var(--stack-gap)" }}
      >
        <div className="container">
          <SectionHeading
            number="02"
            title="Professional Experience"
            id="experience-heading"
          />
        </div>
        <ExperienceSection projects={experienceProjects} />
      </section>

      <section
        aria-labelledby="work-philosophy-heading"
        className="container"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="max-w-[35.25rem]">
            <h2 id="work-philosophy-heading" className="sr-only">
              Design philosophy
            </h2>
            <p className="type-page-title type-accent whitespace-pre-line">
              {`Good design earns trust before it asks for action.

Every project begins by understanding people, simplifying complexity and creating experiences that build confidence.`}
            </p>
          </div>
        </div>
      </section>

      <div className="container" aria-hidden="true">
        <hr className="m-0 h-px w-full border-0 bg-border" />
      </div>
    </PageShell>
  );
}
