import Image from "next/image";
import type { Project } from "@/lib/projects";

type WorkCardProps = {
  project: Project;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

/**
 * Non-interactive project card.
 * TODO: Wrap in a Link once case-study routes exist.
 */
export function WorkCard({
  project,
  className,
  imageClassName,
  priority = false,
}: WorkCardProps) {
  return (
    <article
      className={["flex min-w-0 flex-col gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "relative w-full overflow-hidden bg-surface",
          imageClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={
            project.size === "featured"
              ? "100vw"
              : project.size === "secondary"
                ? "(max-width: 1023px) 100vw, 33vw"
                : "(max-width: 1023px) 100vw, 66vw"
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="type-label">{project.name}</p>
        <h2 className="type-section-title">{project.title}</h2>
      </div>
    </article>
  );
}
