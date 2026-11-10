import Image from "next/image";
import type { CaseStudyImage } from "@/lib/case-studies";

type RtlHeroMediaProps = {
  image: CaseStudyImage;
};

/**
 * Full-width hero media for `/rtl-localisation` only.
 * Loads the public file directly so updated assets are not masked by
 * Next.js image-optimizer cache.
 */
export function RtlHeroMedia({ image }: RtlHeroMediaProps) {
  return (
    <div className="rtl-page__hero-media">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority
        sizes="100vw"
        unoptimized
        className="rtl-page__hero-image"
      />
    </div>
  );
}
