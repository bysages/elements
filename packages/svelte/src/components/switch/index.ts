/** Ark's Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The API is Ark's own — Root, Label,
 * Control, Thumb, HiddenInput. */
import { Switch as ArkSwitch } from "@ark-ui/svelte/switch";

import { defineFamily } from "../../internal/family";
import SwitchFacade from "./Switch.svelte";
import SwitchRoot from "./SwitchRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Switch: typeof SwitchFacade &
  Omit<typeof ArkSwitch, "Root"> & {
    Root: typeof SwitchRoot;
  } = defineFamily(SwitchFacade, {
  ...ArkSwitch,
  Root: SwitchRoot,
});
