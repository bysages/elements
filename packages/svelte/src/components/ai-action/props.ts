import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** What the button does, spoken to assistive tech and shown as the
   * hover title — copy, retry, thumbs. */
  label: string;
  children?: Snippet;
}
