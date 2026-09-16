import { injectComponentStyle } from "@bysages/core";

import ButtonComponent from "./Button.svelte";

/** The control recipe as a standalone button: the variant chooses how it
 * rests, the tone chooses the pigment. Ink is the solemn default; any
 * action can carry the primary weight. */
export const Button = ButtonComponent;

export type { ButtonProps } from "./props";

injectComponentStyle("button");
