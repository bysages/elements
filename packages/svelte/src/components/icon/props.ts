import type { IconifyIcon } from "@bysages/core/icons";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
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
  children?: Snippet;
}
