import { createTreeCollection } from "@ark-ui/vue/tree-view";
import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { TreeView } from "./index";

/** A foldable tree of nodes. */
export default defineEntry({
  TreeView: {
    props: z.object({}),
    description: "A foldable tree of nodes.",
    component: ({ props }) => {
      type Node = { id: string; name: string; children?: Node[] };
      const source: Node[] = props.items?.length
        ? props.items.map((name: string) => ({ id: name, name }))
        : [
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
              children: [{ id: "paper/xuan", name: "xuan.md" }],
            },
          ];
      const collection = createTreeCollection<Node>({
        nodeToValue: (node: Node) => node.id,
        nodeToString: (node: Node) => node.name,
        rootNode: { id: "ROOT", name: "", children: source },
      });
      const renderNode = (node: Node): unknown =>
        node.children
          ? h(TreeView.Branch as never, { key: node.id }, () => [
              h(TreeView.BranchControl as never, () => [
                h(TreeView.BranchIndicator as never),
                h(TreeView.BranchText as never, () => node.name),
              ]),
              h(TreeView.BranchContent as never, () => node.children!.map(renderNode)),
            ])
          : h(TreeView.Item as never, { key: node.id }, () => [
              h(TreeView.ItemText as never, () => node.name),
            ]);
      return h(TreeView.Root as never, { collection } as never, () => [
        h(TreeView.Tree as never, () => source.map(renderNode)),
      ]);
    },
  },
});
