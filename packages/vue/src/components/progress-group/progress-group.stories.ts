import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { ProgressGroup } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Progress Group" };
export default meta;
type Story = StoryObj<typeof ProgressGroup>;

/** The house's ledger at a glance: each segment its own pigment, the
 * legend reading them back beneath. */
export const Basic: Story = {
  render: () =>
    h(ProgressGroup, {
      segments: [
        { value: 42, label: "Shelved", pigment: "primary" },
        { value: 28, label: "Catalogued", pigment: "info" },
        { value: 18, label: "Awaiting seal", pigment: "warning" },
        { value: 12, label: "Deferred", pigment: "danger" },
      ],
    }),
};

/** Without the legend the bar keeps only its segments — the caller
 * tells the story in their own words beside it. */
export const BarOnly: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "0.75rem", maxInlineSize: "24rem" } }, [
          h(ProgressGroup, {
            showLegend: false,
            segments: [
              { value: 60, pigment: "success" },
              { value: 30, pigment: "warning" },
              { value: 10, pigment: "danger" },
            ],
          }),
          h(
            "span",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-tertiary)",
              },
            },
            "Six in ten entries pass the first reading.",
          ),
        ]),
    ),
};

/** A larger whole leaves the remainder as groove: the bar shows how
 * much of the shelf is still unaccounted for. */
export const PartialWhole: Story = {
  render: () =>
    h(ProgressGroup, {
      max: 200,
      segments: [
        { value: 64, label: "Bound", pigment: "success" },
        { value: 48, label: "In press", pigment: "info" },
      ],
    }),
};
