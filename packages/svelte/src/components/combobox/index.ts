/** Ark's Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The API is Ark's own — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
import { Combobox as ArkCombobox } from "@ark-ui/svelte/combobox";

import { defineFamily } from "../../internal/family";
import ComboboxFacade from "./Combobox.svelte";
import ComboboxRoot from "./ComboboxRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Combobox: typeof ComboboxFacade &
  Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot } = defineFamily(ComboboxFacade, {
  ...ArkCombobox,
  Root: ComboboxRoot,
});
