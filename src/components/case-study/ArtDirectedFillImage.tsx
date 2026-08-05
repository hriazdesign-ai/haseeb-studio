import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { ART_DIRECTION_MOBILE_MAX_PX } from "@/lib/case-studies/breakpoints";

type ArtDirectedFillImageProps = {
  src: string;
  /** Optional art-directed asset below the tablet breakpoint. */
  mobileSrc?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /**
   * `cover` (default) crops to fill. `contain` shows the full composition
   * centred in the frame.
   */
  objectFit?: "cover" | "contain";
  /**
   * Inline object-position. Omit when CSS variables control desktop/mobile
   * crops (case-study heroes).
   */
  objectPosition?: string;
  className?: string;
};

/**
 * Fill-frame image with optional mobile art direction.
 * Uses `getImageProps` + `<picture>` so the browser selects one source
 * (Next `<Image>` alone ignores sibling `<source>` elements).
 */
export function ArtDirectedFillImage({
  src,
  mobileSrc,
  alt,
  sizes,
  priority = false,
  objectFit = "cover",
  objectPosition,
  className,
}: ArtDirectedFillImageProps) {
  const fitStyle: CSSProperties = {
    objectFit,
    ...(objectPosition ? { objectPosition } : {}),
  };

  const imgClassName = ["absolute inset-0 h-full w-full", className]
    .filter(Boolean)
    .join(" ");

  const {
    props: { srcSet: desktopSrcSet, style: desktopStyle, ...desktop },
  } = getImageProps({
    src,
    alt,
    fill: true,
    sizes,
    priority,
  });

  if (!mobileSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- from getImageProps
      <img
        {...desktop}
        srcSet={desktopSrcSet}
        alt={alt}
        className={imgClassName}
        style={{ ...desktopStyle, ...fitStyle }}
      />
    );
  }

  const {
    props: { srcSet: mobileSrcSet, sizes: mobileSizes },
  } = getImageProps({
    src: mobileSrc,
    alt,
    fill: true,
    sizes,
    priority,
  });

  return (
    <picture className="absolute inset-0 block h-full w-full">
      <source
        media={`(max-width: ${ART_DIRECTION_MOBILE_MAX_PX}px)`}
        srcSet={mobileSrcSet}
        sizes={mobileSizes}
      />
      <img
        {...desktop}
        srcSet={desktopSrcSet}
        alt={alt}
        className={imgClassName}
        style={{ ...desktopStyle, ...fitStyle }}
      />
    </picture>
  );
}
