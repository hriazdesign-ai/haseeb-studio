import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  const mainClassName = ["section", "flex-1", className]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={mainClassName}>
      <div className="container">{children}</div>
    </main>
  );
}
