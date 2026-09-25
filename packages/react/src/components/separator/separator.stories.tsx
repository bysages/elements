import type { Meta } from "@storybook/react-vite";

import { Separator } from ".";

const meta: Meta = { title: "Components/Elements/Separator" };
export default meta;

export const Basic = {
  render: () => (
    <div style={{ maxWidth: "34rem" }}>
      <p style={{ margin: "0 0 1rem" }}>Above the rule, one thought.</p>
      <Separator />
      <p style={{ margin: "1rem 0 0" }}>Below it, another.</p>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "2rem" }}>
      <span>Ink</span>
      <Separator orientation="vertical" />
      <span>Paper</span>
      <Separator orientation="vertical" />
      <span>Light</span>
    </div>
  ),
};
