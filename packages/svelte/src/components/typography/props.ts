import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface TypographyPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface TypographyHeadingProps extends HTMLAttributes<HTMLElement> {
  /** One rung of the prose-size ladder. */
  size?: "sm" | "md" | "lg" | "xl" | "display";
  /** The document's own semantic heading element. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | (string & {});
  children?: Snippet;
}
