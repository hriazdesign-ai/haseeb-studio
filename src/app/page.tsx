import { PageShell } from "@/components/layout/PageShell";
import { WorkCard } from "@/components/home/WorkCard";
import { homeProjects } from "@/lib/projects";

const [mumsUnited, brightPath, meridian] = homeProjects;

export default function Home() {
  return (
    <PageShell fullWidth unpadded className="stack home-page">
      <section
        aria-labelledby="home-hero-heading"
        className="container"
        style={{ paddingTop: "var(--stack-gap)" }}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="home-hero__copy flex max-w-[35.25rem] flex-col">
            <h1 id="home-hero-heading" className="type-display">
              Helping organisations
              <br className="hidden lg:inline" />{" "}
              earn trust through
              <br className="hidden lg:inline" />{" "}
              better digital experiences.
            </h1>
            <p className="type-body-lg home-hero__body">
              20+ years designing digital experiences across product, UI, UX,
              branding and design systems.
              <br />
              <br />
              16 years at Condé Nast.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Selected work"
        className="flex flex-col"
        style={{ gap: "var(--work-row-gap)" }}
      >
        <div className="container">
          <WorkCard
            project={mumsUnited}
            priority
            imageClassName="aspect-[1152/744] min-h-[12rem]"
          />
        </div>

        <div
          className="container grid grid-cols-1 lg:grid-cols-[minmax(0,372px)_minmax(0,1fr)] lg:items-start"
          style={{ gap: "var(--work-col-gap)" }}
        >
          <WorkCard
            project={brightPath}
            imageClassName="aspect-[372/240] w-full lg:max-w-[372px]"
          />
          <WorkCard
            project={meridian}
            imageClassName="aspect-[788/491] w-full"
          />
        </div>
      </section>

      <section
        aria-labelledby="home-philosophy-heading"
        className="container"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="max-w-[35.25rem]">
            <h2 id="home-philosophy-heading" className="sr-only">
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
