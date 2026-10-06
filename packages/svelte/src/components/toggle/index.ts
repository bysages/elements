import { Toggle as ArkToggle } from "@ark-ui/svelte/toggle";

import { defineFamily } from "../../internal/family";
import ToggleFacade from "./Toggle.svelte";
import ToggleRoot from "./ToggleRoot.svelte";

/** Ark's Toggle, dressed in the paper-and-ink system: a standalone seal that
 * settles into the flat ink fill while pressed on. The API is Ark's own —
 * Root, Indicator. */
export const Toggle: typeof ToggleFacade &
  Omit<typeof ArkToggle, "Root"> & {
    Root: typeof ToggleRoot;
  } = defineFamily(ToggleFacade, {
  ...ArkToggle,
  Root: ToggleRoot,
});
