import type { CollectionItem } from "@ark-ui/react/collection";
import type { TreeViewRootComponentProps } from "@ark-ui/react/tree-view";
import { TreeView as ArkTreeView } from "@ark-ui/react/tree-view";
import { injectComponentStyle } from "@bysages/core";
import { chevron_right } from "@bysages/icons";
import type { ComponentProps } from "react";

import { glyphNode } from "../../internal/glyph";

/** Ark's TreeView, dressed in the paper-and-ink system: quiet rows where
 * selection is pure light on the paper, one hairline plumb line per depth,
 * and branches that swing open on the spring. The API is Ark's own —
 * Root, Label, Tree, NodeProvider, NodeContext, Branch, BranchControl,
 * BranchTrigger, BranchIndicator, BranchText, BranchContent,
 * BranchIndentGuide, Item, ItemText, ItemIndicator, NodeCheckbox,
 * NodeRenameInput, plus createTreeCollection. */

type TreeViewOwnProps = {
  /** One rung of the row register: the rows' breathing room follows it. */
  size?: "sm" | "md" | "lg";
};

function TreeViewRoot<T extends CollectionItem>(
  props: TreeViewRootComponentProps<T, TreeViewOwnProps>,
) {
  const { size = "md", ...rest } = props;
  return <ArkTreeView.Root {...rest} data-size={size} />;
}

/** The node checkbox rides inside the branch control; the branch
 * itself answers the keyboard, so the checkbox stays visual only. */
function TreeViewNodeCheckbox(props: ComponentProps<typeof ArkTreeView.NodeCheckbox>) {
  return <ArkTreeView.NodeCheckbox {...props} aria-hidden="true" />;
}

/** A branch is born with its chevron — the indicator stays a consumer's
 * children to override, never a chore to remember. */
function TreeViewBranchIndicator(props: ComponentProps<typeof ArkTreeView.BranchIndicator>) {
  const { children = glyphNode(chevron_right), ...rest } = props;
  return <ArkTreeView.BranchIndicator {...rest}>{children}</ArkTreeView.BranchIndicator>;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TreeView: Omit<typeof ArkTreeView, "Root" | "NodeCheckbox" | "BranchIndicator"> & {
  Root: typeof TreeViewRoot;
  NodeCheckbox: typeof TreeViewNodeCheckbox;
  BranchIndicator: typeof TreeViewBranchIndicator;
} = {
  ...ArkTreeView,
  Root: TreeViewRoot,
  NodeCheckbox: TreeViewNodeCheckbox,
  BranchIndicator: TreeViewBranchIndicator,
};

injectComponentStyle("tree-view");
