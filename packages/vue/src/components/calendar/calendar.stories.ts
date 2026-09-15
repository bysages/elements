import { parseDate } from "@ark-ui/vue/date-picker";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Calendar } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Calendar" };
export default meta;
type Story = StoryObj<typeof Calendar>;

/** The month grid on the page: the popup gone, the vessel a quiet card,
 * the machinery entirely the shared date-picker's. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(Calendar as any, { style: { maxInlineSize: "20rem" } }),
    ),
};

/** A controlled selection: the chosen day reports back through the
 * binding and reads in the line below. */
export const Controlled: Story = {
  render: () => {
    const value = ref([parseDate("2026-09-15")]);
    return withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "var(--bs-space-3)", justifyItems: "start" } }, [
          h(Calendar as any, {
            modelValue: value.value,
            "onUpdate:modelValue": (v: any) => (value.value = v),
            style: { maxInlineSize: "20rem" },
          }),
          h("p", { style: { color: "var(--bs-color-text-secondary)", margin: 0 } },
            `Selected: ${value.value?.[0]?.toString() ?? "nothing yet"}`),
        ]),
    );
  },
};
