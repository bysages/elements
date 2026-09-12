import { Select as ArkSelect } from "@ark-ui/svelte/select";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The API is Ark's own — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
export const Select = ArkSelect;

injectComponentStyle("select");
