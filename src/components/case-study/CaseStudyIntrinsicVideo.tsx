"use client";

import { useReducedMotion } from "framer-motion";
import { ArtDirectedIntrinsicImage } from "@/components/case-study/ArtDirectedIntrinsicImage";
import type { CaseStudyImage } from "@/lib/case-studies";

type CaseStudyIntrinsicVideoProps = {
  image: CaseStudyImage;
  videoSrc: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Intrinsic (normal-flow) media for Large Features: autoplaying muted loop
 * when motion is allowed; otherwise the static `image.src` at the same width.
 * Same asset on desktop and mobile — no art-directed mobile swap.
 */
export function CaseStudyIntrinsicVideo({
  image,
  videoSrc,
  sizes,
  priority = false,
}: CaseStudyIntrinsicVideoProps) {
  const shouldReduceMotion = useReducedMotion();
  const stillIsRaster = !image.src.toLowerCase().endsWith(".webm");

  if (shouldReduceMotion && stillIsRaster) {
    return (
      <ArtDirectedIntrinsicImage
        image={image}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <video
      className="block h-auto w-full"
      width={image.width}
      height={image.height}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={image.alt}
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src={videoSrc} type="video/webm" />
    </video>
  );
}
