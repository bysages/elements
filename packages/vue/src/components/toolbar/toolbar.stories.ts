import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Toolbar } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/Toolbar" };
export default meta;
type Story = StoryObj<typeof Toolbar>;

/** The workbench rail: start tools lead, end tools trail. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          Toolbar,
          { label: "Document tools" },
          {
            start: () => [
              h(Button, { size: "sm", variant: "outline" }, () => "Save"),
              h(Button, { size: "sm", variant: "ghost" }, () => "Preview"),
            ],
            end: () => h(Button, { size: "sm", variant: "solid" }, () => "Publish"),
          },
        ),
    ),
};

/** A rail holding only what the default slot gives: everything lands at
 * the leading edge. */
export const StartOnly: Story = {
  render: () =>
    withState(
      () => () =>
        h(Toolbar, { label: "Feather tools" }, () => [
          h(Button, { size: "sm", variant: "ghost" }, () => "Bold"),
          h(Button, { size: "sm", variant: "ghost" }, () => "Italic"),
          h(Button, { size: "sm", variant: "ghost" }, () => "Underline"),
        ]),
    ),
};
