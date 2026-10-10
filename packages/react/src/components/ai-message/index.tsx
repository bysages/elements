import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export interface MessageProps extends HTMLAttributes<HTMLElement> {
  role?: "user" | "assistant" | "system";
  children?: ReactNode;
}

function MessageImpl({ role = "assistant", children, ...rest }: MessageProps) {
  injectComponentStyle("ai");
  return (
    <article {...rest} data-scope="ai" data-part="message" data-role={role}>
      {children}
    </article>
  );
}

export const Message = withSelfRoot(MessageImpl);
export { Message as AiMessage };
