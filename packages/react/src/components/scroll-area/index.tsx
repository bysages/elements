import { ScrollArea as ArkScrollArea } from "@ark-ui/react/scroll-area";
import { injectComponentStyle } from "@bysages/core";

/** Ark's ScrollArea, dressed in the paper-and-ink system: native bars
 * give way to quiet ink lanes that surface on hover and scroll. The API
 * is Ark's own — Root, Viewport, Content, Scrollbar, Thumb, Corner. */
export const ScrollArea = ArkScrollArea;

injectComponentStyle("scroll-area");
