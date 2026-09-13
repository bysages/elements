import { createTreeCollection } from "@ark-ui/react/tree-view";
import type { Meta } from "@storybook/react-vite";

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
