import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { DataView } from ".";
import { Avatar } from "../avatar";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Data View" };
export default meta;

type Story = StoryObj<typeof DataView>;

const RECORDS = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  title: `Ledger entry ${index + 1}`,
  detail: "Settled and sealed.",
}));

/** The facade is the one-tag path. */
export const Basic = {
  render: () =>
    h(
      DataView,
      { items: RECORDS, pageSize: 6 },
      { item: ({ item }: any) => h("span", () => item.title) },
    ),
};

/** The ledger layout, paged: rows separate by hairline, the pagination
 * family's own parts carry the foot. */
export const Ledger: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          DataView,
          { items: RECORDS, pageSize: 6 },
          {
            item: ({ item }: any) => [
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--bs-gap-sm)",
                    padding: "var(--bs-padding-sm) 0",
                  },
                },
                [
                  h(Avatar.Root, { size: "sm" }, () => h(Avatar.Fallback, () => String(item.id))),
                  h("span", () => item.title),
                ],
              ),
            ],
          },
        ),
    ),
};

/** The same ledger through the anatomy contract, kept as a named story. */
export const Anatomy = {
  render: Ledger.render,
};

/** The lattice layout: equal tiles that shrink with the container. */
export const Lattice: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          DataView,
          { items: RECORDS.slice(0, 9), layout: "grid" },
          {
            item: ({ item }: any) => [
              h(
                "div",
                {
                  style: {
                    padding: "var(--bs-padding-md)",
                    border: "1px solid var(--bs-color-border)",
                    borderRadius: "var(--bs-radius-md)",
                  },
                },
                [
                  h("strong", () => item.title),
                  h(
                    "p",
                    {
                      style: {
                        margin: 0,
                        color: "var(--bs-color-text-tertiary)",
                        fontSize: "var(--bs-font-size-sm)",
                      },
                    },
                    item.detail,
                  ),
                ],
              ),
            ],
          },
        ),
    ),
};
