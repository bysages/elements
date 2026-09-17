import { injectComponentStyle } from "@bysages/core";

import AiResponseComponent from "./AiResponse.svelte";

/** Markdown set on the paper — streaming-safe by construction. */
export const AiResponse = AiResponseComponent;

export type { ResponseProps } from "./props";

injectComponentStyle("ai");
