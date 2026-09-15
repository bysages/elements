import { Timer as ArkTimer } from "@ark-ui/vue/timer";
import { injectComponentStyle } from "@bysages/core";

/** Timer, dressed in the paper-and-ink system: monospaced digits
 * that never jitter, quiet action triggers on the control recipe. The parts — Root, Area, Control, Item, Separator, ActionTrigger,
 * Context. Unit labels are plain content, not a machine part. */
export const Timer = ArkTimer;

injectComponentStyle("timer");
