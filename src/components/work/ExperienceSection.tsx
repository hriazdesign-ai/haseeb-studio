import { WorkCard } from "@/components/home/WorkCard";
import type { Project } from "@/lib/projects";

type ExperienceSectionProps = {
  projects: Project[];
};

/**
 * Professional Experience grid with editorial hierarchy:
 * Verso (featured) → OneNav + Editorial (2-up) → four supporting projects.
 * Row rhythm matches Studio Work (42px); supporting thumbs are slightly taller
 * (~12% vs the Figma 552×356 crop) while column widths stay the same.
 */
export function ExperienceSection({ projects }: ExperienceSectionProps) {
  const [verso, oneNav, editorial, ...supporting] = projects;

  return (
    <div className="flex flex-col" style={{ gap: "42px" }}>
      {verso ? (
        <div className="container">
          <WorkCard
            project={verso}
            imageClassName="aspect-[2/1] min-h-[10rem] w-full"
          />
        </div>
      ) : null}

      <div
        className="container grid grid-cols-1 lg:grid-cols-2 lg:items-start"
        style={{ gap: "var(--work-col-gap)" }}
      >
        {[oneNav, editorial].filter(Boolean).map((project) => (
          <WorkCard
            key={project.id}
            project={project}
            imageClassName="aspect-[748/482] w-full"
          />
        ))}
      </div>

      <div
        className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:items-start"
        style={{ gap: "var(--work-col-gap)" }}
      >
        {supporting.map((project) => (
          <WorkCard
            key={project.id}
            project={project}
            imageClassName="aspect-[552/400] w-full"
          />
        ))}
      </div>
    </div>
  );
}
