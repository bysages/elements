import { PinInput as ArkPinInput } from "@ark-ui/vue/pin-input";
import { injectComponentStyle } from "@bysages/core";

/** PinInput, dressed in the paper-and-ink system: one character per
 * square-cut seal, centered ink in tabular figures. The parts —
 * Root, Label, Control, Input, HiddenInput. */
export const PinInput = ArkPinInput;

injectComponentStyle("pin-input");
