import { injectComponentStyle } from "@bysages/core";

import AiPromptInputComponent from "./AiPromptInput.svelte";

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — over a footer row carrying the submit seal. */
export const AiPromptInput = AiPromptInputComponent;

export type { PromptInputProps } from "./props";

injectComponentStyle("ai");
