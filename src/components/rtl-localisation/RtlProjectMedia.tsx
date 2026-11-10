import Image from "next/image";
import { ImageLightbox } from "@/components/case-study/ImageLightbox";
import type { CaseStudyImage } from "@/lib/case-studies";

type RtlMediaProps = {
  image: CaseStudyImage;
  label: string;
};

/**
 * Load RTL stills directly from `/public/rtl` (unoptimized) so updated
 * assets are not masked by Next.js image-optimizer cache.
 */
function RtlFigure({
  image,
  sizes,
}: {
  image: CaseStudyImage;
  sizes: string;
}) {
  const media = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      unoptimized
      className="block h-auto w-full max-w-full"
    />
  );

  return (
    <figure className="m-0 flex min-w-0 flex-col gap-[18px]">
      <ImageLightbox src={image.src} alt={image.alt}>
        {media}
      </ImageLightbox>
      {image.caption ? (
        <figcaption className="type-cs-caption">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Large centred still using the main case-study content width. */
export function RtlFullWidthMedia({ image, label }: RtlMediaProps) {
  return (
    <section className="container" aria-label={label}>
      <RtlFigure
        image={image}
        sizes="(max-width: 1299px) calc(100vw - 2 * clamp(1.25rem, 5vw, 4rem)), 1172px"
      />
    </section>
  );
}

type RtlPairedMediaProps = {
  images: [CaseStudyImage, CaseStudyImage];
  label: string;
};

/**
 * Balanced two-column stills for Design Exploration.
 * Equal column widths; images keep their intrinsic aspect ratios.
 */
export function RtlPairedMedia({ images, label }: RtlPairedMediaProps) {
  return (
    <section className="container" aria-label={label}>
      <div className="rtl-page__paired-media">
        {images.map((image) => (
          <RtlFigure
            key={image.src}
            image={image}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        ))}
      </div>
    </section>
  );
}
