import type { CheckboxGroupProps as ArkCheckboxGroupProps } from "@ark-ui/svelte/checkbox";
import type { Snippet } from "svelte";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<ArkCheckboxGroupProps, "children"> {
  /** Two-way bindable — `bind:value` keeps the bound array mirroring
   * the group; leave it unset and Ark owns the initial state. */
  value?: string[];
  options: CheckboxOption[];
  layout?: "vertical" | "horizontal";
  /** One rung of the control-height ladder for every box. */
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  children?: Snippet;
}
