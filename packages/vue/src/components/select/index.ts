import { Select as ArkSelect } from "@ark-ui/vue/select";
import { injectComponentStyle } from "@bysages/core";

/** Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The parts — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
export const Select = ArkSelect;

injectComponentStyle("select");
