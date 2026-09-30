import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { OrderList } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Order List" };
export default meta;
type Story = StoryObj<typeof OrderList>;

const OPTIONS = [
  { label: "Prelude", value: "prelude" },
  { label: "Fugue", value: "fugue" },
  { label: "Interlude", value: "interlude" },
  { label: "Coda", value: "coda" },
];

/** The ledger at rest: hover a row and the arrow stack arrives at its
 * trailing edge; drag by the grip or tap the arrows. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const state = reactive({ value: OPTIONS.map((option) => option.value) });
      const Host = {
        setup() {
          return () =>
            h("div", { style: { maxInlineSize: "22rem" } }, [
              h(OrderList, {
                modelValue: state.value,
                options: OPTIONS,
                label: "Movements",
                "onUpdate:modelValue": (next: string[]) => (state.value = next),
              }),
              h(
                "output",
                {
                  style: {
                    display: "block",
                    marginTop: "var(--bs-space-2)",
                    fontSize: "var(--bs-font-size-sm)",
                    color: "var(--bs-color-text-tertiary)",
                  },
                },
                () => state.value.join(" → "),
              ),
            ]);
        },
      };
      return () => h(Host);
    }),
};
