import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Empty } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/Empty" };
export default meta;
type Story = StoryObj<typeof Empty>;

const tray = () =>
  h(
    "svg",
    {
      width: 56,
      height: 56,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.5,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [
      h("polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }),
      h("path", {
        d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      }),
    ],
  );

const action = (variant: string, label: string) =>
  h(Button as any, { variant, tone: "ink", size: "sm" }, () => label);

/** The full state: a quiet mark, one line of ink, and the way out. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(Empty.Root as any, () => [
          h(Empty.Visual as any, () => tray()),
          h(Empty.Title as any, () => "No letters yet"),
          h(
            Empty.Description as any,
            () => "Letters addressed to the archive will rest here until they are read.",
          ),
          h(Empty.Actions as any, () => [
            action("solid", "Write a letter"),
            action("ghost", "Learn more"),
          ]),
        ]),
    ),
};

/** Only the words: title and description alone, the whitespace doing
 * the rest of the work. */
export const Minimal: Story = {
  render: () =>
    withState(
      () => () =>
        h(Empty.Root as any, () => [
          h(Empty.Title as any, () => "Nothing on the desk"),
          h(Empty.Description as any, () => "The paper is clear. Begin whenever you are ready."),
        ]),
    ),
};
