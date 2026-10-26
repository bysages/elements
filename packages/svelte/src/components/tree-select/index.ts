import { injectComponentStyle } from "@bysages/core/styling";

import { defineFamily, type FamilyParts } from "../../internal/family";
import { Popover } from "../popover";
import TreeSelectComponent from "./TreeSelect.svelte";

/** A tree behind a field: the control reads like an input, the vessel
 * below walks the hierarchy, and one leaf click closes the deal. */
export const TreeSelect = defineFamily(TreeSelectComponent, {
  ...Popover,
}) as typeof TreeSelectComponent & FamilyParts<typeof Popover>;

export type { TreeSelectNode, TreeSelectProps } from "./props";

// The tree rows keep the TreeView family's stylesheet — the vessel and
// positioner ride the tree-select scope above.
injectComponentStyle("tree-view");
