import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { injectComponentStyle } from "@bysages/core";

export type { DialogOpenChangeDetails } from "@ark-ui/svelte/dialog";

/** Ark's Dialog, dressed in the paper-and-ink system. The API is Ark's
 * own — Root, Trigger, Backdrop, Positioner, Content, Title, Description,
 * CloseTrigger. */
export const Dialog = ArkDialog;

injectComponentStyle("dialog");
