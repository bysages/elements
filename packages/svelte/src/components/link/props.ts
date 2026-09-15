import type { HTMLAnchorAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface LinkProps extends HTMLAnchorAttributes {
  underline?: "always" | "hover" | "none";
  children?: Snippet;
}
