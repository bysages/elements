import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";
import type { AiSdkMessage } from "../ai/parts";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. The message type follows the
 * application's AI SDK `UIMessage` contract. */
export interface MessageProps<
  MESSAGE extends AiSdkMessage = AiSdkMessage,
> extends HTMLAttributes<HTMLElement> {
  role?: "user" | "assistant" | "system";
  /** The AI SDK message; its id and role become the article identity. */
  message?: MESSAGE;
  children?: ReactNode;
}

function MessageImpl<MESSAGE extends AiSdkMessage>({
  message,
  role: roleProp,
  children,
  ...rest
}: MessageProps<MESSAGE>) {
  injectComponentStyle("ai");
  const role = message?.role ?? roleProp ?? "assistant";
  return (
    <article
      {...rest}
      data-scope="ai"
      data-part="message"
      {...(message ? { "data-message-id": message.id } : {})}
      data-role={role}
    >
      {children}
    </article>
  );
}

export const Message = withSelfRoot(MessageImpl);
export { Message as AiMessage };
