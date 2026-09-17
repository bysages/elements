import type { HTMLAttributes } from "svelte/elements";

export interface TransferItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TransferProps extends HTMLAttributes<HTMLDivElement> {
  /** Two-way bindable — `bind:value` keeps the bound list mirroring the
   * target column. */
  value?: string[];
  data: TransferItem[];
  titles?: string[];
  searchable?: boolean;
  disabled?: boolean;
}
