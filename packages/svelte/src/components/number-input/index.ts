/** Ark's NumberInput, dressed in the paper-and-ink system: the stepper
 * rides inside the field as one seal split by a hairline, numbers set in
 * tabular figures. The API is Ark's own — Root, Label, Control, Input,
 * ValueText, IncrementTrigger, DecrementTrigger, Scrubber. */
import { NumberInput as ArkNumberInput } from "@ark-ui/svelte/number-input";
import { injectComponentStyle } from "@bysages/core";

import NumberInputRoot from "./NumberInputRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const NumberInput: Omit<typeof ArkNumberInput, "Root"> & { Root: typeof NumberInputRoot } = {
  ...ArkNumberInput,
  Root: NumberInputRoot,
};

injectComponentStyle("number-input");
