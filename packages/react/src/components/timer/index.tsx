import { Timer as ArkTimer } from "@ark-ui/react/timer";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Timer, dressed in the paper-and-ink system: monospaced digits
 * that never jitter, quiet action triggers on the control recipe. The API
 * is Ark's own — Root, Area, Control, Item, Separator, ActionTrigger,
 * Context. Unit labels are plain content, not a machine part. */
export const Timer = ArkTimer;

injectComponentStyle("timer");
