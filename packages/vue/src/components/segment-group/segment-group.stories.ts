import { useSegmentGroup } from "@ark-ui/vue/segment-group";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { SegmentGroup } from "./index.js";

const meta: Meta = { title: "Components / Segment Group" };
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

/** One ink stroke slides beneath the chosen segment. */
export const Basic = {
  render: () => group({ defaultValue: "Vue" }),
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
          h(
            "button",
            {
              onClick: () => (state.show = !state.show),
              style: {
                padding: "0.375rem 0.75rem",
                border: "1px solid var(--bs-color-border)",
                borderRadius: "var(--bs-radius-sm)",
                background: "var(--bs-color-surface-2)",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
              },
            },
            () => (state.show ? "Hide" : "Show"),
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
