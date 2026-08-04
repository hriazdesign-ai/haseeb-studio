import type { CaseStudy } from "@/lib/case-studies";
import "@/components/work-motion/work-motion.css";

type CaseStudyHeroHeadingProps = {
  study: CaseStudy;
};

/**
 * Portfolio case-study heading (label / title / meta).
 * Title placement via shared `.portfolio-hero-title-wrap`
 * (`grid-area: 2 / 1 / auto / 9` by default).
 */
export function CaseStudyHeroHeading({ study }: CaseStudyHeroHeadingProps) {
  return (
    <div className="case-study-hero__header">
      <div className="portfolio-grid portfolio-hero-grid case-study-hero__grid">
        <p className="case-study-hero__label work-motion-hero__label portfolio-hero-label">
          {study.name}
        </p>

        <div className="case-study-hero__copy portfolio-hero-title-wrap">
          <h1 className="case-study-hero__title hp-hero__title">{study.title}</h1>
        </div>

        <aside className="case-study-hero__meta" aria-label="Project details">
          <dl className="case-study-hero__meta-list m-0">
            {study.meta.map((group) => (
              <div key={group.label} className="case-study-hero__meta-group">
                <dt className="case-study-hero__meta-key">{group.label}</dt>
                {group.values.map((value) => (
                  <dd key={value} className="case-study-hero__meta-value">
                    {group.label === "Focus:" || group.label === "Platform:"
                      ? `· ${value}`
                      : value}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
