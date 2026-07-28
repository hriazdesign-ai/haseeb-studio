import { WorkCard } from "@/components/home/WorkCard";
import type { Project } from "@/lib/projects";

type WorkSectionProps = {
  mumsUnited: Project;
  brightPath: Project;
  meridian: Project;
  /** Gap between the featured row and the two-up row. */
  rowGap?: string;
};

/**
 * Selected / Studio Work grid. Image zoom is handled per card;
 * all cards share the same scroll/hover zoom strengths.
 */
export function WorkSection({
  mumsUnited,
  brightPath,
  meridian,
  rowGap = "60px",
}: WorkSectionProps) {
  return (
    <div className="flex flex-col" style={{ gap: rowGap }}>
      <div className="container">
        <WorkCard
          project={mumsUnited}
          priority
          imageClassName="aspect-[1152/744] min-h-[12rem]"
        />
      </div>

      <div
        className="container grid grid-cols-1 lg:grid-cols-2 lg:items-start"
        style={{ gap: "var(--work-col-gap)" }}
      >
        <WorkCard
          project={brightPath}
          imageClassName="aspect-[16/10] w-full"
        />
        <WorkCard
          project={meridian}
          imageClassName="aspect-[16/10] w-full"
        />
      </div>
    </div>
  );
}
