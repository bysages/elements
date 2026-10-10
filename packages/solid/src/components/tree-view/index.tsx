import type { TreeNode } from "@ark-ui/solid/tree-view";
import { TreeView as ArkTreeView } from "@ark-ui/solid/tree-view";
import type { TreeViewRootProps as ArkTreeViewRootProps } from "@ark-ui/solid/tree-view";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

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

// The sized root keeps the tree's collection generic; its return rides
// as any the way Ark's own RootComponent types do, past the checker's
// host mismatch.
const ArkRoot = ArkTreeView.Root as <T extends TreeNode>(props: ArkTreeViewRootProps<T>) => any;

function TreeViewRoot<T extends TreeNode>(props: ArkTreeViewRootProps<T> & TreeViewOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("tree-view", () => rest.id);
  return <ArkRoot {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/** The node checkbox rides inside the branch control; the branch
 * itself answers the keyboard, so the checkbox stays visual only. */
function TreeViewNodeCheckbox(props: ComponentProps<typeof ArkTreeView.NodeCheckbox>) {
  return <ArkTreeView.NodeCheckbox {...props} aria-hidden="true" />;
}

/* A branch is born with its chevron — the indicator stays a consumer's
 * children to override, never a chore to remember. */
function TreeViewBranchIndicator(props: ComponentProps<typeof ArkTreeView.BranchIndicator>) {
  return (
    <ArkTreeView.BranchIndicator {...props}>
      {props.children ?? iconNode("chevron-right")}
    </ArkTreeView.BranchIndicator>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TreeView: typeof TreeViewRoot &
  Omit<typeof ArkTreeView, "Root"> & { Root: typeof TreeViewRoot } = defineFamily(TreeViewRoot, {
  ...ArkTreeView,
  Root: TreeViewRoot,
  NodeCheckbox: TreeViewNodeCheckbox,
  BranchIndicator: TreeViewBranchIndicator,
});

injectComponentStyle("tree-view");
