import { PinInput as ArkPinInput } from "@ark-ui/svelte/pin-input";
import { injectComponentStyle } from "@bysages/core";

/** Ark's PinInput, dressed in the paper-and-ink system: one character per
 * square-cut seal, centered ink in tabular figures. The API is Ark's own —
 * Root, Label, Control, Input, HiddenInput. */
export const PinInput = ArkPinInput;

injectComponentStyle("pin-input");
