import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { NumberInput } from "./index.js";

const meta: Meta = { title: "Components / Number Input" };
export default meta;

function chevron(dir: "up" | "down") {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [dir === "up" ? h("path", { d: "m6 15 6-6 6 6" }) : h("path", { d: "m6 9 6 6 6-6" })],
  );
}

/** Type a number or step it with the in-field stepper; the scrubber drag
 * grip rides the inline start. */
export const Basic = {
  render: () =>
    h(NumberInput.Root, { defaultValue: "42", min: 0, max: 100 }, () => [
      h(NumberInput.Label, () => "Quantity"),
      h(NumberInput.Control, () => [
        h(NumberInput.Input),
        h(NumberInput.Scrubber, () => gripGlyph()),
        h(NumberInput.IncrementTrigger, { "aria-label": "Increment" }, () => chevron("up")),
        h(NumberInput.DecrementTrigger, { "aria-label": "Decrement" }, () => chevron("down")),
      ]),
    ]),
};

function gripGlyph() {
  return h(
    "svg",
    {
      width: 12,
      height: 12,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M8 5v14M16 5v14" })],
  );
}
