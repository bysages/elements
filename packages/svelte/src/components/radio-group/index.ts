/** Ark's RadioGroup, dressed in the paper-and-ink system: a column of
 * full-circle seals that fill flat with primary ink when chosen, the dot
 * punched through as paper. The API is Ark's own — Root, Label, Item,
 * ItemText, ItemControl, Indicator, ItemHiddenInput. */
import { RadioGroup as ArkRadioGroup } from "@ark-ui/svelte/radio-group";
import { injectComponentStyle } from "@bysages/core";

import RadioGroupRoot from "./RadioGroupRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RadioGroup: Omit<typeof ArkRadioGroup, "Root"> & { Root: typeof RadioGroupRoot } = {
  ...ArkRadioGroup,
  Root: RadioGroupRoot,
};

injectComponentStyle("radio-group");
