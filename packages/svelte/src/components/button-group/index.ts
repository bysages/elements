import { injectComponentStyle } from "@bysages/core";

import ButtonGroupComponent from "./ButtonGroup.svelte";

/** Buttons fused into one control: the group owns only the joinery, so
 * members keep every variant they were given. */
export const ButtonGroup = ButtonGroupComponent;

export type { ButtonGroupProps } from "./props";

injectComponentStyle("button-group");
