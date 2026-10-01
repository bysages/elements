import AiResponseComponent from "./AiResponse.svelte";

/** Markdown set on the paper — streaming-safe by construction. */
export const AiResponse = AiResponseComponent;
export { AiResponse as Response };

export type { ResponseProps } from "./props";
