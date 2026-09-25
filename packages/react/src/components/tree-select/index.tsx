import { useFilter } from "@ark-ui/react/locale";
import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/react/tree-view";
import { injectComponentStyle } from "@bysages/core";
import { useMemo, useState } from "react";
import type { HTMLAttributes } from "react";

import { Input } from "../input";

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
 * `value`. `filterable` puts a filter line at the top of the vessel;
 * matches keep their ancestors and the branches fan open.
 */
export interface TreeSelectProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  data: TreeSelectNode[];
  placeholder?: string;
  filterable?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function TreeSelect({
  value,
  data,
  placeholder = "Select…",
  filterable = false,
  disabled = false,
  onValueChange,
  ...rest
}: TreeSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filterFns = useFilter({ sensitivity: "base" });

  const collection = useMemo(
    () =>
      createTreeCollection<TreeSelectNode>({
        nodeToValue: (node) => node.value,
        nodeToString: (node) => node.label,
        rootNode: { value: "ROOT", label: "", children: data },
      }),
    [data],
  );

  const filtering = filterable && query.trim().length > 0;

  /** The collection pruned to the matches — each hit keeping its
   * ancestors, so a deep match still reads inside its hierarchy. */
  const visibleCollection = useMemo(
    () =>
      filtering
        ? collection.filter((node) => filterFns.contains(node.label, query.trim()))
        : collection,
    [filtering, collection, filterFns, query],
  );

  const firstLevel = data.map((node) => node.value);

  // While the filter runs, every branch on a hit's path stands open —
  // a deep match must not hide behind a collapsed fold. The expanded
  // prop is only supplied while filtering, so the rest state keeps the
  // machine's own remember-where-you-folded behavior.
  const expandedWhileFiltering = useMemo(() => {
    if (!filtering) return undefined;
    const values: string[] = [];
    const walk = (nodes: TreeSelectNode[]) => {
      for (const node of nodes) {
        if (node.children?.length) {
          values.push(node.value);
          walk(node.children);
        }
      }
    };
    walk(visibleCollection.rootNode.children ?? []);
    return values;
  }, [filtering, visibleCollection]);

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
      onOpenChange={(details) => {
        setOpen(details.open);
        if (!details.open) setQuery("");
      }}
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
            {filterable ? (
              <div data-scope="tree-select" data-part="search">
                <Input
                  size="sm"
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Filter…"
                  aria-label="Filter options"
                />
              </div>
            ) : null}
            <div data-scope="tree-select" data-part="body">
              {(visibleCollection.rootNode.children ?? []).length === 0 ? (
                <p data-scope="tree-select" data-part="empty">
                  Nothing matches
                </p>
              ) : (
                <ArkTreeView.Root
                  collection={visibleCollection}
                  selectionMode="single"
                  selectedValue={value ? [value] : []}
                  {...(filtering
                    ? { expandedValue: expandedWhileFiltering }
                    : { defaultExpandedValue: firstLevel })}
                  onSelectionChange={pick}
                >
                  <ArkTreeView.Tree>
                    {visibleCollection.rootNode.children?.map((node, index) => (
                      <TreeSelectRow key={node.value} node={node} indexPath={[index]} />
                    ))}
                  </ArkTreeView.Tree>
                </ArkTreeView.Root>
              )}
            </div>
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
