import { useSegmentGroup } from "@ark-ui/vue/segment-group";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { SegmentGroup } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Segment Group" };
export default meta;

const frameworks = ["React", "Solid", "Svelte", "Vue"];

function group(extraProps: Record<string, any> = {}, values = frameworks) {
  return h(SegmentGroup.Root, extraProps, () => [
    h(SegmentGroup.Indicator),
    ...values.map((value) =>
      h(SegmentGroup.Item, { key: value, value }, () => [
        h(SegmentGroup.ItemText, () => value),
        h(SegmentGroup.ItemControl),
        h(SegmentGroup.ItemHiddenInput),
      ]),
    ),
  ]);
}

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => {
    const periods = [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
    ];
    return h(SegmentGroup, { items: periods, defaultValue: "week" });
  },
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => {
    const periods = [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
    ];
    return h(SegmentGroup.Root, { defaultValue: "week" }, () => [
      h(SegmentGroup.Indicator),
      ...periods.map((period) =>
        h(SegmentGroup.Item, { key: period.value, value: period.value }, () => [
          h(SegmentGroup.ItemText, () => period.label),
          h(SegmentGroup.ItemControl),
          h(SegmentGroup.ItemHiddenInput),
        ]),
      ),
    ]);
  },
};

/** The choice answers to the caller — the group only mirrors it. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: null as string | null });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `value: ${state.value ?? "none"}`,
          ),
          group({
            modelValue: state.value,
            onValueChange: (e: { value: string | null }) => (state.value = e.value),
          }),
        ]);
    }),
};

/** One seal sealed shut: Svelte refuses, its neighbours keep working. */
export const Disabled = {
  render: () =>
    h(SegmentGroup.Root, { defaultValue: "React" }, () => [
      h(SegmentGroup.Indicator),
      ...frameworks.map((value) =>
        h(SegmentGroup.Item, { key: value, value, disabled: value === "Svelte" }, () => [
          h(SegmentGroup.ItemText, () => value),
          h(SegmentGroup.ItemControl),
          h(SegmentGroup.ItemHiddenInput),
        ]),
      ),
    ]),
};

/** Born with a choice, mounted late: the indicator measures its segment
 * on first paint, not after the first click. */
export const Conditional = {
  render: () =>
    withState(() => {
      const state = reactive({ show: false });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(Button, { size: "sm", onClick: () => (state.show = !state.show) }, () =>
            state.show ? "Hide" : "Show",
          ),
          state.show ? group({ defaultValue: "React" }) : null,
        ]);
    }),
};

/** The machine answers outside its anatomy: the provider owns the group. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "SegmentGroupRootProvider",
      setup() {
        const segmentGroup = useSegmentGroup({ defaultValue: "React" });
        return () => [
          h(SegmentGroup.RootProvider as any, { value: segmentGroup.value }, () => [
            h(SegmentGroup.Indicator),
            ...frameworks.map((value) =>
              h(SegmentGroup.Item, { key: value, value }, () => [
                h(SegmentGroup.ItemText, () => value),
                h(SegmentGroup.ItemControl),
                h(SegmentGroup.ItemHiddenInput),
              ]),
            ),
          ]),
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `selected: ${segmentGroup.value.value ?? "none"}`,
          ),
        ];
      },
    };
    return () => h(Driver);
  },
};
