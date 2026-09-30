import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { VirtualList } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Virtual List" };
export default meta;
type Story = StoryObj<typeof VirtualList>;

const MANY = Array.from({ length: 10000 }, (_, index) => `Row ${index + 1}`);

/** Ten thousand rows on stage: the DOM holds only the window the
 * viewport can see — scroll, and the window slides. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          VirtualList,
          { items: MANY, itemHeight: 36, height: 288 },
          {
            item: ({ item, index }: any) =>
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    blockSize: "100%",
                    paddingInline: "var(--bs-padding-md)",
                    borderBottom: "1px solid var(--bs-color-border)",
                    fontSize: "var(--bs-font-size-sm)",
                    color:
                      index % 2 ? "var(--bs-color-text-secondary)" : "var(--bs-color-text-primary)",
                  },
                },
                item,
              ),
          },
        ),
    ),
};
