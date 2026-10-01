import AiActionComponent from "./AiAction.svelte";

/** A quiet icon button — copy, retry, thumbs. The control is the
 * shared Button in its ghost register. */
export const AiAction = AiActionComponent;
export { AiAction as Action };

export type { ActionProps } from "./props";
