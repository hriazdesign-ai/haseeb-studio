"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

/** Two-line glyph shared by the mobile menu and lightbox close control. */
export function MenuToggleIcon() {
  return (
    <span className="menu-toggle__icon" aria-hidden="true">
      <span className="menu-toggle__line menu-toggle__line--top" />
      <span className="menu-toggle__line menu-toggle__line--bottom" />
    </span>
  );
}

type MenuToggleButtonProps = {
  /** When true, lines morph to the X close state. */
  open: boolean;
  /**
   * Always show the X glyph without `aria-expanded` (lightbox).
   * Mobile menu omits this and uses `aria-expanded={open}` instead.
   */
  closeGlyph?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children" | "aria-expanded"
>;

/**
 * Shared hamburger / close control used by SiteHeader mobile nav and
 * the case-study image lightbox.
 */
export const MenuToggleButton = forwardRef<
  HTMLButtonElement,
  MenuToggleButtonProps
>(function MenuToggleButton(
  { open, closeGlyph = false, className, ...rest },
  ref,
) {
  const showClose = closeGlyph || open;

  return (
    <button
      ref={ref}
      type="button"
      className={["menu-toggle", showClose ? "menu-toggle--close" : null, className]
        .filter(Boolean)
        .join(" ")}
      {...(closeGlyph ? {} : { "aria-expanded": open })}
      {...rest}
    >
      <MenuToggleIcon />
    </button>
  );
});
