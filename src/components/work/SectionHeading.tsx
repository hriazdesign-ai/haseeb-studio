type SectionHeadingProps = {
  number: string;
  title: string;
  id?: string;
};

/** Numbered section heading used on the Work page (01 / 02). */
export function SectionHeading({ number, title, id }: SectionHeadingProps) {
  return (
    <header className="flex max-w-[35.25rem] flex-col gap-3">
      <p className="type-label uppercase tracking-[0.02em]">{number}</p>
      <h2 id={id} className="type-display type-accent">
        {title}
      </h2>
    </header>
  );
}
