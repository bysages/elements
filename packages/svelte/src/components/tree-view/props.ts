import type { TreeNode } from "@ark-ui/svelte/collection";
import type { TreeViewRootProps as ArkTreeViewRootProps } from "@ark-ui/svelte/tree-view";

export type TreeViewRootProps = ArkTreeViewRootProps<TreeNode> & {
  /** One rung of the row register: the rows' breathing room follows it. */
  size?: "sm" | "md" | "lg";
};
