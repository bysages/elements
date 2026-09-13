import type { Meta } from "@storybook/react-vite";

import { Kbd } from ".";

const meta: Meta = { title: "Components/Elements/Kbd" };
export default meta;

export const Basic = {
  render: () => <Kbd>Esc</Kbd>,
};

export const Combination = {
  render: () => (
    <p style={{ margin: 0, display: "flex", gap: "0.25rem", alignItems: "center" }}>
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search the paper.
    </p>
  ),
};
