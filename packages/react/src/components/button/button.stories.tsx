import type { Meta } from "@storybook/react-vite";

import { Button } from ".";

const meta: Meta = { title: "Components/Elements/Button" };
export default meta;

export const Basic = {
  render: () => <Button>Ink, the default</Button>,
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
    </div>
  ),
};

export const Tones = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Button>Default</Button>
      <Button tone="info">Info</Button>
      <Button tone="success">Success</Button>
      <Button tone="warning">Warning</Button>
      <Button tone="danger">Danger</Button>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled = {
  render: () => <Button disabled>Sealed shut</Button>,
};
