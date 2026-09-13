import { useFilter } from "@ark-ui/vue/locale";
import { createTreeCollection } from "@ark-ui/vue/tree-view";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, type PropType, reactive } from "vue";

import { withState } from "../with-state.js";
import { TreeView } from "./index.js";

const meta: Meta = { title: "Components / Tree View" };
export default meta;

interface Node {
  id: string;
  name: string;
  children?: Node[];
  childrenCount?: number;
  disabled?: boolean;
  href?: string;
}

const libraryCollection = createTreeCollection<Node>({
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

function chevron() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m9 5 7 7-7 7" })],
  );
}

const checkboxGlyph = () =>
  h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m4 12.5 5 5L20 6.5" })],
  );

const linkGlyph = () =>
  h(
    "svg",
    {
      width: 12,
      height: 12,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M7 17 17 7M9 7h8v8" })],
  );

function leafCell(name: string) {
  return [
    h(TreeView.Item, () => [
      h(TreeView.ItemText, () => name),
      h(TreeView.ItemIndicator, () => "·"),
    ]),
  ];
}

const Node = defineComponent({
  name: "TreeNode",
  props: {
    node: { type: Object as PropType<Node>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  setup(props) {
    return () =>
      h(TreeView.NodeProvider, { node: props.node, indexPath: props.indexPath }, () =>
        h(TreeView.NodeContext, null, {
          default: () =>
            props.node.children
              ? [
                  h(TreeView.Branch, () => [
                    h(TreeView.BranchControl, () => [
                      h(TreeView.BranchIndicator, () => chevron()),
                      h(TreeView.BranchText, () => props.node.name),
                    ]),
                    h(TreeView.BranchContent, () => [
                      h(TreeView.BranchIndentGuide),
                      ...props.node.children!.map((child, index) =>
                        h(Node, {
                          key: child.id,
                          node: child,
                          indexPath: [...props.indexPath, index],
                        }),
                      ),
                    ]),
                  ]),
                ]
              : leafCell(props.node.name),
        }),
      );
  },
});

const NodeWithCheckbox = defineComponent({
  name: "NodeWithCheckbox",
  props: {
    node: { type: Object as PropType<Node>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  setup(props) {
    const checkbox = () =>
      h(TreeView.NodeCheckbox, () => h(TreeView.NodeCheckboxIndicator, () => checkboxGlyph()));
    return () =>
      h(TreeView.NodeProvider, { node: props.node, indexPath: props.indexPath }, () =>
        h(TreeView.NodeContext, null, {
          default: () =>
            props.node.children
              ? [
                  h(TreeView.Branch, () => [
                    h(TreeView.BranchControl, () => [
                      h(TreeView.BranchIndicator, () => chevron()),
                      h(TreeView.BranchText, () => props.node.name),
                      checkbox(),
                    ]),
                    h(TreeView.BranchContent, () => [
                      h(TreeView.BranchIndentGuide),
                      ...props.node.children!.map((child, index) =>
                        h(NodeWithCheckbox, {
                          key: child.id,
                          node: child,
                          indexPath: [...props.indexPath, index],
                        }),
                      ),
                    ]),
                  ]),
                ]
              : [h(TreeView.Item, () => [h(TreeView.ItemText, () => props.node.name), checkbox()])],
        }),
      );
  },
});

const NodeWithLinks = defineComponent({
  name: "NodeWithLinks",
  props: {
    node: { type: Object as PropType<Node>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  setup(props): () => any {
    return () =>
      h(TreeView.NodeProvider, { node: props.node, indexPath: props.indexPath }, () =>
        props.node.children
          ? [
              h(TreeView.Branch, () => [
                h(TreeView.BranchControl, () => [
                  h(TreeView.BranchIndicator, () => chevron()),
                  h(TreeView.BranchText, () => props.node.name),
                ]),
                h(TreeView.BranchContent, () => [
                  h(TreeView.BranchIndentGuide),
                  ...props.node.children!.map((child, index) =>
                    h(NodeWithLinks, {
                      key: child.id,
                      node: child,
                      indexPath: [...props.indexPath, index],
                    }),
                  ),
                ]),
              ]),
            ]
          : [
              h(TreeView.Item, { asChild: true } as any, () =>
                h(
                  "a",
                  {
                    href: props.node.href ?? "#",
                    style: { color: "inherit", textDecoration: "none" },
                  },
                  [h(TreeView.ItemText, () => props.node.name), linkGlyph()],
                ),
              ),
            ],
      );
  },
});

const AsyncNode = defineComponent({
  name: "AsyncNode",
  props: {
    node: { type: Object as PropType<Node>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  setup(props) {
    return () =>
      h(TreeView.NodeProvider, { node: props.node, indexPath: props.indexPath }, () =>
        h(TreeView.NodeContext, null, {
          default: (state: any) =>
            props.node.children || props.node.childrenCount
              ? [
                  h(TreeView.Branch, () => [
                    h(TreeView.BranchControl, () => [
                      h(TreeView.BranchIndicator, () =>
                        state.loading ? h("span", { style: { opacity: 0.5 } }, "…") : chevron(),
                      ),
                      h(TreeView.BranchText, () => props.node.name),
                    ]),
                    h(TreeView.BranchContent, () => [
                      h(TreeView.BranchIndentGuide),
                      ...(props.node.children ?? []).map((child, index) =>
                        h(AsyncNode, {
                          key: child.id,
                          node: child,
                          indexPath: [...props.indexPath, index],
                        }),
                      ),
                    ]),
                  ]),
                ]
              : leafCell(props.node.name),
        }),
      );
  },
});

function treeOf(collection: ReturnType<typeof createTreeCollection<Node>>, component: any = Node) {
  return h(TreeView.Tree, () =>
    collection.rootNode.children?.map((node, index) =>
      h(component, { key: node.id, node, indexPath: [index] }),
    ),
  );
}

/** The library tree: branches open on click, files sit at the leaves. */
export const Basic = {
  args: {
    label: "Library",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(
          TreeView.Root,
          { collection: libraryCollection, defaultExpandedValue: ["ink"] } as any,
          () => [h(TreeView.Label, () => args.label), treeOf(libraryCollection)],
        ),
    ),
};

/** Expansion answers to state — the open branches are fully controlled. */
export const ControlledExpanded = {
  render: () =>
    withState(() => {
      const state = reactive({ expandedValue: ["ink"] });
      return () =>
        h(
          TreeView.Root,
          {
            collection: libraryCollection,
            expandedValue: state.expandedValue,
            onExpandedChange: (e: any) => {
              state.expandedValue = e.expandedValue;
            },
          } as any,
          () => [h(TreeView.Label, () => "Library"), treeOf(libraryCollection)],
        );
    }),
};

/** Selection answers to state — one selected node at a time. */
export const ControlledSelected = {
  render: () =>
    withState(() => {
      const state = reactive({ selectedValue: ["ink/brush"] });
      return () =>
        h(
          TreeView.Root,
          {
            collection: libraryCollection,
            selectedValue: state.selectedValue,
            onSelectionChange: (e: any) => {
              state.selectedValue = e.selectedValue;
            },
          } as any,
          () => [h(TreeView.Label, () => "Library"), treeOf(libraryCollection)],
        );
    }),
};

/** Every row carries a checkbox; branch checkboxes track their subtree. */
export const CheckboxTree = {
  render: () =>
    h(
      TreeView.Root,
      {
        collection: libraryCollection,
        defaultExpandedValue: ["ink"],
        defaultCheckedValue: ["ink/brush"],
      } as any,
      () => [h(TreeView.Label, () => "Library"), treeOf(libraryCollection, NodeWithCheckbox)],
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
    return h(TreeView.Root, { collection: docs, defaultExpandedValue: ["docs"] } as any, () => [
      h(TreeView.Label, () => "Handbook"),
      treeOf(docs, NodeWithLinks),
    ]);
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
    return h(TreeView.Root, { collection: gated, defaultExpandedValue: ["ink"] } as any, () => [
      h(TreeView.Label, () => "Library"),
      treeOf(gated),
    ]);
  },
};

/** Expand-all and collapse-all stamps in the header, wired to the machine. */
export const ExpandCollapseAll = {
  render: () =>
    h(TreeView.Root, { collection: libraryCollection } as any, () =>
      h(TreeView.Context, null, {
        default: (tree: any) => [
          h("div", { style: { display: "flex", gap: "0.5rem" } }, [
            h(
              "button",
              {
                type: "button",
                onClick: () => tree.expandAll(),
                style: {
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.5rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                  cursor: "pointer",
                },
              },
              "Expand all",
            ),
            h(
              "button",
              {
                type: "button",
                onClick: () => tree.collapseAll(),
                style: {
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.5rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                  cursor: "pointer",
                },
              },
              "Collapse all",
            ),
          ]),
          h(TreeView.Label, () => "Library"),
          treeOf(libraryCollection),
        ],
      }),
    ),
};

/** Typing prunes the collection; matches keep their branches open. */
export const Filtering = {
  render: () => {
    const filterFns = useFilter({ sensitivity: "base" });
    const state = reactive<{ collection: any; query: string }>({
      collection: libraryCollection,
      query: "",
    });
    const apply = (value: string) => {
      const filtered = value
        ? libraryCollection.filter((node: Node) => filterFns.value.contains(node.name, value))
        : libraryCollection;
      state.collection = filtered;
      state.query = value;
    };
    return h(
      TreeView.Root,
      { collection: state.collection, defaultExpandedValue: ["ink", "paper"] } as any,
      () => [
        h("input", {
          placeholder: "Search",
          value: state.query,
          onInput: (e: any) => apply(e.currentTarget.value),
          style: {
            border: "1px solid var(--bs-color-border)",
            borderRadius: "var(--bs-radius-sm)",
            padding: "0.25rem 0.5rem",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
            background: "var(--bs-color-surface-2)",
            color: "var(--bs-color-text-primary)",
          },
        }),
        treeOf(state.collection),
      ],
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
    return h(
      TreeView.Root,
      {
        collection: archive,
        loadChildren,
        defaultExpandedValue: ["local"],
      } as any,
      () => [h(TreeView.Label, () => "Archive"), treeOf(archive, AsyncNode)],
    );
  },
};
