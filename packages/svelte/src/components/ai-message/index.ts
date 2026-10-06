import { withSelfRoot } from "../../internal/family";
import AiMessageComponent from "./AiMessage.svelte";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export const AiMessage = withSelfRoot(AiMessageComponent);
export { AiMessage as Message };

export type { MessageProps, MessageRole } from "./props";
