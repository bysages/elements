import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

export interface LinkProps extends HTMLAnchorAttributes {
  underline?: "always" | "hover" | "none";
  children?: Snippet;
}
