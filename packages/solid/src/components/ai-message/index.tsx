import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "role"> {
  /** Whose stroke this is — the user's words sit in a recessed
   * bubble, the assistant speaks flat on the paper. */
  role?: MessageRole;
}

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export function Message(props: MessageProps) {
  const [own, rest] = splitProps(props, ["role"]);
  return (
    <article {...rest} data-scope="ai" data-part="message" data-role={own.role ?? "assistant"} />
  );
}

injectComponentStyle("ai");

export { Message as AiMessage };
