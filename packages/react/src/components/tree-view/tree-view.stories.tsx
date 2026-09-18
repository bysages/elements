import { useFilter } from "@ark-ui/react/locale";
import { createTreeCollection } from "@ark-ui/react/tree-view";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { TreeView } from ".";

const meta: Meta = { title: "Components/Data/Tree View" };
export default meta;

interface Node {
  id: string;
  name: string;
  children?: Node[];
  childrenCount?: number;
  disabled?: boolean;
  href?: string;
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "ink",
        name: "ink",
        children: [
          { id: "ink/brush", name: "brush.md" },
          { id: "ink/stone", name: "stone.md" },
        ],
      },
      {
        id: "paper",
        name: "paper",
        children: [
          { id: "paper/xuan", name: "xuan.md" },
          { id: "paper/defaults", name: "defaults.md" },
          { id: "README.md", name: "README.md" },
        ],
      },
    ],
  },
});

function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function Node({ node, indexPath }: { node: Node; indexPath: number[] }) {
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      <TreeView.NodeContext>
        {() =>
          node.children ? (
            <TreeView.Branch>
              <TreeView.BranchControl>
                <TreeView.BranchIndicator>
                  <Chevron />
                </TreeView.BranchIndicator>
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent>
                <TreeView.BranchIndentGuide />
                {node.children.map((child, index) => (
                  <Node key={child.id} node={child} indexPath={[...indexPath, index]} />
                ))}
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeView.Item>
              <TreeView.ItemText>{node.name}</TreeView.ItemText>
              <TreeView.ItemIndicator>·</TreeView.ItemIndicator>
            </TreeView.Item>
          )
        }
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  );
}

export const Basic = {
  args: {
    label: "Library",
  },
  render: (args: any) => (
    <TreeView.Root collection={collection} defaultExpandedValue={["ink"]}>
      <TreeView.Label>{args.label}</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <Node key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  ),
};

function treeOf(
  treeCollection: ReturnType<typeof createTreeCollection<Node>>,
  Component: any = Node,
) {
  return (
    <TreeView.Tree>
      {treeCollection.rootNode.children?.map((node, index) => (
        <Component key={node.id} node={node} indexPath={[index]} />
      ))}
    </TreeView.Tree>
  );
}

function CheckboxGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

function LinkGlyph() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function NodeWithCheckbox({ node, indexPath }: { node: Node; indexPath: number[] }) {
  const checkbox = () => (
    <TreeView.NodeCheckbox>
      <TreeView.NodeCheckboxIndicator>
        <CheckboxGlyph />
      </TreeView.NodeCheckboxIndicator>
    </TreeView.NodeCheckbox>
  );
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      <TreeView.NodeContext>
        {() =>
          node.children ? (
            <TreeView.Branch>
              <TreeView.BranchControl>
                <TreeView.BranchIndicator>
                  <Chevron />
                </TreeView.BranchIndicator>
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
                {checkbox()}
              </TreeView.BranchControl>
              <TreeView.BranchContent>
                <TreeView.BranchIndentGuide />
                {node.children.map((child, index) => (
                  <NodeWithCheckbox key={child.id} node={child} indexPath={[...indexPath, index]} />
                ))}
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeView.Item>
              <TreeView.ItemText>{node.name}</TreeView.ItemText>
              {checkbox()}
            </TreeView.Item>
          )
        }
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  );
}

function NodeWithLinks({ node, indexPath }: { node: Node; indexPath: number[] }) {
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchIndicator>
              <Chevron />
            </TreeView.BranchIndicator>
            <TreeView.BranchText>{node.name}</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <NodeWithLinks key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item asChild>
          <a href={node.href ?? "#"} style={{ color: "inherit", textDecoration: "none" }}>
            <TreeView.ItemText>{node.name}</TreeView.ItemText>
            <LinkGlyph />
          </a>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  );
}

function AsyncNode({ node, indexPath }: { node: Node; indexPath: number[] }) {
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      <TreeView.NodeContext>
        {(state: any) =>
          node.children || node.childrenCount ? (
            <TreeView.Branch>
              <TreeView.BranchControl>
                <TreeView.BranchIndicator>
                  {state.loading ? <span style={{ opacity: 0.5 }}>…</span> : <Chevron />}
                </TreeView.BranchIndicator>
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent>
                <TreeView.BranchIndentGuide />
                {(node.children ?? []).map((child, index) => (
                  <AsyncNode key={child.id} node={child} indexPath={[...indexPath, index]} />
                ))}
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeView.Item>
              <TreeView.ItemText>{node.name}</TreeView.ItemText>
              <TreeView.ItemIndicator>·</TreeView.ItemIndicator>
            </TreeView.Item>
          )
        }
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  );
}

/** Expansion answers to state — the open branches are fully controlled. */
export const ControlledExpanded = {
  render: () => {
    const [expandedValue, setExpandedValue] = useState<string[]>(["ink"]);
    return (
      <TreeView.Root
        collection={collection}
        expandedValue={expandedValue}
        onExpandedChange={(e: any) => setExpandedValue(e.expandedValue)}
      >
        <TreeView.Label>Library</TreeView.Label>
        {treeOf(collection)}
      </TreeView.Root>
    );
  },
};

/** Selection answers to state — one selected node at a time. */
export const ControlledSelected = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string[]>(["ink/brush"]);
    return (
      <TreeView.Root
        collection={collection}
        selectedValue={selectedValue}
        onSelectionChange={(e: any) => setSelectedValue(e.selectedValue)}
      >
        <TreeView.Label>Library</TreeView.Label>
        {treeOf(collection)}
      </TreeView.Root>
    );
  },
};

/** Every row carries a checkbox; branch checkboxes track their subtree. */
export const CheckboxTree = {
  render: () => (
    <TreeView.Root
      collection={collection}
      defaultExpandedValue={["ink"]}
      defaultCheckedValue={["ink/brush"]}
    >
      <TreeView.Label>Library</TreeView.Label>
      {treeOf(collection, NodeWithCheckbox)}
    </TreeView.Root>
  ),
};

/** Leaves are honest anchors; external targets get the outgoing glyph. */
export const Links = {
  render: () => {
    const docs = createTreeCollection<Node>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      rootNode: {
        id: "ROOT",
        name: "",
        children: [
          {
            id: "docs",
            name: "Docs",
            children: [
              { id: "docs/start", name: "Getting Started", href: "#getting-started" },
              { id: "docs/install", name: "Installation", href: "#installation" },
            ],
          },
          {
            id: "external",
            name: "External",
            children: [
              { id: "ext/ark", name: "Ark UI", href: "https://ark-ui.com" },
              { id: "ext/zag", name: "Zag.js", href: "https://zagjs.com" },
            ],
          },
        ],
      },
    });
    return (
      <TreeView.Root collection={docs} defaultExpandedValue={["docs"]}>
        <TreeView.Label>Handbook</TreeView.Label>
        {treeOf(docs, NodeWithLinks)}
      </TreeView.Root>
    );
  },
};

/** A disabled node is visible but refuses selection and expansion. */
export const DisabledNodes = {
  render: () => {
    const gated = createTreeCollection<Node>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      isNodeDisabled: (node) => !!node.disabled,
      rootNode: {
        id: "ROOT",
        name: "",
        children: [
          {
            id: "ink",
            name: "ink",
            children: [
              { id: "ink/brush", name: "brush.md" },
              { id: "ink/stone", name: "stone.md", disabled: true },
            ],
          },
          {
            id: "paper",
            name: "paper",
            disabled: true,
            children: [{ id: "paper/xuan", name: "xuan.md" }],
          },
        ],
      },
    });
    return (
      <TreeView.Root collection={gated} defaultExpandedValue={["ink"]}>
        <TreeView.Label>Library</TreeView.Label>
        {treeOf(gated)}
      </TreeView.Root>
    );
  },
};

/** Expand-all and collapse-all stamps in the header, wired to the machine. */
export const ExpandCollapseAll = {
  render: () => (
    <TreeView.Root collection={collection}>
      <TreeView.Context>
        {(tree: any) => (
          <>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => tree.expandAll()}
                style={{
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.5rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                  cursor: "pointer",
                }}
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={() => tree.collapseAll()}
                style={{
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.5rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                  cursor: "pointer",
                }}
              >
                Collapse all
              </button>
            </div>
            <TreeView.Label>Library</TreeView.Label>
            {treeOf(collection)}
          </>
        )}
      </TreeView.Context>
    </TreeView.Root>
  ),
};

/** Typing prunes the collection; matches keep their branches open. */
export const Filtering = {
  render: () => {
    const filter = useFilter({ sensitivity: "base" });
    const [query, setQuery] = useState("");
    const filtered = query
      ? collection.filter((node: Node) => filter.contains(node.name, query))
      : collection;
    return (
      <TreeView.Root collection={filtered} defaultExpandedValue={["ink", "paper"]}>
        <input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          style={{
            border: "1px solid var(--bs-color-border)",
            borderRadius: "var(--bs-radius-sm)",
            padding: "0.25rem 0.5rem",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
            background: "var(--bs-color-surface-2)",
            color: "var(--bs-color-text-primary)",
          }}
        />
        {treeOf(filtered)}
      </TreeView.Root>
    );
  },
};

/** Deep branches load on first expansion; a quiet ellipsis marks the wait. */
export const AsyncLoading = {
  render: () => {
    const archive = createTreeCollection<Node>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      rootNode: {
        id: "ROOT",
        name: "",
        children: [
          { id: "server", name: "server", childrenCount: 2 },
          { id: "local", name: "local", children: [{ id: "local/draft", name: "draft.md" }] },
        ],
      },
    });
    const loadChildren = async (e: any) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return e.node.id === "server"
        ? [
            { id: "server/nginx", name: "nginx.conf" },
            { id: "server/deploy", name: "deploy.sh" },
          ]
        : [];
    };
    return (
      <TreeView.Root
        collection={archive}
        loadChildren={loadChildren}
        defaultExpandedValue={["local"]}
      >
        <TreeView.Label>Archive</TreeView.Label>
        {treeOf(archive, AsyncNode)}
      </TreeView.Root>
    );
  },
};
