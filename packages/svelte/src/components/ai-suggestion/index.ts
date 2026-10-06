import { withSelfRoot } from "../../internal/family";
import AiSuggestionComponent from "./AiSuggestion.svelte";

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. */
export const AiSuggestion = withSelfRoot(AiSuggestionComponent);
export { AiSuggestion as Suggestion };

export type { SuggestionProps } from "./props";
