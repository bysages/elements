import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface DescriptionsRootProps extends HTMLAttributes<HTMLDListElement> {
  /** The horizontal layout reads as a table of two columns; the
   * vertical one stacks each pair for narrow measures. */
  layout?: "horizontal" | "vertical";
  /** The framed register: one hairline round the whole, terms on
   * inset paper. */
  bordered?: boolean;
  /** Pairs across the grid: one ledger per column. */
  column?: number;
  children?: Snippet;
}

export interface DescriptionsItemProps extends HTMLAttributes<HTMLElement> {
  /** Column pairs this entry stretches across. */
  span?: number;
  children?: Snippet;
}

export interface DescriptionsPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
