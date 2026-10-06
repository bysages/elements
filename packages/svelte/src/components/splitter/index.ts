import { Splitter as ArkSplitter } from "@ark-ui/svelte/splitter";

import { defineFamily } from "../../internal/family";
import SplitterFacade from "./Splitter.svelte";
import SplitterRoot from "./SplitterRoot.svelte";

/** Ark's Splitter, dressed in the paper-and-ink system: panels divide on
 * a hairline and a small paper-seal thumb answers the hand. The API is
 * Ark's own — Root, Panel, ResizeTrigger, ResizeTriggerIndicator. */
export const Splitter: typeof SplitterFacade &
  Omit<typeof ArkSplitter, "Root"> & {
    Root: typeof SplitterRoot;
  } = defineFamily(SplitterFacade, {
  ...ArkSplitter,
  Root: SplitterRoot,
});
