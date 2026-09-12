import { Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The API is Ark's own — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
export const Combobox = ArkCombobox;

injectComponentStyle("combobox");
