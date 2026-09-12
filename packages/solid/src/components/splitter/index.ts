import { Splitter as ArkSplitter } from "@ark-ui/solid/splitter";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Splitter, dressed in the paper-and-ink system: panels divide on
 * a hairline and a small paper-seal thumb answers the hand. The API is
 * Ark's own — Root, Panel, ResizeTrigger, ResizeTriggerIndicator. */
export const Splitter = ArkSplitter;

injectComponentStyle("splitter");
