import Link from "next/link";
import { BlocksContactSection } from "@/components/home-parallax/BlocksContactSection";
import { BlocksIntroSection } from "@/components/home-parallax/BlocksIntroSection";
import { BlocksWorkSection } from "@/components/home-parallax/BlocksWorkSection";
import { FeaturedProject } from "@/components/home-parallax/FeaturedProject";
import { PrototypeContactSection } from "@/components/home-parallax/PrototypeContactSection";
import { PrototypeFooter } from "@/components/home-parallax/PrototypeFooter";
import { PrototypeHeader } from "@/components/home-parallax/PrototypeHeader";
import {
  homeParallaxProjects,
  type HomeParallaxMotionMode,
} from "@/lib/home-parallax";
import "./home-parallax.css";

const [mumsUnited, brightPath, meridian] = homeParallaxProjects;

type HomeParallaxPrototypeProps = {
  /**
   * `image` — Test A (`/home-parallax`, default).
   * `block` — Test B (`/home-parallax-blocks`).
   */
  motionMode?: HomeParallaxMotionMode;
};

/**
 * Isolated redesigned-homepage prototype for parallax testing.
 * `motionMode="block"` is the approved homepage (also rendered at `/`).
 * Default `motionMode="image"` keeps `/home-parallax` behaviour unchanged.
 */
export function HomeParallaxPrototype({
  motionMode = "image",
}: HomeParallaxPrototypeProps) {
  const isBlockMode = motionMode === "block";

  return (
    <div
      className={[
        "home-parallax-page",
        isBlockMode ? "home-parallax-page--blocks" : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/*
       * Test A keeps the static PrototypeHeader.
       * Test B uses the shared SiteHeader from the root layout
       * (unhidden via CSS) so scroll-hide / mobile menu / underlines match.
       */}
      {isBlockMode ? null : <PrototypeHeader />}

      <main>
        <section
          className={isBlockMode ? "hp-hero home-hero" : "hp-hero"}
          aria-labelledby="hp-hero-heading"
        >
          {isBlockMode ? (
            <div className="prototype-page-container">
              <div className="portfolio-grid portfolio-hero-grid">
                <div className="portfolio-hero-title-wrap">
                  <h1 id="hp-hero-heading" className="hp-hero__title">
                    Bringing clarity to complex digital products.
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <h1 id="hp-hero-heading" className="hp-hero__title">
              Bringing clarity to complex digital products.
            </h1>
          )}
        </section>

        {isBlockMode ? (
          <>
            <BlocksWorkSection
              mumsUnited={mumsUnited}
              brightPath={brightPath}
              meridian={meridian}
            />
            <BlocksIntroSection />
            <BlocksContactSection />
          </>
        ) : (
          <>
            <section className="hp-work" aria-label="Selected work">
              <FeaturedProject project={mumsUnited} priority />

              <div className="hp-work__pair">
                <FeaturedProject project={brightPath} />
                <FeaturedProject project={meridian} />
              </div>

              <div className="hp-work__cta-wrap">
                <Link href="/work" className="hp-work__cta">
                  Browse all work →
                </Link>
              </div>
            </section>

            <section className="hp-intro" aria-labelledby="hp-intro-heading">
              <h2 id="hp-intro-heading" className="hp-intro__quote">
              Transforming complexity into intuitive experiences.
              </h2>
              <div className="hp-intro__copy">
                <p>
                  I’m a Senior Product Designer with more than twenty years of
                  experience designing products, design systems and editorial
                  platforms.
                </p>
                <p>
                  After sixteen years at Condé Nast, I now work independently,
                  helping organisations simplify complex products through
                  thoughtful design.
                </p>
              </div>
            </section>

            <PrototypeContactSection />
          </>
        )}
      </main>

      <PrototypeFooter alignWithChrome={isBlockMode} />
    </div>
  );
}
