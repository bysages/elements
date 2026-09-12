import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Checkbox, dressed in the paper-and-ink system: a square-cut seal
 * that fills flat with primary ink when ticked, the mark springing into
 * place. The API is Ark's own — Root, Label, Control, Indicator,
 * HiddenInput. */
export const Checkbox = ArkCheckbox;

injectComponentStyle("checkbox");
