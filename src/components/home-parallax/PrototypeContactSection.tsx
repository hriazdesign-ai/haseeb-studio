import { AnimatedArrow } from "@/components/motion/AnimatedArrow";
import { homeParallaxContact } from "@/lib/home-parallax";

type ContactItem = {
  label: string;
  href: string | null;
  /** When true, omitted from the visible list (implementation kept). */
  hidden?: boolean;
};

const items: ContactItem[] = [
  {
    label: "hriaz.design@gmail.com",
    href: homeParallaxContact.mailto,
  },
  {
    label: "LinkedIn",
    href: homeParallaxContact.linkedIn,
  },
  {
    label: "Instagram",
    href: homeParallaxContact.instagram,
    hidden: !homeParallaxContact.showInstagram,
  },
  {
    label: "Download CV",
    href: homeParallaxContact.cv,
  },
];

/**
 * Prototype-only contact section. Does not replace the shared ContactSection.
 */
export function PrototypeContactSection() {
  const visibleItems = items.filter((item) => !item.hidden);

  return (
    <section id="contact" className="hp-contact" aria-labelledby="hp-contact-heading">
      <h2 id="hp-contact-heading" className="hp-contact__title">
        Let’s build something thoughtful.
      </h2>

      <div className="hp-contact__body">
        <p className="hp-contact__copy">
          Whether you’re building a product, evolving a design system or creating
          a new digital experience, I’d love to hear about it.
        </p>
        <p className="hp-contact__label">Start a conversation:</p>

        <ul className="hp-contact__links">
          {visibleItems.map((item) => (
            <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : item.href.includes(".pdf")
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                  >
                    {item.label}{" "}
                    <AnimatedArrow kind="inline" />
                  </a>
                ) : (
                  <span aria-disabled="true" title="Link not available yet">
                    {item.label}{" "}
                    <AnimatedArrow kind="inline" />
                  </span>
                )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
