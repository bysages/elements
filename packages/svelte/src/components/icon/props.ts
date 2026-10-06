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
  /** An `@bysages/icons` export or any IconifyIcon. Ignored when children are given — a
   * glyph always wins over a name. */
  glyph?: IconifyIcon;
  /** A built-in name from the curated core registry. Ignored when `glyph` or children are given. */
  name?: string;
  children?: Snippet;
}
