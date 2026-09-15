import { Checkbox as ArkCheckbox } from "@ark-ui/vue/checkbox";
import { injectComponentStyle } from "@bysages/core";

/** Checkbox, dressed in the paper-and-ink system: a square-cut seal
 * that fills flat with primary ink when ticked, the mark springing into
 * place. The parts — Root, Label, Control, Indicator,
 * HiddenInput. */
export const Checkbox = ArkCheckbox;

injectComponentStyle("checkbox");
