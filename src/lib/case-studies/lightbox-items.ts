import type { CaseStudy, CaseStudyImage } from "./types";

export type CaseStudyLightboxItem = {
  src: string;
  alt: string;
  videoSrc?: string;
};

function resolveVideoSrc(image: CaseStudyImage): string | undefined {
  if (image.videoSrc) return image.videoSrc;
  if (image.src.toLowerCase().endsWith(".webm")) return image.src;
  return undefined;
}

function toItem(image: CaseStudyImage): CaseStudyLightboxItem {
  return {
    src: image.src,
    alt: image.alt,
    videoSrc: resolveVideoSrc(image),
  };
}

function pushOne(
  items: CaseStudyLightboxItem[],
  image: CaseStudyImage | undefined,
) {
  if (image) items.push(toItem(image));
}

function pushPair(
  items: CaseStudyLightboxItem[],
  images: [CaseStudyImage, CaseStudyImage] | undefined,
) {
  if (!images) return;
  items.push(toItem(images[0]), toItem(images[1]));
}

/**
 * Eligible inline case-study media in article order.
 * Excludes the hero and full-bleed pull-quote imagery.
 */
export function getCaseStudyLightboxItems(
  study: CaseStudy,
): CaseStudyLightboxItem[] {
  const items: CaseStudyLightboxItem[] = [];

  if (study.bodyBlocks) {
    for (const block of study.bodyBlocks) {
      if (block.type === "gallery") pushPair(items, block.images);
      else if (block.type === "feature") pushOne(items, block.image);
    }
    return items;
  }

  const galleryBeforeChallenge = study.challengeGalleryPlacement === "before";
  const featurePlacement =
    study.featurePlacement ??
    (study.featureBeforeMidGallery ? "beforeMidGallery" : "afterMidGallery");

  if (galleryBeforeChallenge) pushPair(items, study.challengeGallery);
  if (featurePlacement === "beforeChallenge") pushOne(items, study.feature);
  if (!galleryBeforeChallenge) pushPair(items, study.challengeGallery);
  if (featurePlacement === "beforeMidGallery") pushOne(items, study.feature);
  pushPair(items, study.midGallery);
  if (featurePlacement === "afterMidGallery") pushOne(items, study.feature);
  pushPair(items, study.solutionGallery);
  pushOne(items, study.closingFeature);
  if (study.extension) {
    for (const image of study.extension.gallery) pushOne(items, image);
    for (const image of study.extension.features) pushOne(items, image);
  }
  pushPair(items, study.preResultGallery);
  pushOne(items, study.postResultFeature);

  return items;
}
