import { injectComponentStyle } from "@bysages/core";
import { getIcon } from "@bysages/core/icons";
import type { IconifyIcon } from "@bysages/core/icons";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring a glyph through `glyph` (a direct registry
 * import), through `name` from the whitelisted registry, or bring your
 * own; the well renders either. */
export interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
  /** A glyph from the registry, imported directly. Ignored when children
   * are given — an explicit glyph always wins. */
  glyph?: IconifyIcon;
  /** A registry name — only the whitelisted set the wrappers draw
   * themselves. Ignored when `glyph` or children are given. */
  name?: string;
}

export function Icon(props: IconProps) {
  injectComponentStyle("icon");
  const [own, rest] = splitProps(props, ["size", "label", "glyph", "name", "children"]);
  const resolved = own.glyph ?? (own.name && own.children == null ? getIcon(own.name) : undefined);
  if (own.name && own.children == null && own.glyph == null && !resolved) {
    console.error(
      `[icons] unknown icon name "${own.name}" — not in the wrappers' whitelist; import the glyph from @bysages/icons and pass it as glyph`,
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
        (resolved ? (
          <svg
            viewBox={`0 0 ${resolved.width ?? 24} ${resolved.height ?? 24}`}
            fill="currentColor"
            aria-hidden="true"
            innerHTML={resolved.body}
          />
        ) : null)}
    </span>
  );
}
