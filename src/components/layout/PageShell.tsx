import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  /**
   * When true, children render edge-to-edge and manage their own gutters.
   * Use for frames that already include Figma-aligned horizontal padding.
   */
  fullWidth?: boolean;
  /** Omit default vertical section padding when the page manages its own rhythm. */
  unpadded?: boolean;
};

export function PageShell({
  children,
  className,
  fullWidth = false,
  unpadded = false,
}: PageShellProps) {
  const mainClassName = [
    unpadded ? null : "section",
    "flex-1",
    "w-full",
    "min-w-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={mainClassName}>
      {fullWidth ? children : <div className="container">{children}</div>}
    </main>
  );
}
