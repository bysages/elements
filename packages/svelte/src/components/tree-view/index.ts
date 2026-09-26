/** Ark's TreeView, dressed in the paper-and-ink system: quiet rows where
 * selection is pure light on the paper, one hairline plumb line per depth,
 * and branches that swing open on the spring. The API is Ark's own —
 * Root, Label, Tree, NodeProvider, NodeContext, Branch, BranchControl,
 * BranchTrigger, BranchIndicator, BranchText, BranchContent,
 * BranchIndentGuide, Item, ItemText, ItemIndicator, NodeCheckbox,
 * NodeRenameInput, plus createTreeCollection. */
import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";
import { injectComponentStyle } from "@bysages/core";

import TreeViewRoot from "./TreeViewRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TreeView: Omit<typeof ArkTreeView, "Root"> & { Root: typeof TreeViewRoot } = {
  ...ArkTreeView,
  Root: TreeViewRoot,
};

export type { TreeViewRootProps } from "./props";

injectComponentStyle("tree-view");
