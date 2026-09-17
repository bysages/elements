import { injectComponentStyle } from "@bysages/core";

import AiReasoningComponent from "./AiReasoning.svelte";

/** The model's thought, folded by the shared collapsible in its quiet
 * register. */
export const AiReasoning = AiReasoningComponent;

export type { ReasoningProps } from "./props";

injectComponentStyle("ai");
