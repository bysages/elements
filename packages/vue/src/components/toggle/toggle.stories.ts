import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Toggle } from "./index.js";

const meta: Meta = { title: "Components / Toggle" };
export default meta;

export const Basic = {
  render: () =>
    h(Toggle.Root, { "aria-label": "Toggle bold" }, () => [
      h(Toggle.Indicator, () => [
        h(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 2,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          () => [
            h("path", {
              d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
            }),
          ],
        ),
      ]),
    ]),
};
