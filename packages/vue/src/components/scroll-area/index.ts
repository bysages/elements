import { ScrollArea as ArkScrollArea } from "@ark-ui/vue/scroll-area";
import { injectComponentStyle } from "@bysages/core";

/** ScrollArea, dressed in the paper-and-ink system: native bars
 * give way to quiet ink lanes that surface on hover and scroll. The parts — Root, Viewport, Content, Scrollbar, Thumb, Corner. */
export const ScrollArea = ArkScrollArea;

injectComponentStyle("scroll-area");
