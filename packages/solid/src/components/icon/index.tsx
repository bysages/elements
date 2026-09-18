import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring the glyph; it ships no set. */
export interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
}

export function Icon(props: IconProps) {
  const [own, rest] = splitProps(props, ["size", "label"]);
  return (
    <span
      {...rest}
      role={own.label != null ? "img" : undefined}
      aria-label={own.label}
      aria-hidden={own.label != null ? undefined : "true"}
      data-scope="icon"
      data-part="root"
      data-size={own.size ?? "inherit"}
    />
  );
}

injectComponentStyle("icon");
