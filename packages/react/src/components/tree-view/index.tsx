import type { CollectionItem } from "@ark-ui/react/collection";
import type { TreeViewRootComponentProps } from "@ark-ui/react/tree-view";
import { TreeView as ArkTreeView } from "@ark-ui/react/tree-view";
import { createTreeCollection } from "@ark-ui/react/tree-view";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties, ReactNode } from "react";
import type { ComponentProps } from "react";

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

function TreeViewRoot<T extends CollectionItem>(
  props: TreeViewRootComponentProps<T, TreeViewOwnProps>,
) {
  injectComponentStyle("tree-view");
  const id = useElementId("tree-view", props);
  const { size = "md", ...rest } = props;
  return <ArkTreeView.Root {...rest} id={id} data-size={size} />;
}

/** The node checkbox rides inside the branch control; the branch
 * itself answers the keyboard, so the checkbox stays visual only. */
function TreeViewNodeCheckbox(props: ComponentProps<typeof ArkTreeView.NodeCheckbox>) {
  return <ArkTreeView.NodeCheckbox {...props} aria-hidden="true" />;
}

/** A branch is born with its chevron — the indicator stays a consumer's
 * children to override, never a chore to remember. */
function TreeViewBranchIndicator(props: ComponentProps<typeof ArkTreeView.BranchIndicator>) {
  const { children = iconNode("chevron-right"), ...rest } = props;
  return <ArkTreeView.BranchIndicator {...rest}>{children}</ArkTreeView.BranchIndicator>;
}

type TreeOption = {
  label: string;
  value: string;
  disabled?: boolean;
  children?: TreeOption[];
};

type TreeViewFacadeProps = {
  value?: string[];
  defaultValue?: string[];
  options: TreeOption[];
  multiple?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value: string[]) => void;
};

function treeNodes(items: TreeOption[], path: number[] = []): ReactNode {
  return items.map((node, index) => {
    const indexPath = [...path, index];
    const row = node.children?.length ? (
      <ArkTreeView.Branch>
        <ArkTreeView.BranchControl>
          <ArkTreeView.BranchIndicator>{iconNode("chevron-right")}</ArkTreeView.BranchIndicator>
          <ArkTreeView.BranchText>{node.label}</ArkTreeView.BranchText>
        </ArkTreeView.BranchControl>
        <ArkTreeView.BranchContent>{treeNodes(node.children, indexPath)}</ArkTreeView.BranchContent>
      </ArkTreeView.Branch>
    ) : (
      <ArkTreeView.Item>
        <ArkTreeView.ItemText>{node.label}</ArkTreeView.ItemText>
      </ArkTreeView.Item>
    );

    return (
      <ArkTreeView.NodeProvider key={node.value} node={node} indexPath={indexPath}>
        {row}
      </ArkTreeView.NodeProvider>
    );
  });
}

/** The complete tree behind selected values: nested options render their own
 * branches and leaves, while async and checkbox trees remain anatomy work. */
function TreeViewFacade(props: TreeViewFacadeProps) {
  const {
    value,
    defaultValue,
    options,
    multiple,
    label,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;
  const branchValues = options
    .filter((option) => option.children?.length)
    .map((option) => option.value);
  const collection = createTreeCollection({
    nodeToValue: (node: TreeOption) => node.value,
    nodeToString: (node: TreeOption) => node.label,

    isNodeDisabled: (node: TreeOption) => !!node.disabled,
    rootNode: { value: "root", label: "", children: options },
  });

  return (
    <TreeViewRoot
      size={size}
      collection={collection}
      defaultExpandedValue={branchValues}
      defaultSelectedValue={defaultValue}
      selectedValue={value}
      selectionMode={multiple ? "multiple" : "single"}
      aria-label={label}
      className={className}
      style={style}
      onSelectionChange={(event: { selectedValue: string[] }) =>
        onValueChange?.(event.selectedValue)
      }
    >
      <ArkTreeView.Tree>{treeNodes(options)}</ArkTreeView.Tree>
    </TreeViewRoot>
  );
}

export const TreeView: typeof TreeViewFacade &
  Omit<typeof ArkTreeView, "Root" | "NodeCheckbox" | "BranchIndicator"> & {
    Root: typeof TreeViewRoot;
    NodeCheckbox: typeof TreeViewNodeCheckbox;
    BranchIndicator: typeof TreeViewBranchIndicator;
  } = Object.assign(TreeViewFacade, {
  ...ArkTreeView,
  Root: TreeViewRoot,
  NodeCheckbox: TreeViewNodeCheckbox,
  BranchIndicator: TreeViewBranchIndicator,
}) as typeof TreeViewFacade &
  Omit<typeof ArkTreeView, "Root" | "NodeCheckbox" | "BranchIndicator"> & {
    Root: typeof TreeViewRoot;
    NodeCheckbox: typeof TreeViewNodeCheckbox;
    BranchIndicator: typeof TreeViewBranchIndicator;
  };
