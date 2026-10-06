import { ScrollArea as ArkScrollArea } from "@ark-ui/svelte/scroll-area";

import { defineFamily } from "../../internal/family";
import ScrollAreaFacade from "./ScrollArea.svelte";
import ScrollAreaRoot from "./ScrollAreaRoot.svelte";

/** Ark's ScrollArea, dressed in the paper-and-ink system: native bars
 * give way to quiet ink lanes that surface on hover and scroll. The API
 * is Ark's own — Root, Viewport, Content, Scrollbar, Thumb, Corner. */
export const ScrollArea: typeof ScrollAreaFacade &
  Omit<typeof ArkScrollArea, "Root"> & {
    Root: typeof ScrollAreaRoot;
  } = defineFamily(ScrollAreaFacade, {
  ...ArkScrollArea,
  Root: ScrollAreaRoot,
});
