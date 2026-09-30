import type { HTMLAttributes } from "svelte/elements";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the field. */
  value?: string | number;
  size?: "sm" | "md" | "lg";
  /** Standing alone this styles the control invalid; inside a Field
   * the context's invalid state joins in. */
  invalid?: boolean;
  /** Entry mask - `9` digit, `a` letter, `*` either, anything else is
   * literal. e.g. `"999-99-9999"`, `"(999) 999-9999"`. */
  mask?: string;
}
