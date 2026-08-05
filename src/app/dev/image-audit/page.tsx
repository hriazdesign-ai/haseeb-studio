import { notFound } from "next/navigation";
import { buildImageAudit } from "@/lib/dev/image-audit";
import { ImageAuditClient } from "./ImageAuditClient";
import "./image-audit.css";

export const metadata = {
  title: "Image Manager · Dev",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Developer-only image management tool. Unavailable in production builds.
 */
export default function ImageAuditPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const audit = buildImageAudit();

  return (
    <ImageAuditClient entries={audit.entries} summary={audit.summary} />
  );
}
