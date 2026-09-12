import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, ref } from "vue";

import { Toc } from "./index.js";

const meta: Meta = { title: "Components / Toc" };
export default meta;

const sections = [
  { value: "intro", depth: 2, label: "Introduction", lines: 3 },
  { value: "language", depth: 2, label: "The paper and the ink", lines: 4 },
  { value: "light", depth: 3, label: "Light as shadow", lines: 4 },
  { value: "shape", depth: 3, label: "Seals and vessels", lines: 3 },
  { value: "closing", depth: 2, label: "Closing", lines: 2 },
];

function prose(lines: number) {
  return Array.from({ length: lines }, (_, line) =>
    h("p", { key: line }, "Warm paper, ink that reads, hierarchy carried by light."),
  );
}

/** A page of prose beside its rail: scroll the page and the stroke of
 * primary ink follows the section under the eye. */
const TocStory = defineComponent({
  name: "TocStory",
  setup() {
    const content = ref();
    const scrollEl = () => content.value?.$el;
    return () =>
      h(Toc.Root, { items: sections, scrollEl }, () => [
        h(Toc.Content, { ref: content }, () =>
          sections.map((section) =>
            h("section", { key: section.value, id: section.value }, [
              h("h3", () => section.label),
              ...prose(section.lines),
            ]),
          ),
        ),
        h(Toc.Nav, () => [
          h(Toc.Title, () => "On this page"),
          h(Toc.List, () =>
            sections.map((section) =>
              h(Toc.Item, { key: section.value, item: section }, () =>
                h(Toc.Link, { href: `#${section.value}` }, () => section.label),
              ),
            ),
          ),
        ]),
      ]);
  },
});

export const Basic = {
  render: () => h(TocStory),
};
