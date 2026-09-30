import type { HTMLAttributes } from "svelte/elements";

export interface OrderOption {
  label: string;
  value: string;
}

export interface OrderListProps extends HTMLAttributes<HTMLDivElement> {
  /** Two-way bindable — the rows in their current order; the value is
   * the order. */
  value?: string[];
  /** Every row the ledger knows, in no particular order. */
  options: OrderOption[];
  label?: string;
}
