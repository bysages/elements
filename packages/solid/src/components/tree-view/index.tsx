import type { TreeNode } from "@ark-ui/solid/tree-view";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/solid/tree-view";
import type { TreeViewRootProps as ArkTreeViewRootProps } from "@ark-ui/solid/tree-view";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, createMemo, splitProps } from "solid-js";
import type { ComponentProps, JSX } from "solid-js";

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

type TreeOption = {
  label: string;
  value: string;
  disabled?: boolean;
  children?: TreeOption[];
};

export interface TreeViewFacadeProps {
  value?: string[];
  defaultValue?: string[];
  /** Branch values expanded on first render; top-level branches by default. */
  defaultExpandedValue?: string[];
  /** Controlled expanded branch values. */
  expandedValue?: string[];
  options: TreeOption[];
  multiple?: boolean;
  label?: string;
  /** One rung of the row register: the rows' breathing room follows it. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string[]) => void;
}

/** The complete tree behind selected values: nested options render their own
 * branches and leaves, while async and checkbox trees remain anatomy work. */
function TreeViewFacade(props: TreeViewFacadeProps) {
  injectComponentStyle("tree-view");
  const collection = createMemo(() =>
    createTreeCollection({
      nodeToValue: (node: TreeOption) => node.value,
      nodeToString: (node: TreeOption) => node.label,
      isNodeDisabled: (node: TreeOption) => !!node.disabled,
      rootNode: { value: "root", label: "", children: props.options },
    }),
  );

  const renderNode = (node: TreeOption, indexPath: number[]): JSX.Element => (
    <ArkTreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children?.length ? (
        <ArkTreeView.Branch>
          <ArkTreeView.BranchControl>
            <ArkTreeView.BranchIndicator>{iconNode("chevron-right")}</ArkTreeView.BranchIndicator>
            <ArkTreeView.BranchText>{node.label}</ArkTreeView.BranchText>
          </ArkTreeView.BranchControl>
          <ArkTreeView.BranchContent>
            <For each={node.children}>
              {(child, index) => renderNode(child, [...indexPath, index()])}
            </For>
          </ArkTreeView.BranchContent>
        </ArkTreeView.Branch>
      ) : (
        <ArkTreeView.Item>
          <ArkTreeView.ItemText>{node.label}</ArkTreeView.ItemText>
        </ArkTreeView.Item>
      )}
    </ArkTreeView.NodeProvider>
  );

  const branchValues = () =>
    props.options.filter((option) => option.children?.length).map((option) => option.value);

  return (
    <TreeViewRoot
      size={props.size ?? "md"}
      collection={collection()}
      defaultExpandedValue={props.defaultExpandedValue ?? branchValues()}
      defaultSelectedValue={props.defaultValue}
      selectionMode={props.multiple ? "multiple" : "single"}
      {...(props.expandedValue === undefined ? {} : { expandedValue: props.expandedValue })}
      {...(props.value === undefined ? {} : { selectedValue: props.value })}
      onSelectionChange={(event: { selectedValue: string[] }) =>
        props.onValueChange?.(event.selectedValue)
      }
    >
      <Show when={props.label}>
        <ArkTreeView.Label data-visually-hidden="">{props.label}</ArkTreeView.Label>
      </Show>
      <ArkTreeView.Tree>
        <For each={props.options}>{(option, index) => renderNode(option, [index()])}</For>
      </ArkTreeView.Tree>
    </TreeViewRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TreeView: typeof TreeViewFacade &
  Omit<typeof ArkTreeView, "Root" | "NodeCheckbox" | "BranchIndicator"> & {
    Root: typeof TreeViewRoot;
    NodeCheckbox: typeof TreeViewNodeCheckbox;
    BranchIndicator: typeof TreeViewBranchIndicator;
  } = defineFamily(TreeViewFacade, {
  ...ArkTreeView,
  Root: TreeViewRoot,
  NodeCheckbox: TreeViewNodeCheckbox,
  BranchIndicator: TreeViewBranchIndicator,
});

injectComponentStyle("tree-view");
