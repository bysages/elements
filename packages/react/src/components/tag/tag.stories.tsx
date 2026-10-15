import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Tag } from ".";

const meta: Meta<typeof Tag> = {
  title: "Components/Elements/Tag",
  component: Tag,
  argTypes: {
    tone: {
      control: "select",
      options: ["ink", "primary", "success", "warning", "danger", "info"],
    },
    variant: { control: "radio", options: ["solid", "outline", "subtle"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

/** The resting seal: a label riding the solemn ink. */
export const Basic: Story = {
  args: { tone: "ink", variant: "solid" },
  render: (args) => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Tag tone={args.tone} variant={args.variant}>
        Design
      </Tag>
      <Tag tone={args.tone} variant={args.variant}>
        Porcelain
      </Tag>
      <Tag tone={args.tone} variant={args.variant}>
        Kiln work
      </Tag>
    </div>
  ),
};

/** The seal changes pigment with its meaning. */
export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {(["ink", "primary", "success", "warning", "danger", "info"] as const).map((tone) => (
        <Tag key={tone} tone={tone} variant="subtle">
          {tone}
        </Tag>
      ))}
    </div>
  ),
};

/** How the seal rests: the flat fill, the drawn hairline, the quiet
 * wash. */
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {(["solid", "outline", "subtle"] as const).map((variant) => (
        <Tag key={variant} tone="primary" variant={variant}>
          {variant}
        </Tag>
      ))}
    </div>
  ),
};

/** The checkable seal presses into its solid register and holds. */
export const Checkable: Story = {
  render: () => {
    const [qinghua, setQinghua] = useState(true);
    const [celadon, setCeladon] = useState(false);
    return (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Tag checkable variant="outline" value={qinghua} onValueChange={setQinghua}>
          Qinghua
        </Tag>
        <Tag checkable variant="outline" value={celadon} onValueChange={setCeladon}>
          Celadon
        </Tag>
      </div>
    );
  },
};

/** Both actions share one seal while their controls stay separate. */
export const CheckableClosable: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    const [removed, setRemoved] = useState(false);
    return (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {!removed && (
          <Tag
            checkable
            closable
            variant="outline"
            value={checked}
            onValueChange={setChecked}
            onClose={() => setRemoved(true)}
          >
            Qinghua
          </Tag>
        )}
      </div>
    );
  },
};

/** The quiet close: removal stays the consumer's state. */
export const Closable: Story = {
  render: () => {
    const [names, setNames] = useState(["Paper", "Ink", "Seal"]);
    const remove = (name: string) => setNames((prev) => prev.filter((n) => n !== name));
    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {names.map((name) => (
          <Tag key={name} variant="subtle" closable onClose={() => remove(name)}>
            {name}
          </Tag>
        ))}
      </div>
    );
  },
};

/** A tag that cannot answer: the pressed and removable seals both rest. */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Tag checkable value disabled>
        Archived
      </Tag>
      <Tag checkable variant="outline" disabled>
        Locked
      </Tag>
      <Tag variant="subtle" closable disabled>
        Filed
      </Tag>
    </div>
  ),
};
