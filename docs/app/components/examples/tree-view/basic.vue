<script setup lang="ts">
import { createTreeCollection } from "@ark-ui/vue/tree-view";
import { TreeView } from "@bysages/vue";

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

const branches: Node[] = [
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
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: { id: "ROOT", name: "", children: branches },
});
</script>

<template>
  <TreeView.Root :collection="collection" :default-expanded-value="['ink']" aria-label="Library">
    <TreeView.Tree>
      <TreeView.NodeProvider
        v-for="(node, i) in branches"
        :key="node.id"
        :node="node"
        :index-path="[i]"
      >
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchIndicator>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                aria-hidden="true"
              >
                <path d="m9 5 7 7-7 7" />
              </svg>
            </TreeView.BranchIndicator>
            <TreeView.BranchText>{{ node.name }}</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.NodeProvider
              v-for="(child, j) in node.children"
              :key="child.id"
              :node="child"
              :index-path="[i, j]"
            >
              <TreeView.Item>
                <TreeView.ItemText>{{ child.name }}</TreeView.ItemText>
              </TreeView.Item>
            </TreeView.NodeProvider>
          </TreeView.BranchContent>
        </TreeView.Branch>
      </TreeView.NodeProvider>
    </TreeView.Tree>
  </TreeView.Root>
</template>
