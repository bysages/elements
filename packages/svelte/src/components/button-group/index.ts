import { withSelfRoot } from "../../internal/family";
import ButtonGroupComponent from "./ButtonGroup.svelte";

/** Buttons fused into one control: the group owns only the joinery, so
 * members keep every variant they were given. */
export const ButtonGroup = withSelfRoot(ButtonGroupComponent);

export type { ButtonGroupProps } from "./props";
