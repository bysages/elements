import type { Meta } from "@storybook/react-vite";

import { AspectRatio } from ".";

const meta: Meta = { title: "Components/Layout/Aspect Ratio" };
export default meta;

const pane = (label: string) => (
  <div
    style={{
      display: "grid",
      placeItems: "center",
      background: "var(--bs-color-surface-3)",
      border: "1px solid var(--bs-color-border)",
      fontSize: "var(--bs-font-size-sm)",
      color: "var(--bs-color-text-secondary)",
    }}
  >
    {label}
  </div>
);

/** The frame keeps its shape whatever width the stage deals it — the
 * child fills the face the ratio draws. */
export const Basic = {
  render: () => <AspectRatio ratio="16 / 9">{pane("16 / 9")}</AspectRatio>,
};

/** One width, three shapes: the ratio is the only thing that changes. */
export const Ratios = {
  render: () => (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--bs-space-4)" }}
    >
      {["1 / 1", "4 / 3", "16 / 9"].map((ratio) => (
        <AspectRatio key={ratio} ratio={ratio}>
          {pane(ratio)}
        </AspectRatio>
      ))}
    </div>
  ),
};
