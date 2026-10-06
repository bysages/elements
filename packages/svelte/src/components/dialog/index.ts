import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";

import { defineFamily } from "../../internal/family";
import DialogFacade from "./Dialog.svelte";
import DialogRoot from "./DialogRoot.svelte";

export type { DialogOpenChangeDetails } from "@ark-ui/svelte/dialog";

/** Ark's Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Title, Description, CloseTrigger. */
export const Dialog: typeof DialogFacade &
  Omit<typeof ArkDialog, "Root"> & {
    Root: typeof DialogRoot;
  } = defineFamily(DialogFacade, {
  ...ArkDialog,
  Root: DialogRoot,
});
