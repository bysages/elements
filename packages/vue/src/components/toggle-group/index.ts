import { ToggleGroup as ArkToggleGroup } from "@ark-ui/vue/toggle-group";
import { injectComponentStyle } from "@bysages/core";

/** ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The parts — Root, Item. */
export const ToggleGroup = ArkToggleGroup;

injectComponentStyle("toggle-group");
