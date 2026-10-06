import { withSelfRoot } from "../../internal/family";
import DynamicInputComponent from "./DynamicInput.svelte";

/** A column of entry rows: one Input per line, each with a quiet remove
 * seal, and an add row at the tail — the bound array stays the only
 * truth. */
export const DynamicInput = withSelfRoot(DynamicInputComponent);

export type { DynamicInputProps } from "./props";
