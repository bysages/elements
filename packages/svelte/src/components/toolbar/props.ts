import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name when more than one toolbar shares a page. */
  label?: string;
  /** Tools at the leading edge; `children` land here when no start is
   * given. */
  start?: Snippet;
  /** Tools at the trailing edge. */
  end?: Snippet;
  children?: Snippet;
}
