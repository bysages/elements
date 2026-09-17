import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Two-way bindable — `bind:value` keeps the bound array mirroring
   * the group. */
  value?: string[];
  options: CheckboxOption[];
  layout?: "vertical" | "horizontal";
  disabled?: boolean;
  children?: Snippet;
}
