import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface CommentProps extends HTMLAttributes<HTMLElement> {
  author?: string;
  datetime?: string;
  /** The portrait hanging left. */
  avatar?: Snippet;
  /** The row of answers beneath the ink. */
  actions?: Snippet;
  children?: Snippet;
}
