/** Ark's Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The API is Ark's own — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
import { Select as ArkSelect } from "@ark-ui/svelte/select";

import { defineFamily, withSelfRoot } from "../../internal/family";
import SelectFacade from "./Select.svelte";
import SelectRoot from "./SelectRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Select: typeof SelectFacade &
  Omit<typeof ArkSelect, "Root"> & { Root: typeof SelectRoot } = defineFamily(SelectFacade, {
  ...ArkSelect,
  Root: SelectRoot,
});

import NativeSelectComponent from "./NativeSelect.svelte";

/** The platform's own list wearing the control recipe. */
export const NativeSelect = withSelfRoot(NativeSelectComponent);

export type { NativeSelectProps, NativeSelectOption } from "./native-props";
