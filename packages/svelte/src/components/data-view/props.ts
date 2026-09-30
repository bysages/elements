import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface DataViewProps extends HTMLAttributes<HTMLDivElement> {
  items: unknown[];
  /** Ledger rows or a lattice of cards. */
  layout?: "list" | "grid";
  /** Records per page; leave unset to show everything at once. */
  pageSize?: number;
  /** Renders one record; the view lays the returned nodes out. */
  renderItem?: Snippet<[unknown, number]>;
  header?: Snippet;
}
