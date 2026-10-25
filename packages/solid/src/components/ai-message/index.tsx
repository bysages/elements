import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import type { AiSdkMessage } from "../ai/parts";

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps<MESSAGE extends AiSdkMessage = AiSdkMessage> extends Omit<
  JSX.HTMLAttributes<HTMLElement>,
  "role"
> {
  /** Whose stroke this is — the user's words sit in a recessed
   * bubble, the assistant speaks flat on the paper. */
  role?: MessageRole;
  /** The AI SDK message; its id and role become the article identity. */
  message?: MESSAGE;
}

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export const Message = withSelfRoot(function Message(props: MessageProps) {
  injectComponentStyle("ai");
  const [own, rest] = splitProps(props, ["message", "role"]);
  const role = own.message?.role ?? own.role ?? "assistant";
  return (
    <article
      {...rest}
      data-scope="ai"
      data-part="message"
      data-message-id={own.message?.id}
      data-role={role}
    />
  );
});
export { Message as AiMessage };
