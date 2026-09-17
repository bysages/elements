import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { BackTop } from ".";

const meta: Meta = { title: "Components/Navigation/Back Top" };
export default meta;

function passage(index: number) {
  return h(
    "p",
    {
      style:
        "margin: 0 0 var(--bs-space-4); color: var(--bs-color-text-secondary); line-height: var(--bs-line-height-relaxed);",
    },
    `Passage ${index} — the page travels far enough for the way home to earn its keep. Keep scrolling and the little tile rises at the corner of the paper.`,
  );
}

/** After the threshold, the tile rises at the page corner; clicking it
 * returns the reader to the top, smoothly unless motion is reduced. */
export const Basic = {
  render: () =>
    h("div", [
      h(
        "p",
        {
          style:
            "margin: 0 0 var(--bs-space-6); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
        },
        "Scroll down — the control rises past 400px.",
      ),
      ...Array.from({ length: 30 }, (_, index) => passage(index + 1)),
      h(BackTop),
    ]),
};

/** A larger threshold: the tile waits until the reader is properly
 * lost. */
export const CustomThreshold = {
  render: () =>
    h("div", [
      h(
        "p",
        {
          style:
            "margin: 0 0 var(--bs-space-6); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
        },
        "This one waits for 1200px.",
      ),
      ...Array.from({ length: 30 }, (_, index) => passage(index + 1)),
      h(BackTop, { threshold: 1200, label: "Return to the beginning" }),
    ]),
};
