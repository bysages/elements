import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/svelte/segment-group";
import { injectComponentStyle } from "@bysages/core";

/** Ark's SegmentGroup, dressed in the paper-and-ink system: a hairline tray
 * where one flat ink plate travels beneath the checked seal. The API is
 * Ark's own — Root, Label, Indicator, Item, ItemText, ItemControl,
 * ItemHiddenInput. */
export const SegmentGroup = ArkSegmentGroup;

injectComponentStyle("segment-group");
