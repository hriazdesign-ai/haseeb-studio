"use client";

import Link from "next/link";
import ImageFrame from "@/components/ui/ImageFrame";
import ScrollReveal from "@/components/ui/ScrollReveal";

type ProjectCardProps = {
  title: string;
  metadata: string;
  href: string;
  image: string;
  alt: string;
  objectPosition?: string;
  frameClassName?: string;
  sizes?: string;
  contentClassName?: string;
  captionMaxWidth?: string;
  priority?: boolean;
  parallaxSpeed?: number;
};

export default function ProjectCard({
  title,
  metadata,
  href,
  image,
  alt,
  objectPosition,
  frameClassName,
  sizes,
  contentClassName = "",
  captionMaxWidth = "",
  priority = false,
  parallaxSpeed = 1,
}: ProjectCardProps) {
  return (
    <ScrollReveal className="group/project min-w-0">
      <article className={`min-w-0 ${contentClassName}`}>
        <ImageFrame
          src={image}
          alt={alt}
          className={frameClassName}
          objectPosition={objectPosition}
          sizes={sizes}
          priority={priority}
          parallaxSpeed={parallaxSpeed}
        />

        <div className={`mt-2 flex flex-col gap-3 ${captionMaxWidth}`}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[16px] leading-4 tracking-[-0.04em] text-foreground">
              {title}
            </h3>
            <p className="text-[14px] leading-4 tracking-[-0.04em] text-accent">
              {metadata}
            </p>
          </div>

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
