import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Clipboard } from "./index.js";

const meta: Meta = { title: "Components / Clipboard" };
export default meta;

function copyGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("rect", { x: 9, y: 9, width: 11, height: 11, rx: 1.5 }),
      h("path", {
        d: "M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5",
      }),
    ],
  );
}

function checkGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m5 12.5 4.5 4.5L19 7.5" })],
  );
}

/** Copy the link from the hairline field; the trigger's ink turns bamboo
 * for as long as the machine holds the copied state. */
export const Basic = {
  render: () =>
    h(Clipboard.Root, { defaultValue: "https://ark-ui.com" }, () => [
      h(Clipboard.Label, () => "Copy this link"),
      h(Clipboard.Control, () => [
        h(Clipboard.Input),
        h(Clipboard.Trigger, () =>
          h(Clipboard.Indicator, null, {
            default: () => copyGlyph(),
            copied: () => checkGlyph(),
          }),
        ),
      ]),
    ]),
};
