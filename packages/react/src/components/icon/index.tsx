import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring the glyph; it ships no set. */
export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
}

export function Icon({ size = "inherit", label, children, ...rest }: IconProps) {
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
      {children}
    </span>
  );
}

injectComponentStyle("icon");
