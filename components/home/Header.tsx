const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex max-w-[100rem] items-center justify-between px-6 py-8 sm:px-12 sm:py-10 lg:px-16">
        <a
          href="#"
          className="text-sm font-medium tracking-tight text-foreground"
        >
          Haseeb Riaz
        </a>

        <nav className="flex items-center gap-8 sm:gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
