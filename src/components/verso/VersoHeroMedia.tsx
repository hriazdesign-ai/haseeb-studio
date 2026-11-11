import Image from "next/image";
import type { CaseStudyImage } from "@/lib/case-studies";

type VersoHeroMediaProps = {
  image: CaseStudyImage;
};

/** Full-width hero media for `/verso` only. */
export function VersoHeroMedia({ image }: VersoHeroMediaProps) {
  return (
    <div className="verso-page__hero-media">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority
        sizes="100vw"
        className="verso-page__hero-image"
      />
    </div>
  );
}
