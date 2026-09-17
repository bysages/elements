import { injectComponentStyle } from "@bysages/core";

import TextareaComponent from "./Textarea.svelte";

/** The bare multi-line input, dressed in the field recipe: border,
 * surface, focus halo — no shadow. Inside a Field.Root it picks up the
 * label wiring and the invalid state from the context. */
export const Textarea = TextareaComponent;

export type { TextareaProps } from "./props";

injectComponentStyle("textarea");
