import { Drawer as ArkDrawer } from "@ark-ui/vue/drawer";
import { injectComponentStyle } from "@bysages/core";

/** Drawer, dressed in the paper-and-ink system: a full-height sheet
 * cut flush to the edge it rises from, sliding on the machine's translate
 * under the grabber's hand. The parts — Root, Trigger,
 * Backdrop, Positioner, Content, Grabber, GrabberIndicator, Title,
 * Description, CloseTrigger, SwipeArea. */
export const Drawer = ArkDrawer;

injectComponentStyle("drawer");
