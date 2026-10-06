import { Toc as ArkToc } from "@ark-ui/svelte/toc";

import { defineFamily } from "../../internal/family";
import TocFacade from "./Toc.svelte";
import TocContent from "./TocContent.svelte";
import TocIndicator from "./TocIndicator.svelte";
import TocRoot from "./TocRoot.svelte";

/** Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The API is Ark's own — Root, Title, List, Item, Link, Indicator. */
export const Toc: typeof TocFacade &
  Omit<typeof ArkToc, "Root" | "Indicator" | "Content"> & {
    Root: typeof TocRoot;
    Indicator: typeof TocIndicator;
    Content: typeof TocContent;
  } = defineFamily(TocFacade, {
  ...ArkToc,
  Root: TocRoot,
  Indicator: TocIndicator,
  Content: TocContent,
});
