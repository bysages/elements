import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Affix } from ".";

const meta: Meta = { title: "Components/Navigation/Affix" };
export default meta;

function toolbar() {
  return h(
    "div",
    {
      style:
        "display: flex; gap: var(--bs-space-3); align-items: center; padding: var(--bs-space-3) var(--bs-space-4); background: var(--bs-color-surface-1); border: 1px solid var(--bs-color-border); border-radius: var(--bs-radius-sm); font-size: var(--bs-font-size-sm); letter-spacing: var(--bs-tracking-label);",
    },
    [
      h("strong", () => "Reading tools"),
      h("span", { style: "color: var(--bs-color-text-tertiary);" }, "·"),
      h("span", () => "Contents"),
      h("span", () => "Print"),
      h("span", () => "Share"),
    ],
  );
}

function passage(index: number) {
  return h(
    "p",
    {
      style:
        "margin: 0 0 var(--bs-space-4); color: var(--bs-color-text-secondary); line-height: var(--bs-line-height-relaxed);",
    },
    `Passage ${index} — the tools travel with the reader: once their row reaches the top of the page they stay there while the chapters move on underneath.`,
  );
}

/** A toolbar nailed to the top of the page: scroll, and it stays. */
export const Basic = {
  render: () =>
    h("div", [
      h(Affix, () => toolbar()),
      h(
        "div",
        { style: "max-inline-size: 46rem; padding-block-start: var(--bs-space-6);" },
        Array.from({ length: 16 }, (_, index) => passage(index + 1)),
      ),
    ]),
};

/** Both offsets given: the row holds its place inside the band between
 * them — clearing the header, keeping clear of the page's end. */
export const OffsetBottom = {
  render: () =>
    h("div", [
      h(Affix, { offsetTop: "var(--bs-space-12)", offsetBottom: "var(--bs-space-4)" }, () =>
        toolbar(),
      ),
      h(
        "div",
        { style: "max-inline-size: 46rem; padding-block-start: var(--bs-space-6);" },
        Array.from({ length: 16 }, (_, index) => passage(index + 1)),
      ),
    ]),
};
