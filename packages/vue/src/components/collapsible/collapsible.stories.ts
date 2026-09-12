import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Collapsible } from "./index.js";

const meta: Meta = { title: "Components / Collapsible" };
export default meta;

const chevron = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
    h("path", {
      d: "M6 4l4 4-4 4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]);

export const Basic = {
  render: () =>
    h(Collapsible.Root, { defaultOpen: true }, () => [
      h(Collapsible.Trigger, () => ["What is Ark UI?", h(Collapsible.Indicator, chevron)]),
      h(Collapsible.Content, () => [
        h(
          "p",
          "A headless component library for building accessible, high-quality UI components across frameworks — ours dresses its anatomy in paper and ink.",
        ),
      ]),
    ]),
};
