import { Toc as ArkToc } from "@ark-ui/vue/toc";
import { injectComponentStyle } from "@bysages/core";

/** Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The parts — Root, Title, List, Item, Link, Indicator. */
export const Toc = ArkToc;

injectComponentStyle("toc");
