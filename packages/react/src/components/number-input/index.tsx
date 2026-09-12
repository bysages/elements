import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input";
import { injectComponentStyle } from "@bysages/core";

/** Ark's NumberInput, dressed in the paper-and-ink system: the stepper
 * rides inside the field as one seal split by a hairline, numbers set in
 * tabular figures. The API is Ark's own — Root, Label, Control, Input,
 * ValueText, IncrementTrigger, DecrementTrigger, Scrubber. */
export const NumberInput = ArkNumberInput;

injectComponentStyle("number-input");
