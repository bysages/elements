import { Timer as ArkTimer } from "@ark-ui/svelte/timer";

import { defineFamily } from "../../internal/family";
import TimerFacade from "./Timer.svelte";
import TimerRoot from "./TimerRoot.svelte";

/** Ark's Timer, dressed in the paper-and-ink system: monospaced digits
 * that never jitter, quiet action triggers on the control recipe. The API
 * is Ark's own — Root, Area, Control, Item, Separator, ActionTrigger,
 * Context. Unit labels are plain content, not a machine part. */
export const Timer: typeof TimerFacade &
  Omit<typeof ArkTimer, "Root"> & {
    Root: typeof TimerRoot;
  } = defineFamily(TimerFacade, {
  ...ArkTimer,
  Root: TimerRoot,
});
