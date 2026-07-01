import Image from "next/image";

const projects = [
  {
    title: "Mums United",
    description:
      "Charity website for community support, youth mentoring and local impact.",
    image: "/images/charity-1.png",
    alt: "Mums United charity website",
  },
  {
    title: "Accountant Template",
    description:
      "Professional website system for accountants and advisory firms.",
    image: "/images/account-1.png",
    alt: "Accountant template website",
  },
  {
    title: "Education Template",
    description:
      "Website template for tutors, learning providers and education businesses.",
    image: "/images/education-1.png",
    alt: "Education template website",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="bg-background">
      <div className="mx-auto max-w-[100rem] px-6 sm:px-12 lg:px-16">
        <div className="space-y-32 sm:space-y-40 lg:space-y-52">
          {projects.map((project) => (
            <article key={project.title}>
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-3 text-base text-muted sm:text-lg">
                  {project.description}
                </p>
              </div>

              <div className="relative w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={2400}
                  height={1500}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1600px"
                  priority={project.title === "Mums United"}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
