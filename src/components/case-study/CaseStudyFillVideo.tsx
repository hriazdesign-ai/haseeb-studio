"use client";

import { useReducedMotion } from "framer-motion";
import { ArtDirectedFillImage } from "@/components/case-study/ArtDirectedFillImage";

type CaseStudyFillVideoProps = {
  src: string;
  videoSrc: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
};

/**
 * Framed fill media: autoplaying muted loop when motion is allowed;
 * otherwise the static `src` image in the same fill frame.
 */
export function CaseStudyFillVideo({
  src,
  videoSrc,
  alt,
  sizes,
  priority = false,
  objectFit = "cover",
}: CaseStudyFillVideoProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <ArtDirectedFillImage
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        objectFit={objectFit}
      />
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full"
      style={{ objectFit }}
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
      // Decorative loop — caption/alt live on the surrounding figure.
      aria-label={alt}
      disablePictureInPicture
      disableRemotePlayback
    />
  );
}
