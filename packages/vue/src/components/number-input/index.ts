import { NumberInput as ArkNumberInput } from "@ark-ui/vue/number-input";
import { injectComponentStyle } from "@bysages/core";

/** NumberInput, dressed in the paper-and-ink system: the stepper
 * rides inside the field as one seal split by a hairline, numbers set in
 * tabular figures. The parts — Root, Label, Control, Input,
 * ValueText, IncrementTrigger, DecrementTrigger, Scrubber. */
export const NumberInput = ArkNumberInput;

injectComponentStyle("number-input");
