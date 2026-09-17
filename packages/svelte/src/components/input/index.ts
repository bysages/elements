import { injectComponentStyle } from "@bysages/core";

import InputComponent from "./Input.svelte";

/** The bare text input, dressed in the field recipe: border, surface,
 * focus halo — no shadow. Inside a Field.Root it picks up the label
 * wiring and the invalid state from the context. */
export const Input = InputComponent;

export type { InputProps } from "./props";

injectComponentStyle("input");
