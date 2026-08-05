import { getImageProps } from "next/image";
import { ART_DIRECTION_MOBILE_MAX_PX } from "@/lib/case-studies/breakpoints";
import type { CaseStudyImage } from "@/lib/case-studies";

type ArtDirectedIntrinsicImageProps = {
  image: CaseStudyImage;
  /** Optional art-directed asset below the tablet breakpoint. */
  mobileSrc?: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Normal-flow image: width 100%, height auto from the bitmap.
 * No fill/absolute frame or object-fit — preserves the exported composition.
 */
export function ArtDirectedIntrinsicImage({
  image,
  mobileSrc,
  sizes,
  priority = false,
}: ArtDirectedIntrinsicImageProps) {
  const {
    props: { srcSet: desktopSrcSet, style: desktopStyle, ...desktop },
  } = getImageProps({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    sizes,
    priority,
  });

  const imageStyle = {
    ...desktopStyle,
    display: "block" as const,
    width: "100%",
    height: "auto",
    // Let the loaded bitmap define aspect (desktop vs mobileSrc can differ).
    aspectRatio: "auto",
  };

  if (!mobileSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- from getImageProps
      <img
        {...desktop}
        srcSet={desktopSrcSet}
        alt={image.alt}
        className="block h-auto w-full"
        style={imageStyle}
      />
    );
  }

  const {
    props: { srcSet: mobileSrcSet, sizes: mobileSizes },
  } = getImageProps({
    src: mobileSrc,
    alt: image.alt,
    width: image.mobileWidth ?? image.width,
    height: image.mobileHeight ?? image.height,
    sizes,
    priority,
  });

  return (
    <picture className="block w-full">
      <source
        media={`(max-width: ${ART_DIRECTION_MOBILE_MAX_PX}px)`}
        srcSet={mobileSrcSet}
        sizes={mobileSizes}
      />
      <img
        {...desktop}
        srcSet={desktopSrcSet}
        alt={image.alt}
        className="block h-auto w-full"
        style={imageStyle}
      />
    </picture>
  );
}
