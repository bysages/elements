import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Listbox, createListCollection } from "./index.js";

const meta: Meta = { title: "Components / Listbox" };
export default meta;

const collection = createListCollection({
  items: [
    { label: "Qinghua cobalt", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
    { label: "Zhusha cinnabar", value: "zhusha" },
    { label: "Ochre", value: "ochre" },
    { label: "Ultramarine", value: "ultramarine" },
  ],
});

const checkPath = "M4 8.5l2.5 2.5L12 5.5";

export const Basic = {
  render: () =>
    h(Listbox.Root, { collection, selectionMode: "single" } as any, () => [
      h(Listbox.Label, () => "Pigment"),
      h(Listbox.Content, () =>
        collection.items.map((item) =>
          h(Listbox.Item, { key: item.value, item }, () => [
            h(Listbox.ItemText, () => item.label),
            h(Listbox.ItemIndicator, () =>
              h("svg", { viewBox: "0 0 16 16", fill: "none" }, [
                h("path", {
                  d: checkPath,
                  stroke: "currentColor",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                }),
              ]),
            ),
          ]),
        ),
      ),
    ]),
};
