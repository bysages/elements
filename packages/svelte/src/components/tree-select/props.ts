import type { HTMLAttributes } from "svelte/elements";

export interface TreeSelectNode {
  label: string;
  value: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

export interface TreeSelectProps extends HTMLAttributes<HTMLButtonElement> {
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the chosen leaf. */
  value?: string;
  data: TreeSelectNode[];
  placeholder?: string;
  disabled?: boolean;
}
