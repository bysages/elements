import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Splitter } from "./index.js";

const meta: Meta = { title: "Components / Splitter" };
export default meta;

/** Two rooms, one divide: drag the seal thumb to re-partition the paper. */
export const Basic = {
  render: () =>
    h(Splitter.Root, { panels: [{ id: "a" }, { id: "b" }] }, () => [
      h(Splitter.Panel, { id: "a" }, () => "A"),
      h(Splitter.ResizeTrigger, { id: "a:b", "aria-label": "Resize" }, () =>
        h(Splitter.ResizeTriggerIndicator),
      ),
      h(Splitter.Panel, { id: "b" }, () => "B"),
    ]),
};
