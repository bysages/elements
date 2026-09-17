import type { HTMLAttributes } from "svelte/elements";

export interface DynamicInputProps extends HTMLAttributes<HTMLDivElement> {
  /** The rows' values; the group renders one Input per entry. Two-way
   * bindable — `bind:value` keeps the bound array mirroring the rows. */
  value?: string[];
  /** The fewest rows the group keeps; the remove seals yield first. */
  min?: number;
  /** The most rows the group grows to; the add control yields then. */
  max?: number;
  placeholder?: string;
  /** The add control's visible words. */
  addLabel?: string;
  disabled?: boolean;
  invalid?: boolean;
}
