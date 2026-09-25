import type { HTMLAttributes } from "svelte/elements";

export interface CascadeSelectNode {
  label: string;
  value: string;
  children?: CascadeSelectNode[];
  disabled?: boolean;
}

export interface CascadeSelectProps extends HTMLAttributes<HTMLDivElement> {
  /** Two-way bindable — `bind:value` keeps the selected path (or paths,
   * when `multiple`) in the bound variable. */
  value?: string[][];
  data: CascadeSelectNode[];
  placeholder?: string;
  /** `"hover"` turns the classic cascading menu: pointing is enough to
   * unfold. */
  highlightTrigger?: "click" | "hover";
  /** Flattens the corridor into matching routes while a query runs —
   * each hit still reads as its full path. */
  filterable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
}
