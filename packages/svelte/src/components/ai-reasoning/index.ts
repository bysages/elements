import { withSelfRoot } from "../../internal/family";
import AiReasoningComponent from "./AiReasoning.svelte";

/** The model's thought, folded by the shared collapsible in its quiet
 * register. */
export const AiReasoning = withSelfRoot(AiReasoningComponent);
export { AiReasoning as Reasoning };

export type { ReasoningProps } from "./props";
