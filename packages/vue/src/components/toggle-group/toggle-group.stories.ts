import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { ToggleGroup } from "./index.js";

const meta: Meta = { title: "Components / Toggle Group" };
export default meta;

const strokeAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
} as const;

const alignIcons: Record<string, string> = {
  left: "M4 4v16M9 8h10M9 12h12M9 16h7",
  center: "M12 4v16M7 8h10M4 12h16M8 16h8",
  right: "M20 4v16M5 8h10M3 12h12M8 16h7",
  justify: "M4 6h16M4 12h16M4 18h16",
};

const AlignIcon = (align: string) =>
  h("svg", strokeAttrs, () => [h("path", { d: alignIcons[align] })]);

export const Basic = {
  render: () =>
    h(ToggleGroup.Root, { defaultValue: ["left"], "aria-label": "Text alignment" }, () =>
      Object.keys(alignIcons).map((align) =>
        h(ToggleGroup.Item, { key: align, value: align, "aria-label": `Align ${align}` }, () => [
          AlignIcon(align),
        ]),
      ),
    ),
};
