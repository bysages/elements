import { withSelfRoot } from "../../internal/family";
import AiMessageSvelte from "./AiMessage.svelte";
import type { AiMessageComponent } from "./props";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export const AiMessage = withSelfRoot(AiMessageSvelte as unknown as AiMessageComponent);
export { AiMessage as Message };

export type { AiMessageComponent, MessageProps, MessageRole } from "./props";
