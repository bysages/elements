import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { DeferredContent } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/Deferred Content" };
export default meta;
type Story = StoryObj<typeof DeferredContent>;

/** The tall scroll stands in for a page: the panel mounts only when the
 * placeholder is nudged into view, and the scroll position tells the
 * truth about when that happened. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          {
            style: {
              maxBlockSize: "16rem",
              overflowY: "auto",
              border: "1px solid var(--bs-color-border)",
              borderRadius: "var(--bs-radius-md)",
              padding: "var(--bs-padding-md)",
            },
          },
          [
            h("p", () => "Scroll down — the panel mounts on approach."),
            h("div", { style: { blockSize: "12rem" } }),
            h(DeferredContent, null, {
              placeholder: () =>
                h(
                  "p",
                  { style: { color: "var(--bs-color-text-tertiary)" } },
                  "Waiting below the fold…",
                ),
              default: () =>
                h(
                  "p",
                  {
                    style: {
                      padding: "var(--bs-padding-md)",
                      border: "1px dashed var(--bs-color-border)",
                    },
                  },
                  "Mounted on approach.",
                ),
            }),
          ],
        ),
    ),
};
