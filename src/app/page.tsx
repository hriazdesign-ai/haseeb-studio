import { PageShell } from "@/components/layout/PageShell";
import { WorkSection } from "@/components/home/WorkSection";
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

      <WorkSection
        mumsUnited={mumsUnited}
        brightPath={brightPath}
        meridian={meridian}
      />

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
