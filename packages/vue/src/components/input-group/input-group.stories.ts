import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { InputGroup } from ".";
import { Button } from "../button";
import { Input } from "../input";

const meta: Meta = { title: "Components/Forms/InputGroup" };
export default meta;
type Story = StoryObj<typeof InputGroup>;

/** Fixed words ride ahead of the ink: the scheme lives in a recessed
 * addon, the hairline and the halo belong to the group. */
export const Basic: Story = {
  render: () =>
    h(InputGroup, null, () => [
      h(InputGroup.Addon, () => "https://"),
      h(Input, { placeholder: "example.com" }),
    ]),
};

/** Attachments on both sides: a quiet ghost button opens the seal, a
 * fixed tail closes it — one merged control, three parts. */
export const WithActions: Story = {
  render: () =>
    h(InputGroup, null, () => [
      h(InputGroup.Addon, () => [
        h(Button, { variant: "ghost", square: true, "aria-label": "Insert handle" }, () => [
          atIcon(),
        ]),
      ]),
      h(Input, { placeholder: "username" }),
      h(InputGroup.Addon, () => ".com"),
    ]),
};

/** The one glyph the handle trigger needs: the at sign, one stroke. */
function atIcon() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [
      h("circle", { cx: 12, cy: 12, r: 4 }),
      h("path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" }),
    ],
  );
}
