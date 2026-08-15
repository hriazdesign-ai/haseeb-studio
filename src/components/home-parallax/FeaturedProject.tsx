import Image from "next/image";
import Link from "next/link";
import { HomepageParallaxImage } from "@/components/motion/HomepageParallaxImage";
import { ProjectBlockParallax } from "@/components/motion/ProjectBlockParallax";
import {
  homeParallaxBlockMotion,
  type HomeParallaxMotionMode,
  type HomeParallaxProject,
} from "@/lib/home-parallax";

type FeaturedProjectProps = {
  project: HomeParallaxProject;
  priority?: boolean;
  /**
   * `image` — interior frame parallax (`/home-parallax`, default).
   * `block` — whole project unit moves (`/home-parallax-blocks`).
   */
  motionMode?: HomeParallaxMotionMode;
};

/**
 * Single clickable project.
 * Default `motionMode="image"` preserves `/home-parallax` behaviour.
 */
export function FeaturedProject({
  project,
  priority = false,
  motionMode = "image",
}: FeaturedProjectProps) {
  const sizes =
    project.layout === "featured"
      ? "100vw"
      : "(max-width: 1023px) 100vw, 50vw";

  if (motionMode === "block") {
    const blockMotion = homeParallaxBlockMotion[project.layout];

    return (
      <ProjectBlockParallax from={blockMotion.from} to={blockMotion.to}>
        <Link
          href={project.href}
          className={`hp-project hp-project--${project.layout}`}
          aria-label={project.name}
        >
          <div className="homepage-parallax-frame">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover"
              style={{ objectPosition: project.objectPosition }}
            />
          </div>
          <p className="hp-project__caption">{project.caption}</p>
        </Link>
      </ProjectBlockParallax>
    );
  }

  return (
    <Link
      href={project.href}
      className={`hp-project hp-project--${project.layout}`}
      aria-label={project.name}
    >
      <HomepageParallaxImage
        src={project.image.src}
        alt={project.image.alt}
        travel={project.travel}
        objectPosition={project.objectPosition}
        priority={priority}
        debug
        debugLabel={project.name}
        sizes={sizes}
      />
      <p className="hp-project__caption">{project.caption}</p>
    </Link>
  );
}
