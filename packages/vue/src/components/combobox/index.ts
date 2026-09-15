import { Combobox as ArkCombobox } from "@ark-ui/vue/combobox";
import { injectComponentStyle } from "@bysages/core";

/** Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The parts — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
export const Combobox = ArkCombobox;

injectComponentStyle("combobox");
