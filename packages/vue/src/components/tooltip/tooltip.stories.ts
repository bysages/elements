import type { Meta } from "@storybook/vue3-vite";
import { h, Teleport } from "vue";

import { Tooltip } from "./index.js";

const meta: Meta = { title: "Components / Tooltip" };
export default meta;

function sealGlyph() {
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
    [h("path", { d: "M12 3v12m0 0-4-4m4 4 4-4M4 20h16" })],
  );
}

export const Basic = {
  render: () =>
    h(Tooltip.Root, { positioning: { placement: "bottom-start" } }, () => [
      h(Tooltip.Trigger, () => [sealGlyph(), h("span", () => "Hover me")]),
      h(Teleport, { to: "body" }, () => [
        h(Tooltip.Positioner, () => h(Tooltip.Content, () => "Ink answers only when asked.")),
      ]),
    ]),
};
