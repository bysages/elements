import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Accordion } from "./index.js";

const meta: Meta = { title: "Components / Accordion" };
export default meta;

const chevron = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
    h("path", {
      d: "M4 6l4 4 4-4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]);

const items = [
  {
    value: "paper",
    title: "What is the paper-and-ink system?",
    body: "Interfaces are warm paper, content is ink, hierarchy is light — never pure white, never a hard pop.",
  },
  {
    value: "tokens",
    title: "Where do visual values come from?",
    body: "Every color, spacing, radius, elevation, and duration resolves from design tokens; a hardcoded pixel is a bug.",
  },
  {
    value: "ark",
    title: "Who owns the interaction?",
    body: "Ark UI's machines own state, ARIA, and positioning; our styles dress the anatomy they render.",
  },
];

export const Basic = {
  render: () =>
    h(Accordion.Root, { defaultValue: ["paper"] }, () =>
      items.map((item) =>
        h(Accordion.Item, { key: item.value, value: item.value }, () => [
          h(Accordion.ItemTrigger, () => [item.title, h(Accordion.ItemIndicator, chevron)]),
          h(Accordion.ItemContent, () => [h("p", item.body)]),
        ]),
      ),
    ),
};
