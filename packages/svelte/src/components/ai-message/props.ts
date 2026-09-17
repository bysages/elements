import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps extends HTMLAttributes<HTMLElement> {
  /** Whose stroke this is — the user's words sit in a recessed
   * bubble, the assistant speaks flat on the paper. */
  role?: MessageRole;
  children?: Snippet;
}
