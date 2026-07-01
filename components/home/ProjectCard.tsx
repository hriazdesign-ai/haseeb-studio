"use client";

import Link from "next/link";
import ImageFrame from "@/components/ui/ImageFrame";
import ScrollReveal from "@/components/ui/ScrollReveal";

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  metadata: string;
  href: string;
  image: string;
  alt: string;
  objectPosition?: string;
  frameClassName?: string;
  sizes?: string;
  contentClassName?: string;
  priority?: boolean;
};

export default function ProjectCard({
  title,
  category,
  description,
  metadata,
  href,
  image,
  alt,
  objectPosition,
  frameClassName,
  sizes,
  contentClassName = "",
  priority = false,
}: ProjectCardProps) {
  return (
    <ScrollReveal className="group/project transition-transform duration-300 ease-out hover:-translate-y-2">
      <article className={contentClassName}>
        <ImageFrame
          src={image}
          alt={alt}
          className={frameClassName}
          objectPosition={objectPosition}
          sizes={sizes}
          priority={priority}
        />

        <div className="mt-2 flex flex-col gap-4 transition-transform duration-300 ease-out group-hover/project:-translate-y-1">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2 text-[16px] leading-4 tracking-[-0.04em] text-foreground">
              <h3>{title}</h3>
              <span className="shrink-0 text-right text-accent">{category}</span>
            </div>
            <p className="max-w-[80%] text-[16px] leading-4 tracking-[-0.04em] text-foreground">
              {description}
            </p>
          </div>

          <p className="text-[14px] leading-4 tracking-[-0.04em] text-foreground/70">
            {metadata}
          </p>

          <Link
            href={href}
            className="link-underline w-fit text-[14px] leading-4 tracking-[-0.04em] text-foreground"
          >
            View Project →
          </Link>
        </div>
      </article>
    </ScrollReveal>
  );
}
