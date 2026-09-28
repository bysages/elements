import { injectComponentStyle } from "@bysages/core";
import { getIcon } from "@bysages/icons";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring a glyph through `name` from the registry, or
 * bring your own; the well renders either. */
export interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
  /** A glyph from the registry. Ignored when children are given — an
   * explicit glyph always wins over the registry. */
  name?: string;
}

export function Icon(props: IconProps) {
  injectComponentStyle("icon");
  const [own, rest] = splitProps(props, ["size", "label", "name", "children"]);
  const glyph = own.name && own.children == null ? getIcon(own.name) : undefined;
  if (own.name && own.children == null && !glyph) {
    console.error(
      `[icons] unknown icon name "${own.name}" — extend packages/icons/icons.config.json and rerun the generator`,
    );
  }
  return (
    <span
      {...rest}
      role={own.label != null ? "img" : undefined}
      aria-label={own.label}
      aria-hidden={own.label != null ? undefined : "true"}
      data-scope="icon"
      data-part="root"
      data-size={own.size ?? "inherit"}
    >
      {own.children ??
        (glyph ? (
          <svg
            viewBox={`0 0 ${glyph.width ?? 24} ${glyph.height ?? 24}`}
            fill="currentColor"
            aria-hidden="true"
            innerHTML={glyph.body}
          />
        ) : null)}
    </span>
  );
}
