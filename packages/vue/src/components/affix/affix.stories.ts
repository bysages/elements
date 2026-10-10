import type { Meta } from "@storybook/vue3-vite";
import { h, type VNode } from "vue";

import { Affix } from ".";

const meta: Meta = { title: "Components/Navigation/Affix" };
export default meta;

function toolbar(label: string, trailing: string) {
  return h(
    "div",
    {
      style:
        "display: flex; gap: var(--bs-space-3); align-items: center; justify-content: space-between; padding: var(--bs-space-3) var(--bs-space-4); background: var(--bs-color-surface-1); border: 1px solid var(--bs-color-border); border-radius: var(--bs-radius-sm); font-size: var(--bs-font-size-sm); letter-spacing: var(--bs-tracking-label);",
    },
    [
      h("strong", () => label),
      h("span", { style: "color: var(--bs-color-text-tertiary);" }, trailing),
    ],
  );
}

function passage(index: number) {
  return h(
    "p",
    {
      style:
        "margin: 0; color: var(--bs-color-text-secondary); line-height: var(--bs-line-height-relaxed);",
    },
    `Passage ${index} — scroll the panel: the pinned row stays at its edge while this content travels.`,
  );
}

function passages() {
  return h(
    "div",
    { style: "display: grid; gap: var(--bs-space-4);" },
    Array.from({ length: 14 }, (_, index) => passage(index + 1)),
  );
}

function panel(children: VNode[]) {
  return h(
    "div",
    {
      style:
        "height: 20rem; overflow-y: auto; overscroll-behavior: contain; padding: var(--bs-space-4); border: 1px solid var(--bs-color-border); border-radius: var(--bs-radius-md); background: var(--bs-color-surface-0);",
    },
    children,
  );
}

/** A toolbar nailed to the top of its own scroll lane. */
export const Basic = {
  render: () =>
    panel([
      h(Affix, () => toolbar("Reading tools", "Contents · Print · Share")),
      h("div", { style: "padding-block-start: var(--bs-space-4);" }, [passages()]),
    ]),
};

/** A bottom-offset row stays at the lane's lower edge. */
export const OffsetBottom = {
  render: () =>
    panel([
      passages(),
      h(Affix, { offsetBottom: "0px", style: "padding-block-start: var(--bs-space-4);" }, () =>
        toolbar("Review draft", "Save · Publish"),
      ),
    ]),
};
