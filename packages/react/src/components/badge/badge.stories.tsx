import type { Meta } from "@storybook/react-vite";

import { Badge } from ".";

const meta: Meta = { title: "Components/Elements/Badge" };
export default meta;

export const Basic = {
  render: () => <Badge>Default</Badge>,
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
