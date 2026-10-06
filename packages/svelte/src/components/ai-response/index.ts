import { withSelfRoot } from "../../internal/family";
import AiResponseComponent from "./AiResponse.svelte";

/** Markdown set on the paper — streaming-safe by construction. */
export const AiResponse = withSelfRoot(AiResponseComponent);
export { AiResponse as Response };

export type { ResponseProps } from "./props";
