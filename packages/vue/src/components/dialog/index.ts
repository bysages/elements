import { Dialog as ArkDialog } from "@ark-ui/vue/dialog";
import { injectComponentStyle } from "@bysages/core";

export type { DialogOpenChangeDetails } from "@ark-ui/vue/dialog";

/** Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The parts — Root, Trigger,
 * Backdrop, Positioner, Content, Title, Description, CloseTrigger. */
export const Dialog = ArkDialog;

injectComponentStyle("dialog");
