/** Ark's ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The API is
 * Ark's own — Root, Item. */
import { ToggleGroup as ArkToggleGroup } from "@ark-ui/svelte/toggle-group";

import { defineFamily } from "../../internal/family";
import ToggleGroupFacade from "./ToggleGroup.svelte";
import ToggleGroupRoot from "./ToggleGroupRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const ToggleGroup: typeof ToggleGroupFacade &
  Omit<typeof ArkToggleGroup, "Root"> & {
    Root: typeof ToggleGroupRoot;
  } = defineFamily(ToggleGroupFacade, {
  ...ArkToggleGroup,
  Root: ToggleGroupRoot,
});
