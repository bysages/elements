import { TreeView as ArkTreeView } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core";

export type {
  TreeViewCheckedChangeDetails,
  TreeViewExpandedChangeDetails,
  TreeViewFocusChangeDetails,
  TreeViewSelectionChangeDetails,
} from "@ark-ui/vue/tree-view";

/** TreeView, dressed in the paper-and-ink system: quiet rows where
 * selection is pure light on the paper, one hairline plumb line per depth,
 * and branches that swing open on the spring. The parts —
 * Root, Label, Tree, NodeProvider, NodeContext, Branch, BranchControl,
 * BranchTrigger, BranchIndicator, BranchText, BranchContent,
 * BranchIndentGuide, Item, ItemText, ItemIndicator, NodeCheckbox,
 * NodeRenameInput, plus createTreeCollection. */
export const TreeView = ArkTreeView;

injectComponentStyle("tree-view");
