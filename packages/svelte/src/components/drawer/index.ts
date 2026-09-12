import { Drawer as ArkDrawer } from "@ark-ui/svelte/drawer";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Drawer, dressed in the paper-and-ink system: a full-height sheet
 * cut flush to the edge it rises from, sliding on the machine's translate
 * under the grabber's hand. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Grabber, GrabberIndicator, Title,
 * Description, CloseTrigger, SwipeArea. */
export const Drawer = ArkDrawer;

injectComponentStyle("drawer");
