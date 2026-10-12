import { Splitter } from ".";

const meta = { title: "Components/Layout/Splitter" };
export default meta;

/** Two equal-height panels with one paper-seal divider. */
export const Basic = {
  render: () => (
    <Splitter
      items={[
        { id: "draft", label: "Draft" },
        { id: "notes", label: "Notes" },
      ]}
      defaultValue={[40, 60]}
    />
  ),
};
