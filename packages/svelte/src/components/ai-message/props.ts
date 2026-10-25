import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

import type { AiSdkMessage } from "../ai";

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps<
  MESSAGE extends AiSdkMessage = AiSdkMessage,
> extends HTMLAttributes<HTMLElement> {
  /** Whose stroke this is — the user's words sit in a recessed
   * bubble, the assistant speaks flat on the paper. */
  role?: MessageRole;
  /** The AI SDK message; its id and role become the article identity. */
  message?: MESSAGE;
  children?: Snippet;
}

export interface AiMessageComponent {
  <MESSAGE extends AiSdkMessage>(
    internals: import("svelte").ComponentInternals,
    props: MessageProps<MESSAGE>,
  ): Record<string, never>;
  element?: typeof HTMLElement;
}
