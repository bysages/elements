import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/react/tree-view";
import { injectComponentStyle } from "@bysages/core";
import { useState } from "react";
import type { HTMLAttributes } from "react";

export interface TreeSelectNode {
  label: string;
  value: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

const chevron = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const chevronDown = (
  <span data-part="chevron" aria-hidden="true">
    {chevron}
  </span>
);

function TreeSelectRow({ node, indexPath }: { node: TreeSelectNode; indexPath: number[] }) {
  return (
    <ArkTreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children ? (
        <ArkTreeView.Branch>
          <ArkTreeView.BranchControl>
            <ArkTreeView.BranchIndicator>{chevron}</ArkTreeView.BranchIndicator>
            <ArkTreeView.BranchText>{node.label}</ArkTreeView.BranchText>
          </ArkTreeView.BranchControl>
          <ArkTreeView.BranchContent>
            <ArkTreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeSelectRow key={child.value} node={child} indexPath={[...indexPath, index]} />
            ))}
          </ArkTreeView.BranchContent>
        </ArkTreeView.Branch>
      ) : (
        <ArkTreeView.Item asChild>
          <span style={{ display: "flex", inlineSize: "100%" }}>
            <ArkTreeView.ItemText>{node.label}</ArkTreeView.ItemText>
          </span>
        </ArkTreeView.Item>
      )}
    </ArkTreeView.NodeProvider>
  );
}

/**
 * A tree behind a field: the control reads like an input, the vessel
 * below walks the hierarchy, and one leaf click closes the deal. Single
 * selection — the chosen label rides on the control, its value rides in
 * `value`.
 */
export interface TreeSelectProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  data: TreeSelectNode[];
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function TreeSelect({
  value,
  data,
  placeholder = "Select…",
  disabled = false,
  onValueChange,
  ...rest
}: TreeSelectProps) {
  const [open, setOpen] = useState(false);

  const collection = createTreeCollection<TreeSelectNode>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    rootNode: { value: "ROOT", label: "", children: data },
  });

  const firstLevel = data.map((node) => node.value);

  let found: string | undefined;
  const walk = (nodes: TreeSelectNode[] | undefined) => {
    for (const node of nodes ?? []) {
      if (node.value === value) found = node.label;
      walk(node.children);
    }
  };
  walk(data);
  const label = found;

  function pick(details: { selectedValue: string[] }) {
    const [selected] = details.selectedValue;
    if (selected == null) return;
    onValueChange?.(selected);
    setOpen(false);
  }

  return (
    <ArkPopover.Root
      {...rest}
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      positioning={{ sameWidth: true, placement: "bottom-start" }}
    >
      <ArkPopover.Trigger asChild disabled={disabled}>
        <button
          type="button"
          data-scope="tree-select"
          data-part="control"
          data-open={open ? "" : undefined}
          data-placeholder={label == null ? "" : undefined}
          disabled={disabled}
        >
          {label ?? placeholder}
          {chevronDown}
        </button>
      </ArkPopover.Trigger>
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content data-scope="tree-select" data-part="content">
            <ArkTreeView.Root
              collection={collection}
              selectionMode="single"
              selectedValue={value ? [value] : []}
              defaultExpandedValue={firstLevel}
              onSelectionChange={pick}
            >
              <ArkTreeView.Tree>
                {collection.rootNode.children?.map((node, index) => (
                  <TreeSelectRow key={node.value} node={node} indexPath={[index]} />
                ))}
              </ArkTreeView.Tree>
            </ArkTreeView.Root>
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

// The tree rows keep the TreeView family's stylesheet — the vessel and
// positioner ride the tree-select scope above.
injectComponentStyle("tree-select");
injectComponentStyle("tree-view");
