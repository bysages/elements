import type { Meta } from "@storybook/react-vite";

import { Chip } from ".";

const meta: Meta = { title: "Components/Elements/Chip" };
export default meta;

export const Basic = {
  render: () => <Chip value={7} />,
};

export const Capped = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Chip value={3} />
      <Chip value={99} />
      <Chip value={240} max={99} />
      <Chip value={5} tone="danger" />
    </div>
  ),
};
