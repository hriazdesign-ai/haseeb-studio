import type { Metadata } from "next";
import { CaseStudyThemeProvider } from "@/components/case-study/CaseStudyThemeProvider";
import { BlocksContactSection } from "@/components/home-parallax/BlocksContactSection";
import { PrototypeFooter } from "@/components/home-parallax/PrototypeFooter";
import { PageShell } from "@/components/layout/PageShell";
import { RtlLocalisationView } from "@/components/rtl-localisation/RtlLocalisationView";
import { rtlLocalisationCaseStudy } from "@/lib/case-studies/rtl-localisation";
import "@/components/home-parallax/home-parallax.css";

const study = rtlLocalisationCaseStudy;

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
 * Standalone Arabic RTL & Localisation page for direct sharing.
 * Intentionally omitted from homepage, Work, nav links and project listings.
 */
export default function RtlLocalisationPage() {
  const chrome = study.chrome ?? "dark";
  const isLightChrome = chrome === "light";

  return (
    <CaseStudyThemeProvider theme={study.theme} chrome={chrome}>
      <PageShell
        fullWidth
        unpadded
        className={
          isLightChrome
            ? "rtl-localisation-page case-study-page case-study-page--light home-parallax-page home-parallax-page--blocks"
            : "rtl-localisation-page case-study-page"
        }
      >
        <RtlLocalisationView study={study} />
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
