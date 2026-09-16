import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Chip } from ".";
import { withState } from "../with-state.js";

const meta: Meta<typeof Chip> = {
  title: "Components/Elements/Chip",
  component: Chip,
  argTypes: {
    tone: { control: "select", options: ["ink", "danger", "primary", "success"] },
    variant: { control: "radio", options: ["solid", "subtle", "outline"] },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

/** A counting coin riding its anchor — here, a nav item. */
export const Basic: Story = {
  args: { value: 8 },
  render: (args) =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", gap: "1.5rem", alignItems: "center" } }, [
          h("span", { style: { position: "relative", display: "inline-flex" } }, [
            "Inbox",
            h(Chip, { value: args.value, tone: args.tone, variant: args.variant }),
          ]),
        ]),
    ),
};

/** Past `max`, the remainder folds into an ellipsis: 99+ says "more". */
export const Max: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", gap: "1.5rem", alignItems: "center" } }, [
          h("span", { style: { position: "relative", display: "inline-flex" } }, [
            "Notifications",
            h(Chip, { value: 42, max: 99 }),
          ]),
          h("span", { style: { position: "relative", display: "inline-flex" } }, [
            "Notifications",
            h(Chip, { value: 4210, max: 99 }),
          ]),
        ]),
    ),
};

/** The coin changes pigment with its message. */
export const Tones: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "flex", gap: "1.5rem", alignItems: "center" } },
          (["ink", "primary", "danger", "success"] as const).map((tone) =>
            h("span", { key: tone, style: { position: "relative", display: "inline-flex" } }, [
              "Drafts",
              h(Chip, { value: 3, tone, variant: "subtle" }),
            ]),
          ),
        ),
    ),
};
