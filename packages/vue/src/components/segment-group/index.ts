import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/vue/segment-group";
import { injectComponentStyle } from "@bysages/core";

/** SegmentGroup, dressed in the paper-and-ink system: a hairline tray
 * where one flat ink plate travels beneath the checked seal. The parts — Root, Label, Indicator, Item, ItemText, ItemControl,
 * ItemHiddenInput. */
export const SegmentGroup = ArkSegmentGroup;

injectComponentStyle("segment-group");
