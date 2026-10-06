import { Drawer as ArkDrawer } from "@ark-ui/svelte/drawer";

import { defineFamily } from "../../internal/family";
import DrawerFacade from "./Drawer.svelte";
import DrawerRoot from "./DrawerRoot.svelte";

/** Ark's Drawer, dressed in the paper-and-ink system: a full-height sheet
 * cut flush to the edge it rises from, sliding on the machine's translate
 * under the grabber's hand. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Grabber, GrabberIndicator, Title,
 * Description, CloseTrigger, SwipeArea. */
export const Drawer: typeof DrawerFacade &
  Omit<typeof ArkDrawer, "Root"> & {
    Root: typeof DrawerRoot;
  } = defineFamily(DrawerFacade, {
  ...ArkDrawer,
  Root: DrawerRoot,
});
