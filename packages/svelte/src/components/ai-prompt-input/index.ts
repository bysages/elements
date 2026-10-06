import { withSelfRoot } from "../../internal/family";
import AiPromptInputComponent from "./AiPromptInput.svelte";

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — over a footer row carrying the submit seal. */
export const AiPromptInput = withSelfRoot(AiPromptInputComponent);
export { AiPromptInput as PromptInput };

export type { PromptInputProps } from "./props";
