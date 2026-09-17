import type { HTMLAttributes } from "svelte/elements";

export interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the field. */
  value?: string;
  /** Standing alone this styles the control invalid; inside a Field
   * the context's invalid state joins in. */
  invalid?: boolean;
}
