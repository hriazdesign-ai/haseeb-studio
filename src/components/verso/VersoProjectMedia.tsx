import Image from "next/image";
import { ImageLightbox } from "@/components/case-study/ImageLightbox";
import type { CaseStudyImage } from "@/lib/case-studies";

type VersoMediaProps = {
  image: CaseStudyImage;
  label: string;
};

function VersoFigure({
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
export function VersoFullWidthMedia({ image, label }: VersoMediaProps) {
  return (
    <section className="container" aria-label={label}>
      <VersoFigure
        image={image}
        sizes="(max-width: 1299px) calc(100vw - 2 * clamp(1.25rem, 5vw, 4rem)), 1172px"
      />
    </section>
  );
}

type VersoPairedMediaProps = {
  images: [CaseStudyImage, CaseStudyImage];
  label: string;
};

/**
 * Balanced two-column stills.
 * Equal column widths; images keep their intrinsic aspect ratios.
 */
export function VersoPairedMedia({ images, label }: VersoPairedMediaProps) {
  return (
    <section className="container" aria-label={label}>
      <div className="verso-page__paired-media">
        {images.map((image, index) => (
          <VersoFigure
            key={`${image.src}-${index}`}
            image={image}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        ))}
      </div>
    </section>
  );
}
