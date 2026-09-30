import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface VirtualListProps extends HTMLAttributes<HTMLDivElement> {
  items: unknown[];
  /** The height every row occupies — fixed rows keep it simple. */
  itemHeight?: number;
  /** The viewport height the ledger scrolls within. */
  height?: number | string;
  /** Renders one record into its positioned row. */
  renderItem?: Snippet<[unknown, number]>;
}
