import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { AspectRatio } from ".";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Layout/Aspect Ratio",
  component: AspectRatio,
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

const pane = (label: string) =>
  h(
    "div",
    {
      style: {
        display: "grid",
        placeItems: "center",
        background: "var(--bs-color-surface-3)",
        border: "1px solid var(--bs-color-border)",
        fontSize: "var(--bs-font-size-sm)",
        color: "var(--bs-color-text-secondary)",
      },
    },
    label,
  );

/** The frame keeps its shape whatever width the stage deals it — the
 * child fills the face the ratio draws. */
export const Basic: Story = {
  args: { ratio: "16 / 9" },
  render: (args) => withState(() => () => h(AspectRatio, args, () => pane(args.ratio ?? "16 / 9"))),
};

/** One width, three shapes: the ratio is the only thing that changes. */
export const Ratios: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--bs-space-4)",
            },
          },
          ["1 / 1", "4 / 3", "16 / 9"].map((ratio) =>
            h(AspectRatio, { key: ratio, ratio }, () => pane(ratio)),
          ),
        ),
    ),
};
