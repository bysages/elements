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

/** Past `max`, the remainder folds into an ellipsis: 99+ says "more". */
export const Max = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <span style={{ position: "relative", display: "inline-flex" }}>
        Notifications
        <Chip value={42} max={99} />
      </span>
      <span style={{ position: "relative", display: "inline-flex" }}>
        Notifications
        <Chip value={4210} max={99} />
      </span>
    </div>
  ),
};

/** The coin changes pigment with its message. */
export const Tones = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      {(["ink", "info", "danger", "success"] as const).map((tone) => (
        <span key={tone} style={{ position: "relative", display: "inline-flex" }}>
          Drafts
          <Chip value={3} tone={tone} variant="subtle" />
        </span>
      ))}
    </div>
  ),
};
