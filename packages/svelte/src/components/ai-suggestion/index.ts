import { injectComponentStyle } from "@bysages/core";

import AiSuggestionComponent from "./AiSuggestion.svelte";

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. */
export const AiSuggestion = AiSuggestionComponent;

export type { SuggestionProps } from "./props";

injectComponentStyle("ai");
