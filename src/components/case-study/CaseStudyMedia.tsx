import { ArtDirectedFillImage } from "@/components/case-study/ArtDirectedFillImage";
import { ArtDirectedIntrinsicImage } from "@/components/case-study/ArtDirectedIntrinsicImage";
import { ImageLightbox } from "@/components/case-study/ImageLightbox";
import { ScrollParallaxImage } from "@/components/motion/ScrollParallaxImage";
import type { CaseStudyImage } from "@/lib/case-studies";

type CaseStudyMediaProps = {
  image: CaseStudyImage;
  /** Aspect / height classes for framed (`fill`) media. Ignored when `layout="intrinsic"`. */
  frameClassName?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
  /** Subtle scroll parallax for framed atmospheric sections only. */
  parallax?: boolean;
  /**
   * `framed` (default) — absolutely fills a sized frame.
   * `intrinsic` — width 100%, height auto from the image.
   */
  layout?: "framed" | "intrinsic";
  /**
   * Honour optional `image.mobileSrc` below the mobile breakpoint.
   * Defaults to true so galleries and supporting media pick up art direction.
   */
  artDirectMobile?: boolean;
  /** How the image fills a framed layout (`cover` default). Ignored when intrinsic. */
  objectFit?: "cover" | "contain";
  /**
   * 1px `#DDDDDD` frame for UI screenshots on a white page.
   * Off for heroes and Large Features. Defaults to true.
   */
  bordered?: boolean;
};

/** Case-study figure with optional zoom lightbox for UI detail shots. */
export function CaseStudyMedia({
  image,
  frameClassName = "aspect-[16/10]",
  sizes = "100vw",
  priority = false,
  showCaption = true,
  parallax = false,
  layout = "framed",
  artDirectMobile = true,
  objectFit = "cover",
  bordered = true,
}: CaseStudyMediaProps) {
  const mobileSrc = artDirectMobile ? image.mobileSrc : undefined;
  const frameChrome = [
    bordered ? "case-study-media--bordered" : null,
    !bordered ? "bg-[#f3f3f3]" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const media =
    layout === "intrinsic" ? (
      <div
        className={["relative w-full overflow-hidden", frameChrome]
          .filter(Boolean)
          .join(" ")}
      >
        <ArtDirectedIntrinsicImage
          image={image}
          mobileSrc={mobileSrc}
          sizes={sizes}
          priority={priority}
        />
      </div>
    ) : (
      <div
        className={[
          "relative w-full overflow-hidden",
          frameChrome,
          frameClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {parallax ? (
          <ScrollParallaxImage
            src={image.src}
            mobileSrc={mobileSrc}
            alt={image.alt}
            sizes={sizes}
            priority={priority}
          />
        ) : (
          <ArtDirectedFillImage
            src={image.src}
            mobileSrc={mobileSrc}
            alt={image.alt}
            sizes={sizes}
            priority={priority}
            objectFit={objectFit}
          />
        )}
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
