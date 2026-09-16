import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Popconfirm } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Overlay/Popconfirm" };
export default meta;
type Story = StoryObj<typeof Popconfirm>;

/** The question and its two answers; the panel closes on either. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const status = ref("Idle");
      return () => [
        h(
          Popconfirm,
          {
            message: "Delete this entry? The action cannot be undone.",
            confirmText: "Delete",
            cancelText: "Keep",
            onConfirm: () => (status.value = "Deleted."),
            onCancel: () => (status.value = "Kept."),
          },
          () => h(Button, {}, () => "Delete entry"),
        ),
        h(
          "p",
          {
            role: "status",
            style:
              "margin-block-start: var(--bs-space-4); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
          },
          () => status.value,
        ),
      ];
    }),
};

/** Default answer labels when the caller has nothing local to say. */
export const DefaultLabels: Story = {
  render: () => () =>
    h(Popconfirm, { message: "Publish this change for review?" }, () =>
      h(Button, { variant: "outline" }, () => "Publish"),
    ),
};
