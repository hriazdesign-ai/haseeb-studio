import Image from "next/image";
import type { MotionValue } from "framer-motion";
import { ScrollProjectCard } from "@/components/motion/ScrollProjectCard";
import type { Project } from "@/lib/projects";

type WorkCardProps = {
  project: Project;
  className?: string;
  imageClassName?: string;
  /** Peak local scroll-linked image scale for this card. */
  zoomScale?: number;
  /** Shared focus value between 0 and 1. */
  imageEmphasis: MotionValue<number>;
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
  zoomScale = 1.2,
  imageEmphasis,
  priority = false,
}: WorkCardProps) {
  const image = (
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
  );

  const caption = (
    <div className="flex flex-col gap-2">
      <p className="type-label">{project.name}</p>
      <h2 className="type-section-title">{project.title}</h2>
    </div>
  );

  return (
    <ScrollProjectCard
      media={image}
      caption={caption}
      mediaClassName={imageClassName}
      className={className}
      zoomScale={zoomScale}
      imageEmphasis={imageEmphasis}
    />
  );
}