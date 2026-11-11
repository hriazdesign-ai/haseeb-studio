import type { Metadata } from "next";
import { CaseStudyThemeProvider } from "@/components/case-study/CaseStudyThemeProvider";
import { BlocksContactSection } from "@/components/home-parallax/BlocksContactSection";
import { PrototypeFooter } from "@/components/home-parallax/PrototypeFooter";
import { PageShell } from "@/components/layout/PageShell";
import { VersoView } from "@/components/verso/VersoView";
import { versoCaseStudy } from "@/lib/case-studies/verso";
import "@/components/home-parallax/home-parallax.css";

const study = versoCaseStudy;

export const metadata: Metadata = {
  title: `${study.name} · Haseeb Riaz Studio`,
  description: study.title,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

/**
 * Standalone Verso Design System page for direct sharing.
 * Intentionally omitted from homepage, Work, nav links and project listings.
 */
export default function VersoPage() {
  const chrome = study.chrome ?? "dark";
  const isLightChrome = chrome === "light";

  return (
    <CaseStudyThemeProvider theme={study.theme} chrome={chrome}>
      <PageShell
        fullWidth
        unpadded
        className={
          isLightChrome
            ? "verso-page case-study-page case-study-page--light home-parallax-page home-parallax-page--blocks"
            : "verso-page case-study-page"
        }
      >
        <VersoView study={study} />
        {isLightChrome ? (
          <>
            <BlocksContactSection />
            <PrototypeFooter alignWithChrome />
          </>
        ) : (
          <div className="container" aria-hidden="true">
            <hr className="m-0 h-px w-full border-0 bg-border" />
          </div>
        )}
      </PageShell>
    </CaseStudyThemeProvider>
  );
}
