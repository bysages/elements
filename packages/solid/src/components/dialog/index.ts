import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { injectComponentStyle } from "@bysages/core";

export type { DialogOpenChangeDetails } from "@ark-ui/solid/dialog";

/** Ark's Dialog, dressed in the paper-and-ink system. The API is Ark's
 * own — Root, Trigger, Backdrop, Positioner, Content, Title, Description,
 * CloseTrigger. */
export const Dialog = ArkDialog;

injectComponentStyle("dialog");
