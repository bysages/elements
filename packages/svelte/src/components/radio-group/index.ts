import { RadioGroup as ArkRadioGroup } from "@ark-ui/svelte/radio-group";
import { injectComponentStyle } from "@bysages/core";

/** Ark's RadioGroup, dressed in the paper-and-ink system: a column of
 * full-circle seals that fill flat with primary ink when chosen, the dot
 * punched through as paper. The API is Ark's own — Root, Label, Item,
 * ItemText, ItemControl, Indicator, ItemHiddenInput. */
export const RadioGroup = ArkRadioGroup;

injectComponentStyle("radio-group");
