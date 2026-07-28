import Image from "next/image";
import { ImageLightbox } from "@/components/case-study/ImageLightbox";
import type { CaseStudyImage } from "@/lib/case-studies";

type CaseStudyMediaProps = {
  image: CaseStudyImage;
  /** Aspect / height classes for the media frame. */
  frameClassName?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
};

/** Case-study figure with optional zoom lightbox for UI detail shots. */
export function CaseStudyMedia({
  image,
  frameClassName = "aspect-[16/10]",
  sizes = "100vw",
  priority = false,
  showCaption = true,
}: CaseStudyMediaProps) {
  const media = (
    <div
      className={["relative w-full overflow-hidden bg-[#f3f3f3]", frameClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        className="object-cover"
        sizes={sizes}
      />
    </div>
  );

  return (
    <figure className="m-0 flex min-w-0 flex-col gap-[18px]">
      {image.zoomable ? (
        <ImageLightbox src={image.src} alt={image.alt}>
          {media}
        </ImageLightbox>
      ) : (
        media
      )}
      {showCaption && image.caption ? (
        <figcaption className="type-cs-caption">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}
