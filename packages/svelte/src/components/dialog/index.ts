import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";

import { defineFamily } from "../../internal/family";
import DialogFacade from "./Dialog.svelte";
import DialogBody from "./DialogBody.svelte";
import DialogContent from "./DialogContent.svelte";
import DialogFooter from "./DialogFooter.svelte";
import DialogHeader from "./DialogHeader.svelte";
import DialogRoot from "./DialogRoot.svelte";
import Positioner from "./Positioner.svelte";

export type { DialogOpenChangeDetails } from "@ark-ui/svelte/dialog";

/** Ark's Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The API is Ark's own — Root, Header, Body,
 * Footer, Trigger, Backdrop, Positioner, Content, Title, Description,
 * CloseTrigger. */
export const Dialog: typeof DialogFacade &
  Omit<typeof ArkDialog, "Root" | "Content" | "Positioner"> & {
    Positioner: typeof Positioner;
    Root: typeof DialogRoot;
    Content: typeof DialogContent;
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
  } = defineFamily(DialogFacade, {
  ...ArkDialog,
  Positioner,
  Root: DialogRoot,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});
