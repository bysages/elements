import { createTreeCollection } from "@ark-ui/vue/tree-view";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, type PropType } from "vue";

import { TreeView } from "./index.js";

const meta: Meta = { title: "Components / Tree View" };
export default meta;

interface Node {
  id: string;
  name: string;
  children?: Node[];
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
              : [
                  h(TreeView.Item, () => [
                    h(TreeView.ItemText, () => props.node.name),
                    h(TreeView.ItemIndicator, () => "·"),
                  ]),
                ],
        }),
      );
  },
});

export const Basic = {
  render: () =>
    h(TreeView.Root, { collection, defaultExpandedValue: ["ink"] } as any, () => [
      h(TreeView.Label, () => "Library"),
      h(TreeView.Tree, () =>
        collection.rootNode.children?.map((node, index) =>
          h(Node, { key: node.id, node, indexPath: [index] }),
        ),
      ),
    ]),
};
