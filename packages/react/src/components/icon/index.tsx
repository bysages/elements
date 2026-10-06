import { injectComponentStyle } from "@bysages/core";
import { getIcon } from "@bysages/core/icons";
import type { IconifyIcon } from "@bysages/core/icons";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring an `@bysages/icons` export or any other
 * IconifyIcon through `glyph`, a built-in core-registry name through
 * `name`, or your own svg; the well renders either. */
export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
  /** An `@bysages/icons` export or any IconifyIcon. Ignored when children
   * are given — an explicit glyph always wins. */
  glyph?: IconifyIcon;
  /** A built-in name from the curated core registry. Ignored when `glyph` or children are given. */
  name?: string;
}

function IconImpl({ size = "inherit", label, glyph, name, children, ...rest }: IconProps) {
  injectComponentStyle("icon");
  const resolved = glyph ?? (name && children == null ? getIcon(name) : undefined);
  if (name && children == null && glyph == null && !resolved) {
    console.error(
      `[icons] unknown icon name "${name}" — not in the core default registry; pass it explicitly as glyph`,
    );
  }
  return (
    <span
      {...rest}
      role={label != null ? "img" : undefined}
      aria-label={label}
      aria-hidden={label != null ? undefined : "true"}
      data-scope="icon"
      data-part="root"
      data-size={size}
    >
      {children ??
        (resolved ? (
          <svg
            viewBox={`0 0 ${resolved.width ?? 24} ${resolved.height ?? 24}`}
            fill="currentColor"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: resolved.body }}
          />
        ) : null)}
    </span>
  );
}

export const Icon = withSelfRoot(IconImpl);
