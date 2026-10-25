import type { TreeNode } from "@ark-ui/svelte/collection";
import type { TreeViewRootProps as ArkTreeViewRootProps } from "@ark-ui/svelte/tree-view";

export type TreeViewOption = {
  label: string;
  value: string;
  disabled?: boolean;
  /** A curated core icon at the row's leading edge. */
  icon?: string;
  /** A quiet trailing label, commonly a count. */
  meta?: string;
  children?: TreeViewOption[];
};

export type TreeViewRootProps = ArkTreeViewRootProps<TreeNode> & {
  /** One rung of the row register: the rows' breathing room follows it. */
  size?: "sm" | "md" | "lg";
};
