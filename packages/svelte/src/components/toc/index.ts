import { Toc as ArkToc } from "@ark-ui/svelte/toc";
import { injectComponentStyle } from "@bysages/core";

import TocIndicator from "./TocIndicator.svelte";

/** Ark's Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The API is Ark's own — Root, Title, List, Item, Link, Indicator. */
export const Toc: Omit<typeof ArkToc, "Indicator"> & { Indicator: typeof TocIndicator } = {
  ...ArkToc,
  Indicator: TocIndicator,
};

injectComponentStyle("toc");
