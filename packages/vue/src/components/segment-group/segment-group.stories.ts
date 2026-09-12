import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { SegmentGroup } from "./index.js";

const meta: Meta = { title: "Components / Segment Group" };
export default meta;

const frameworks = ["React", "Solid", "Svelte", "Vue"];

export const Basic = {
  render: () =>
    h(SegmentGroup.Root, { defaultValue: "Vue" }, () => [
      h(SegmentGroup.Indicator),
      ...frameworks.map((framework) =>
        h(SegmentGroup.Item, { key: framework, value: framework }, () => [
          h(SegmentGroup.ItemText, () => framework),
          h(SegmentGroup.ItemControl),
          h(SegmentGroup.ItemHiddenInput),
        ]),
      ),
    ]),
};
