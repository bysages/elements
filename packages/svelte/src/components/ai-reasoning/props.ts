import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ReasoningProps extends HTMLAttributes<HTMLDivElement> {
  /** The trigger's words — the fold arrives open under them. */
  label?: string;
  children?: Snippet;
}
