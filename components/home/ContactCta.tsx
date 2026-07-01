export default function ContactCta() {
  return (
    <section id="contact" className="bg-background">
      <div className="mx-auto max-w-[100rem] px-6 pb-32 pt-32 sm:px-12 sm:pb-40 sm:pt-40 lg:px-16 lg:pb-52 lg:pt-52">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            Have a website that needs to earn more trust?
          </h2>

          <a
            href="mailto:hello@haseebriaz.com"
            className="mt-12 inline-block text-base text-muted transition-colors hover:text-foreground sm:mt-16"
          >
            Start a conversation →
          </a>
        </div>
      </div>
    </section>
  );
}
