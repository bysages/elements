import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react/toggle-group";
import { injectComponentStyle } from "@bysages/core";

/** Ark's ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The API is
 * Ark's own — Root, Item. */
export const ToggleGroup = ArkToggleGroup;

injectComponentStyle("toggle-group");
