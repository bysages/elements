import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Marquee } from "./index.js";

const meta: Meta = { title: "Components / Marquee" };
export default meta;

const entries = ["Qinghua", "Celadon", "Zhusha", "Ultramarine", "Gamboge", "Indigo"];

/** A horizontal ribbon of seal-cut chips drifting at a linear gait; the
 * paper fades it in and out at both edges. */
export const Basic = {
  render: () =>
    h(Marquee.Root, { spacing: "1.5rem" }, () => [
      h(Marquee.Edge, { side: "start" }),
      h(Marquee.Viewport, () =>
        h(Marquee.Content, () =>
          entries.map((name) =>
            h(Marquee.Item, { key: name }, () => [
              h(
                "svg",
                {
                  width: 16,
                  height: 16,
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  "aria-hidden": true,
                },
                [h("path", { d: "M12 3 3 9l9 12 9-12-9-6Z" })],
              ),
              h("span", name),
            ]),
          ),
        ),
      ),
      h(Marquee.Edge, { side: "end" }),
    ]),
};
