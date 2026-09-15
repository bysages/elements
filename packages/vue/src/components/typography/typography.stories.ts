import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Typography } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/Typography" };
export default meta;
type Story = StoryObj<typeof Typography>;

/** The six voices in one column: display and heading on the serif,
 * the rest on the hei — hierarchy by size, weight, and space. */
export const Voices: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "var(--bs-space-4)", maxWidth: "36rem" } }, [
          h(Typography.Display, () => "以光为影"),
          h(Typography.Heading, () => "The paper-and-ink system"),
          h(Typography.Lead, () =>
            "Interfaces are warm paper, content is ink, hierarchy is light.",
          ),
          h(Typography.Body, () =>
            "Surfaces are never pure white; the ground rests in ambient shade. Primary actions default to ink — monochrome, solemn — with mineral-pigment accents switchable by theme.",
          ),
          h(Typography.Muted, () => "Revised autumn 2026 · Typeset in the eastern studio"),
          h(Typography.Label, () => "SECTION IV — MOTION GRAMMAR"),
        ]),
    ),
};
