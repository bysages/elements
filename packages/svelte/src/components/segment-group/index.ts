/** SegmentGroup, dressed in the paper-and-ink system: a hairline tray
 * where one flat ink plate travels beneath the checked seal. The parts - Root, Label, Indicator, Item, ItemText, ItemControl,
 * ItemHiddenInput. */
import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/svelte/segment-group";

import { defineFamily } from "../../internal/family";
import SegmentGroupFacade from "./SegmentGroup.svelte";
import SegmentGroupRoot from "./SegmentGroupRoot.svelte";

/* Ark's namespace is frozen - spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const SegmentGroup: typeof SegmentGroupFacade &
  Omit<typeof ArkSegmentGroup, "Root"> & {
    Root: typeof SegmentGroupRoot;
  } = defineFamily(SegmentGroupFacade, {
  ...ArkSegmentGroup,
  Root: SegmentGroupRoot,
});
