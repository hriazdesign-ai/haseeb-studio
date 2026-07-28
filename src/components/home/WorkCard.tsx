import Image from "next/image";
import Link from "next/link";
import { ScrollProjectCard } from "@/components/motion/ScrollProjectCard";
import type { Project } from "@/lib/projects";

type WorkCardProps = {
  project: Project;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

/**
 * Project card with homepage interaction language (zoom + arrow).
 * Links to a case study when `project.href` is set.
 */
export function WorkCard({
  project,
  className,
  imageClassName,
  priority = false,
}: WorkCardProps) {
  const image = project.image ? (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      fill
      priority={priority}
      className="object-cover"
      sizes={
        project.size === "featured"
          ? "100vw"
          : project.size === "experience"
            ? "(max-width: 1023px) 100vw, 25vw"
            : project.size === "secondary"
              ? "(max-width: 1023px) 100vw, 33vw"
              : "(max-width: 1023px) 100vw, 66vw"
      }
    />
  ) : (
    <div className="size-full bg-surface" aria-hidden="true" />
  );

  const caption = (
    <div className="work-card__caption flex flex-col gap-2">
      <div className="work-card__title-row">
        <p className="type-label">{project.name}</p>
        <span className="work-card__arrow translate-y-[3px]" aria-hidden="true">
          ↗
        </span>
      </div>
      <h2 className="type-section-title">{project.title}</h2>
    </div>
  );

  const card = (
    <ScrollProjectCard
      media={image}
      caption={caption}
      mediaClassName={imageClassName}
      className={className}
    />
  );

  if (!project.href) return card;

  return (
    <Link
      href={project.href}
      className="block min-w-0 text-inherit no-underline"
    >
      {card}
    </Link>
  );
}
