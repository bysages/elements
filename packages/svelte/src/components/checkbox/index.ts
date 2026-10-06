/** Ark's Checkbox, dressed in the paper-and-ink system: a square-cut seal
 * that fills flat with primary ink when ticked, the mark springing into
 * place. The API is Ark's own — Root, Label, Control, Indicator,
 * HiddenInput. */
import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";

import { defineFamily } from "../../internal/family";
import CheckboxFacade from "./Checkbox.svelte";
import CheckboxRoot from "./CheckboxRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Checkbox: typeof CheckboxFacade &
  Omit<typeof ArkCheckbox, "Root"> & {
    Root: typeof CheckboxRoot;
  } = defineFamily(CheckboxFacade, {
  ...ArkCheckbox,
  Root: CheckboxRoot,
});
