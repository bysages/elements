import { TreeView } from ".";

const meta = { title: "Components/Data/Tree View" };
export default meta;

/** The complete tree with top-level branches open at rest. */
export const Basic = {
  render: () => (
    <TreeView
      options={[
        {
          label: "ink",
          value: "ink",
          children: [
            { label: "brush.md", value: "ink/brush" },
            { label: "stone.md", value: "ink/stone" },
          ],
        },
        {
          label: "paper",
          value: "paper",
          children: [{ label: "xuan.md", value: "paper/xuan" }],
        },
      ]}
      defaultValue={["ink/brush"]}
      label="Library"
    />
  ),
};
