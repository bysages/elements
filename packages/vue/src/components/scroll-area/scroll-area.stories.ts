import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { ScrollArea } from "./index.js";

const meta: Meta = { title: "Components / Scroll Area" };
export default meta;

const paragraph =
  "Whitespace is not emptiness but breath. The paper carries the ink and the " +
  "light decides the hierarchy; the scrollbar is a faint crease on the page, " +
  "hidden while silent, summoned by the fingertip.";

/** The hairline vessel with ink lanes: scrollbars stay hidden until hover
 * or scroll summons them. */
export const Basic = {
  render: () =>
    h(ScrollArea.Root, () => [
      h(ScrollArea.Viewport, () =>
        h(ScrollArea.Content, () => [
          h("p", () => paragraph),
          h("p", () => paragraph),
          h("p", () => paragraph),
        ]),
      ),
      h(ScrollArea.Scrollbar, () => h(ScrollArea.Thumb)),
      h(ScrollArea.Scrollbar, { orientation: "horizontal" }, () => h(ScrollArea.Thumb)),
      h(ScrollArea.Corner),
    ]),
};
